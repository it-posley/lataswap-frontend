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
    address: "0xc3023a2c9f7B92d1dd19F488AF6Ee107a78Df9DB",
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
  });

  const displayData = BigNumber.isBigNumber(data)
    ? ethers.utils.formatUnits(data!, "4")
    : "0";

  return mounted ? (
    <div>{Number(displayData) * 0.99880143}</div>
  ) : (
    <div>{0}</div>
  );
};

export default ReadTokenOutput;
