import { mergeWith, isArray } from 'lodash';
import { DELETE_EMPLOYEE_DETAILS_SUCCESS } from 'constants/actionTypes';

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return srcValue;
  }
}

export default (
  state = {
    employee: {}
  },
  action
) => {
  if (action.entities) {
    return mergeWith({}, state, action.entities, customizer);
  }

  switch (action.type) {
    case DELETE_EMPLOYEE_DETAILS_SUCCESS:
      delete state.entities[action.employeeId];
      return state;
    default:
      return state;
  }
};
