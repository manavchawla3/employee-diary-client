import React from 'react';
import { connect } from 'react-redux';

import { fetchEmployeeDetailsRequest } from 'actions/employeeDetailsActions';
import { getEmployeeDetails, getEmployeeDetailsIsLoading } from 'selectors/employeeDetailsSelectors';
import EmployeeForm from './EmployeeForm';
import Loader from 'components/ui/Loader';

class EmployeeDetails extends React.Component {
  componentDidMount() {
    const { employeeId, fetchEmployeeDetailsRequest } = this.props;
    fetchEmployeeDetailsRequest(employeeId);
  }

  render() {
    const { isLoading, employee } = this.props;
    return (
      <>
        {(isLoading || !employee) && <Loader />}
        {!isLoading && employee && (
          <>
            <EmployeeForm employee={employee} type="edit" />
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    employee: getEmployeeDetails(state),
    isLoading: getEmployeeDetailsIsLoading(state)
  };
}

export default connect(
  mapStateToProps,
  { fetchEmployeeDetailsRequest }
)(EmployeeDetails);
