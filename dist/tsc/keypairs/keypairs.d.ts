export declare const PRIVATE_KEY_SIZE = 32;
export declare const LEGACY_PRIVATE_KEY_SIZE = 64;
export declare const SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
export declare const DEFAULT_ED25519_DERIVATION_PATH_SUI = "m/44'/784'/0'/0'/0'";
/**
 * Ed25519 Keypair data. The publickey is the 32-byte public key and
 * the secretkey is 64-byte, where the first 32 bytes is the secret
 * key and the last 32 bytes is the public key.
 */
export interface Ed25519KeypairData {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
}
export declare class Ed25519Keypair {
    private keypair;
    /**
     * Create a new Ed25519 keypair instance.
     * Generate random keypair if no {@link Ed25519Keypair} is provided.
     *
     * @param keypair Ed25519 keypair
     */
    constructor(keypair?: Ed25519KeypairData);
    getSecretKey(): Uint8Array;
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
    static fromSecretKey(secretKey: Uint8Array, options?: {
        skipValidation?: boolean;
    }): Ed25519Keypair;
    static deriveKeypair(mnemonics: string, path?: string): Ed25519Keypair;
}
