'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MainContent } from '@/components/layout/MainContent';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { SupplierTracker } from '@/components/dashboard/SupplierTracker';
import { AIChat } from '@/components/dashboard/AIChat';

// Placeholder components for other views
function ProductTracker() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Product Tracker</h1>
        <p className="text-gray-600">Monitor product lifecycle and quality metrics</p>
      </div>
      <div className="kulfi-card p-8 text-center">
        <p className="text-gray-500">Product tracking interface coming soon...</p>
      </div>
    </div>
  );
}

function ProductionTimeline() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Production Timeline</h1>
        <p className="text-gray-600">Gantt chart view of production schedules</p>
      </div>
      <div className="kulfi-card p-8 text-center">
        <p className="text-gray-500">Production timeline with Gantt charts coming soon...</p>
      </div>
    </div>
  );
}

function AlertsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Alerts & Risk Management</h1>
        <p className="text-gray-600">Real-time alerts and risk assessment</p>
      </div>
      <div className="kulfi-card p-8 text-center">
        <p className="text-gray-500">Comprehensive alerts and risk panel coming soon...</p>
      </div>
    </div>
  );
}

function InsightsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Insights & Recommendations</h1>
        <p className="text-gray-600">Data-driven insights and actionable recommendations</p>
      </div>
      <div className="kulfi-card p-8 text-center">
        <p className="text-gray-500">AI-powered insights and recommendations coming soon...</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [activeView, setActiveView] = useState('overview');

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview />;
      case 'suppliers':
        return <SupplierTracker />;
      case 'products':
        return <ProductTracker />;
      case 'timeline':
        return <ProductionTimeline />;
      case 'alerts':
        return <AlertsPanel />;
      case 'insights':
        return <InsightsPanel />;
      case 'chat':
        return <AIChat />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <TopBar />
        <MainContent>
          {renderContent()}
        </MainContent>
      </div>
    </div>
  );
}
