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

const ApproveLataButton: React.FC<IApprove> = (props) => {
  const { config } = usePrepareContractWrite({
    //@todo hard coded USDC address on Mainnet, to be replaced depends on chains/input token
    address: "0x71AcaAF23e047029e9Da1BCBc247cA26F9512EF6",
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
      "0x89987589f99C4b1c05061C1484D21699949f034A",
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

export default ApproveLataButton;
