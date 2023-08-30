export function getFontSize(
  ctx: CanvasRenderingContext2D,
  font: string,
  text: string,
) {
  return 15;
}
export function getCanvasRect(width: number, height: number, angle: number) {
  type Point = [number, number];
  type Rect = [Point, Point, Point, Point];
  const [x0, y0]: Point = [0, 0];
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
  return {
    left,
    right,
    ascent,
    descent,
    rect,
    lt,
    rt,
    rb,
    lb,
  };
}

export function fillText(
  ctx: CanvasRenderingContext2D,
  text: string,
  gap?: [number, number],
) {
  const [H, V] = gap || [20, 20];
  const m = ctx.measureText(text);
  const height = m.actualBoundingBoxDescent - m.actualBoundingBoxAscent;

  for (let i = 0; i < 100; i++) {
    const x = 0 - m.actualBoundingBoxLeft + i * (m.width + H);
    if (x > ctx.canvas.width) {
      break;
    }
    for (let j = 0; j < 100; j++) {
      const y = 0 - m.actualBoundingBoxAscent + j * (height + V);
      if (y > ctx.canvas.height) {
        break;
      }

      ctx.fillText(text, x, y);
    }
  }
}
