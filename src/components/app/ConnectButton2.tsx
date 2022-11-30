import { useAccount, useDisconnect } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";

const ConnectButton2 = () => {
  const { disconnect } = useDisconnect();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  if (isDisconnected)
    return (
      <div>
        <ConnectKitButton />
      </div>
    );
  if (isConnecting) return <div>Connecting...</div>;
  if (isConnected)
    return <button onClick={() => disconnect}>Disconnect</button>;
  return <div>Connected Wallet: {address}</div>;
};

ConnectButton2.displayName = "ConnectButton2";
export default ConnectButton2;
