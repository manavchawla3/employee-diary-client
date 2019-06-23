import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { getEntities } from './commonSelectors';
import * as SCHEMAS from 'constants/schemas';

export const getEmployeeDetailsIsLoading = state => state.employeeDetails.isLoading;
export const getEmployeeId = state => state.employeeDetails.employeeId;

export const getEmployeeDetails = createSelector(
  getEntities,
  getEmployeeId,
  (entities, id) => {
    return denormalize(id, SCHEMAS.employee, entities);
  }
);
