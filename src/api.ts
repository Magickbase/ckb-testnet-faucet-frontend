import { HexNumber, HexString } from "@ckb-lumos/base";

export type ClaimEventAttributes = {
  addressHash: string;
  status: "processed" | "pending";
  txHash: HexString;
  id: number;
  timestamp: number;
  fee: HexNumber;
  capacity: HexNumber;
};

type ClaimEvents = {
  id: string;
  type: string;
  attributes: ClaimEventAttributes;
};

export interface OfficialAccount {
  addressHash: string;
  balance: string;
}
export interface UserAccount {
  addressHash: string;
  remaining: number | null;
}
export type MixedResponse = {
  claimEvents: { data: ClaimEvents[] };
  officialAccount: OfficialAccount;
  userAccount: UserAccount;
};
