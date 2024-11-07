# Decentralized Federated Learning Platform

A blockchain-based federated learning platform built on NEAR Protocol that enables decentralized machine learning model training while preserving data privacy.

## Features

- Decentralized model training using federated learning
- Privacy-preserving data handling
- NEAR blockchain integration for transparency and incentives
- Real-time model status tracking
- Participant management system
- Reward distribution mechanism

## Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Smart Contract**: Rust, near-sdk
- **Blockchain**: NEAR 
- **Machine Learning**: TensorFlow.js

## Prerequisites

- Node.js >= 16
- Rust toolchain
- NEAR CLI
- A NEAR testnet account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/kamalbuilds/decentralised-federated-learning-platform
cd decentralised-federated-learning-platform
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Build the smart contract:
```bash
cd contract
cargo near build
```

## Smart Contract Deployment

1. Login to your NEAR testnet account:
```bash
near login
```

2. Deploy the contract:
```bash
near deploy --accountId your-testnet-account.testnet --wasmFile target/wasm32-unknown-unknown/release/contract.wasm
```

## Running the Application

1. Start the frontend development server:
```bash
cd frontend
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Connect Wallet**: Click "Connect Wallet" to link your NEAR account

2. **Register as Participant**: Register to participate in the federated learning process

3. **Train Model**: Contribute to model training using your local data

4. **View Status**: Monitor training progress and model updates

5. **Receive Rewards**: Earn rewards for successful contributions

## Architecture

### Smart Contract
- Manages participant registration
- Handles model updates
- Distributes rewards
- Maintains training status

### Frontend
- User interface for model training
- Wallet integration
- Real-time status updates
- Training visualization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- NEAR Protocol team
- Federated Learning community
- Open source contributors
