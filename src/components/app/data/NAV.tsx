import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const NAV = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0x89987589f99C4b1c05061C1484D21699949f034A",
    abi: [
      {
        inputs: [],
        name: "_calTotalValueOfPoolinUSDC",
        outputs: [
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "_calTotalValueOfPoolinUSDC",
    enabled: isConnected,
  });

  const displayData =
    isConnected && data != undefined
      ? ethers.utils.formatUnits(data!, "26")
      : 0;

  return mounted ? displayData : 0;
};

export default NAV;
