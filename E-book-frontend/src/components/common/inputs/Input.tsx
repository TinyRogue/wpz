import { UseFormRegisterReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  testId?: string;
}

export const Input = ({ id, className, register, testId, ...props }: InputProps) => {
  return (
    <input
      id={id}
      className={twMerge(
        `outline outline-1.5 outline-grey500 rounded-md px-4 py-[1.1875rem] text-sm text-black500 font-medium w-full placeholder:text-grey500 focus:outline-2 focus:outline-blue500`,
        className,
      )}
      data-testid={testId}
      {...props}
      {...register}
    />
  );
};
