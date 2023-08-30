import { Field, Input } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Upload } from "./components/upload";
import { useCanvasPool } from "./components/canvas-pool";
import { useImageElement } from "./lib/use-image-element";
import { fillText, getCanvasRect, getFontSize } from "./lib/canvas";

export function App() {
  const [currentFile, setCurrentFile] = useState<File>();
  const { canvas, renderCanvasElements } = useCanvasPool();
  const { data: img } = useImageElement(currentFile);
  const [text, setText] = useState("仅限 XXX 做啥使用，它用无效");

  useEffect(() => {
    if (!img || !canvas) {
      return;
    }
    const imageWidth = img.naturalWidth || img.width;
    const imageHeight = img.naturalHeight || img.height;
    const angle = (30 * Math.PI) / 180;
    const rotated = getCanvasRect(imageWidth, imageHeight, angle);

    console.log(1, rotated);
    canvas.width = rotated.right - rotated.left;
    canvas.height = rotated.descent - rotated.ascent;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }
    ctx.save();

    console.log(999, 0 - rotated.left, 0 - rotated.ascent);

    ctx.translate(0 - rotated.left, 0 - rotated.ascent);
    ctx.rotate(angle);
    ctx.drawImage(img, 0, 0);
    ctx.restore();

    const font = "sans-serif";

    ctx.textBaseline = "top";
    ctx.font = `${getFontSize(ctx, font, text)}px ${font}`;
    ctx.fillStyle = "rgba(0,0,0,1)";

    fillText(ctx, text);
  }, [img, canvas]);
  return (
    <div className="flex-row space-y-3">
      <h1 className="text-2xl pl-3 pr-3 pt-6">Make watermark</h1>

      <div className="pl-3 pr-3 ">
        <Field>
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
        </Field>
      </div>
      <div className="pl-3 pr-3 ">
        <Field>
          {(props) => (
            <Upload {...props} onChange={(file) => setCurrentFile(file)} />
          )}
        </Field>
        {renderCanvasElements()}
      </div>
    </div>
  );
}
