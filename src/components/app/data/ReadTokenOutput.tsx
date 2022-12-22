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
    address: "0x89987589f99C4b1c05061C1484D21699949f034A",
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountInUSDC",
            type: "uint256",
          },
        ],
        name: "_calUserTokenMint",
        outputs: [
          {
            internalType: "uint256",
            name: "tokenAmount",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "_calUserTokenMint",
    args: [ethers.utils.parseUnits(`${props.inputAmount}`, 6)],
    enabled: isConnected,
  });

  const displayData = BigNumber.isBigNumber(data)
    ? ethers.utils.formatUnits(data!, "6")
    : "0";

  return mounted ? <div>{Number(displayData)}</div> : <div>{0}</div>;
};

export default ReadTokenOutput;
