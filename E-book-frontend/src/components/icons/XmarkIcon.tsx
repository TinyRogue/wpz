interface XMarkIconProps {
  color?: string;
}

const XMarkIcon = ({ color }: XMarkIconProps) => {
  return (
    <div className="flex justify-center items-center">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 1L1 13M1 1L13 13"
          stroke={color || '#000000'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default XMarkIcon;
