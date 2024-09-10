import { FC } from "react";

export const Header: FC = () => {
  return (
    <header className="bg-black flex h-16 px-16 lg:px-30 py-4.5 w-full z-10 fixed top-0 left-0">
      <a
        rel="noreferrer noopener"
        href="https://pudge.explorer.nervos.org"
        target="_blank"
      >
        <img src="/ckb_logo.png" alt="logo" className="w-[104px] h-[28px]" />
      </a>
      <nav className="ml-auto">
        <a
          href="https://faucet.nervos.org//"
          title="preview chain"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300"
        >
          Testnet Faucet
        </a>
      </nav>
    </header>
  );
};
