import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, Tag, Icon, Typography } from 'antd';
import { fetchEmployeeDetailsRequest } from 'actions/employeeDetailsActions';
import { getEmployeeDetails, getEmployeeDetailsIsLoading } from 'selectors/employeeDetailsSelectors';
import moment from 'moment';
import Loader from 'components/ui/Loader';

const { Meta } = Card;
const { Text } = Typography;

class EmployeeDetails extends React.Component {
  componentDidMount() {
    const { employeeId, fetchEmployeeDetailsRequest } = this.props;
    fetchEmployeeDetailsRequest(employeeId);
  }

  description = employee => (
    <div className="d-flex">
      {employee.dob && (
        <div className="mr-4">
          <Icon type="calendar" />
          <label className="ml-1">{moment(employee.dob).format('DD-MMM-YYYY')}</label>
        </div>
      )}
      {employee.salary && (
        <div className="mr-4">
          <Icon type="dollar" />
          <label className="ml-1">{employee.salary}</label>
        </div>
      )}
    </div>
  );

  cover = employee => <>{employee.profile_img && <img alt="avatar" src={`${employee.profile_img}`} />}</>;

  generateSkills = skills =>
    skills.map(skill => {
      let color = ['geekblue', 'green', 'volcano'];
      return (
        <Tag className="mb-1" color={color[Math.floor(Math.random() * Math.floor(3))]} key={skill}>
          {skill.toUpperCase()}
        </Tag>
      );
    });

  render() {
    const { isLoading, employee } = this.props;

    return (
      <>
        {(isLoading || !employee) && <Loader />}
        {!isLoading && employee && (
          <>
            {' '}
            <Card
              cover={this.cover(employee)}
              actions={[
                <Link to="/add-employee">
                  <Icon className="mr-2" type="plus" />
                  Add New
                </Link>,
                <Link to={`/employees/edit/${employee.id}`}>
                  <Icon className="mr-2" type="edit" />
                  Open Edit
                </Link>
              ]}
            >
              <Meta title={`${employee.first_name} ${employee.last_name}`} description={this.description(employee)}>
                <div />
              </Meta>
              {employee.skills && employee.skills.length > 0 && (
                <div className="mt-4" style={{ display: 'block' }}>
                  <Text strong>Skills</Text>
                  <div className="mt-2"> {this.generateSkills(employee.skills)}</div>
                </div>
              )}
            </Card>
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
