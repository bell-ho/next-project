import EventList from '@/components/events/EventList';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/react-query/contants';
import { getFeaturedEvents } from '@/api/event';
import NewsletterRegistration from '@/components/input/NewsLetterRegistration';

export default function Home() {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery([queryKey.events.featured], getFeaturedEvents, {});

  return (
    <div>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([queryKey.events.featured], getFeaturedEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1800,
  };
}
