import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const UserBalanceInUSDC = () => {
  const mounted = useIsMounted();
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
        name: "userTotalBalanceInUSDC",
        outputs: [
          {
            internalType: "uint256",
            name: "AmountInUSDC",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "userTotalBalanceInUSDC",
    args: [address!],
  });

  const displayData =
    isConnected && data != undefined
      ? ethers.utils.formatUnits(data!, "26")
      : 0;

  console.log(data);

  return mounted ? displayData : 0;
};

export default UserBalanceInUSDC;
