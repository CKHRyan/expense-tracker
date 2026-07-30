import { useState, useLayoutEffect, useRef } from "react";

export const useComponentSize = (dependency: any[] = []) => {
  const ref = useRef<any>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    // Use ResizeObserver to track layout changes smoothly
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // getBoundingClientRect ensures fractional precision if needed
        const rect = entry.target.getBoundingClientRect();
        setHeight(rect.height);
        setWidth(rect.width);
      }
    });

    observer.observe(ref.current);

    // Clean up observer on unmount
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency]);

  return { ref, height, width };
};
