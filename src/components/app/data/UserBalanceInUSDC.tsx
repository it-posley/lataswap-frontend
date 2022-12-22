import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const UserBalanceInUSDC = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0xA777139C4AF8b4182bf04b9366699fC513594acA",
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
      ? ethers.utils.formatUnits(data!, "36")
      : 0;

  return mounted ? displayData : 0;
};

export default UserBalanceInUSDC;
