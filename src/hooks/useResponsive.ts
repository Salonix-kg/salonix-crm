import {useMediaQuery} from 'react-responsive';

export const desktopMediaQuery = {minWidth: 992};

export const tabletMediaQuery = {minWidth: 768, maxWidth: 991};

export const mobileMediaQuery = {maxWidth: 767};

export const useResponsive = () => {
  const isMobile = useMediaQuery(mobileMediaQuery);
  const isTablet = useMediaQuery(tabletMediaQuery);
  const isDesktop = useMediaQuery(desktopMediaQuery);

  return {isMobile, isTablet, isDesktop};
};
