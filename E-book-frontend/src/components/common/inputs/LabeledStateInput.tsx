import { ComponentState } from '../../../types/ComponentStates.types';
import { Input, InputProps } from './Input';
import { LabeledComponent, LabeledComponentProperties, LabeledComponentProps } from './LabeledComponent';

interface LabeledProps extends Omit<LabeledComponentProps, 'children'> {
  errorMessage?: string | undefined;
}

interface LabeledStateInputProps {
  id: string;
  state: ComponentState;

  labeledProps: LabeledProps;
  inputProps?: InputProps;
}

export const LabeledStateInput = ({ id, labeledProps, inputProps, state }: LabeledStateInputProps) => {
  const { errorMessage, stateProperties: labeledStateProperties } = labeledProps;

  const myStateProperties: LabeledComponentProperties = {
    error: {
      message: errorMessage,
      color: 'text-error',
    },
    default: {},
    ...labeledStateProperties,
  };

  const labeledComponentProps = {
    id,
    state,
    stateProperties: myStateProperties,
    ...labeledProps,
  };

  return (
    <LabeledComponent {...labeledComponentProps}>
      <Input {...inputProps} />
    </LabeledComponent>
  );
};
