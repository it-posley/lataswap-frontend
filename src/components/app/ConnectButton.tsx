import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn, useSession } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import axios from "axios";
import { ArrowsRightLeftIcon } from "@heroicons/react/20/solid";

export interface IConnectButton {
  className?: string;
}

const ConnectButton: React.FC<IConnectButton> = ({ className }) => {
  const { data: session, status } = useSession();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }

    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });
    const userData = { address: account, chain: chain.id, network: "evm" };

    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const message = data.message;

    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    // sign in with next-auth
    await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/app",
    });
  };

  return (
    <button onClick={() => handleAuth()} type="button">
      {status === "unauthenticated" && (
        <div className="inline-flex items-center rounded-3xl border border-transparent bg-fuchsia-100 px-3 py-2.5 text-sm font-extrabold leading-3 text-fuchsia-700 hover:bg-fuchsia-200">
          Connect
          <ArrowsRightLeftIcon
            className="ml-2 -mr-0.5 h-4 w-4"
            aria-hidden="true"
          />
        </div>
      )}
      {status === "authenticated" && (
        <div className="inline-flex items-center rounded-3xl border border-transparent bg-gradient-to-r from-fuchsia-900 to-rose-500 px-3 py-2.5 text-sm font-extrabold leading-3 text-white hover:to-fuchsia-900">
          <ArrowsRightLeftIcon
            className="mr-2 -ml-0.5 h-4 w-4"
            aria-hidden="true"
          />
          {shortenAddress(address as `0x${string}`)}
        </div>
      )}
    </button>
  );
};

function shortenAddress(address: string) {
  if (address === undefined) return "";
  return (
    address.substring(0, 6) + "..." + address.substring(address.length - 4)
  );
}

ConnectButton.displayName = "ConnectButton";
export default ConnectButton;
