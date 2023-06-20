import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { register as registerFirebase } from '../../../../api/auth/register';
import { LinkButon } from '../../../../components/common/buttons/LinkButton';
import { PrimaryButton } from '../../../../components/common/buttons/PrimaryButton';
import { LabeledStateInput } from '../../../../components/common/inputs/LabeledStateInput';
import ArrowRight from '../../../../components/icons/ArrowRight';
import { Logo } from '../../../../components/navigation/components/Logo';
import { routes } from '../../../../static/routes';
import { loginValidationSchema } from '../../../../static/validationSchema/loginValidationSchema';
import { colors } from '../../../../styles/variables';
import { ButtonSize } from '../../../../types/ButtonSizes';
import { ComponentState, ComponentStates } from '../../../../types/ComponentStates.types';

interface IFormInput {
  email: string;
  password: string;
}

type InputsKeys = keyof IFormInput;

const RegisterForm: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: 'onSubmit',
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const getInputState = (fieldName: InputsKeys): ComponentState => {
    if (errors[fieldName] !== undefined) {
      return ComponentStates.ERROR;
    }

    return ComponentStates.DEFAULT;
  };

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      await registerFirebase({ email, password });
    } catch (error) {
      console.log(error);
    }

    reset();
    navigate(routes.login);
  };

  return (
    <div className="px-8 py-16 lg:py-8 lg:max-w-[400px] w-full mx-auto">
      <Logo />
      <h1 className="mt-12 text-black700">{t('register.title')}</h1>

      <p className="mt-4 font-medium leading-snug text-black500">{t('register.description')}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <LabeledStateInput
          id="register-email"
          state={getInputState('email')}
          labeledProps={{
            wrapperClassName: 'mb-5',
            label: t('register.userLabel'),
            errorMessage: t(`errorMessages.${errors.email?.message}`),
          }}
          inputProps={{
            register: {
              ...register('email'),
            },
          }}
        />

        <LabeledStateInput
          id="register-password"
          state={getInputState('password')}
          labeledProps={{
            wrapperClassName: 'mb-8',
            label: t('register.passwordLabel'),
            errorMessage: t(`errorMessages.${errors.password?.message}`),
          }}
          inputProps={{
            type: 'password',
            register: {
              ...register('password'),
            },
          }}
        />

        <PrimaryButton type="submit">{t('register.registerButton')}</PrimaryButton>
      </form>

      <Link to={routes.login}>
        <LinkButon
          className="mb-16 mt-11 lg:mb-0"
          size={ButtonSize.Small}
          suffixIcon={<ArrowRight color={colors.black700} small />}
        >
          {t('register.login')}
        </LinkButon>
      </Link>
    </div>
  );
};

export default RegisterForm;
