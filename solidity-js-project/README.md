# Blockchain Simulation with Solidity and Hardhat

This project implements a comprehensive blockchain simulation using Solidity smart contracts and JavaScript with the Hardhat framework. It demonstrates core blockchain concepts including block structure, cryptographic hashing, proof-of-work consensus, and immutable ledger validation.

## Project Structure

```
solidity-js-project
├── contracts
│   ├── Block.sol              # Block implementation with proof-of-work
│   ├── Blockchain.sol         # Blockchain management contract
│   └── MyContract.sol         # Basic smart contract with storage
├── scripts
│   ├── blockchain-demo.js     # Blockchain simulation demonstration
│   ├── deploy.js              # Contract deployment script
│   └── interact.js            # Contract interaction script
├── test
│   └── mycontract-test.js     # Test cases for smart contracts
├── hardhat.config.js          # Hardhat configuration
├── package.json               # npm configuration
└── README.md                  # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/RjyavardhanSingh/QuadB_Tech_Internship_Task.git
   cd solidity-js-project
   ```

2. Install the dependencies:
   ```
   npm install
   ```

### Compile the Contracts

To compile the Solidity contracts, run:
```
npm run compile
```

### Start Local Node

To start a local Hardhat node, run:
```
npm run node
```

### Deploy the Contracts

To deploy the contracts to the local blockchain (in a new terminal), run:
```
npm run deploy
```

### Interact with the Contract

To interact with the deployed contract, run:
```
npm run interact
```

### Run Blockchain Simulation

To deploy and demonstrate the complete blockchain simulation:
```
npm run blockchain-demo
```

### Running Tests

To run the test cases for the smart contract, use:
```
npm run test
```

## Technical Features

- Complete Block Structure: Index, timestamp, transactions, previous and current hash
- Cryptographic Hashing: Secure Keccak256 hash function (Ethereum's native)
- Proof-of-Work Consensus: Mining algorithm with adjustable difficulty
- Chain Validation: Integrity verification to detect tampering
- Transaction Storage: Support for multiple transactions per block

## License

This project is licensed under the MIT License.
