import { Field } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { Upload } from "./components/upload";
import { useCanvasPool } from "./components/canvas-pool";
import { useImageElement } from "./lib/use-image-element";

export function App() {
  const [currentFile, setCurrentFile] = useState<File>();
  const { canvas, renderCanvasElements } = useCanvasPool();
  const { data: img } = useImageElement(currentFile);

  useEffect(() => {
    if (!img || !canvas) {
      return;
    }
    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }
    ctx.drawImage(img, 0, 0);
    ctx.save();

    ctx.font = "15px serif";
    ctx.fillStyle = "rgba(255,255,255,0.5)";

    const m = ctx.measureText("WATERMARK");
    console.log(m);
    ctx.fillText("WATERMARK", 10, 10);
  }, [img, canvas]);
  return (
    <div className="flex-row space-y-3">
      <h1 className="text-2xl pl-3 pr-3 pt-6">Make watermark</h1>
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
