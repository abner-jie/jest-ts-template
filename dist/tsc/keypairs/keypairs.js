"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519Keypair = exports.DEFAULT_ED25519_DERIVATION_PATH_SUI = exports.SUI_PRIVATE_KEY_PREFIX = exports.LEGACY_PRIVATE_KEY_SIZE = exports.PRIVATE_KEY_SIZE = void 0;
const tslib_1 = require("tslib");
const tweetnacl_1 = tslib_1.__importDefault(require("tweetnacl"));
const es25519_hd_key_1 = require("./es25519-hd-key");
const utils_1 = require("./utils");
exports.PRIVATE_KEY_SIZE = 32;
exports.LEGACY_PRIVATE_KEY_SIZE = 64;
exports.SUI_PRIVATE_KEY_PREFIX = "suiprivkey";
exports.DEFAULT_ED25519_DERIVATION_PATH_SUI = "m/44'/784'/0'/0'/0'";
class Ed25519Keypair {
    /**
     * Create a new Ed25519 keypair instance.
     * Generate random keypair if no {@link Ed25519Keypair} is provided.
     *
     * @param keypair Ed25519 keypair
     */
    constructor(keypair) {
        // super();
        if (keypair) {
            this.keypair = keypair;
        }
        else {
            this.keypair = tweetnacl_1.default.sign.keyPair();
        }
    }
    getSecretKey() {
        return this.keypair.secretKey.slice(0, exports.PRIVATE_KEY_SIZE);
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
    secretKey, options) {
        // if (typeof secretKey === "string") {
        //   const decoded = decodeSuiPrivateKey(secretKey);
        //   if (decoded.schema !== "ED25519") {
        //     throw new Error(`Expected a ED25519 keypair, got ${decoded.schema}`);
        //   }
        //   return this.fromSecretKey(decoded.secretKey, options);
        // }
        const secretKeyLength = secretKey.length;
        if (secretKeyLength !== exports.PRIVATE_KEY_SIZE) {
            throw new Error(`Wrong secretKey size. Expected ${exports.PRIVATE_KEY_SIZE} bytes, got ${secretKeyLength}.`);
        }
        const keypair = tweetnacl_1.default.sign.keyPair.fromSeed(secretKey);
        if (!options || !options.skipValidation) {
            const encoder = new TextEncoder();
            const signData = encoder.encode("sui validation");
            const signature = tweetnacl_1.default.sign.detached(signData, keypair.secretKey);
            if (!tweetnacl_1.default.sign.detached.verify(signData, signature, keypair.publicKey)) {
                throw new Error("provided secretKey is invalid");
            }
        }
        return new Ed25519Keypair(keypair);
    }
    static deriveKeypair(mnemonics, path) {
        if (path == null) {
            path = exports.DEFAULT_ED25519_DERIVATION_PATH_SUI;
        }
        if (!(0, utils_1.isValidHardenedPath)(path)) {
            throw new Error("Invalid derivation path");
        }
        const { key } = (0, es25519_hd_key_1.derivePath)(path, (0, utils_1.mnemonicToSeedHex)(mnemonics));
        return Ed25519Keypair.fromSecretKey(key);
    }
}
exports.Ed25519Keypair = Ed25519Keypair;
//# sourceMappingURL=keypairs.js.map