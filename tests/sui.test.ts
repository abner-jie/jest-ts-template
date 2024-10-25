import { test, expect } from "@jest/globals";

import { mnemonic } from "./env";
import { Ed25519Keypair } from "../src/keypairs/index";
import { Ed25519Keypair as Ed25519KeypairSui } from "@mysten/sui/keypairs/ed25519";

test("sui", () => {
  const kp = Ed25519Keypair.deriveKeypair(mnemonic);
  const address = Ed25519KeypairSui.fromSecretKey(
    kp.getSecretKey(),
  ).toSuiAddress();

  expect(address).toBe(
    "0xb47306477858d65abbf8f5c1028905328130b83a97962f5d6231d835ac7fdfeb",
  );
});
