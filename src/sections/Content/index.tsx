import { FC } from "react";
import { ClaimForm } from "./ClaimForm";
import { useOfficialAccountBalance } from "../../hooks/useDataAPI";
import numeral from "numeral";

export const Content: FC = () => {
  const { data: balance } = useOfficialAccountBalance();
  return (
    <section className="bg-[url('/background.jpg')] bg-[50%] bg-cover h-[582px] lg:h-[648px] flex flex-col items-center text-white px-4 w-full">
      <img
        className="w-[80px] h-[80px] lg:w-[120px] lg:h-[120px] mb-8 mt-[56px] lg:mt-[104px]"
        alt="Nervos"
        src="/ckb-n.png"
      />
      <h1 className="font-sans text-xl lg:text-4xl font-medium mb-3 lg:mb-4">
        Nervos Pudge Faucet
      </h1>
      <p className="font-sans text-center leading-6 lg:leading-4 text-[#cccccc] font-normal text-sm mb-6 lg:mb-11">
        Every address can claim a fixed amount of 300,000 CKB in a month. The
        claimable amount will monthly update on the first day when you claim on
        this site.
      </p>
      <ClaimForm />
      <div
        className={
          "mt-4 lg:mt-6 text-sm text-gray-200 font-normal" +
          (parseInt(balance) !== 0 ? "visible" : "invisible")
        }
      >
        Faucet address balance is {numeral(balance).format("100,000.00")} CKB.
      </div>
    </section>
  );
};
