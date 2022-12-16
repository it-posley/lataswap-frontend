import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CircleStackIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";

export interface IHoldingsList {
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

const HoldingsList: React.FC<IHoldingsList> = ({ className }) => {
  return (
    <div className="max-w-7xl bg-red-500">
      <h1>Current Holdings</h1>
    </div>
  );
};

HoldingsList.displayName = "HoldingsList";
export default HoldingsList;
