import { twMerge } from 'tailwind-merge';
import { ComponentState, ComponentStates } from '../../../types/ComponentStates.types';

export type LabeledComponentStateProperties = {
  color?: string;
  message?: string;
};

export type LabeledComponentProperties = Record<ComponentState, LabeledComponentStateProperties>;

export interface LabeledComponentProps {
  id?: string;
  children: React.ReactNode;
  label: string;
  wrapperClassName?: string;
  state?: ComponentState;
  stateProperties?: LabeledComponentProperties;
}

const defaultStateProperties = {
  success: {},
  error: {},
  default: {},
};

export const LabeledComponent = ({
  id,
  children,
  label,
  state = ComponentStates.DEFAULT,
  stateProperties = defaultStateProperties,
  wrapperClassName = '',
}: LabeledComponentProps) => {
  return (
    <div className={`relative mt-2 ${wrapperClassName}`}>
      <label
        htmlFor={id}
        className="text-xs text-black900 leading-4 bg-white700 px-1 absolute bottom-[calc(100%-.5rem)] left-3 rounded-md"
      >
        {label}
      </label>
      <div>{children}</div>
      <p className={twMerge(`pt-2 text-xs`, stateProperties[state].color)}>{stateProperties[state].message}</p>
    </div>
  );
};
