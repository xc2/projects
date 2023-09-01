import {
  Field,
  Input,
  Option,
  Select,
  Slider,
} from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Upload } from "./components/upload";
import { useCanvasPool } from "./components/canvas-pool";
import { useImageElement } from "./lib/use-image-element";
import { fillText, getCanvasRect, getFontSize } from "./lib/canvas";
import {
  COMPOSITES,
  DEFAULT_COMPOSITE,
  DEFAULT_OPACITY,
} from "./lib/constants";

export function App() {
  const [currentFile, setCurrentFile] = useState<File>();
  const { canvas, renderCanvasElements } = useCanvasPool();

  const [composite, setComposite] =
    useState<GlobalCompositeOperation>(DEFAULT_COMPOSITE);
  const { data: img } = useImageElement(currentFile);
  const [opacity, setOpacity] = useState<number>(DEFAULT_OPACITY);
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
    const zoom = 1;
    const imageWidth = zoom * (img.naturalWidth || img.width);
    const imageHeight = zoom * (img.naturalHeight || img.height);
    const radians = (-30 * Math.PI) / 180;

    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext("2d", {})!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = composite;

    ctx.textBaseline = "top";
    ctx.fillStyle = `rgba(255,255,255,${opacity})`;

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
  }, [img, canvas, composite, opacity]);
  return (
    <div className="flex flex-col space-y-3">
      <h1 className="text-2xl pl-3 pr-3 pt-6">Make watermark</h1>

      <div className="flex pl-3 pr-3 items-start">
        <div className="basis-1/4 sticky top-0">
          <Field>
            {(props) => (
              <Upload {...props} onChange={(file) => setCurrentFile(file)} />
            )}
          </Field>

          <Field>
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
          </Field>
          <Field>
            <Slider
              value={opacity}
              min={0}
              max={1}
              step={0.05}
              onChange={(_, data) => setOpacity(data.value)}
            />
          </Field>

          <Field label="Composite">
            <Select
              value={composite}
              onChange={(_, { value }) =>
                setComposite(value as GlobalCompositeOperation)
              }
            >
              {COMPOSITES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
          </Field>
        </div>
        <div className="flex-auto min-w-0">
          {renderCanvasElements({ style: { display: "block" } })}
          {!resultImage || (
            <img alt="result" src={resultImage} style={{ maxWidth: "100%" }} />
          )}
        </div>
      </div>
    </div>
  );
}
