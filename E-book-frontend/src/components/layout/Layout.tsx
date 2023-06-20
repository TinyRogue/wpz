import React from 'react';
import { useIsTablet } from '../../hooks/devices/useIsTablet';
import { Navbar } from '../navigation/Navbar';
import { NavbarMobile } from '../navigation/NavbarMobile';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = (props: LayoutProps) => {
  const { children } = props;
  const { isTablet } = useIsTablet();

  return (
    <main>
      {isTablet ? <NavbarMobile /> : <Navbar />}
      <div className="relative pt-20 lg:pt-0 lg:pl-[16rem]">{children}</div>
    </main>
  );
};

export default Layout;
