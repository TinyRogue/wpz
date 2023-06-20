import { useEffect, useState } from 'react';
import { breakpointsNum } from '../../styles/variables';

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < breakpointsNum.tablet);
    };

    setIsTablet(window.innerWidth < breakpointsNum.tablet);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isTablet };
};
