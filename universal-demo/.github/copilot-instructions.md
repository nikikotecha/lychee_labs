# Kulfi Dashboard MVP - GitHub Copilot Instructions

## Project Overview
This is a professional supply chain management dashboard for global merchandise operations. The project demonstrates modern React/Next.js development with TypeScript, Tailwind CSS, and AI-powered features.

## Architecture & Stack

### Core Technologies
- **Next.js 16** with App Router (latest)
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Recharts** for data visualization
- **Lucide React** for icons

### Project Structure
```
src/
├── app/           # Next.js App Router
├── components/    # React components
│   ├── layout/   # Layout components (Sidebar, TopBar, MainContent)
│   └── dashboard/ # Dashboard modules (Overview, Suppliers, Chat, etc.)
├── lib/          # Utilities, types, and mock data
```

## Design System & Branding

### Kulfi Brand Colors
```css
--kulfi-orange: #ff6b35;  /* Primary brand color */
--kulfi-cream: #fff5e6;   /* Warm backgrounds */
--kulfi-brown: #8b4513;   /* Secondary accents */
--kulfi-gold: #ffd700;    /* Premium highlights */
```

### Design Principles
- **Executive-friendly**: Clean, professional interface
- **Warm & modern**: Kulfi-inspired color palette
- **Data-dense**: Efficiently display complex information
- **Mobile-responsive**: Works across all devices

### CSS Classes
- `.kulfi-gradient` - Orange to amber gradient
- `.kulfi-card` - Standard white card with subtle shadow
- `.kulfi-button-primary` - Orange branded buttons
- `.kulfi-button-secondary` - White outlined buttons
- `.status-badge` - Colored status indicators

## Component Patterns

### File Naming
- Use PascalCase for component files: `DashboardOverview.tsx`
- Use camelCase for utility files: `mockData.ts`
- Use kebab-case for routes: `/supplier-details`

### Component Structure
```tsx
'use client'; // For client components

import { useState } from 'react';
import { IconName } from 'lucide-react';

export function ComponentName() {
  // Component logic
  return (
    <div className="space-y-6">
      {/* Content */}
    </div>
  );
}
```

### State Management
- Use React hooks for local state
- Prefer useState and useEffect over complex state managers
- Pass props down for communication between components

## Data Patterns

### Mock Data Structure
All mock data is in `src/lib/mockData.ts`:
- `mockSuppliers`: Supplier performance data
- `mockProducts`: Product lifecycle information
- `mockOrders`: Order tracking data
- `mockAlerts`: Risk and alert notifications
- `mockMetrics`: KPI and performance metrics

### TypeScript Types
Defined in `src/lib/types.ts`:
- `Supplier`, `Product`, `Order` - Core entities
- `Alert`, `Metric` - Performance indicators
- `ChatMessage`, `InsightRecommendation` - AI features

## UI/UX Patterns

### Layout Structure
```tsx
<Sidebar /> {/* Navigation */}
<div className="flex-1">
  <TopBar /> {/* Search, notifications, user */}
  <MainContent>
    {/* Dynamic dashboard content */}
  </MainContent>
</div>
```

### Common Components
- **Metric Cards**: Display KPIs with trend indicators
- **Status Badges**: Colored indicators for entity status
- **Chart Containers**: Recharts wrapped in kulfi-card
- **Search Bars**: Consistent search input styling

### Responsive Design
- Mobile-first approach
- Collapsible sidebar on mobile
- Grid layouts that stack on smaller screens
- Touch-friendly interactive elements

## AI Integration

### Chat Interface
- Natural language processing simulation
- Contextual responses based on mock data
- Quick action buttons for common queries
- Typing indicators and message history

### Insights & Recommendations
- Data-driven suggestions
- Risk assessment algorithms
- Performance optimization recommendations
- Prescriptive (not just descriptive) analytics

## Performance Considerations

### Optimization Strategies
- Use `'use client'` only when necessary
- Implement lazy loading for heavy components
- Optimize images with Next.js Image component
- Use CSS modules for component-specific styles

### Chart Performance
- Limit data points for smooth rendering
- Use ResponsiveContainer for chart responsiveness
- Implement data sampling for large datasets

## Development Workflow

### Adding New Features
1. Create TypeScript types in `src/lib/types.ts`
2. Add mock data in `src/lib/mockData.ts`
3. Build component in appropriate `src/components/` subdirectory
4. Add navigation item to Sidebar
5. Register route in main Dashboard component

### Styling Guidelines
- Use Tailwind utility classes primarily
- Create custom CSS classes for reusable patterns
- Follow Kulfi brand color scheme
- Maintain consistent spacing (space-y-6, gap-6, etc.)

### Code Quality
- Use TypeScript strictly (no `any` types)
- Follow ESLint configuration
- Use meaningful variable names
- Add comments for complex business logic

## Common Use Cases

### Adding a New Dashboard View
```tsx
// 1. Create component
export function NewView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">New View</h1>
        <p className="text-gray-600">Description</p>
      </div>
      {/* Content */}
    </div>
  );
}

// 2. Add to navigation in Sidebar.tsx
{ id: 'newview', name: 'New View', icon: IconName }

// 3. Add route in Dashboard.tsx
case 'newview':
  return <NewView />;
```

### Creating Data Visualizations
```tsx
<div className="kulfi-card p-6">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart Title</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#f97316" />
    </BarChart>
  </ResponsiveContainer>
</div>
```

## Testing Strategy

### Component Testing
- Test user interactions (clicks, form submissions)
- Verify data rendering from props
- Check responsive behavior
- Validate accessibility features

### Integration Testing
- Test navigation between views
- Verify data flow between components
- Check chart rendering with various data sets

## Deployment Notes

### Build Optimization
- Uses Next.js 16 with Turbopack for fast builds
- Optimized for static generation where possible
- Implements proper font loading with Inter

### Environment Configuration
- Ready for environment variables in `.env.local`
- Configured for Vercel deployment
- Docker-ready for containerized deployment

## Future Enhancements

### Planned Features
- Real-time data integration
- Advanced filtering and search
- Export functionality for reports
- User authentication and permissions
- Mobile app companion

### Technical Debt
- Replace mock data with API integration
- Implement proper error boundaries
- Add comprehensive test suite
- Optimize bundle size

Remember: This is a demonstration MVP showcasing modern React patterns, TypeScript usage, and professional UI/UX design for supply chain management applications.
