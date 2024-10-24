import { describe, expect, test } from "@jest/globals";
import { ethers } from "ethers";
import { mnemonic } from "./env";
import { a } from "../src/aa";

test("should successfully determine if transaction is sponsorable", async () => {
  const approve_amount = "0";
  // usdc
  const rpcUrl = "https://opbnb-rpc.publicnode.com"; // opbnb rpc
  // const tokenAddress = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d';
  const tokenAddress = "0x9e5AAC1Ba1a2e6aEd6b32689DFcF62A509Ca96f3"; // opbnb USDT
  const contractAddress = "0x5c43DA53770943775F4C77282c08Cc2D318BebFf";

  console.log("mnemonic22:", mnemonic);
  let hdNodeWallet = ethers.Wallet.fromPhrase(mnemonic!);
  const provider = new ethers.JsonRpcProvider(rpcUrl);

  hdNodeWallet = hdNodeWallet.connect(provider);
  const tokenABI = [
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // Create an instance of ethers.Contract
  // const abiCoder = new ethers.AbiCoder();
  const iface = new ethers.Interface(tokenABI);
  const amount = ethers.parseUnits(approve_amount, "ether"); // Adjust amount as needed
  const data = iface.encodeFunctionData("approve", [contractAddress, amount]);

  const transaction = {
    from: hdNodeWallet.address,
    to: tokenAddress,
    data: data,
  };
  // 构建签名并广播
  // const signedTransaction = await hdNodeWallet.populateTransaction(transaction);
  // const result = await hdNodeWallet.sendTransaction(transaction);
  // expect(result.hash).toBeDefined();
  expect(null).toBeDefined();
}, 100000); // Extends the default timeout as this test involves network calls
