import nacl from "tweetnacl";
import { derivePath } from "./es25519-hd-key";
import { isValidHardenedPath, mnemonicToSeedHex } from "./utils";

export const PRIVATE_KEY_SIZE = 32;
export const LEGACY_PRIVATE_KEY_SIZE = 64;
export const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
export const DEFAULT_ED25519_DERIVATION_PATH_SUI = "m/44'/784'/0'/0'/0'";

/**
 * Ed25519 Keypair data. The publickey is the 32-byte public key and
 * the secretkey is 64-byte, where the first 32 bytes is the secret
 * key and the last 32 bytes is the public key.
 */
export interface Ed25519KeypairData {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

export class Ed25519Keypair {
  private keypair: Ed25519KeypairData;

  /**
   * Create a new Ed25519 keypair instance.
   * Generate random keypair if no {@link Ed25519Keypair} is provided.
   *
   * @param keypair Ed25519 keypair
   */
  constructor(keypair?: Ed25519KeypairData) {
    // super();
    if (keypair) {
      this.keypair = keypair;
    } else {
      this.keypair = nacl.sign.keyPair();
    }
  }
  getSecretKey(): Uint8Array {
    return this.keypair.secretKey.slice(0, PRIVATE_KEY_SIZE);
  }

  /**
   * Create a Ed25519 keypair from a raw secret key byte array, also known as seed.
   * This is NOT the private scalar which is result of hashing and bit clamping of
   * the raw secret key.
   *
   * @throws error if the provided secret key is invalid and validation is not skipped.
   *
   * @param secretKey secret key as a byte array or Bech32 secret key string
   * @param options: skip secret key validation
   */
  static fromSecretKey(
    // secretKey: Uint8Array | string,
    secretKey: Uint8Array,
    options?: { skipValidation?: boolean },
  ): Ed25519Keypair {
    // if (typeof secretKey === "string") {
    //   const decoded = decodeSuiPrivateKey(secretKey);

    //   if (decoded.schema !== "ED25519") {
    //     throw new Error(`Expected a ED25519 keypair, got ${decoded.schema}`);
    //   }

    //   return this.fromSecretKey(decoded.secretKey, options);
    // }

    const secretKeyLength = secretKey.length;
    if (secretKeyLength !== PRIVATE_KEY_SIZE) {
      throw new Error(
        `Wrong secretKey size. Expected ${PRIVATE_KEY_SIZE} bytes, got ${secretKeyLength}.`,
      );
    }
    const keypair = nacl.sign.keyPair.fromSeed(secretKey);
    if (!options || !options.skipValidation) {
      const encoder = new TextEncoder();
      const signData = encoder.encode("sui validation");
      const signature = nacl.sign.detached(signData, keypair.secretKey);
      if (!nacl.sign.detached.verify(signData, signature, keypair.publicKey)) {
        throw new Error("provided secretKey is invalid");
      }
    }
    return new Ed25519Keypair(keypair);
  }
  static deriveKeypair(mnemonics: string, path?: string): Ed25519Keypair {
    if (path == null) {
      path = DEFAULT_ED25519_DERIVATION_PATH_SUI;
    }
    if (!isValidHardenedPath(path)) {
      throw new Error("Invalid derivation path");
    }
    const { key } = derivePath(path, mnemonicToSeedHex(mnemonics));

    return Ed25519Keypair.fromSecretKey(key);
  }
}
