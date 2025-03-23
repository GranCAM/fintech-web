import '@testing-library/jest-dom'

// Para que WalletConnect no rompa los tests
global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder

