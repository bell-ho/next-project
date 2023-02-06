import React, { Fragment } from 'react';
import EventList from '@/components/events/EventList';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { useQuery } from '@tanstack/react-query';
import { getFilteredEvents } from '@/api/event';
import { queryKey } from '@/react-query/contants';
import { useRouter } from 'next/router';

// const FilteredEventsByDate = ({ hasError, date: { year, month } }) => {
const FilteredEventsByDate = () => {
  const router = useRouter();

  const filterData = router.query.date;
  const filteredYear = filterData?.[0];
  const filteredMonth = filterData?.[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery([queryKey.events.date, numYear, numMonth], () =>
    getFilteredEvents({ year: numYear, month: numMonth }),
  );

  if (isLoading) {
    return <p className={'center'}>Loading...</p>;
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    isError
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const makeDate = new Date(numYear, numMonth - 1);

  if (!events || events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ResultsTitle date={makeDate} />
      <EventList items={events} />
    </Fragment>
  );
};

// 필터링된 데이터를 출력하는 page는 seo에 도움되지 않아서 ssr 안해도됨 => 모든 목록을 보여주거나 디테일 화면에서 하는게 좋음
// export async function getServerSideProps(context) {
//   const queryClient = new QueryClient();
//   const { params } = context;
//   const filterData = params;
//   const filteredYear = filterData.date[0];
//   const filteredMonth = filterData.date[1];
//
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;
//
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2011 ||
//     numMonth > 12 ||
//     numMonth < 1
//   ) {
//     return {
//       props: {
//         hasError: true,
//         date: {
//           // error인 경우에도 props 전달 해줘야함 안하면 undefine
//         },
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // },
//     };
//   }
//
//   try {
//     await queryClient.prefetchQuery([queryKey.events.date, numYear, numMonth], () =>
//       getFilteredEvents({ year: numYear, month: numMonth }),
//     );
//
//     return {
//       props: {
//         dehydratedState: dehydrate(queryClient),
//         date: {
//           year: numYear,
//           month: numMonth,
//         },
//       },
//     };
//   } catch (e) {
//     return { hasError: true };
//   } finally {
//     queryClient.clear();
//   }
// }

export default FilteredEventsByDate;
