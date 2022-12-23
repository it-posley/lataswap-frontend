import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

export interface IReadTokenOutput {
  inputAmount: BigNumber;
}

const ReadTokenOutput: React.FC<IReadTokenOutput> = (props) => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0xA777139C4AF8b4182bf04b9366699fC513594acA",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountInTotalAfterSwap",
            type: "uint256",
          },
        ],
        name: "_getExchangeRate",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
        enabled: isConnected,
      },
    ],
    functionName: "_getExchangeRate",
    args: [BigNumber.from(0)],
  });

  const displayData = BigNumber.isBigNumber(data)
    ? ethers.utils.formatUnits(data!, "0")
    : "0";

  return mounted ? (
    <div>{(Number(props.inputAmount) / Number(displayData)) * 10 ** 6}</div>
  ) : (
    <div>{0}</div>
  );
};

export default ReadTokenOutput;
