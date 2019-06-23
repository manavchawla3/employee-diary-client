import * as TYPES from 'constants/actionTypes';
import { transformPagination } from '../utilities/helpers';
/**
 * reducer for orders
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
const employees = (
  state = {
    isLoading: true,
    error: null,
    pagination: { defaultCurrent: 1 },
    employeeIds: []
  },
  action
) => {
  switch (action.type) {
    case TYPES.FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        employeeIds: action.result,
        pagination: transformPagination(action.pagination)
      };

    case TYPES.FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case TYPES.FETCH_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default employees;
