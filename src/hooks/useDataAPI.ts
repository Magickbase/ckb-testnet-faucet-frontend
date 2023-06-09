import useSWR from "swr";
import axios from "axios";
import { MixedResponse } from "../api";
import { isValidAddress } from "../utils/isValidAddress";

type ClaimEventResponse = MixedResponse["claimEvents"];

export function useClaimEvents(specificAddress?: string) {
  const { data, ...rest } = useSWR(
    `/claim_events/${specificAddress || ""}`,
    (url) => axios.get<ClaimEventResponse | MixedResponse>(url),
    {
      refreshInterval: 1000,
    }
  );

  let events: ClaimEventResponse["data"] = [];

  if ((data?.data as MixedResponse)?.claimEvents) {
    events = (data?.data as MixedResponse).claimEvents.data;
  } else if (Array.isArray((data?.data as any)?.data)) {
    events = (data?.data as ClaimEventResponse).data;
  }

  return {
    data: events?.map((c) => c.attributes),
    ...rest,
  };
}

export function useOfficialAccountBalance() {
  const { data, ...rest } = useSWR(
    "/claim_events",
    (url) => axios.get<MixedResponse>(url),
    {
      refreshInterval: 1000,
    }
  );
  return {
    data: data?.data.officialAccount.balance || "0",
    ...rest,
  };
}

export function useUserAddressRemaining(address?: string) {
  const isValid = !!address && isValidAddress(address);
  const { data, ...rest } = useSWR(
    isValid ? ["/claim_events", address] : null,
    ([url, address]: [string, string | undefined]) =>
      axios.get<MixedResponse>(url, { params: { address_hash: address } })
  );
  return {
    data: data?.data.userAccount.remaining,
    ...rest,
  };
}
