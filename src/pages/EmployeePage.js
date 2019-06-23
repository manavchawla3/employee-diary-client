import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Divider, Popconfirm, Button, message, Input } from 'antd';
import { Route, Link } from 'react-router-dom';
import moment from 'moment';
import { debounce } from 'lodash';

import App from 'components/App';
import Section from 'components/ui/Section';
import EmployeeModal from '../components/employee/EmployeeModal';

import EmployeeEdit from 'components/employee/EmployeeEdit';
import EmployeeDetails from 'components/employee/EmployeeDetails';

import { fetchEmployeesRequest } from 'actions/employeeActions';
import { deleteEmployeeDetailsRequest } from 'actions/employeeDetailsActions';
import { getEmployees, getEmployeesIsLoading, getEmployeePagination } from 'selectors/employeeSelectors';

const { Search } = Input;

class EmployeePage extends React.Component {
  columns = [
    {
      title: '#',
      dataIndex: '#',
      key: '#'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob'
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary'
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      className: 'max-width300',
      render: skills => (
        <span>
          {skills.map(skill => {
            let color = ['geekblue', 'green', 'volcano'];
            return (
              <Tag color={color[Math.floor(Math.random() * Math.floor(3))]} key={skill}>
                {skill.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => {
        return (
          <span>
            <Button type="primary" onClick={e => this.openEditEmployee(e, record)}>
              Edit
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this employee?"
              onConfirm={e => this.confirmDelete(e, record)}
              onCancel={e => e.stopPropagation()}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" onClick={e => e.stopPropagation()} href="#">
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      }
    }
  ];

  componentDidMount() {
    this.makeAndSendEmployeeRequest();
  }

  makeAndSendEmployeeRequest(page, query) {
    const { fetchEmployeesRequest } = this.props;

    if (!page) page = 1;
    let queryParams = {
      page,
      limit: 5,
      name: query
    };
    fetchEmployeesRequest(queryParams);
  }

  generateRows = (employees, page, size) =>
    employees.map((employee, index) => ({
      key: index,
      '#': index + 1 + (page - 1) * size,
      id: employee.id,
      salary: employee.salary,
      dob: employee.dob ? moment(employee.dob).format('DD MMM YYYY') : null,
      name: employee.first_name + ' ' + employee.last_name,
      skills: employee.skills
    }));

  //fetch new employees when page is changed
  handleTableChange = pagination => {
    this.makeAndSendEmployeeRequest(pagination.current);
  };

  //open edit employee details in modal
  openEditEmployee = (e, record) => {
    e.stopPropagation();
    const { history } = this.props;
    history.push(`/employees/edit/${record.id}`);
  };

  //open employee details in modal
  openEmployeeDetails = (record, rowIndex) => {
    return {
      onClick: event => {
        const { history } = this.props;
        history.push(`/employees/${record.id}`);
      }
    };
  };

  //delete employee details
  confirmDelete = (e, record) => {
    e.stopPropagation();
    const { deleteEmployeeDetailsRequest } = this.props;
    deleteEmployeeDetailsRequest(
      record.id,
      res => {
        message.success('Employee Successfully Deleted');
        this.makeAndSendEmployeeRequest(this.props.pagination.defaultCurrent);
      },
      err => {
        message.error('Error while deleting the employee');
      }
    );
  };

  makeDebouncedSearchCall = debounce(value => this.makeAndSendEmployeeRequest(1, value), 200);

  //search employee
  onSearch = ({ target: { value } }) => this.makeDebouncedSearchCall(value);

  render() {
    const { isLoading, employees, pagination } = this.props;
    const rows = this.generateRows(employees, pagination.defaultCurrent, pagination.pageSize);
    return (
      <App>
        <Section title="Employee Directory" icon="database">
          <div className="d-flex mb-2">
            <div className="flex-grow-1">
              <Search placeholder="Search by Employee Name" onChange={this.onSearch} />
            </div>
            <div className="ml-2">
              <Link to="/add-employee">
                <Button type="primary" icon="plus">
                  Add Employee
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-3">
            <Table
              onRow={this.openEmployeeDetails}
              loading={isLoading}
              pagination={pagination}
              onChange={this.handleTableChange}
              columns={this.columns}
              dataSource={rows}
            />
          </div>
          <Route
            exact
            path="/employees/:employeeId"
            render={props => (
              <EmployeeModal title="Employee Details " {...props}>
                <EmployeeDetails />
              </EmployeeModal>
            )}
          />
          <Route
            exact
            path="/employees/edit/:employeeId"
            render={props => (
              <EmployeeModal title="Edit Employee Details " {...props}>
                <EmployeeEdit />
              </EmployeeModal>
            )}
          />
        </Section>
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
)(EmployeePage);
