import { combineReducers } from 'redux';

import employeesReducer from './employeesReducer';
import employeeDetailsReducer from './employeeDetailsReducer';
import entitiesReducer from './entitiesReducer';

export default combineReducers({
  entities: entitiesReducer,
  employees: employeesReducer,
  employeeDetails: employeeDetailsReducer
});
