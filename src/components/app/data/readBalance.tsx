import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";

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
    args: [address!],
  });

  //   return <div>{data}</div>;
}

export default readBalance;
