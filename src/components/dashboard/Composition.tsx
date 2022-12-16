import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  datasets: [
    {
      labels: ["Smart Contract Fund", "Defi Happy Fund", "Gamefi Crazy Fund"],
      data: [1223111, 5435231, 8281121],
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

export interface IComposition {
  className?: string;
}

const Composition: React.FC<IComposition> = ({ className }) => {
  return <Doughnut data={data} />;
};

Composition.displayName = "Composition";
export default Composition;
