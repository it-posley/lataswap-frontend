import { ethers } from "ethers";
import { useState, useEffect } from "react";

// const provider = new ethers.providers.Web3Provider(window.ethereum);
// // create a Contract instance to interact with
const address = "0xbf2ad38fd09F37f50f723E35dd84EEa1C282c5C9";
const abi = [
  "function depositToLataSwap(uint256 amountInTotal) external",
  "function checkUserBalanceInUSDC(address user) public view returns (uint256 userBalanceInUSDC)",
  "function _balanceOfAsset(address assetToken) public view returns (uint256)",
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

      const hardhatChainId = "0x7a69";

      if (chainId !== hardhatChainId) {
        console.log(chainId);
        alert("You are not connected to the hardhat Testnet!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Found account", accounts[0]);
      setCurrentAccount(accounts[0]);
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

        let matic = await contract._balanceOfAsset(
          "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
        );
        let uniswap = await contract._balanceOfAsset(
          "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
        );
        let link = await contract._balanceOfAsset(
          "0x514910771AF9Ca656af840dff83E8264EcF986CA"
        );
        let wbtc = await contract._balanceOfAsset(
          "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"
        );
        let weth = await contract._balanceOfAsset(
          "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
        );

        console.log(matic); // 232072883758426321748
        console.log(uniswap); // 34887518213700733514
        console.log(link); // 26623643942894899577
        console.log(wbtc); // 1182252
        console.log(weth); // 157078877605359018
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
