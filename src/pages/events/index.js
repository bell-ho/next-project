import React, { Fragment } from 'react';
import EventList from '@/components/events/EventList';
import EventSearch from '@/components/events/EventSearch';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { queryKey } from '@/react-query/contants';
import { getAllEvents, getFeaturedEvents } from '@/api/event';
import Head from 'next/head';

const Events = () => {
  const router = useRouter();

  const { data: events, isLoading, isError } = useQuery([queryKey.events.all], getAllEvents, {});

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([queryKey.events.all], getAllEvents);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
}

export default Events;
