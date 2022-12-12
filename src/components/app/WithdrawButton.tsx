import * as React from "react";
import { useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { BigNumber } from "ethers";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";


const WithdrawButton = (props) => {
  const debouncedInputAmount = useDebounce(props.inputAmount, 500);
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
    args: [
      "0x124dDf9BdD2DdaD012ef1D5bBd77c00F05C610DA",
      BigNumber.from(debouncedInputAmount),
    ],
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
      {isLoading ? "Withdrawing" : "Withdraw"}
    </button>
  );
};

export default WithdrawButton;
