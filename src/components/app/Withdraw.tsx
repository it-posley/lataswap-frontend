import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers, BigNumber } from "ethers";
import useDebounce from "src/hooks/useDebounce";
import ReadBalance from "./data/ReadBalance";
import ReadUSDCOutput from "./data/ReadUSDCOutput";
import ReadTokenBalance from "./data/ReadTokenBalance";
import useIsMounted from "../useIsMounted";
import ApproveLataButton from "./ApproveLataButton";

export interface IWithdraw {
  className?: string;
}

const Withdraw: React.FC<IWithdraw> = ({ className }) => {
  const [inputAmount, setInputAmount] = useState(0);
  const mounted = useIsMounted();

  const debouncedInputAmount =
    inputAmount && inputAmount != 0
      ? useDebounce(ethers.utils.parseUnits(`${inputAmount}`, 18), 500)
      : useDebounce(BigNumber.from(0));

  //mint function
  
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xA777139C4AF8b4182bf04b9366699fC513594acA",
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
    args: [debouncedInputAmount!],
    enabled: Boolean(debouncedInputAmount),
  });

  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div className="mt-5">
      <div className="min-w-lg relative flex max-w-lg flex-col gap-3 rounded-lg border border-slate-300 bg-white px-3 py-4 shadow">
        {/* Withdraw window header */}
        <div>
          <p className="font-extrabold text-slate-600">Withdraw</p>
        </div>

        {/* two coins */}
        <div className="relative">
          <div className="mb-1 flex w-full rounded-xl border border-slate-100 bg-slate-100 px-3 py-5 text-slate-700 hover:border hover:border-slate-200">
            <div className="flex-1">
              <input
                type="number"
                className="block w-full border-none bg-slate-100 text-2xl font-bold outline-0"
                placeholder="0"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setInputAmount(parseFloat(e.target.value))
                }
                value={inputAmount}
              ></input>
            </div>
            <div className="flex-0 flex flex-col gap-2">
              <div>
                <button className="rounded-xl bg-slate-300 px-3 font-bold text-slate-700 hover:bg-slate-400">
                  LATA
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400">
                  <ReadTokenBalance />
                </p>
              </div>
            </div>
          </div>
          {/* in */}
          <div className="mb-1 flex w-full rounded-xl border border-slate-100 bg-slate-100 px-3 py-5 text-slate-700 hover:border hover:border-slate-200">
            <div className="flex-1">
              <div className="block w-full border-none bg-slate-100 text-2xl font-bold outline-0">
                <ReadUSDCOutput inputAmount={debouncedInputAmount} />
              </div>
            </div>

            <div className="flex-0 flex flex-col gap-2">
              <div>
                <button className="rounded-xl bg-slate-300 px-3 font-bold text-slate-700 hover:bg-slate-400">
                  USDC
                </button>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-400">
                  <ReadBalance />
                </div>
              </div>
            </div>
          </div>
          {/* out */}
        </div>
        {/* submit button */}
        <div className="flex justify-center">
          <ApproveLataButton debouncedInputAmount={debouncedInputAmount} />
          <button
            onClick={(e) => {
              e.preventDefault();
              write?.();
            }}
            disabled={!write || isLoading}
            className="w-full rounded-xl bg-slate-100 p-3 text-xl font-extrabold text-slate-400 hover:bg-slate-200"
          >
            {isLoading ? "Withdrawing" : "Withdraw"}
          </button>
          {/* {isPrepareError && <div>Prepare Error : {prepareError?.message}</div>}
          {isError && <div>Error : {error?.message}</div>} */}
        </div>
      </div>
    </div>
  );
};

Withdraw.displayName = "Withdraw";
export default Withdraw;
