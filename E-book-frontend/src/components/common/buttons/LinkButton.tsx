import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonSize } from '../../../types/ButtonSizes';
import { OnClickDefault } from '../../../types/Types';

interface LinkButonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: OnClickDefault;
  size?: ButtonSize;
  suffixIcon?: React.ReactNode;
}

export const LinkButon = ({
  children,
  onClick,
  type,
  disabled,
  className,
  suffixIcon,
  size = ButtonSize.Large,
}: LinkButonProps) => {
  const getTextStyles = () => {
    switch (size) {
      case ButtonSize.Small:
        return 'text-[.8125rem] font-normal';
      case ButtonSize.Medium:
        return 'text-sm font-normal ';
      default:
        return 'text-base font-bold';
    }
  };

  return (
    <button
      type={type ?? 'button'}
      className={twMerge(
        `flex items-center justify-center gap-2 text-black700 leading-5 ${getTextStyles()} w-full hover:underline hover:decoration-blue500 hover:decoration-[3px]`,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {suffixIcon && suffixIcon}
    </button>
  );
};
