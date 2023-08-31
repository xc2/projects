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
  const [resultImage, setResultImage] = useState<string | null>(null);
  useEffect(() => {
    if (!resultImage) {
      return;
    }
    return URL.revokeObjectURL.bind(URL, resultImage);
  }, [resultImage]);

  useEffect(() => {
    if (!img || !canvas) {
      return;
    }
    const imageWidth = img.naturalWidth || img.width;
    const imageHeight = img.naturalHeight || img.height;
    const radians = (-30 * Math.PI) / 180;

    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    ctx.textBaseline = "top";
    ctx.fillStyle = "rgba(0, 0, 0, .2)";

    const font = "sans-serif";
    const fontSize = getFontSize(
      ctx,
      font,
      text,
      "height",
      (40 / 1000) * canvas.width,
    );
    ctx.font = `${fontSize}px ${font}`;
    const rotated = getCanvasRect(imageWidth, imageHeight, radians);
    ctx.save();
    ctx.translate(...rotated.translate);
    ctx.rotate(radians);
    fillText(
      ctx,
      text,
      [2, 3],
      rotated.translate[0] * -1,
      rotated.translate[1] * -1,
      rotated.right - rotated.left,
      rotated.descent - rotated.ascent,
    );
    ctx.restore();
    canvas.toBlob(
      (blob) => {
        const url = blob && URL.createObjectURL(blob);
        setResultImage(url);
      },
      "image/png",
      1,
    );
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
        {/*{textPool.renderCanvasElements({ style: { display: "none" } })}*/}
        {renderCanvasElements({ style: { display: "none" } })}
        {!resultImage || <img src={resultImage} style={{ width: "700px" }} />}
      </div>
    </div>
  );
}
