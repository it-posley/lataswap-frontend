import { contractAddresses, abi } from "../../../../constants";
import * as React from "react";
import { useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { ethers, BigNumber } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export interface IWithdraw {
  inputAmount: number;
}

const WithdrawButton: React.FC<IWithdraw> = (props) => {
  //   const chainID = 31337;
  const debouncedInputAmount = props.inputAmount
    ? useDebounce(ethers.utils.parseUnits(`${props.inputAmount}`, 0), 500)
    : useDebounce(ethers.utils.parseUnits("0", 0), 500);
  const { config } = usePrepareContractWrite({
    //@todo hard coded USDC address on Mainnet, to be replaced depends on chains/input token
    address: contractAddresses[31337],
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountInLataToken",
            type: "uint256",
          },
        ],
        name: "userWithdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "userWithdraw",
    //@todo hard code pool address, to be replaced
    args: [debouncedInputAmount],
    enabled: Boolean(debouncedInputAmount),
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <button
      disabled={!write}
      onClick={() => write?.()}
      className="w-full rounded-xl bg-slate-100 p-3 text-xl font-extrabold text-slate-400 hover:bg-slate-200"
    >
      {isLoading ? "Approving" : "Approve"}
    </button>
  );
};

export default WithdrawButton;
