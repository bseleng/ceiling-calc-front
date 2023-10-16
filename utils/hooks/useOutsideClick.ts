import { useEffect, useRef } from 'react';

const useOutsideTableCellClick = (callback: () => void) => {
  const ref = useRef<HTMLTableCellElement | null>(null);

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && event.target && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};

export default useOutsideTableCellClick;
