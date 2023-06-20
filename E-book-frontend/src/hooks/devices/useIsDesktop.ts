import { useEffect, useState } from 'react';
import { breakpointsNum } from '../../styles/variables';

export const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth < breakpointsNum.desktop);
    };

    setIsDesktop(window.innerWidth < breakpointsNum.desktop);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isDesktop };
};
