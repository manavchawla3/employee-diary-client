import React from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';

import App from 'components/App';
import Section from 'components/ui/Section';

import { fetchEmployeesRequest } from 'actions/employeeActions';
import { deleteEmployeeDetailsRequest } from 'actions/employeeDetailsActions';
import { getEmployees, getEmployeesIsLoading, getEmployeePagination } from 'selectors/employeeSelectors';
import EmployeeForm from '../components/employee/EmployeeForm';

function right() {
  return (
    <Link to="/">
      <Button type="primary" shape="round" icon="home">
        Home
      </Button>
    </Link>
  );
}

class AddEmployeePage extends React.Component {
  render() {
    return (
      <App>
        <Section title="Add New Employee" right={right} />
        <div className="m-3">
          <Card>
            <EmployeeForm type="add" />
          </Card>
        </div>
      </App>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    employees: getEmployees(state),
    pagination: getEmployeePagination(state),
    isLoading: getEmployeesIsLoading(state)
  };
}

export default connect(
  mapStateToProps,
  { fetchEmployeesRequest, deleteEmployeeDetailsRequest }
)(AddEmployeePage);
