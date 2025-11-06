'use client';

import Image from 'next/image';
import { Search, Bell, User, ChevronDown, Circle } from 'lucide-react';

export function TopBar() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between">
        {/* Left side - Logo & Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3">
            <Image 
              src="/logo_black.png" 
              alt="Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-slate-900">Supply Chain Command Center</h1>
              <div className="flex items-center space-x-2">
                <Circle className="w-2 h-2 fill-green-500 text-green-500" />
                <span className="text-xs text-slate-600">System operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Search & Actions */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search suppliers, products, orders..."
              className="w-80 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="flex items-center space-x-2.5 cursor-pointer hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-900">Sarah Chen</p>
                <p className="text-xs text-slate-500">Supply Chain Manager</p>
              </div>
              <div className="w-9 h-9 kulfi-gradient rounded-full flex items-center justify-center ring-2 ring-blue-100">
                <span className="text-white text-sm font-semibold">SC</span>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
