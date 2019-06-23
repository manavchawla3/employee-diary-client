import * as yup from 'yup';

export const employeeDetailsValidator = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  salary: yup.number().positive('Salary Must be more than 0')
});
