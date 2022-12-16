import * as React from "react";
import { useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { ethers } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export interface IApprove {
  inputAmount: number;
}

const ApproveButton: React.FC<IApprove> = (props) => {
  const debouncedInputAmount = useDebounce(
    ethers.utils.parseUnits(`${props.inputAmount}`, 6),
    500
  );
  const { config } = usePrepareContractWrite({
    //@todo hard coded USDC address on Mainnet, to be replaced depends on chains/input token
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: [
      {
        constant: false,
        inputs: [
          {
            name: "_spender",
            type: "address",
          },
          {
            name: "_value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "approve",
    //@todo hard code pool address, to be replaced
    args: ["0x2d13826359803522cCe7a4Cfa2c1b582303DD0B4", debouncedInputAmount],
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

export default ApproveButton;
