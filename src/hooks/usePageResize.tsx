import { RefObject, useCallback, useEffect, useState } from 'react';

const usePageResize = (ref: RefObject<HTMLElement>) => {
  const [size, setSize] = useState(0);
  const resizeHandler = useCallback(() => {
    if (!ref.current) return;
    const w = ref.current.clientWidth;
    setSize(w);
  }, [ref]);

  useEffect(() => {
    resizeHandler();

    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);
  return { size };
};

export default usePageResize;
