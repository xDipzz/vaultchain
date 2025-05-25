# VaultChain

**Social Recovery for Solana Wallets**

VaultChain enables wallet recovery through trusted guardians without exposing private keys. If you lose access to your Solana wallet, designated guardians can approve fund recovery to a new wallet you control.

**⚠️ Experimental Software**: This is a learning project in active development. Use only with small amounts you can afford to lose.

## The Problem

Over $4 billion in cryptocurrency has been permanently lost due to misplaced private keys. Traditional Solana wallets like Phantom and Solflare offer no recovery mechanism if you lose your seed phrase or device.

## Solution

VaultChain implements social recovery through smart contracts:

- **Guardian Network**: Trusted contacts can approve recovery after inactivity
- **Time-Locked Process**: Built-in delays prevent unauthorized access
- **Non-Custodial**: You maintain full control, guardians cannot access funds directly
- **Multi-Signature Security**: Requires threshold of guardian approvals

## Demo

[**Watch VaultChain Demo**](https://www.loom.com/share/82aab90664f64577bab8ae830d04a056?sid=a56a40f1-25cb-4d06-aa37-32d9ee2760c4)

## How It Works

1. **Setup**: Connect your existing Solana wallet and deploy a recovery contract
2. **Add Guardians**: Designate trusted contacts with their Solana wallet addresses  
3. **Configure Thresholds**: Set how many guardians must approve recovery (e.g., 2 of 3)
4. **Check-in Mechanism**: Regular activity resets the inactivity timer
5. **Recovery Process**: If inactive for 90 days, guardians can initiate fund transfer

## Architecture

### Smart Contracts (Rust/Anchor)
- **Recovery Program**: Manages guardian approvals and timelock mechanisms
- **Guardian Registry**: Stores trusted contact addresses and thresholds
- **Check-in System**: Tracks user activity to prevent unauthorized recovery

### Frontend (Next.js/TypeScript)
- **Wallet Integration**: Supports Phantom, Solflare, and other Solana wallets
- **Guardian Management**: Interface for adding/removing trusted contacts
- **Recovery Dashboard**: Monitoring and emergency controls

## Local Development

### Prerequisites
- Node.js 18+
- Rust and Solana CLI
- Anchor Framework

### Setup

```bash
# Clone repository
git clone https://github.com/xDipzz/vaultchain.git
cd vaultchain

# Install dependencies
npm install

# Build smart contracts
anchor build

# Run tests
anchor test

# Start development server
npm run dev
```

### Smart Contract Development

```bash
# Deploy to local validator
solana-test-validator

# Deploy contracts
anchor deploy --provider.cluster localnet

# Run integration tests
anchor test --skip-local-validator
```

## Project Structure

```
vaultchain/
├── programs/
│   └── vaultchain/          # Rust smart contracts
├── app/                     # Next.js frontend
├── tests/                   # Smart contract tests
├── components/              # React components
└── lib/                     # Utilities and SDK
```

## Technical Stack

**Blockchain**
- Solana (devnet/testnet)
- Anchor Framework
- Rust smart contracts

**Frontend**
- Next.js 14 with TypeScript
- Solana Wallet Adapter
- Tailwind CSS

## Contributing

This project will be fully open-sourced. Current areas for contribution:


## Contact

- GitHub: [@xDipzz](https://github.com/xDipzz)
- Issues: [GitHub Issues](https://github.com/xDipzz/vaultchain/issues)

---

*VaultChain is experimental software. Smart contracts have not been audited. Use at your own risk with funds you can afford to lose.*
