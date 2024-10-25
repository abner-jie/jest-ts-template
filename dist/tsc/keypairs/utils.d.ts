export declare function isValidHardenedPath(path: string): boolean;
/**
 * Derive the seed in hex format from a 12-word mnemonic string.
 *
 * @param mnemonics 12 words string split by spaces.
 */
export declare function mnemonicToSeedHex(mnemonics: string): string;
/**
 * Uses KDF to derive 64 bytes of key data from mnemonic with empty password.
 *
 * @param mnemonics 12 words string split by spaces.
 */
export declare function mnemonicToSeed(mnemonics: string): Uint8Array;
