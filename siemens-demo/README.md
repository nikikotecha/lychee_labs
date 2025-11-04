# Siemens NX → URDF Exporter Demo

**Version:** Demo v0.2 (Not for production use)

An AI-powered demo application that simulates the end-to-end workflow of converting Siemens NX assemblies to URDF format with Isaac Sim validation.

![Siemens Demo](https://img.shields.io/badge/Siemens-009999?style=for-the-badge&logo=siemens)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)

## 🎯 Features

- **Interactive Tutorial** - Guided walkthrough for first-time users (auto-starts on first visit)
- **Professional Siemens Industrial UI** - Clean, muted, high-clarity design
- **3-Step Workflow** - Load → Map → Export
- **AI-Powered Joint Detection** - Automatic kinematic chain analysis
- **Real-time Validation** - Instant feedback on joint configurations
- **Isaac Sim Integration** - Preview and validate in NVIDIA Isaac Sim
- **Dark Mode** - Built-in dark mode support
- **Progress Tracking** - Detailed status console and progress indicators
- **Export Statistics** - Time savings and efficiency metrics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run electron:dev

# Build for production
npm run electron:build

# Build Windows executable
npm run build:win
```

## 📋 Demo Script (90 seconds)

1. **Launch Application** - Splash screen appears
2. **Load NX File** - Click "Select NX Assembly File" → Component tree populates
3. **Analyze Kinematics** - Click "Analyze Kinematics" → Auto-detects 12 joints
4. **Review Mapping** - View joint/link table with AI suggestions
5. **Export URDF** - Click "Generate URDF" → Progress bar + console logs
6. **Success Modal** - Shows validation results (Kinematics OK, No Collisions)
7. **Isaac Preview** - Click "Open in Isaac Sim" → Plays animation
8. **Close with punchline**: "This reduces 4 hours of manual URDF mapping to 30 seconds."

## 🎨 Design System

### Colors
- **Primary**: `#009999` (Siemens Green)
- **Secondary**: `#003B49` (Dark Industrial Blue)
- **Accent**: `#E6E6E6` (Neutral Grey)

### Typography
- **Font Family**: Inter, Roboto (fallback for Siemens Sans)
- Professional, sharp interfaces with no gradients or rounded-childish UI

## 📁 Project Structure

```
siemens-demo/
├── electron/           # Electron main process
│   ├── main.ts
│   └── preload.ts
├── src/
│   ├── components/     # React components
│   │   ├── steps/      # 3 workflow steps
│   │   ├── Header.tsx
│   │   ├── StepNavigation.tsx
│   │   ├── SplashScreen.tsx
│   │   └── SuccessModal.tsx
│   ├── store/          # Zustand state management
│   │   └── useAppStore.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── media/              # Mock assets
│   ├── sample.urdf
│   └── isaac-sim-preview.mp4
├── docs/               # Documentation
│   └── demo-script.pdf
└── package.json
```

## 🔑 Key Components

### Step 1: Load Assembly
- File picker with NX assembly import
- Component hierarchy tree view
- "Analyze Kinematics" button with loading state

### Step 2: Joint & Link Mapping
- Editable data table (12 links)
- Inline joint type editing
- AI suggestions sidebar
- Real-time validation indicators

### Step 3: Export & Validate
- Export configuration toggle
- Progress bar with percentage
- Status console with log streaming
- Export statistics dashboard
- Success modal with validation results

## 🎯 Mock Data

All data is simulated for demo purposes:
- Sample NX assembly structure (17 components)
- 12 pre-configured joints (revolute, prismatic, fixed)
- Fake processing logs and timing
- Mock URDF output file
- Placeholder Isaac Sim validation

## ⚡ Performance

- **Startup**: <3 seconds to splash screen
- **File Load**: ~800ms simulated
- **Analysis**: ~2 seconds simulated
- **Export**: ~1.7 seconds with progress animation

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Desktop**: Electron 28
- **Styling**: Tailwind CSS 3
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State**: Zustand
- **Build**: Vite 5

## 📦 Build & Deploy

### Development
```bash
npm run electron:dev
```

### Production Build
```bash
npm run electron:build
```

### Windows Installer
```bash
npm run build:win
```

Output: `release/Siemens NX URDF Exporter Setup.exe`

## 🎭 Demo Mode Features

- ✅ Splash screen with loading animation
- ✅ Simulated file selection
- ✅ Animated component tree
- ✅ Auto-populated joint table
- ✅ Editable joint properties
- ✅ Progress indicators
- ✅ Console log streaming
- ✅ Success modal with stats
- ✅ Dark mode toggle
- ✅ Sound effects toggle
- ✅ Keyboard shortcuts (Ctrl+E to export)

## 🚫 What's NOT Included

This is a demo/prototype:
- ❌ Real NX API integration
- ❌ Actual URDF generation logic
- ❌ Real Isaac Sim runtime
- ❌ ROS 2 bridge
- ❌ Authentication/licensing
- ❌ Cloud deployment
- ❌ Database storage

## 🎓 Usage Tips

1. **Tutorial**: Click the ? (help) icon in header to start the guided tour anytime
2. **Dark Mode**: Click moon/sun icon in header
3. **Sound Toggle**: Click speaker icon to mute/unmute
4. **Edit Joints**: Click edit icon in joint table
5. **Step Navigation**: Click step cards to navigate (if unlocked)
6. **Export Options**: Toggle Isaac Sim preview before export

## 📊 Value Proposition

**Manual URDF Creation**: ~4 hours  
**AI-Assisted Export**: 30 seconds  
**Time Saved**: 3h 59m 30s  
**Efficiency Gain**: 480x faster

## 🤝 Contributing

This is a demo project for client presentation. For production implementation, contact Lychee Labs.

## 📄 License

Proprietary - Demo Version Only

## 📞 Contact

**Lychee Labs**  
For inquiries about production implementation: [Contact Us]

---

**Built with ❤️ for Siemens by Lychee Labs**
