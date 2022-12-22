import { contractAddresses, abi } from "../../../constants";
import * as React from "react";
import { useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { ethers, BigNumber } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

export interface IApprove {
  debouncedInputAmount: BigNumber;
}

const ApproveButton: React.FC<IApprove> = (props) => {
  const chainID = 31337;
  const { config } = usePrepareContractWrite({
    //@todo hard coded USDC address on Mainnet, to be replaced depends on chains/input token
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
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
    args: [
      "0xA777139C4AF8b4182bf04b9366699fC513594acA",
      props.debouncedInputAmount,
    ],
    enabled: Boolean(props.debouncedInputAmount),
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
