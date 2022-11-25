import { useState } from "react";
import { ChevronDoubleDownIcon } from "@heroicons/react/20/solid";

export interface ISwap {
  className?: string;
}

const Swap: React.FC<ISwap> = ({ className }) => {
  const [buttonStatus, setButtonStatus] = useState("Connect");

  return (
    <div className="mt-5">
      <div className="min-w-md relative flex max-w-lg flex-col gap-3 rounded-lg border border-slate-300 bg-white px-3 py-4 shadow">
        {/* swap window header */}
        <div>
          <p className="font-extrabold text-slate-600">Swap</p>
        </div>

        {/* two coins */}
        <div className="relative">
          {/* in */}
          <div className="mb-1 flex w-full rounded-xl border border-slate-100 bg-slate-100 px-3 py-5 text-slate-700 hover:border hover:border-slate-200">
            <div className="flex-1">
              <input
                type="number"
                className="block w-full border-none bg-slate-100 text-2xl font-bold outline-0"
                placeholder="0"
              ></input>
            </div>
            <div className="flex-0 flex flex-col gap-2">
              <div>
                <button className="rounded-xl bg-slate-300 px-3 font-bold text-slate-700 hover:bg-slate-400">
                  USDC
                </button>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-400">Balance: 0</p>
              </div>
            </div>
          </div>
          {/* out */}
          <div className="w-full rounded-xl border border-slate-100 bg-slate-100 px-3 py-5 text-slate-700 hover:border-slate-200">
            <input
              type="number"
              className="block w-full appearance-none border-none bg-slate-100 text-2xl font-bold outline-0"
              placeholder="0"
            ></input>
          </div>
          {/* switch button */}
          <button className="absolute left-[calc(50%-1.25rem)] top-[calc(50%-0.5rem)] h-9 w-9 rounded-lg border-4 border-white bg-slate-200 p-1 text-slate-700 hover:bg-slate-300">
            <ChevronDoubleDownIcon />
          </button>
        </div>
        {/* submit button */}
        <div className="flex justify-center">
          <button className="w-full rounded-xl bg-slate-100 p-3 text-xl font-extrabold text-slate-400 hover:bg-slate-200">
            {buttonStatus}
          </button>
        </div>
      </div>
    </div>
  );
};

Swap.displayName = "Swap";
export default Swap;
