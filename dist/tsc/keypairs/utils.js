"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHardenedPath = isValidHardenedPath;
exports.mnemonicToSeedHex = mnemonicToSeedHex;
exports.mnemonicToSeed = mnemonicToSeed;
const bip39_1 = require("@scure/bip39");
const bcs_1 = require("@mysten/bcs");
function isValidHardenedPath(path) {
    if (!new RegExp("^m\\/44'\\/784'\\/[0-9]+'\\/[0-9]+'\\/[0-9]+'+$").test(path)) {
        return false;
    }
    return true;
}
/**
 * Derive the seed in hex format from a 12-word mnemonic string.
 *
 * @param mnemonics 12 words string split by spaces.
 */
function mnemonicToSeedHex(mnemonics) {
    return (0, bcs_1.toHex)(mnemonicToSeed(mnemonics));
}
/**
 * Uses KDF to derive 64 bytes of key data from mnemonic with empty password.
 *
 * @param mnemonics 12 words string split by spaces.
 */
function mnemonicToSeed(mnemonics) {
    return (0, bip39_1.mnemonicToSeedSync)(mnemonics, "");
}
//# sourceMappingURL=utils.js.map