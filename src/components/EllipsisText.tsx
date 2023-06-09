import { FC } from "react";

export const EllipsisText: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const splitPosition = Math.ceil(text.length / 2) + 20;

  return (
    <span title={text} className={`${className || ""} flex w-full`}>
      <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis">
        {text.slice(0, splitPosition)}
      </span>
      <span className="inline-block">{text.slice(splitPosition)}</span>
    </span>
  );
};
