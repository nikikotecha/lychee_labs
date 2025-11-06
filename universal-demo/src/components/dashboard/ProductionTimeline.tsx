'use client';

import { Calendar, Clock, CheckCircle, AlertCircle, Package, Truck, Music, MapPin } from 'lucide-react';
import { mockOrders, mockProducts } from '@/lib/mockData';
import { formatCurrency } from '@/lib/utils';

export function ProductionTimeline() {
  // Group orders by week
  const getWeekNumber = (date: Date) => {
    const onejan = new Date(date.getFullYear(), 0, 1);
    const millisecsInDay = 86400000;
    return Math.ceil((((date.getTime() - onejan.getTime()) / millisecsInDay) + onejan.getDay() + 1) / 7);
  };

  const today = new Date();
  const next30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    return date;
  });

  // Timeline milestones
  const milestones = [
    {
      id: 1,
      date: '2025-11-08',
      title: 'Quality Check - Drake Merch',
      type: 'qc',
      status: 'upcoming',
      artist: 'Drake',
      details: '15k hoodies final inspection',
      critical: true
    },
    {
      id: 2,
      date: '2025-11-12',
      title: 'Delivery Deadline - Drake Tour',
      type: 'deadline',
      status: 'at-risk',
      artist: 'Drake',
      details: 'For All The Dogs Tour - 6 days',
      critical: true
    },
    {
      id: 3,
      date: '2025-11-15',
      title: 'Production Start - Bad Bunny Caps',
      type: 'production',
      status: 'scheduled',
      artist: 'Bad Bunny',
      details: '10k units - factory confirmed',
      critical: false
    },
    {
      id: 4,
      date: '2025-11-18',
      title: 'Delivery Deadline - Taylor Swift',
      type: 'deadline',
      status: 'on-track',
      artist: 'Taylor Swift',
      details: 'Eras Tour EU merchandise',
      critical: false
    },
    {
      id: 5,
      date: '2025-11-22',
      title: 'Shipping Begins - Alpine Textiles',
      type: 'shipping',
      status: 'scheduled',
      artist: 'The Weeknd',
      details: '€76k order value',
      critical: false
    },
    {
      id: 6,
      date: '2025-11-25',
      title: 'Delivery Deadline - Bad Bunny Tour',
      type: 'deadline',
      status: 'on-track',
      artist: 'Bad Bunny',
      details: 'Most Wanted Tour merch',
      critical: false
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Production Timeline</h1>
        <p className="text-slate-600">30-day view of critical milestones and deliveries</p>
      </div>

      {/* Timeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-medium text-slate-600">NEXT 7 DAYS</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">3</p>
          <p className="text-xs text-slate-600 mt-1">Critical milestones</p>
        </div>
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-xs font-medium text-slate-600">AT RISK</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">1</p>
          <p className="text-xs text-slate-600 mt-1">Deadline in danger</p>
        </div>
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <Truck className="w-5 h-5 text-green-600" />
            <span className="text-xs font-medium text-slate-600">SHIPPING</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">2</p>
          <p className="text-xs text-slate-600 mt-1">Orders in transit</p>
        </div>
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-xs font-medium text-slate-600">ON TRACK</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">4</p>
          <p className="text-xs text-slate-600 mt-1">Meeting deadlines</p>
        </div>
      </div>

      {/* Visual Timeline */}
      <div className="kulfi-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Next 30 Days</h2>
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-slate-600">Critical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-slate-600">On Track</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-slate-600">Scheduled</span>
            </div>
          </div>
        </div>

        {/* Timeline Events */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />
          
          <div className="space-y-6">
            {milestones.map((milestone) => {
              const daysUntil = Math.ceil((new Date(milestone.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
              const isPast = daysUntil < 0;
              const isToday = daysUntil === 0;
              
              return (
                <div key={milestone.id} className="relative pl-16">
                  {/* Timeline dot */}
                  <div className={`absolute left-6 w-5 h-5 rounded-full border-4 border-white ${
                    milestone.status === 'at-risk' ? 'bg-red-500' :
                    milestone.status === 'on-track' ? 'bg-green-500' :
                    milestone.status === 'scheduled' ? 'bg-blue-500' :
                    'bg-slate-300'
                  } ${milestone.critical ? 'ring-4 ring-red-100' : ''}`} />
                  
                  <div className={`p-4 rounded-lg border-2 ${
                    milestone.status === 'at-risk' ? 'bg-red-50 border-red-300' :
                    milestone.status === 'on-track' ? 'bg-green-50 border-green-300' :
                    'bg-blue-50 border-blue-300'
                  } ${isPast ? 'opacity-50' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {milestone.type === 'deadline' && <Calendar className="w-4 h-4 text-slate-600" />}
                          {milestone.type === 'qc' && <CheckCircle className="w-4 h-4 text-slate-600" />}
                          {milestone.type === 'production' && <Package className="w-4 h-4 text-slate-600" />}
                          {milestone.type === 'shipping' && <Truck className="w-4 h-4 text-slate-600" />}
                          <h3 className="font-bold text-slate-900">{milestone.title}</h3>
                          {milestone.critical && (
                            <span className="px-2 py-0.5 bg-red-200 text-red-800 text-xs font-bold rounded-full">
                              CRITICAL
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-700 mb-1">{milestone.details}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Music className="w-3 h-3" />
                            <span>{milestone.artist}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(milestone.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <div className={`text-2xl font-bold ${
                          daysUntil <= 3 ? 'text-red-600' :
                          daysUntil <= 7 ? 'text-orange-600' :
                          'text-green-600'
                        }`}>
                          {isToday ? 'TODAY' : isPast ? 'PAST' : `${daysUntil}d`}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {isToday ? 'Due today' : isPast ? 'Completed' : 'days left'}
                        </p>
                      </div>
                    </div>
                    
                    {milestone.status === 'at-risk' && (
                      <div className="mt-3 pt-3 border-t border-red-200">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700">
                            Escalate Now
                          </button>
                          <button className="px-3 py-1 bg-white border border-slate-300 text-xs font-medium rounded hover:bg-slate-50">
                            Contact Supplier
                          </button>
                          <button className="px-3 py-1 bg-white border border-slate-300 text-xs font-medium rounded hover:bg-slate-50">
                            Update Timeline
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Calendar View Option */}
      <div className="kulfi-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">November 2025</h2>
          <button className="kulfi-button-secondary text-sm">
            View Full Calendar
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-slate-600 py-2">
              {day}
            </div>
          ))}
          
          {Array.from({ length: 30 }, (_, i) => {
            const date = new Date(2025, 10, i + 1); // November 2025
            const hasMilestone = milestones.some(m => 
              new Date(m.date).toDateString() === date.toDateString()
            );
            const milestone = milestones.find(m => 
              new Date(m.date).toDateString() === date.toDateString()
            );
            
            return (
              <div
                key={i}
                className={`aspect-square p-2 rounded-lg text-center ${
                  hasMilestone
                    ? milestone?.status === 'at-risk'
                      ? 'bg-red-100 border-2 border-red-500'
                      : 'bg-green-100 border-2 border-green-500'
                    : 'bg-slate-50 hover:bg-slate-100'
                } transition-colors cursor-pointer`}
              >
                <span className="text-sm font-medium text-slate-900">{i + 1}</span>
                {hasMilestone && (
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
