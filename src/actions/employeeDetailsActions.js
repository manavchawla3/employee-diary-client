import { normalize } from 'normalizr';
import { call, put } from 'redux-saga/effects';

import * as TYPES from 'constants/actionTypes';
import * as URLS from 'constants/apiUrls';
import api from 'utilities/configureAxios';
import * as SCHEMAS from 'constants/schemas';

/**
 * -------------------------------------------------------------
 * fetch employee detail actions
 * -------------------------------------------------------------
 */

export const fetchEmployeeDetailsRequest = (employeeId, params = {}) => {
  return {
    type: TYPES.FETCH_EMPLOYEE_DETAILS_REQUEST,
    employeeId,
    params
  };
};

export const fetchEmployeeDetailsSuccess = (entities, result) => {
  return {
    type: TYPES.FETCH_EMPLOYEE_DETAILS_SUCCESS,
    entities,
    result
  };
};

export const fetchEmployeeDetailsError = error => ({
  type: TYPES.FETCH_EMPLOYEE_DETAILS_ERROR,
  error
});

/**
 * fetch Employee details
 *
 * @param action action type
 */
export function* fetchEmployeeDetails(action) {
  try {
    const response = yield call(api.get, `${URLS.FETCH_EMPLOYEE_DETAILS_URL}/${action.employeeId}`, {
      params: {
        ...action.params
      }
    });

    const { entities, result } = normalize(response.data, SCHEMAS.employee);

    yield put(fetchEmployeeDetailsSuccess(entities, result));
  } catch (error) {
    yield put(fetchEmployeeDetailsError(error));
  }
}

/**
 * -------------------------------------------------------------
 * add new employee actions
 * -------------------------------------------------------------
 */
export const addEmployeeDetailsRequest = (data, onSuccess, onFailure, onFinal) => ({
  type: TYPES.ADD_EMPLOYEE_DETAILS_REQUEST,
  data,
  onSuccess,
  onFailure,
  onFinal
});

export const addEmployeeDetailsSuccess = (entities, result) => {
  return {
    type: TYPES.ADD_EMPLOYEE_DETAILS_SUCCESS,
    entities,
    result
  };
};

export const addEmployeeDetailsError = error => ({
  type: TYPES.ADD_EMPLOYEE_DETAILS_ERROR,
  error
});

/**
 * add new employee
 *
 * @param action action type
 */

export function* addEmployeeDetails(action) {
  try {
    const response = yield call(api.post, `${URLS.ADD_EMPLOYEE_DETAILS_URL}`, action.data);

    const { entities, result } = normalize(response.data, SCHEMAS.employee);

    yield put(addEmployeeDetailsSuccess(entities, result));

    action.onSuccess();
  } catch (error) {
    yield put(addEmployeeDetailsError(error));
    action.onFailure(error);
  } finally {
    action.onFinal();
  }
}

/**
 * -------------------------------------------------------------
 * update employee details actions
 * -------------------------------------------------------------
 */
export const updateEmployeeDetailsRequest = (employeeId, data, onSuccess, onFailure, onFinal) => ({
  type: TYPES.UPDATE_EMPLOYEE_DETAILS_REQUEST,
  employeeId,
  data,
  onSuccess,
  onFailure,
  onFinal
});

export const updateEmployeeDetailsSuccess = (entities, result) => {
  return {
    type: TYPES.UPDATE_EMPLOYEE_DETAILS_SUCCESS,
    entities,
    result
  };
};

export const updateEmployeeDetailsError = error => ({
  type: TYPES.UPDATE_EMPLOYEE_DETAILS_ERROR,
  error
});

/**
 * update employee details
 *
 * @param action action type
 */

export function* updateEmployeeDetails(action) {
  try {
    const response = yield call(api.patch, `${URLS.UPDATE_EMPLOYEE_DETAILS_URL}/${action.employeeId}`, action.data);

    const { entities, result } = normalize(response.data, SCHEMAS.employee);

    yield put(updateEmployeeDetailsSuccess(entities, result));

    action.onSuccess();
  } catch (error) {
    yield put(updateEmployeeDetailsError(error));
    action.onFailure(error);
  } finally {
    action.onFinal();
  }
}

/**
 * -------------------------------------------------------------
 * delete employee details actions
 * -------------------------------------------------------------
 */
export const deleteEmployeeDetailsRequest = (employeeId, onSuccess, onFailure) => ({
  type: TYPES.DELETE_EMPLOYEE_DETAILS_REQUEST,
  employeeId,
  onSuccess,
  onFailure
});

export const deleteEmployeeDetailsSuccess = (entities, result) => {
  return {
    type: TYPES.DELETE_EMPLOYEE_DETAILS_SUCCESS,
    entities,
    result
  };
};

export const deleteEmployeeDetailsError = error => ({
  type: TYPES.DELETE_EMPLOYEE_DETAILS_ERROR,
  error
});

/**
 * delete employee details
 *
 * @param action action type
 */

export function* deleteEmployeeDetails(action) {
  try {
    const response = yield call(api.delete, `${URLS.DELETE_EMPLOYEE_DETAILS_URL}/${action.employeeId}`);

    yield put(deleteEmployeeDetailsSuccess(action.employeeId));

    action.onSuccess(response);
  } catch (error) {
    yield put(deleteEmployeeDetailsError(error));
    action.onFailure(error);
  }
}
