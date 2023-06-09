import { FC, useEffect, useState, useId } from "react";
import { useMeasure } from "react-use";

export const EllipsisText: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [clippedText, setClippedText] = useState("");
  const id = useId();
  const [containerRef, { width: containerWidth }] =
    useMeasure<HTMLSpanElement>();

  useEffect(() => {
    if (containerWidth === 0) return;
    const container = document.getElementById(id);
    if (!container) return;

    const span = document.createElement("span");
    span.innerText = text;
    span.className = "invisible absolute";
    container?.appendChild(span);
    if (containerWidth >= span.offsetWidth) {
      setClippedText(text);
    } else {
      let left = 0,
        right = text.length - 1;

      let clippedText = "";
      const center = Math.floor(text.length / 2);
      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const half = Math.floor(mid / 2);
        clippedText = `${text.slice(0, center - half)}...${text.slice(
          center + half
        )}`;
        span.innerText = clippedText;
        if (span.offsetWidth <= containerWidth) {
          right = mid;
        } else {
          left = mid + 1;
        }
      }

      setClippedText(clippedText);
    }

    container?.removeChild(span);
  }, [text, className, containerWidth, id]);

  return (
    <span
      id={id}
      ref={containerRef}
      title={text}
      className={`${className || ""} flex w-full relative`}
    >
      {clippedText}
    </span>
  );
};
