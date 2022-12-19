import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";
import useDebounce from "src/hooks/useDebounce";

const ReadTokenBalance = (props) => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0x2d13826359803522cCe7a4Cfa2c1b582303DD0B4",
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
    ? ethers.utils.formatUnits(data!, "24")
    : "0";

  return mounted ? <div>{displayData}</div> : <div>{null}</div>;
};

export default ReadTokenBalance;
