import { normalize } from 'normalizr';
import { call, put } from 'redux-saga/effects';

import * as TYPES from 'constants/actionTypes';
import * as URLS from 'constants/apiUrls';
import api from 'utilities/configureAxios';
import * as SCHEMAS from 'constants/schemas';

/**
 * -------------------------------------------------------------
 * fetch employees
 * -------------------------------------------------------------
 */

export const fetchEmployeesRequest = params => ({
  type: TYPES.FETCH_EMPLOYEES_REQUEST,
  params
});

export const fetchEmployeesSuccess = (entities, result, pagination) => {
  return {
    type: TYPES.FETCH_EMPLOYEES_SUCCESS,
    entities,
    result,
    pagination
  };
};

export const fetchEmployeesError = error => ({
  type: TYPES.FETCH_EMPLOYEES_ERROR,
  error
});

/**
 * fetchProjects
 *
 * @param action action type
 */
export function* fetchEmployees(action) {
  try {
    const response = yield call(api.get, URLS.FETCH_ALL_EMPLOYEES_URL, {
      params: {
        ...action.params
      }
    });

    const { entities, result } = normalize(response.data, [SCHEMAS.employee]);

    yield put(fetchEmployeesSuccess(entities, result, response.meta));
  } catch (error) {
    yield put(fetchEmployeesError(error));
  }
}
