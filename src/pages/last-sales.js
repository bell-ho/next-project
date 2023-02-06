import React, { useState } from 'react';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

const fetchTempData = async () => {
  const res = await fetch('https://meet-up-c8c64-default-rtdb.firebaseio.com/sales.json').then(
    (rep) => {
      return rep.json();
    },
  );
  return Object.keys(res).map((key) => ({ id: key, ...res[key] }));
};
const LastSales = (props) => {
  // const [sales, setSales] = useState(props.sales);

  const { data: sales, isLoading, isError } = useQuery(['sales'], fetchTempData, {});

  if (isError) {
    return <p>Failed</p>;
  }

  if (!sales) {
    return <q>Loading..</q>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} {sale.volume}
        </li>
      ))}
    </ul>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['sales'], fetchTempData);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default LastSales;
