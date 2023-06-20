import { useEffect, useState } from 'react';
import { breakpointsNum } from '../../styles/variables';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpointsNum.mobile);
    };

    setIsMobile(window.innerWidth < breakpointsNum.mobile);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobile };
};
