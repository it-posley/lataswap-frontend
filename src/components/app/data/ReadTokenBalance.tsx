import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const ReadTokenBalance = () => {
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
    watch: true,
  });

  const displayData = BigNumber.isBigNumber(data)
    ? ethers.utils.formatUnits(data!, "36")
    : "0";

  return mounted ? (
    <div>{Number(displayData).toFixed(4)}</div>
  ) : (
    <div>{null}</div>
  );
};

export default ReadTokenBalance;
