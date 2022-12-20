import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const ReadUSDCOutput = (props) => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0xc3023a2c9f7B92d1dd19F488AF6Ee107a78Df9DB",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "lataTokenAmount",
            type: "uint256",
          },
        ],
        name: "estimateRedeemAmountInUSDC",
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
    functionName: "estimateRedeemAmountInUSDC",
    args: [props.inputAmount],
  });

  const displayData = BigNumber.isBigNumber(data)
    ? ethers.utils.formatUnits(data!, "26")
    : "0";

  return mounted ? <div>{Number(displayData)}</div> : <div>{null}</div>;
};

export default ReadUSDCOutput;
