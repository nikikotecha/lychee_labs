# Kulfi Dashboard MVP

A professional, branded supply chain management dashboard for global merchandise operations with AI-powered insights and real-time data visualization.

## 🌟 Features

### Core Modules
- **📊 Global Overview Dashboard** - Real-time KPI monitoring and supply chain metrics
- **🏭 Supplier/Product Tracker** - Comprehensive supplier performance management
- **📅 Production Timeline** - Gantt chart visualization of production schedules
- **🚨 Alerts & Risk Panel** - Real-time alerts and risk assessment
- **🔍 Root Cause Explorer** - Causal AI for supply chain optimization
- **📈 Insights & Reports** - Data-driven insights and recommendations
- **💬 AI Chat Interface** - Interactive assistant for supply chain questions

### AI-Powered Features
- **Predictive Analytics** - Forecast demand and identify potential issues
- **Risk Assessment** - Real-time risk monitoring and mitigation recommendations
- **Performance Optimization** - AI-driven suggestions for efficiency improvements
- **Prescriptive Actions** - Not just diagnostics, but actionable recommendations

## 🎨 Design System

### Kulfi Brand Colors
- **Primary Orange**: `#ff6b35` - Main brand color for CTAs and highlights
- **Cream**: `#fff5e6` - Warm background accents
- **Brown**: `#8b4513` - Secondary accent for depth
- **Gold**: `#ffd700` - Premium highlights and success states

### Design Philosophy
- **Executive-Friendly**: Clean, professional interface suitable for C-level presentations
- **Warm & Modern**: Kulfi-inspired color palette with contemporary design patterns
- **Data-Dense**: Efficiently displays complex supply chain information
- **Mobile-Responsive**: Fully functional across all device sizes

## 🛠 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4 with custom Kulfi design system
- **Charts**: Recharts for interactive data visualization
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks and context
- **Build Tool**: Turbopack for fast development

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd universal-demo

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Development

```bash
# Run in development mode with hot reload
npm run dev

# Run linting
npm run lint

# Build and test production bundle
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Kulfi branding
│   ├── page.tsx           # Main dashboard page
│   └── globals.css        # Global styles and Kulfi design system
├── components/            # React components
│   ├── Dashboard.tsx      # Main dashboard orchestrator
│   ├── layout/           # Layout components
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   ├── TopBar.tsx    # Header with search and user menu
│   │   └── MainContent.tsx # Content wrapper
│   └── dashboard/        # Dashboard modules
│       ├── DashboardOverview.tsx # KPI cards and charts
│       ├── SupplierTracker.tsx   # Supplier management
│       └── AIChat.tsx           # AI assistant interface
├── lib/                  # Utilities and data
│   ├── types.ts         # TypeScript type definitions
│   ├── mockData.ts      # Sample data for demo
│   └── utils.ts         # Helper functions and formatters
```

## 🎯 Key Components

### Dashboard Overview
- **KPI Cards**: On-time delivery, quality scores, supplier status
- **Interactive Charts**: Delivery trends, quality metrics, supplier distribution
- **Recent Alerts**: Real-time notifications with severity indicators

### Supplier Tracker
- **Supplier Cards**: Performance metrics, reliability scores, risk assessment
- **Search & Filter**: Advanced filtering by location, status, performance
- **Performance Metrics**: Visual indicators for quality, reliability, capacity

### AI Chat Assistant
- **Natural Language Queries**: Ask questions about supply chain performance
- **Contextual Responses**: AI provides specific insights based on current data
- **Quick Actions**: Pre-defined queries for common use cases
- **Prescriptive Recommendations**: Actionable suggestions, not just analysis

## 📊 Mock Data

The application includes comprehensive mock data for demonstration:

- **4 Global Suppliers** across Germany, China, Italy, and Bangladesh
- **4 Product Categories** including apparel, electronics, and accessories
- **Multiple Order Statuses** from pending to delivered
- **Real-time Alerts** with varying severity levels
- **Performance Metrics** with historical trends

## 🎨 Customization

### Brand Colors
Update the CSS variables in `src/app/globals.css`:

```css
:root {
  --kulfi-orange: #ff6b35;
  --kulfi-cream: #fff5e6;
  --kulfi-brown: #8b4513;
  --kulfi-gold: #ffd700;
}
```

### Adding New Views
1. Create component in `src/components/dashboard/`
2. Add navigation item to `src/components/layout/Sidebar.tsx`
3. Register route in `src/components/Dashboard.tsx`

## 🔧 Configuration

### Environment Variables
Create `.env.local` for environment-specific settings:

```bash
# API endpoints (when integrating real data)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_AI_ENDPOINT=https://ai.example.com

# Authentication (when adding auth)
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Kulfi brand inspiration for warm, professional design
- Supply chain industry best practices for dashboard layout
- Modern React patterns and Next.js optimization techniques

---

Built with ❤️ for global supply chain excellence
