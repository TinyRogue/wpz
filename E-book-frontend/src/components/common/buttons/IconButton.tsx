import { twMerge } from 'tailwind-merge';
import { OnClickDefault } from '../../../types/Types';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: OnClickDefault;
  icon: React.ReactNode;
  className?: string;
}

const IconButton = ({ onClick, type, icon, className }: IconButtonProps) => {
  return (
    <button
      type={type ?? 'button'}
      onClick={onClick}
      className={twMerge(
        `flex items-center justify-center w-12 min-w-12 h-12 bg-white900 bg-opacity-50 rounded-full`,
        className,
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
