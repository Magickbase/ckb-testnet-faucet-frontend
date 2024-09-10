import { FC } from "react";
import { ClaimEventAttributes } from "@/api";
import dayjs from "dayjs";
import { EllipsisText } from "@/components/EllipsisText";
import CopyButton from "@/components/CopyButton";
type ClaimEventItemProps = {
  event: ClaimEventAttributes;
};

export const ClaimEventItem: FC<ClaimEventItemProps> = ({ event }) => {
  const { addressHash, txHash, status, timestamp, capacity, fee } = event;

  return (
    <div className="flex flex-col rounded border w-full mb-4 overflow-y-hidden">
      <div className="flex justify-between px-8 py-4 text-sm bg-gray-50 border-b border-gray-200">
        <span className="flex items-center text-gray-800 font-mono font-medium w-[calc(100%-168px)]">
          {txHash ? <EllipsisText text={txHash} /> : "-"}
          {txHash ? <CopyButton content={txHash} className="ml-4" /> : null}
        </span>
        <div className="text-gray-400 whitespace-nowrap">
          {dayjs.unix(timestamp).format("YYYY/MM/DD HH:mm:ss")}
        </div>
      </div>
      <div className="flex flex-col justify-between text-sm bg-white px-8 py-5">
        <div className="flex justify-between w-full">
          <span className="flex items-center text-gray-800 font-mono text-sm font-medium w-[calc(100%-168px)]">
            <EllipsisText text={addressHash} />
            <CopyButton content={addressHash} className="ml-4" />
          </span>
          <div className="text-base" title="Claimed capacity">
            {capacity} CKB
          </div>
        </div>
        <div className="flex justify-between mt-3">
          <span
            className={`rounded p-1 text-xs font-medium capitalize ${
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
