import { ClaimEventItem } from "./ClaimEventItem";
import { useState, FC } from "react";
import CloseIcon from "../../assets/close.svg";
import { useClaimEvents } from "../../hooks/useDataAPI";

export const ClaimEventList: FC = () => {
  const [queryAddress, setQueryAddress] = useState("");
  const { data: claimEvents } = useClaimEvents(queryAddress);

  return (
    <div className="w-full max-w-[880px]  box-content px-4">
      <div className="flex justify-between w-full items-center py-8">
        <h2 className=" text-3xl">Claims</h2>
        <div className="relative">
          <input
            placeholder="Search Address"
            className="border rounded border-gray-200 placeholder:text-gray-400 text-sm px-2 py-3 pr-8 h-10 w-[196px]"
            value={queryAddress}
            onChange={(e) => setQueryAddress(e.target.value)}
          />
          {!!queryAddress && (
            <CloseIcon
              className="absolute right-3 top-1/2 translate-y-[-50%] cursor-pointer"
              onClick={() => setQueryAddress("")}
            />
          )}
        </div>
      </div>
      {claimEvents.map((event) => (
        <ClaimEventItem key={event.id} event={event} />
      ))}
    </div>
  );
};
