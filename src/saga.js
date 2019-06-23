import { takeLatest } from 'redux-saga/effects';
import { fetchEmployees } from 'actions/employeeActions';
import {
  fetchEmployeeDetails,
  addEmployeeDetails,
  updateEmployeeDetails,
  deleteEmployeeDetails
} from 'actions/employeeDetailsActions';
import * as TYPES from 'constants/actionTypes';

function* rootSaga() {
  yield takeLatest(TYPES.FETCH_EMPLOYEES_REQUEST, fetchEmployees);
  yield takeLatest(TYPES.FETCH_EMPLOYEE_DETAILS_REQUEST, fetchEmployeeDetails);
  yield takeLatest(TYPES.ADD_EMPLOYEE_DETAILS_REQUEST, addEmployeeDetails);
  yield takeLatest(TYPES.UPDATE_EMPLOYEE_DETAILS_REQUEST, updateEmployeeDetails);
  yield takeLatest(TYPES.DELETE_EMPLOYEE_DETAILS_REQUEST, deleteEmployeeDetails);
}

export default rootSaga;
