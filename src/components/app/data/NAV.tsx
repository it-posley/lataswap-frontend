import { useAccount, useContractRead } from "wagmi";
import { ethers, BigNumber } from "ethers";
import { abi } from "../../../../constants";
import useIsMounted from "../../useIsMounted";

const NAV = () => {
  const mounted = useIsMounted();
  const { address, connector, isConnected } = useAccount();
  const { data, isError, isLoading } = useContractRead({
    address: "0xA777139C4AF8b4182bf04b9366699fC513594acA",
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
    watch: true,
  });

  const displayData =
    data != undefined ? ethers.utils.formatUnits(data!, "6") : 0;

  return mounted ? displayData : 0;
};

export default NAV;
