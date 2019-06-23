import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './commonSelectors';
import * as SCHEMAS from 'constants/schemas';

export const getEmployeesIsLoading = state => state.employees.isLoading;
export const getEmployeeIds = state => state.employees.employeeIds;
export const getEmployeePagination = state => state.employees.pagination;

export const getEmployees = createSelector(
  getEntities,
  getEmployeeIds,
  (entities, ids) => {
    return denormalize(ids, [SCHEMAS.employee], entities);
  }
);
