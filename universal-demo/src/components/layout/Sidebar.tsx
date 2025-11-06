'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  Settings,
  Users,
  Calendar,
  Upload,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const navigation = [
  { id: 'overview', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'suppliers', name: 'Suppliers', icon: Users },
  { id: 'products', name: 'Products', icon: Package },
  { id: 'timeline', name: 'Timeline', icon: Calendar },
  { id: 'alerts', name: 'Alerts', icon: AlertTriangle },
  { id: 'insights', name: 'Insights', icon: TrendingUp },
  { id: 'chat', name: 'AI Chat', icon: MessageSquare },
  { id: 'import', name: 'Import', icon: Upload },
];

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-white shadow-lg"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Dark Sidebar - MarketPulse Style */}
      <div className="fixed left-0 top-0 h-full z-40">
        <div className="hidden lg:flex flex-col w-20 sidebar-dark h-full border-r border-slate-700/50">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b border-slate-700/50">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg p-1.5">
              <Image 
                src="/logo_black.png" 
                alt="Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <nav className="flex-1 flex flex-col items-center py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  title={item.name}
                  className={`sidebar-item w-14 h-14 flex items-center justify-center rounded-xl transition-all ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </nav>

          {/* Settings (bottom) */}
          <div className="flex items-center justify-center h-20 border-t border-slate-700/50">
            <button className="sidebar-item w-14 h-14 flex items-center justify-center rounded-xl">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile slide-out */}
        <div className={`lg:hidden fixed left-0 top-0 h-full w-72 sidebar-dark border-r border-slate-700/50 z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 kulfi-gradient rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Kulfi</h1>
                <p className="text-xs text-slate-400">Supply Chain Intelligence</p>
              </div>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileOpen(false);
                  }}
                  className={`sidebar-item w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left ${
                    isActive ? 'active' : ''
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700/50">
            <button className="sidebar-item w-full flex items-center space-x-3 px-4 py-3 rounded-xl">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
