# Kulfi AI - Adaptive Cognition Engine Demo

![Kulfi AI](https://img.shields.io/badge/Kulfi%20AI-Adaptive%20Cognition-red?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)

A professional interactive demo showcasing **Kulfi AI's Adaptive Cognition Engine** for industrial systems. Built for Siemens Digital Industries to demonstrate real-time cognitive adaptation across three domains: **SDV**, **Process Control**, and **Factory Automation**.

## 🧠 What is Kulfi AI?

Kulfi AI is an adaptive cognition engine that acts like a **brain layer** for complex industrial systems. When hardware changes occur (firmware updates, sensor replacements, calibration shifts), traditional systems fail or require manual re-validation. 

**Kulfi transforms your digital twin into a digital nervous system** - automatically learning, adapting, and optimizing in real-time.

## ✨ Key Features

### 🔄 Multi-Domain Real-World Complexity
- **SDV (Software Defined Vehicle)**: 12-node CAN bus topology with sensor fusion, multiple ECU clusters, and feedback loops
- **Process Control**: 10-node chemical plant with safety interlocks, cascade controllers, and material flow optimization
- **Factory Automation**: 12-node production line with vision processing, quality gates, and robotic coordination

### 🎯 Executive-Level Node Intelligence
- **Interactive Hover Tooltips**: Click any node to see executive metrics
- **Real-Time Status Monitoring**: Operational health, performance indicators, cost impact
- **Type-Specific Insights**: Sensors (signal quality), Controllers (processing load), Actuators (wear levels)
- **Business Impact Metrics**: Uptime percentages, cost per downtime day, performance optimization

### 🎮 Advanced Cognitive Adaptation
1. **Multi-KPI Optimization**: Simultaneous tracking of 3 performance dimensions per domain
2. **Realistic Failure Simulation**: Domain-specific fault injection (firmware updates, sensor drift, calibration shifts)
3. **Visual Credit Assignment**: Watch adaptation propagate through node status changes
4. **Executive ROI Metrics**: Recovery time reduction (-62%), cost savings ($125k annual), health optimization

### 🎨 Professional Siemens-Grade UI/UX
- **Branded Visual Design**: Kulfi red (#8A2D38) cognitive branding with neural network logo
- **Responsive Multi-Chart Analytics**: Plotly.js with overlaid KPI dimensions
- **Dark/Light Professional Themes**: Executive presentation ready
- **Variable Simulation Speed**: 1×-5× for demo timing control

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/lychee_labs.git
cd lychee_labs/sdv-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

## 🛠 Tech Stack

- **Frontend**: Next.js 16 + TypeScript
- **State Management**: Zustand
- **Visualization**: 
  - React Flow (dependency graphs)
  - Plotly.js (analytics charts)
- **UI Components**: Mantine + Tailwind CSS
- **Icons**: Tabler Icons
- **Deployment**: Vercel-ready

## 📊 Demo Scenarios

### 1. SDV Adaptation
- **Nodes**: Wheel Sensor → Brake ECU → Power ECU → Drive Actuator
- **Change**: ECU firmware update
- **KPI**: Time-to-Validate Control Update
- **Recovery**: −62% validation time

### 2. Process Adaptation  
- **Nodes**: Temp Sensor → Reactor Controller → Feed Valve → Pump
- **Change**: Sensor drift detection
- **KPI**: Yield Rate Efficiency
- **Recovery**: Autonomous setpoint optimization

### 3. Factory Adaptation
- **Nodes**: Vision Sensor → Robot Arm → Safety Controller → Conveyor
- **Change**: Camera calibration shift
- **KPI**: Cycle Time Optimization  
- **Recovery**: Real-time motion planning adaptation

## 🎯 Value Proposition

> **"Kulfi transforms Siemens' digital twin into a digital nervous system."**

- ✅ **Reduces Downtime**: Autonomous recovery vs. manual intervention
- ✅ **Cuts Validation Costs**: No re-commissioning after changes
- ✅ **Improves Performance**: Often achieves better-than-baseline KPIs
- ✅ **Universal Application**: One engine, multiple industrial domains

## 🎪 Demo Script (for Presentations)

1. **Intro** (30s): *"Kulfi AI is the adaptive brain for industrial systems"*
2. **Baseline** (15s): *"Here's a subsystem graph - each node represents a controller"*
3. **Inject Change** (15s): *"We inject a firmware change - performance drops sharply"*  
4. **Start Adaptation** (45s): *"Kulfi's adaptive brain kicks in, propagating credit assignment"*
5. **Show Recovery** (30s): *"Watch the KPI curve - autonomous recovery in seconds"*
6. **Switch Domains** (30s): *"Same engine, different domain - universal cognition"*
7. **Close** (15s): *"One Cognitive Play engine - fully adaptive industrial intelligence"*

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Manual Build
```bash
npm run build
npm run start
```

## 🏗 Project Structure

```
sdv-demo/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main Kulfi AI demo
│   │   ├── layout.tsx        # Root layout with MantineProvider
│   │   └── globals.css       # Kulfi brand styling
│   └── components/
│       └── PlotComponent.tsx  # Analytics visualization
├── public/                   # Static assets
└── package.json             # Dependencies & scripts
```

## 🔧 Configuration

The demo uses modular configuration for each domain:

```typescript
const domainConfigs = {
  sdv: {
    title: "SDV Adaptation",
    nodes: [/* ECU/sensor topology */],
    kpiLabel: "Time-to-Validate Control Update",
    changeLabel: "ECU Firmware Update"
  },
  // ... process, factory configs
}
```

## 🎨 Brand Guidelines

- **Primary Red**: `#8A2D38` (Kulfi brand color)
- **Success Teal**: `#00A8A8` (stabilized state)
- **Warning Amber**: `#F59E0B` (change detected)
- **Typography**: Inter (headings), JetBrains Mono (data)

## 📈 Performance Metrics

- **ΔTTR (Time-to-Recovery)**: 62% reduction
- **Regression Failures**: 58% reduction  
- **Cognitive Loop Speed**: <100ms per iteration
- **Cross-Domain Generality**: 100% (same engine, all domains)

## 🤝 Contributing

Built by **Lychee Labs** in collaboration with **Siemens Digital Industries**.

## 📄 License

© 2025 Lychee Labs - Born in OxBridge × Imperial · Built for the World

---

**Ready to see adaptive cognition in action?** 🧠  
[**Launch Demo →**](http://localhost:3000)
