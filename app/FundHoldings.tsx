import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export interface IFundHoldings {
  className?: string;
}

const holdings = [
  {
    id: 1,
    name: "Bitcoin",
    stat: "16,542.52",
    icon: "btc",
    change: "-1.3%",
    changeType: "decrease",
  },
  {
    id: 2,
    name: "Ethereum",
    stat: "1,194.44",
    icon: "eth",
    change: "-0.5%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "BNB",
    stat: "299.83",
    icon: "bnb",
    change: "0.2%",
    changeType: "increase",
  },
  {
    id: 4,
    name: "Cardano",
    stat: "0.313",
    icon: "ada",
    change: "1.2%",
    changeType: "increase",
  },
  {
    id: 5,
    name: "Polkadot",
    stat: "5.34",
    icon: "dot",
    change: "1.8%",
    changeType: "decrease",
  },
];

const FundHoldings: React.FC<IFundHoldings> = ({ className }) => {
  return (
    <div className="relative max-w-sm rounded-lg bg-white px-4 pt-3 shadow">
      <div>
        <div className="absolute rounded-md bg-slate-200 p-3">
          <CurrencyDollarIcon
            className="h-6 w-6 text-slate-500"
            aria-hidden="true"
          />
        </div>
        <p className="ml-16 truncate text-sm font-medium text-gray-500">
          Holdings
        </p>
      </div>
      <div className="ml-16 flex pb-3 pt-1">
        {holdings.map((item) => (
          <div key={item.id} className="mr-2">
            <Image
              src={`/icon/${item.icon}.svg`}
              width={32}
              height={32}
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

FundHoldings.displayName = "FundHoldings";
export default FundHoldings;
