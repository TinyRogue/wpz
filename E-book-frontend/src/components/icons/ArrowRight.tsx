import { colors } from '../../styles/variables';

interface ArrowRightProps {
  color?: string;
  small?: boolean;
}

const ArrowRight = ({ color, small }: ArrowRightProps) => {
  return (
    <svg
      width={small ? '16' : '24'}
      height={small ? '16' : '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 12H20M20 12L14 6M20 12L14 18"
        stroke={color ?? colors.blue500}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ArrowRight;
