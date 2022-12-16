import { useContractRead } from "wagmi";
import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";

function readBalance() {
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0x2d13826359803522cCe7a4Cfa2c1b582303DD0B4",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getUserUSDCBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getUserUSDCBalance",
    args: ["0x70997970c51812dc3a010c7d01b50e0d17dc79c8"],
  });

  return address;
}

export default readBalance;
