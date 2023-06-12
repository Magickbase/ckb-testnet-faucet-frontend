import { Root, Title } from "@radix-ui/react-toast";
import { useImperativeHandle, forwardRef, useEffect } from "react";
import { useToggle } from "react-use";

export type BannerMessageProps = {
  children: React.ReactNode;
  type: "success" | "error";
  timeout?: number;
};

export type BannerHandles = {
  open: () => void;
  close: () => void;
};

export const BannerMessage = forwardRef<BannerHandles, BannerMessageProps>(
  ({ children, type, timeout = 3000 }, ref) => {
    const [open, toggleOpen] = useToggle(false);

    useImperativeHandle(ref, () => ({
      open: () => toggleOpen(true),
      close: () => toggleOpen(false),
    }));

    useEffect(() => {
      if (open) {
        setTimeout(() => toggleOpen(false), timeout);
      }
    }, [timeout, open, toggleOpen]);

    const bgType = {
      success: "bg-success",
      error: "bg-error",
    }[type];

    return (
      <Root
        className={`w-full lg:h-[72px] h-11 flex items-center justify-center ${bgType} text-white`}
        open={open}
      >
        <Title className="text:sm lg:text-xl">{children}</Title>
      </Root>
    );
  }
);
