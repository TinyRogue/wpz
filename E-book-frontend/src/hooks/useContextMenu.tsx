import { useState, useEffect, useRef } from 'react';

export const useContextMenu = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const ref: any = useRef(null);

  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (event: any) => {
      setCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  const setVisibility = (isVisible: boolean) => {
    setPosition({ x: coords.x, y: coords.y });
    setIsVisible(isVisible);
  };

  return { ref, position, isVisible, setVisibility };
};
