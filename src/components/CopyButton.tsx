import { useState, type FC } from "react";
import { CopyIcon, CheckIcon } from "@radix-ui/react-icons";

const CopyButton: FC<{ content: string; className?: string }> = ({
  content,
  className,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };
  if (isCopied) {
    return (
      <button className={className} disabled>
        <CheckIcon className="text-success" />
      </button>
    );
  }
  return (
    <button data-text={content} className={className} onClick={handleCopy}>
      <CopyIcon />
    </button>
  );
};

export default CopyButton;
