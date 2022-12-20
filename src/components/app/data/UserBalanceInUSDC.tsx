import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const UserBalanceInUSDC = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0xc3023a2c9f7B92d1dd19F488AF6Ee107a78Df9DB",
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
