import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Input, Alert, Button, Checkbox, DatePicker, Divider } from 'antd';
import { Formik } from 'formik';
import moment from 'moment';

import { skills } from 'constants/skills';
import Avatar from 'components/ui/Avatar';
import { updateEmployeeDetailsRequest, addEmployeeDetailsRequest } from 'actions/employeeDetailsActions';
import { employeeDetailsValidator } from 'validators/employeeValidators';
import { transformErrors } from 'utilities/helpers';

const dateFormat = 'YYYY-MM-DD';

class EmployeeDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: this.props.type === 'edit' && this.props.employee.skills.length ? this.props.employee.skills : [],
      successfullySubmitted: false,
      fileToUpload: null,
      dob: this.props.type === 'edit' && this.props.employee.dob ? moment(this.props.employee.dob, dateFormat) : null
    };
  }

  timeOutId = null;

  componentWillUnmount() {
    clearTimeout(this.timeOutId);
  }

  onSubmit = (values, formikProps) => {
    const { setStatus } = formikProps;
    const { type } = this.props;
    const { dob, checkedValues, fileToUpload } = this.state;
    setStatus({ errorMessage: null });

    let formdata = new FormData();
    formdata.append('first_name', values.first_name);
    formdata.append('last_name', values.last_name);
    formdata.append('salary', values.salary);
    formdata.append('skills', JSON.stringify(checkedValues));
    if (dob) {
      formdata.append('dob', dob.format(dateFormat));
    }
    if (fileToUpload) {
      formdata.append('profile_img', fileToUpload);
    }

    if (type === 'edit') {
      const { employee } = this.props;
      this.editEmployeeDetails(employee.id, formdata, formikProps);
    } else {
      this.addEmployeeDetails(formdata, formikProps);
    }
  };

  addEmployeeDetails = (data, formikProps) => {
    const { addEmployeeDetailsRequest } = this.props;
    addEmployeeDetailsRequest(
      data,
      response => {
        this.onSuccess(response);
      },
      error => {
        this.onFailure(error, formikProps);
      },
      () => {
        this.onFinal(formikProps);
      }
    );
  };

  editEmployeeDetails = (employeeId, data, formikProps) => {
    const { updateEmployeeDetailsRequest } = this.props;
    updateEmployeeDetailsRequest(
      employeeId,
      data,
      response => {
        this.onSuccess(response);
      },
      error => {
        this.onFailure(error, formikProps);
      },
      () => {
        this.onFinal(formikProps);
      }
    );
  };

  onSuccess = response => {
    this.setState(
      {
        successfullySubmitted: true
      },
      () => {
        this.timeOutId = setTimeout(() => {
          this.setState({
            successfullySubmitted: false
          });
        }, 5000);
      }
    );
  };

  onFailure = (error, { setErrors, setStatus }) => {
    setStatus({ errorMessage: error.message });
    setErrors(transformErrors(error));
  };

  onFinal = ({ setSubmitting }) => {
    setSubmitting(false);
  };

  onCheckBoxClicked = checkedValues => {
    this.setState({
      checkedValues: checkedValues
    });
  };

  onImageUploadSuccess = file => {
    this.setState({
      fileToUpload: file
    });
  };

  onDateChange = (value, dateString) => {
    this.setState({
      dob: value
    });
  };

  render() {
    const { type } = this.props;
    let employee = {};
    let skillOptions = skills;

    if (type === 'edit') {
      employee = this.props.employee;
    }

    return (
      <div style={{ maxWidth: '200' }}>
        <Avatar
          onImageUploadSuccess={this.onImageUploadSuccess}
          profile_img={employee.profile_img ? employee.profile_img : ''}
        />
        <Formik
          initialValues={{
            first_name: employee.first_name,
            last_name: employee.last_name ? employee.last_name : '',
            salary: employee.salary
          }}
          onSubmit={this.onSubmit}
          validationSchema={employeeDetailsValidator}
        >
          {props => {
            const { values, status, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;

            return (
              <form onSubmit={handleSubmit} className="w-100 px-md-0 ">
                {_.get(status, 'errorMessage') && (
                  <Alert message={_.get(status, 'errorMessage')} type="error" showIcon className="mb-3" />
                )}

                {this.state.successfullySubmitted && (
                  <Alert
                    message={
                      type === 'add' ? 'Employee Created Successfully!' : 'Employee Details Successfully Updated!'
                    }
                    type="success"
                    showIcon
                    className="mb-3"
                  />
                )}

                <div className="d-flex w-100">
                  <div className="mt-2 flex-glow-1 mr-2">
                    <label className="small">First Name</label>
                    <Input
                      name="first_name"
                      size="large"
                      placeholder=""
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-2"
                    />
                    <p className="text-danger mt-1 small">{touched.first_name && errors.first_name}</p>
                  </div>

                  <div className="mt-2 flex-glow-1 mr-2">
                    <label className="small">Last Name</label>
                    <Input
                      name="last_name"
                      size="large"
                      placeholder=""
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-2"
                    />
                    <p className="text-danger mt-1 small">{touched.last_name && errors.last_name}</p>
                  </div>

                  <div className="mt-2 flex-glow-1">
                    <label className="small">Salary</label>
                    <Input
                      name="salary"
                      type="number"
                      size="large"
                      placeholder=""
                      value={values.salary}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-2"
                    />
                    <p className="text-danger mt-1 small">{touched.salary && errors.salary}</p>
                  </div>
                </div>

                <div className="w-100">
                  <label className="small">Date Of Birth</label>
                  <div className="mt-2">
                    <DatePicker
                      disabledDate={current => {
                        // Can not select days after today and today
                        return current && current > moment().startOf('day');
                      }}
                      onChange={this.onDateChange}
                      defaultValue={this.state.dob}
                      format={dateFormat}
                    />
                  </div>
                </div>

                <div className="w-100 mt-4">
                  <label className="small">Select Skills</label>
                  <div className="mt-2">
                    <Checkbox.Group
                      options={skillOptions}
                      onChange={this.onCheckBoxClicked}
                      defaultValue={this.state.checkedValues}
                    />
                  </div>
                </div>
                <Divider />
                <div className="d-flex justify-content-end">
                  <Button
                    loading={isSubmitting}
                    type="primary"
                    size="large"
                    className="mt-3 o-button--success"
                    htmlType="submit"
                  >
                    {type === 'add' ? 'Submit' : 'Update'}
                  </Button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(
  mapStateToProps,
  { updateEmployeeDetailsRequest, addEmployeeDetailsRequest }
)(EmployeeDetails);
