import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

interface NavButtonProps {
  href: string;
  text: string;
  icon: React.ReactNode;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const NavButton = ({ href, text, icon, buttonProps }: NavButtonProps) => {
  return (
    <Link to={href}>
      <button
        {...buttonProps}
        className={twMerge(
          `relative w-full cursor-pointer flex items-center p-5 rounded-md hover:bg-blue500 [&>.decoration]:hover:block [&_p]:hover:text-white900`,
        )}
      >
        <div className="decoration absolute left-1 h-[calc(100%-2px)] my-auto w-1 bg-navy200 rounded hidden" />
        <div className="flex items-center justify-start gap-6">
          {icon}
          <p className={`text-lg text-start font-bold text-grey700`}>{text}</p>
        </div>
      </button>
    </Link>
  );
};

export default NavButton;
