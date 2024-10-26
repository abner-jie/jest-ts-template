import dotenv from 'dotenv'

const path = process.cwd() + '/.env.dev.local'
console.log('path:')
dotenv.config({
  path: [process.cwd() + '/.env.dev', process.cwd() + '/.env.dev.local'],
  override: true,
})

// testnet env

export const mnemonic: string = process.env.mnemonic!

console.log('mnemonic:', mnemonic)
