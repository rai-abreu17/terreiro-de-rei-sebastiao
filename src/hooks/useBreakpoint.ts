import { useEffect, useState } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') {
    return 'desktop';
  }

  if (window.innerWidth <= 767) {
    return 'mobile';
  }

  if (window.innerWidth <= 1023) {
    return 'tablet';
  }

  return 'desktop';
};

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => getBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isTablet: breakpoint === 'tablet',
    isDesktop: breakpoint === 'desktop',
  };
}
