import { formatEther } from "ethers";
import { useContractRead, useAccount } from "wagmi";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import carbonCreditAbi from "../../assets/abis/carbonCredit";
import { useState } from "react";
export function CctBalance() {
  const { address } = useAccount();
  const [cctBalance, setCctBalance] = useState("0");
  useContractRead({
    address: process.env.NEXT_PUBLIC_CCT_ADDRESS as `0x${string}`,
    abi: carbonCreditAbi.abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
    onSuccess(data: string) {
      if (data) {
        setCctBalance((+formatEther(data)).toFixed(2));
      } else {
        setCctBalance("0");
      }
    },
  });
  return (
    <>
      <Stat textAlign="right" marginBottom={10}>
        <StatLabel>Carbon Credits Balance:</StatLabel>
        <StatNumber>{cctBalance}</StatNumber>
      </Stat>
    </>
  );
}
