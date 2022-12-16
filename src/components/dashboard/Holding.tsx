import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  CircleStackIcon,
  CurrencyDollarIcon,
  AtSymbolIcon,
} from "@heroicons/react/24/outline";

export interface IHolding {
  className?: string;
}

const Holding: React.FC<IHolding> = ({ className }) => {
  return <div>fund 1: xxxx in usdc</div>;
};

Holding.displayName = "Holding";
export default Holding;
