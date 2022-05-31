import { BigNumber as EthersBigNumber } from "@ethersproject/bignumber";

export function shortStr(str: string) {
  return str.slice(0, 8) + "..." + str.slice(-5);
}

export function calculateGasMargin(value: EthersBigNumber): EthersBigNumber {
  return value.mul(EthersBigNumber.from(10000).add(EthersBigNumber.from(1000))).div(EthersBigNumber.from(10000));
}
