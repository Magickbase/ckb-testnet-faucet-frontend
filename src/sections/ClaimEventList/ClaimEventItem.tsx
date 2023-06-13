import { FC } from "react";
import { ClaimEventAttributes } from "@/api";
import dayjs from "dayjs";
import { EllipsisText } from "@/components/EllipsisText";
type ClaimEventItemProps = {
  event: ClaimEventAttributes;
};

const TESTNET_HOST = import.meta.env.VITE_TESTNET_HOST;

export const ClaimEventItem: FC<ClaimEventItemProps> = ({ event }) => {
  const { addressHash, txHash, status, timestamp, capacity, fee } = event;

  return (
    <div className="flex flex-col rounded border w-full mb-4">
      <div className="flex justify-between px-8 py-4 text-sm bg-gray-50 border-b border-r-gray-200">
        <a
          href={txHash ? `${TESTNET_HOST}/transaction/${txHash}` : "#"}
          className="text-purple font-medium w-[calc(100%-168px)]"
        >
          {txHash ? <EllipsisText text={txHash} /> : "-"}
        </a>
        <div className="text-gray-400 whitespace-nowrap">
          {dayjs.unix(timestamp).format("YYYY/MM/DD HH:mm:ss")}
        </div>
      </div>
      <div className="flex flex-col justify-between text-sm bg-white px-8 py-5">
        <div className="flex justify-between w-full">
          <a
            href={`${TESTNET_HOST}/address/${addressHash}`}
            className="text-purple text-sm font-medium w-[calc(100%-168px)]"
          >
            <EllipsisText text={addressHash} />
          </a>
          <div className="text-base" title="Claimed capacity">
            {capacity} CKB
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <span
            className={`rounded p-1 text-xs font-medium ${
              status === "pending"
                ? "bg-orange text-gray-800"
                : `bg-green text-white`
            }`}
          >
            {status}
          </span>

          <span className="text-sm text-gray-400" title="Transaction fee">
            {fee} CKB
          </span>
        </div>
      </div>
    </div>
  );
};
