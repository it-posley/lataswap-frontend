import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const UserBalanceInUSDC = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0x89987589f99C4b1c05061C1484D21699949f034A",
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
    enabled: isConnected,
  });

  const displayData =
    isConnected && data != undefined
      ? ethers.utils.formatUnits(data!, "26")
      : 0;

  return mounted ? displayData : 0;
};

export default UserBalanceInUSDC;
