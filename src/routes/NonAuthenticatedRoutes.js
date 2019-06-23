import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const NonAuthenticatedRoutes = props => {
  return (
    <>
      <Route path="/login" component={LoginPage} />
    </>
  );
};

export default NonAuthenticatedRoutes;
