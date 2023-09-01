import { useEffect, useMemo } from "react";
import useSWR from "swr";

export function useImageElement(file: Blob | null | undefined) {
  const src = useMemo(() => file && URL.createObjectURL(file), [file]);
  useEffect(() => {
    if (src) {
      return URL.revokeObjectURL.bind(URL, src);
    }
  }, [src]);
  return useSWR(
    src,
    async (src) => {
      if (!src) {
        return null;
      }
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = document.createElement("img");
        img.addEventListener("load", () => {
          resolve(img);
        });
        img.addEventListener("error", reject);
        img.src = src;
        document.body.appendChild(img);
      });
    },
    {
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: false,
    },
  );
}
