import React, { Fragment } from 'react';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '@/api/event';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/react-query/contants';
import { useRouter } from 'next/router';
import Comments from '@/components/input/Comments';

const EventDetail = () => {
  const router = useRouter();
  const eventId = router.query.eventId;

  const { data: event } = useQuery([queryKey.events, eventId], () => getEventById(eventId));

  if (!event) {
    return (
      <ErrorAlert>
        <p>NOT FOUND</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const queryClient = new QueryClient();

  const eventId = context.params.eventId;

  try {
    await queryClient.prefetchQuery([queryKey.events, eventId], () => getEventById(eventId), {});

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 30,
    };
  } catch (e) {
    return { notFound: true };
  } finally {
    queryClient.clear();
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const params = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: params,
    fallback: true,
  };
}

export default EventDetail;
