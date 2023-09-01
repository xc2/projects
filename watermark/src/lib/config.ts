export interface WatermarkConfig {
  text: string;
  opacity: number;
  composite: GlobalCompositeOperation;
  font: "sans-serif" | "serif" | "monospace";
  color: string;
}

export interface AppConfig {
  processing: {
    watermark: WatermarkConfig;
  };
  output: {
    type: "image/png" | "image/jpeg" | "image/webp";
    quality: number;
  };
}
