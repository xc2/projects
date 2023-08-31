export type Point = [number, number];
export type Rect = [Point, Point, Point, Point];
export function getFontSize(
  ctx: CanvasRenderingContext2D,
  font: string,
  text: string,
  by: "width" | "height",
  px: number,
) {
  const measure = (() => {
    const cache = new Map<number, number>();
    return (size: number) => {
      if (cache.has(size)) {
        return cache.get(size);
      }
      ctx.font = `${size}px ${font}`;
      const m = ctx.measureText(text);

      let result: number;
      if (by === "width") result = m.width;
      else if (by === "height")
        result = Math.abs(
          m.actualBoundingBoxDescent - m.actualBoundingBoxAscent,
        );

      cache.set(size, result!);
      return result!;
    };
  })();
  let left = 10,
    right = 100;
  while (true) {
    const leftSize = measure(left)!;
    const rightSize = measure(right)!;

    if (leftSize >= rightSize) {
      return left;
    }

    if (px <= leftSize) {
      return left;
    } else if (px >= rightSize) {
      return right;
    }
    const mid = Math.round(0.5 * (left + right));
    if (mid === left) return mid;
    if (mid === right) return right;
    const midSize = measure(mid)!;
    if (px > midSize) {
      left = mid;
    } else {
      right = mid;
    }
  }
}

export function getCanvasRect(
  width: number,
  height: number,
  angle: number,
  x = 0,
  y = 0,
) {
  const [x0, y0]: Point = [x, y];
  const origin: Rect = [
    [x0, y0],
    [x0 + width, y0],
    [x0 + width, y0 + height],
    [x0, y0 + height],
  ];

  const rect = origin.map<Point>(([x, y]) => {
    return [
      x * Math.cos(angle) - y * Math.sin(angle),
      x * Math.sin(angle) + y * Math.cos(angle),
    ];
  }) as Rect;
  const [lt, rt, rb, lb] = rect;

  const left = Math.min(lt[0], lb[0]);
  const right = Math.max(rt[0], rb[0]);
  const ascent = Math.min(lt[1], rt[1]);
  const descent = Math.max(lb[1], rb[1]);
  const translate: Point = [0 - left, 0 - ascent];

  const translated = rect.map<Point>(([x, y]) => {
    return [x + translate[0], y + translate[1]];
  }) as Rect;
  return {
    left,
    right,
    ascent,
    descent,
    rect,
    translate,
    translated,
    lt,
    rt,
    rb,
    lb,
  };
}

export function fillText(
  ctx: CanvasRenderingContext2D,
  text: string,
  gap: [number, number],
  dx = 0,
  dy = 0,
  dw?: number,
  dh?: number,
) {
  dw = dw || ctx.canvas.width;
  dh = dh || ctx.canvas.height;

  const m = ctx.measureText(text);
  const textTop = Math.min(
    m.actualBoundingBoxDescent,
    m.actualBoundingBoxAscent,
  );
  const textBottom = Math.max(
    m.actualBoundingBoxDescent,
    m.actualBoundingBoxAscent,
  );

  const height = textBottom - textTop;

  const width = m.width;
  const xOffset = height;
  const yOffset = height;
  const [H, V] = gap.map((v) => v * height);

  for (let j = 0; j < 100; j++) {
    const y = dy - textTop + j * (height + V);
    if (y > dh) {
      break;
    }

    for (let i = 0; i < 100; i++) {
      const x = dx - m.actualBoundingBoxLeft + i * (width + H);
      if (x > dw) {
        break;
      }

      ctx.fillText(
        text,
        j % 2 ? x - xOffset : x + xOffset,
        i % 2 ? y - yOffset : y + yOffset,
      );
    }
  }
}
