import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import NotFoundPage from 'pages/NotFoundPage';
import EmployeePage from 'pages/EmployeePage';
import AddEmployeePage from 'pages/AddEmployeePage';
import configureStore from 'utilities/configureStore';

import '../assets/sass/custom.bootstrap.scss';
import 'antd/dist/antd.css';
import '../assets/sass/app.scss';

const history = createBrowserHistory();

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => <Redirect to="/employees" />} />
        <Route path="/employees" component={EmployeePage} />
        <Route path="/add-employee" component={AddEmployeePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  </Provider>
);

export default Root;
