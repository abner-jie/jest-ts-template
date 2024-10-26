import { mnemonicToSeedSync as bip39MnemonicToSeedSync } from '@scure/bip39'
import { toHex } from '@mysten/bcs'

export function isValidHardenedPath(path: string): boolean {
  if (
    // eslint-disable-next-line quotes
    !new RegExp(`^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$`).test(path)
  ) {
    return false
  }
  return true
}

/**
 * Derive the seed in hex format from a 12-word mnemonic string.
 *
 * @param mnemonics 12 words string split by spaces.
 */
export function mnemonicToSeedHex(mnemonics: string): string {
  return toHex(mnemonicToSeed(mnemonics))
}

/**
 * Uses KDF to derive 64 bytes of key data from mnemonic with empty password.
 *
 * @param mnemonics 12 words string split by spaces.
 */
export function mnemonicToSeed(mnemonics: string): Uint8Array {
  return bip39MnemonicToSeedSync(mnemonics, '')
}
