# VaultChain - Solana Wallet Recovery System

A comprehensive Solana wallet recovery solution built with Next.js 14, TypeScript, and ShadCN UI components.

## 🚀 Features

- **Social Recovery System**: Secure wallet recovery using trusted guardians
- **Multi-Wallet Support**: Compatible with Phantom, Solflare, and other Solana wallets
- **Beautiful UI**: Modern, responsive interface built with ShadCN components
- **Dark/Light Theme**: Full theme support with next-themes
- **Animated Components**: Smooth animations with Framer Motion
- **Dashboard Interface**: Complete wallet management dashboard
- **Guardian Management**: Easy setup and management of recovery guardians
- **Transaction Monitoring**: Real-time transaction tracking and notifications

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Animations**: Framer Motion
- **Blockchain**: Solana Web3.js & Wallet Adapter
- **Theme**: next-themes for dark/light mode
- **Icons**: Lucide React

## 📦 Installation & Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Component Structure

The project includes a comprehensive set of components imported from v0.dev:

### 📱 Pages
- **Landing Page** (`app/page.tsx`) - Beautiful hero section with wallet connection
- **Dashboard** (`app/dashboard/page.tsx`) - Main wallet overview
- **Recovery Setup** (`app/dashboard/setup-recovery/page.tsx`) - Guardian configuration
- **Guardian Management** (`app/dashboard/guardians/page.tsx`) - Manage trusted contacts
- **Recovery Process** (`app/dashboard/recovery/page.tsx`) - Wallet recovery interface
- **Settings** (`app/dashboard/settings/page.tsx`) - Wallet and security settings

### 🎨 UI Components
- **Sophisticated Background** - Animated gradient backgrounds
- **Interactive Elements** - Mouse tracking and dynamic animations
- **Theme Support** - Complete dark/light theme system
- **Wallet Integration** - Solana wallet connection components

### 🔐 Solana Integration
- **Wallet Adapter** - Multi-wallet support (Phantom, Solflare, etc.)
- **Provider Setup** - Solana network configuration
- **Program Integration** - Smart contract interaction (Anchor-based)

## 🌟 Key Features

### 🛡️ Recovery System
- Set up trusted guardians for wallet recovery
- Configure recovery thresholds and delays
- Social recovery without seed phrase exposure

### 💼 Dashboard
- Wallet balance and transaction history
- Guardian status monitoring
- Security settings and 2FA management
- Device management and login history

### 🎨 Design System
- Modern glassmorphism design
- Animated components and backgrounds
- Responsive layout for all devices
- Accessible UI with proper contrast

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Project Structure
```
app/
├── dashboard/           # Dashboard pages
├── globals.css         # Global styles
├── layout.tsx          # Root layout
└── page.tsx            # Landing page

components/
├── ui/                 # ShadCN UI components
├── dashboard-*         # Dashboard specific components
├── wallet-*            # Wallet integration components
└── theme-provider.tsx  # Theme management
```

## 📝 Environment Setup

No additional environment variables required for local development. The app connects to Solana devnet by default.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js, ShadCN, and Solana Web3.js
