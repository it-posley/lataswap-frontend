import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import UserBalanceInUSDC from "../../components/app/data/UserBalanceInUSDC";

ChartJS.register(ArcElement, Tooltip, Legend);

export interface IComposition {
  className?: string;
}

//

const Composition: React.FC<IComposition> = ({ className }) => {
  const SmartContractFund = Number(UserBalanceInUSDC()).toFixed(4);
  //calling the deployed smart contract for return value;
  const DefiHappyFund = 0;
  const GameFiCrazyFund = 0;
  const AllAssetArray = [SmartContractFund, DefiHappyFund, GameFiCrazyFund];
  const data = {
    datasets: [
      {
        labels: ["Smart Contract Fund", "Defi Happy Fund", "Gamefi Crazy Fund"],
        data: AllAssetArray,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Doughnut data={data} />;
};

Composition.displayName = "Composition";
export default Composition;
