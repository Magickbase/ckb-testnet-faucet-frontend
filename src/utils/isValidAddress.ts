import { parseAddress } from "@ckb-lumos/helpers";
import { predefined } from "@ckb-lumos/config-manager";

export function isValidAddress(address?: string) {
  try {
    return !!address && !!parseAddress(address, { config: predefined.AGGRON4 });
  } catch (e) {
    return false;
  }
}
