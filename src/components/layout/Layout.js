import React, { Fragment } from 'react';
import MainHeader from '@/components/layout/MainHeader';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;