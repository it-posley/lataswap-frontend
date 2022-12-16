import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CircleStackIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import FundHoldings from "./FundHoldings";

export interface IFundStat {
  className?: string;
}

const stats = [
  {
    id: 1,
    name: "NAV",
    stat: "71,897",
    icon: CircleStackIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "NAV per unit",
    stat: "13.22",
    icon: CurrencyDollarIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Units",
    stat: "10000",
    icon: AtSymbolIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const FundStat: React.FC<IFundStat> = ({ className }) => {
  return (
    <div className="max-w-3xl pl-1.5 pr-8">
      <dl className="mt-5 grid grid-cols-1 gap-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative max-w-sm overflow-hidden rounded-lg bg-white px-4 pt-3 shadow"
          >
            <dt>
              <div className="absolute rounded-md bg-slate-200 p-3">
                <item.icon
                  className="h-6 w-6 text-slate-500"
                  aria-hidden="true"
                />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-3">
              <p className="text-xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowDownIcon
                    className="h-5 w-5 flex-shrink-0 self-center text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
        <FundHoldings />
      </dl>
    </div>
  );
};

FundStat.displayName = "FundStat";
export default FundStat;
