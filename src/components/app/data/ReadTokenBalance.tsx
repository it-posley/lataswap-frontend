import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const ReadTokenBalance = () => {
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
    cacheOnBlock: true,
    cacheTime: 50,
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
