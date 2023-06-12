import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="bg-black flex h-16 px-16 lg:px-30 py-4.5 w-full z-10 fixed top-0 left-0">
      <img src="/ckb_logo.png" alt="logo" className="w-[104px] h-[28px]" />
    </header>
  );
};
