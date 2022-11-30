import { ethers } from "ethers";
import { useState, useEffect } from "react";

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// // create a Contract instance to interact with
const address = "0x";
const abi = [
  "function depositToLataSwap(uint256 amountInTotal) external",
  "function checkUserBalanceInUSDC(address user) public view returns (uint256 userBalanceInUSDC)",
];
// const contract = new ethers.Contract(address, abi, provider);

const Test = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [txError, setTxError] = useState(null);

  // Checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log("Got the ethereum obejct: ", ethereum);
    } else {
      console.log("No Wallet found. Connect Wallet");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      console.log("Found authorized Account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
  };

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain:" + chainId);

      // const hardhatChainId = "0x31137";

      // if (chainId !== hardhatChainId) {
      //   console.log(chainId);
      //   alert("You are not connected to the hardhat Testnet!");
      //   return;
      // }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
      alert(currentAccount);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  // create transaction to smart contract
  const depositUSDC = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, abi, signer);

        let tx = await contract.checkUserBalanceInUSDC(
          "0x749BB6538B1a3F3B31b7cA6622060cc104eeBb45"
        );

        console.log(`checking : ${tx.hash}`);

        let finalTx = await tx.wait();
        console.log(`done ${finalTx}`);
      } else {
        console.log(`ethereum object doesnt exist!`);
      }
    } catch (error) {
      console.log(`Error in deposit USDC : ${error}`);
      setTxError(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    // checkCorrectNetwork()
  }, []);

  return (
    <div>
      <button
        className="mb-10 rounded-lg bg-[#f1c232] py-3 px-12 text-2xl font-bold transition duration-500 ease-in-out hover:scale-105"
        onClick={connectWallet}
      >
        Connect Wallet
      </button>

      <button
        className="mb-10 rounded-lg bg-[#f1c232] py-3 px-12 text-2xl font-bold transition duration-500 ease-in-out hover:scale-105"
        onClick={depositUSDC}
      >
        check bal
      </button>
    </div>
  );
};

Test.displayName = "Test";
export default Test;
