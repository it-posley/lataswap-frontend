import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const TotalSupply = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0x71AcaAF23e047029e9Da1BCBc247cA26F9512EF6",
    abi: [
      {
        inputs: [],
        name: "totalSupply",
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
    functionName: "totalSupply",
    enabled: isConnected,
  });

  const displayData =
    isConnected && data != undefined
      ? ethers.utils.formatUnits(data!, "18")
      : 0;

  return mounted ? displayData : 0;
};

export default TotalSupply;
