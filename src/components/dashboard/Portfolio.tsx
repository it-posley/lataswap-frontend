import Composition from "./Composition";
import UserBalanceInUSDC from "../../components/app/data/UserBalanceInUSDC";

export interface IPortfolio {
  className?: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join("");
}

const Portfolio: React.FC<IPortfolio> = ({ className }) => {
  const SmartContractFundvalue = Number(UserBalanceInUSDC()).toFixed(4);
  const funds = [
    {
      id: 1,
      name: "Smart Contract Fund",
      currency: "USDC",
      value: SmartContractFundvalue,
      tradeDate: "2022-01-07",
    },
    {
      id: 2,
      name: "Defi Happy Fund",
      currency: "USDC",
      //calling the deployed smart contract and get the return value
      value: 0,
      tradeDate: "2022-01-07",
    },
    {
      id: 3,
      name: "Gamefi Crazy Fund",
      currency: "USDC",
      value: 0,
      tradeDate: "2022-01-07",
    },
  ];

  return (
    <div>
      <h1 className="mb-2 font-extrabold underline">Current Holdings</h1>

      <div className="flex gap-4">
        <ul>
          {funds.map((fund) =>
            fund.value != 0 ? (
              <li>
                <div className="mb-1 flex rounded-lg border border-gray-300 bg-gray-200 px-4 py-2">
                  <p className="mr-2 font-bold text-gray-800">{fund.name}</p>
                  <span> : </span>
                  <p className="ml-2 font-bold text-green-600">
                    {fund.value.toLocaleString("en-US")}
                  </p>
                  <p className="ml-2 font-bold text-gray-600">
                    in {fund.currency}
                  </p>
                </div>
              </li>
            ) : null
          )}
        </ul>
        <div className="h-36 w-36">
          <Composition />
        </div>
      </div>
    </div>
  );
};

Portfolio.displayName = "Portfolio";
export default Portfolio;
