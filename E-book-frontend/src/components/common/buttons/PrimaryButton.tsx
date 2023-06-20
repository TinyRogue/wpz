import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonSize } from '../../../types/ButtonSizes';
import { OnClickDefault } from '../../../types/Types';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: OnClickDefault;
  size?: ButtonSize;
  prefixIcon?: React.ReactNode;
}

export const PrimaryButton = ({
  children,
  onClick,
  type,
  disabled,
  className,
  prefixIcon,
  size = ButtonSize.Large,
}: PrimaryButtonProps) => {
  const getTextStyles = () => {
    switch (size) {
      case ButtonSize.Small:
        return 'text-[.8125rem] font-normal leading-4';
      case ButtonSize.Medium:
        return 'text-sm font-normal leading-[1.0625rem]';
      default:
        return 'text-base font-normal lg:font-semibold leading-[1.125rem]';
    }
  };

  return (
    <button
      type={type ?? 'button'}
      className={twMerge(
        `flex items-center justify-center gap-2 px-3 py-4 rounded-lg text-white900 bg-blue500 ${getTextStyles()} hover:bg-blue700 disabled:bg-black300 active:shadow-activeButton visited:shadow-activeButton w-full`,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {prefixIcon && prefixIcon}
      {children}
    </button>
  );
};
