import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "@/lib/client";
// Contract Addresses on Sepolia
export const CONTRACT_ADDRESSES = {
  SIMPLE_USD: "0x57C33213aE6FE2fC0b9c5d74c475F1d496A66836",
} as const;

// Contract instances
export const simpleUSDContract = getContract({
  client,
  chain: sepolia,
  address: CONTRACT_ADDRESSES.SIMPLE_USD,
});
