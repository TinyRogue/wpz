import { colors } from '../../styles/variables';

interface ArrowLeftProps {
  color?: string;
  small?: boolean;
}

const ArrowLeft = ({ color, small }: ArrowLeftProps) => {
  return (
    <svg
      width={small ? '16' : '24'}
      height={small ? '16' : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 12L4 12M4 12L10 18M4 12L10 6"
        stroke={color ?? colors.blue500}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowLeft;
