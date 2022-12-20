import { contractAddresses, abi } from "../../../../constants";
import { useContractRead } from "wagmi";
import { useAccount } from "wagmi";
import { ethers, BigNumber } from "ethers";
import useIsMounted from "../../useIsMounted";

const ReadBalance = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: contractAddresses[31337],
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "user",
            type: "address",
          },
        ],
        name: "getUserUSDCBalance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "getUserUSDCBalance",
    args: [address!],
    watch: true,
  });

  const displayData =
    data != undefined ? ethers.utils.formatUnits(data!, "6") : "0";

  return mounted ? (
    { displayData } && <div>{Number(displayData).toFixed(4)}</div>
  ) : (
    <div>null</div>
  );
};

export default ReadBalance;
