import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CircleStackIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";
import PerformanceChart from "./PerformanceChart";

export interface IPerformance {
  className?: string;
}

const stats = [
  {
    id: 1,
    name: "NAV",
    stat: "71,897",
    icon: CircleStackIcon,
    change: "2.4%",
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

const Performance: React.FC<IPerformance> = ({ className }) => {
  return (
    <div>
      <h1 className="mb-2 font-extrabold underline">Holdings Performance</h1>

      <div className="h-80 rounded-2xl border bg-gray-200 p-5">
        <PerformanceChart />
      </div>
    </div>
  );
};

Performance.displayName = "Performance";
export default Performance;
