import * as yup from 'yup';
import * as Schema from './validationFields';

export const loginValidationSchema = yup.object({
  email: Schema.email,
  password: Schema.requiredString,
});
