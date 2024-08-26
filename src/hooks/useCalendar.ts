import {useEffect, useRef, useState} from 'react';

import {useResponsive} from '@hooks/useResponsive.ts';

import {getMasterCol, getMastersCol} from '@utils/calendar/getMastersCol.ts';

export type HoveredBlockData = {
  style: {
    left: number;
    top: number;
    width: number;
    height: number;
    zIndex: number;
  };
  data: {
    id: string;
    time: string;
  };
};

export const useCalendar = (blockMoving: boolean) => {
  const currentTimeRef = useRef<string | null>(null);
  const currentMasterIdRef = useRef<string | null>(null);
  const [hoveredBlockData, setHoveredBlockData] =
    useState<null | HoveredBlockData>(null);

  const {isMobile} = useResponsive();

  useEffect(() => {
    const handleMouseMove = (event: globalThis.MouseEvent) => {
      const target = event.target as Element;

      const currentMasterCol = getMasterCol(event.clientX, getMastersCol());
      const currentTime = target?.getAttribute('data-time');

      if (
        (currentTime && currentTime !== currentTimeRef.current) ||
        (currentMasterCol && currentMasterCol.id !== currentMasterIdRef.current)
      ) {
        currentTimeRef.current = currentTime;
        currentMasterIdRef.current = currentMasterCol?.id || null;

        if (
          currentTimeRef.current &&
          currentMasterIdRef.current &&
          currentMasterCol
        ) {
          const data: HoveredBlockData = {
            style: {
              left: currentMasterCol.x - (isMobile ? 12 : 93),
              width: currentMasterCol.width,
              top: target.getBoundingClientRect().top - 120,
              height: target.getBoundingClientRect().height,
              zIndex: 0,
            },
            data: {
              id: currentMasterIdRef.current,
              time: currentTimeRef.current,
            },
          };

          setHoveredBlockData(data);
          return;
        }

        setHoveredBlockData(null);
      }
    };

    if (!blockMoving) {
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [blockMoving]);

  return {hoveredBlockData, setHoveredBlockData};
};
