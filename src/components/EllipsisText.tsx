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

    //   div.className = `flex w-full fixed invisible ${className || ""}`;
    //   const center = Math.floor(text.length / 2);
    //   document.body.appendChild(div);
    //   div.innerText = text;
    //   if (div.clientWidth <= containerWidth) {
    //     setClippedText(text);
    //     document.body.removeChild(div);
    //     return;
    //   }
    //   div.innerText = text;
    //   let left = 0,
    //     right = text.length - 1;
    //   while (div.clientWidth < containerWidth && left < right) {
    //     const removedLength = Math.floor((left + right) / 2);
    //     const halfPartLength = Math.floor(removedLength / 2);
    //     div.innerText = `${text.slice(0, center - halfPartLength)}...${text.slice(
    //       center + halfPartLength
    //     )}`;
    //     if (div.clientWidth <= containerWidth) {
    //       right = removedLength;
    //     } else {
    //       left = removedLength + 1;
    //     }
    //   }
    //   document.body.removeChild(div);
    //   setClippedText(div.innerText);
    container?.removeChild(span);
  }, [text, className, containerWidth, id]);

  console.log(containerWidth);

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
