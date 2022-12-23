import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const ReadTokenBalance = () => {
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
        name: "getUserBalanceOfLataToken",
        outputs: [
          {
            internalType: "uint256",
            name: "userLataBalance",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getUserBalanceOfLataToken",
    args: [address!],
    enabled: isConnected,
    watch: true,
  });

  const displayData = BigNumber.isBigNumber(data)
    ? ethers.utils.formatUnits(data!, "18")
    : "0";

  return mounted ? (
    <div>{Number(displayData).toFixed(4)}</div>
  ) : (
    <div>loading</div>
  );
};

export default ReadTokenBalance;
