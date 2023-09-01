import { AppConfig } from "./config";

export const COMPOSITES: Readonly<GlobalCompositeOperation[]> = [
  "color",
  "color-burn",
  "color-dodge",
  "copy",
  "darken",
  "destination-atop",
  "destination-in",
  "destination-out",
  "destination-over",
  "difference",
  "exclusion",
  "hard-light",
  "hue",
  "lighten",
  "lighter",
  "luminosity",
  "multiply",
  "overlay",
  "saturation",
  "screen",
  "soft-light",
  "source-atop",
  "source-in",
  "source-out",
  "source-over",
  "xor",
];

export const DEFAULT_APP_CONFIG: AppConfig = {
  processing: {
    watermark: {
      font: "sans-serif",
      opacity: 0.1,
      color: "black",
      composite: "exclusion",
      text: "111",
    },
  },
  output: {
    type: "image/png",
    quality: 1,
  },
};
