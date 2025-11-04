# 🚀 Quick Setup Guide

## Prerequisites

Before running this demo, ensure you have the following installed:

### 1. Install Node.js

**macOS (using Homebrew)**:
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js (includes npm)
brew install node

# Verify installation
node --version  # Should show v18.x or higher
npm --version   # Should show v9.x or higher
```

**Alternative: Download from nodejs.org**:
1. Visit https://nodejs.org/
2. Download the LTS version (18.x or higher)
3. Run the installer
4. Verify: Open Terminal and run `node --version`

### 2. Install Dependencies

Once Node.js is installed, navigate to the project directory and install dependencies:

```bash
cd /Users/nikikotecha/Documents/lychee_labs/siemens-demo
npm install
```

This will install:
- React 18 & React DOM
- TypeScript 5
- Electron 28
- Vite 5
- Tailwind CSS 3
- Framer Motion (animations)
- Lucide React (icons)
- Zustand (state management)
- clsx (utility)
- And all development dependencies

## 🎮 Running the Demo

### Development Mode (Hot Reload)

For the best development experience with hot reloading:

```bash
npm run electron:dev
```

This will:
1. Start Vite dev server on http://localhost:5173
2. Launch Electron with DevTools open
3. Enable hot module replacement (changes appear instantly)

### Build for Production

To create a production build:

```bash
# Build the app
npm run electron:build

# Build Windows installer specifically
npm run build:win
```

The output will be in the `release/` folder.

## 📁 Project Structure Explained

```
siemens-demo/
├── electron/              # Electron main process
│   ├── main.ts           # Main process entry point
│   └── preload.ts        # Preload script
│
├── src/                  # React application
│   ├── components/       # React components
│   │   ├── steps/        # 3 workflow steps
│   │   │   ├── LoadAssembly.tsx
│   │   │   ├── JointMapping.tsx
│   │   │   └── ExportValidate.tsx
│   │   ├── Header.tsx
│   │   ├── StepNavigation.tsx
│   │   ├── SplashScreen.tsx
│   │   └── SuccessModal.tsx
│   ├── store/
│   │   └── useAppStore.ts    # Zustand state management
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
│
├── media/                # Assets
│   └── sample.urdf       # Mock URDF output
│
├── index.html            # HTML template
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind CSS config
├── vite.config.ts        # Vite build config
└── README.md             # Documentation
```

## 🔧 Development Tools

### Available Scripts

```bash
# Development with hot reload
npm run electron:dev

# Type checking
npm run type-check

# Build for production
npm run electron:build

# Build Windows executable
npm run build:win

# Preview production build
npm run preview
```

### VS Code Extensions (Recommended)

For the best development experience, install these VS Code extensions:

1. **ESLint** - JavaScript/TypeScript linting
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - Tailwind class autocomplete
4. **TypeScript Vue Plugin (Volar)** - Better TypeScript support

## 🐛 Troubleshooting

### Issue: "npm: command not found"

**Solution**: Install Node.js (see Prerequisites above)

### Issue: TypeScript errors in editor

**Solution**: 
1. Ensure all dependencies are installed: `npm install`
2. Restart VS Code
3. Check TypeScript version: `npx tsc --version`

### Issue: Electron window doesn't open

**Solution**:
1. Check if port 5173 is already in use
2. Try: `npm run electron:dev` again
3. Check terminal for error messages

### Issue: Build fails

**Solution**:
1. Clean install: `rm -rf node_modules && npm install`
2. Clear cache: `npm cache clean --force`
3. Rebuild: `npm run electron:build`

### Issue: Dark mode not working

**Solution**: The app uses Tailwind's dark mode with class strategy. Toggle using the moon/sun icon in the header.

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  siemens: {
    green: '#009999',  // Primary color
    blue: '#003B49',   // Secondary color
    grey: '#E6E6E6',   // Accent color
  },
}
```

### Adding New Steps

1. Create new component in `src/components/steps/`
2. Add step to `src/components/StepNavigation.tsx`
3. Add route in `src/App.tsx`
4. Update state in `src/store/useAppStore.ts`

### Modifying Mock Data

Edit joint data in `src/store/useAppStore.ts`:

```typescript
const mockJoints: JointLink[] = [
  // Add or modify joints here
]
```

## 🚀 Performance Tips

1. **Lazy Loading**: Components are already optimized
2. **Memoization**: Use React.memo for expensive components
3. **Virtual Scrolling**: Consider for large joint tables
4. **Image Optimization**: Compress assets in `media/` folder

## 📦 Building for Distribution

### Windows

```bash
npm run build:win
```

Output: `release/Siemens NX URDF Exporter Setup.exe`

### macOS

```bash
npm run electron:build
```

Output: `release/Siemens NX URDF Exporter.dmg`

### Linux

Add to `package.json` build config:

```json
"linux": {
  "target": ["AppImage", "deb"]
}
```

Then run: `npm run electron:build`

## 🧪 Testing the Demo

### Demo Flow Checklist

- [ ] Splash screen appears on launch
- [ ] Header shows app name and controls
- [ ] Dark mode toggle works
- [ ] Sound toggle works
- [ ] Step 1: File selection works
- [ ] Step 1: Component tree appears
- [ ] Step 1: "Analyze Kinematics" button works
- [ ] Step 2: Joint table loads with 12 joints
- [ ] Step 2: Can edit joint types
- [ ] Step 2: AI suggestions appear on right
- [ ] Step 3: Export toggle works
- [ ] Step 3: "Generate URDF" button works
- [ ] Step 3: Progress bar animates
- [ ] Step 3: Console logs stream
- [ ] Success modal appears
- [ ] Success modal shows validation results
- [ ] "Open in Isaac Sim" alert works
- [ ] Can navigate between steps

## 🎯 Demo Presentation Tips

1. **Timing**: Practice the 90-second demo script
2. **Wow Moments**: Emphasize the time savings (480x faster)
3. **Smooth Flow**: Don't wait for animations to complete
4. **Backup**: Have screenshots ready in case of technical issues
5. **Talking Points**:
   - AI-powered joint detection
   - Real-time validation
   - Isaac Sim integration
   - Professional Siemens UI
   - Massive time savings

## 📞 Support

For issues or questions:
- Check GitHub Issues
- Contact Lychee Labs
- Review the main README.md

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Electron Documentation](https://www.electronjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Ready to impress Siemens? 🚀**

After installing dependencies, run:
```bash
npm run electron:dev
```

And your professional demo will launch in seconds!
