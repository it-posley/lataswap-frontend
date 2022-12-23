import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

export interface IReadUSDCOutput {
  inputAmount: BigNumber;
}
const ReadUSDCOutput: React.FC<IReadUSDCOutput> = (props) => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0xA777139C4AF8b4182bf04b9366699fC513594acA",
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
        enabled: false,
      },
    ],
    functionName: "estimateRedeemAmountInUSDC",
    args: [props.inputAmount],
  });

  const displayData = BigNumber.isBigNumber(data)
    ? ethers.utils.formatUnits(data!, "6")
    : "0";

  return mounted ? <div>{Number(displayData)}</div> : <div>{0}</div>;
};

export default ReadUSDCOutput;
