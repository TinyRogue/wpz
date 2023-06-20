import * as yup from 'yup';

const phoneRegex = /^\+(?:[0-9]{1,2}){9,14}[0-9]$/;
const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const requiredArray = yup.array().required('required');

export const requiredString = yup.string().required('required');

export const email = yup.string().email('email').required('required');

export const phoneOrEmail = yup
  .string()
  .required('required')
  .test('phoneOrEmail', 'phoneOrEmail', function (value) {
    const isValidEmail = emailRegex.test(value);
    const isValidPhone = phoneRegex.test(value);
    if (!isValidEmail && !isValidPhone) {
      return false;
    }
    return true;
  });

export const password = yup
  .string()
  .required('required')
  .min(8, 'atLeast8Char')
  .matches(/((?=.*\d)|(?=.*\W+))(?![\n.])(?=.*[A-Z])(?=.*[a-z]).*$/);

export const phoneNumber = yup.string().matches(phoneRegex, 'phoneNumberIsNotValid');
