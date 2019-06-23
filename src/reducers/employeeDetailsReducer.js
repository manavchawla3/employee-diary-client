import * as TYPES from 'constants/actionTypes';
/**
 * reducer for employees
 *
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
const employeeDetails = (
  state = {
    isLoading: true,
    error: null,
    employeeId: null
  },
  action
) => {
  switch (action.type) {
    case TYPES.FETCH_EMPLOYEE_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case TYPES.FETCH_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        employeeId: action.result
      };
    case TYPES.FETCH_EMPLOYEE_DETAILS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };

    case TYPES.UPDATE_EMPLOYEE_DETAILS_REQUEST:
    case TYPES.UPDATE_EMPLOYEE_DETAILS_SUCCESS:
      return {
        ...state,
        error: null
      };
    case TYPES.UPDATE_EMPLOYEE_DETAILS_ERROR:
      return {
        ...state,
        error: action.error
      };

    default:
      return state;
  }
};

export default employeeDetails;
