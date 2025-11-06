'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MainContent } from '@/components/layout/MainContent';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { SupplierTracker } from '@/components/dashboard/SupplierTracker';
import { ProductTracker } from '@/components/dashboard/ProductTracker';
import { ProductionTimeline } from '@/components/dashboard/ProductionTimeline';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { AIChat } from '@/components/dashboard/AIChat';

// Placeholder components for other views
function InsightsPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI Insights & Recommendations</h1>
        <p className="text-slate-600">Data-driven insights and actionable recommendations</p>
      </div>
      <div className="kulfi-card p-8 text-center">
        <p className="text-slate-500">AI-powered insights and recommendations coming soon...</p>
      </div>
    </div>
  );
}

function ImportView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Import Data</h1>
        <p className="text-slate-600">Upload spreadsheets and sync with external sources</p>
      </div>
      <div className="kulfi-card p-8 text-center">
        <p className="text-slate-500">Data import interface coming soon...</p>
      </div>
    </div>
  );
}

export function Dashboard() {
  const [activeView, setActiveView] = useState('overview');

  const renderView = () => {
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
      case 'import':
        return <ImportView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-20">
        <TopBar />
        <MainContent>{renderView()}</MainContent>
      </div>
    </div>
  );
}
