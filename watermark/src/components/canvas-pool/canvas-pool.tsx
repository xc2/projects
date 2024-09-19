import { CanvasHTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useCanvasPool(count: number = 2) {
  const [canvasElements, setCanvasElements] = useState<(HTMLCanvasElement | null)[]>([]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCurrent((current) => (current >= count ? 0 : current));
  }, [count]);

  const canvas = useMemo(() => {
    const canvas = canvasElements[current];
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    return canvas;
  }, [canvasElements, current]);

  const renderCanvasElements = (props?: CanvasHTMLAttributes<HTMLCanvasElement>) => {
    return Array.from({ length: count }, (_, i) => {
      const styles = { ...props?.style };
      if (i !== current) {
        styles.display = "none";
      }
      return (
        <canvas
          {...props}
          style={styles}
          key={i}
          ref={(node) => {
            if (!node) {
              return;
            }
            setCanvasElements((arr) => {
              if (arr[i] === node) {
                return arr;
              }
              const _arr = [...arr];
              _arr.length = count;
              return Array.from(_arr, (v, j) => (j === i ? node : v));
            });
          }}
        />
      );
    });
  };

  const newContext = useCallback(() => {
    setCurrent((old) => (old + 1) % count);
  }, [count]);

  return {
    renderCanvasElements,
    canvas,
    newContext,
  };
}
