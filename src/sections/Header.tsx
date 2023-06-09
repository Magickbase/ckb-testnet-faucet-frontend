import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="bg-black flex h-16 px-16 lg:px-30 py-4.5 w-full">
      <img src="/ckb_logo.png" alt="logo" className="w-[104px] h-[28px]" />
    </header>
  );
};
