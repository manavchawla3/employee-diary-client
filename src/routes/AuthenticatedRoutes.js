import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import OrdersPage from 'pages/OrdersPage';

const AuthenticatedRoutes = props => {
  return (
    <>
      <Route exact path="/" component={() => <Redirect to="/orders" />} />
      <Route path="/orders" component={OrdersPage} />
    </>
  );
};

export default AuthenticatedRoutes;
