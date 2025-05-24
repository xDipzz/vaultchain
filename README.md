# VaultChain

> **Lost your keys? Lost your crypto? Maybe not.**

VaultChain is an early-stage project exploring self-recoverable smart contract wallets on Solana—built with the idea of using people you trust to help you recover access.

## 🎥 Demo

**Watch VaultChain in Action:**

[![VaultChain Demo](https://img.shields.io/badge/▶️_Watch_Demo-FF5722?style=for-the-badge&logo=loom&logoColor=white)](https://www.loom.com/share/82aab90664f64577bab8ae830d04a056?sid=a56a40f1-25cb-4d06-aa37-32d9ee2760c4)

## ⚠️ Important Notice

**VaultChain is currently in the building phase.** Please only experiment with small amounts you can afford to lose. This is an educational project and not production-ready software.

## 🎯 What is VaultChain?

VaultChain doesn't replace your Phantom or Solflare wallet—it protects it with social recovery. If you've ever worried about losing access to your wallet from a lost phone or forgotten seed phrase, you're not alone. In crypto, even small mistakes can lead to permanent loss, which has discouraged many people from getting involved.

Even Vitalik Buterin, Ethereum's founder, has emphasized that wallet recovery mechanisms need significant improvement for broader crypto adoption. VaultChain is an experiment in that direction.

## ✨ Key Features

### 🛡️ Social Recovery System
- **Guardian Network**: Choose trusted family/friends as guardians
- **Threshold Security**: Require multiple guardian approvals for recovery
- **Check-in Mechanism**: Regular activity proves you still have access
- **Time-Locked Recovery**: Built-in delays prevent malicious attempts

### 💼 Smart Wallet Integration
- **Non-Custodial**: You maintain full control of your assets
- **Multi-Wallet Support**: Works with Phantom, Solflare, and other Solana wallets
- **On-Chain Logic**: All recovery rules enforced by smart contracts
- **Cancel Protection**: Stop unauthorized recovery attempts instantly

### 🎨 Modern Interface
- **Beautiful Dashboard**: Clean, intuitive wallet management
- **Real-Time Updates**: Live guardian status and transaction monitoring
- **Mobile Responsive**: Works seamlessly on all devices
- **Dark/Light Themes**: Choose your preferred viewing experience

## 🔧 How It Works

1. **Link Your Wallet**: Connect your existing Phantom/Solflare wallet
2. **Add Guardians**: Choose trusted contacts with Solana wallets
3. **Set Thresholds**: Configure how many guardians needed for recovery
4. **Regular Check-ins**: Prove you have access every 30 days
5. **Automatic Recovery**: If you lose access, guardians can help recover funds

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Blockchain
- **Platform**: Solana
- **Smart Contracts**: Anchor Framework (Rust)
- **Integration**: Solana Web3.js + Wallet Adapter
- **Programs**: Custom recovery contracts

### Development
- **Package Manager**: npm
- **Linting**: ESLint + TypeScript
- **Formatting**: Prettier
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Solana wallet (Phantom, Solflare, etc.)
- Some SOL for testing (devnet/testnet recommended)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/xDipzz/vaultchain.git
cd vaultchain
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## 📱 Usage

### Setting Up Recovery

1. **Connect Wallet**: Use the "Connect Wallet" button on the homepage
2. **Access Dashboard**: Navigate to the wallet dashboard
3. **Add Guardians**: Go to Guardian Management and add trusted contacts
4. **Configure Thresholds**: Set how many guardians need to approve recovery
5. **Test System**: Try the check-in process to ensure everything works

### Recovery Process

1. **Guardian Initiation**: Guardians notice you haven't checked in
2. **Recovery Vote**: Required number of guardians approve recovery
3. **Delay Period**: Time-locked waiting period for safety
4. **Fund Transfer**: Smart contract moves funds to your new wallet

## 🔧 Development

### Project Structure
```
vaultchain/
├── app/                     # Next.js app router pages
│   ├── dashboard/          # Dashboard pages
│   ├── terms/              # Legal pages
│   ├── page.tsx            # Landing page
│   └── layout.tsx          # Root layout
├── components/             # React components
│   ├── ui/                # ShadCN UI components
│   ├── dashboard-*        # Dashboard components
│   ├── wallet-*           # Wallet integration
│   └── warning-popup.tsx  # Safety warnings
├── programs/              # Solana programs (Rust)
├── tests/                 # Smart contract tests
└── lib/                   # Utility functions
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Smart Contract Development

VaultChain includes Solana programs written in Rust using the Anchor framework:

```bash
# Build programs
anchor build

# Test programs
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

## 🛡️ Security Considerations

### Current Limitations
- **Beta Software**: Not audited or production-ready
- **Experimental Features**: Some functionality may change
- **Limited Testing**: Use only small amounts for now

### Security Features
- **Multi-Signature Protection**: Requires multiple guardian approvals
- **Time-Locked Recovery**: Built-in delays prevent instant attacks
- **On-Chain Verification**: All logic enforced by smart contracts
- **Cancel Mechanisms**: Stop unauthorized recovery attempts

## 🤝 Contributing

VaultChain is built as a learning project and will eventually be open-sourced for community contributions.

### Ways to Contribute
- **Report Issues**: Found a bug? Let us know!
- **Feature Requests**: Suggest improvements
- **Documentation**: Help improve guides and docs
- **Testing**: Try the app and provide feedback

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📚 Resources

### Documentation
- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [ShadCN UI Components](https://ui.shadcn.com/)

### Community
- [GitHub Issues](https://github.com/xDipzz/vaultchain/issues) - Bug reports and feature requests
- [Discussions](https://github.com/xDipzz/vaultchain/discussions) - Community discussions

## 🎯 Roadmap

### Current Phase (Learning & Development)
- ✅ Basic social recovery system
- ✅ Guardian management interface
- ✅ Check-in mechanism
- ✅ Smart contract integration

### Next Phase (Scaling & Features)
- 🔄 Enhanced security audits
- 🔄 Support for SPL tokens
- 🔄 Advanced guardian tools
- 🔄 Mobile app development
- 🔄 Multi-chain support

### Future Phase (Community & Production)
- ⏳ Full security audits
- ⏳ Production deployment
- ⏳ Open source release
- ⏳ Community governance

## ⚖️ Legal

This project is experimental software. Please read our [Terms and Conditions](./app/terms/page.tsx) before using VaultChain.

### Key Points
- **Educational Purpose**: This is a learning project
- **Use at Your Own Risk**: No warranties or guarantees
- **Small Amounts Only**: Don't risk funds you can't afford to lose
- **Experimental Software**: Features may change or break

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vitalik Buterin** for highlighting the importance of wallet recovery
- **Solana Foundation** for the amazing blockchain platform
- **Anchor Framework** team for smart contract development tools
- **Open Source Community** for the incredible tools and libraries

---

**Built with ❤️ for the future of self-custody**

*Remember: VaultChain is experimental software. Only use it with small amounts you can afford to lose while we continue building and learning.*

## 📧 Contact

- **GitHub**: [@xDipzz](https://github.com/xDipzz)
- **Project Link**: [https://github.com/xDipzz/vaultchain](https://github.com/xDipzz/vaultchain)

---

<div align="center">

![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)

**⭐ Star this repo if you found it helpful!**

</div>
