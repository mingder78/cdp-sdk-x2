import { CdpClient } from "@coinbase/cdp-sdk";
import { createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import dotenv from 'dotenv'

import { CdpClient } from "@coinbase/cdp-sdk";
import dotenv from "dotenv";

dotenv.config();

const cdp = new CdpClient();
const account2 = await cdp.evm.createAccount();
console.log(`Created EVM account: ${account2.address}`);

// Setup signer
const signer = privateKeyToAccount(import.meta.env.YOUR_PRIVATE_KEY);

// Create a wallet client for signing
const walletClient = createWalletClient({
  account: signer,
  chain: baseSepolia,
  transport: http(),
});

// Create fixed account
const { account, txHash } = await cdp.evm.createAccount({
  factoryAddress: "0x686f6E4d7402976cBb13B4af6fdf263b2BDBC6Cc", 
//"0x0000Ca1aEd1b1A1c1c1Ca11Eca11ed0000ca1aED",
  owner: signer.address,
  walletClient,
  index: 0, // ← fixed index makes address deterministic
});

console.log('signer', signer)
console.log('account', account)
console.log('txHash', txHash)

console.log("Fixed Account Address:", account.address);
console.log("Transaction Hash:", txHash);


const client = new CdpClient();
// Send a user operation, check smart account status, etc.

// Change this to the path of your API key file downloaded from CDP portal.
Coinbase.configureFromJson({ filePath: "/tmp/cdp_api_key.json" });

// Create a Wallet for the User.
let wallet = await Wallet.create();
console.log(`Wallet successfully created: `, wallet.toString());
console.log('client', client)
console.log('wallet', wallet)
