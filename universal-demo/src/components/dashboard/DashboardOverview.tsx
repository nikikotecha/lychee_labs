'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, TrendingUp, TrendingDown, Clock, CheckCircle, XCircle, ArrowRight, Phone, Mail, ChevronRight, Package2, Euro, AlertOctagon, MapPin, Users, Truck, Calendar, Music, Globe, DollarSign, Package, Star, X, Download, Shirt, Backpack, Disc, Frame } from 'lucide-react';
import { mockMetrics, mockSuppliers, mockAlerts, mockOrders } from '@/lib/mockData';
import { formatCurrency, formatNumber } from '@/lib/utils';

// OTIF Trend Data (Last 30 days)
const otifTrendData = [
  { day: 'Week 1', otif: 78, target: 95 },
  { day: 'Week 2', otif: 75, target: 95 },
  { day: 'Week 3', otif: 69, target: 95 },
  { day: 'Week 4', otif: 72, target: 95 },
];

// Value at Risk Trend
const riskTrendData = [
  { week: 'W1', value: 280 },
  { week: 'W2', value: 320 },
  { week: 'W3', value: 385 },
  { week: 'W4', value: 412 },
];

// Artist Tour Timeline (Next 30 days)
const artistTours = [
  { artist: 'Drake', tour: 'For All The Dogs Tour', deliveryDate: 'Nov 12', daysLeft: 6, status: 'at-risk', merchandise: '15k hoodies, 8k tees', value: 186000 },
  { artist: 'Taylor Swift', tour: 'Eras Tour EU Leg', deliveryDate: 'Nov 18', daysLeft: 12, status: 'on-track', merchandise: '22k tees, 12k posters', value: 145000 },
  { artist: 'Bad Bunny', tour: 'Most Wanted Tour', deliveryDate: 'Nov 25', daysLeft: 19, status: 'on-track', merchandise: '10k caps, 5k jackets', value: 81000 },
];

// Regional Inventory Distribution
const regionalInventory = [
  { region: 'North America', value: 420, status: 'healthy', color: '#10b981' },
  { region: 'Europe', value: 280, status: 'warning', color: '#f59e0b' },
  { region: 'UK', value: 150, status: 'critical', color: '#ef4444' },
  { region: 'APAC', value: 95, status: 'healthy', color: '#10b981' },
];

// Delivery Performance by Week
const deliveryPerformance = [
  { week: 'W1', onTime: 78, delayed: 22 },
  { week: 'W2', onTime: 75, delayed: 25 },
  { week: 'W3', onTime: 69, delayed: 31 },
  { week: 'W4', onTime: 72, delayed: 28 },
];

// Top Product Categories
const topCategories = [
  { name: 'Apparel', orders: 45, value: 280000 },
  { name: 'Accessories', orders: 28, value: 156000 },
  { name: 'Vinyl/CDs', orders: 18, value: 92000 },
  { name: 'Posters', orders: 12, value: 24000 },
];

export function DashboardOverview() {
  const [showCallModal, setShowCallModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'critical').length;
  const highAlerts = mockAlerts.filter(a => a.severity === 'high').length;
  const atRiskOrders = mockOrders.filter(o => o.status === 'delayed' || o.status === 'pending').length;
  const totalRiskValue = mockOrders
    .filter(o => o.status === 'delayed' || o.status === 'pending')
    .reduce((sum, order) => sum + order.value, 0);

  const otifMetric = mockMetrics.find(m => m.name === 'OTIF % (On-Time In-Full)');
  const valueAtRiskMetric = mockMetrics.find(m => m.name === 'Value at Risk');
  const ordersAtRiskMetric = mockMetrics.find(m => m.name === 'Orders at Risk');
  const approvalBlocksMetric = mockMetrics.find(m => m.name === 'Approval Blocks');

  return (
    <div className="space-y-6">
      {/* Critical Alert Banner */}
      {criticalAlerts > 0 && (
        <div className="kulfi-card border-l-4 border-red-500 p-4 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900">
                {criticalAlerts} Critical Alert{criticalAlerts > 1 ? 's' : ''} Require Immediate Action
              </h3>
              <p className="text-sm text-red-700 mt-1">
                Orders worth {formatCurrency(totalRiskValue)} at risk of missing artist delivery commitments
              </p>
            </div>
            <button className="kulfi-button-primary bg-red-600 hover:bg-red-700 whitespace-nowrap">
              Take Action
            </button>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Supply Chain Command Center</h1>
        <p className="text-slate-600">Morning briefing for {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      {/* Quick Action Panel - What Joel needs at 9am */}
      <div className="kulfi-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>
            <p className="text-sm text-slate-600">One-click fixes for common tasks</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-slate-600">System Online</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => setShowCallModal(true)}
            className="p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all text-left group"
          >
            <Phone className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-900">Call Top Supplier</p>
            <p className="text-xs text-slate-600">Guangzhou Factory</p>
          </button>
          <button 
            onClick={() => setShowEmailModal(true)}
            className="p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all text-left group"
          >
            <Mail className="w-5 h-5 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-900">Send Reminder</p>
            <p className="text-xs text-slate-600">Pending approvals</p>
          </button>
          <button className="p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all text-left group">
            <Package className="w-5 h-5 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-900">Create New PO</p>
            <p className="text-xs text-slate-600">Quick order</p>
          </button>
          <button 
            onClick={() => setShowReportModal(true)}
            className="p-3 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all text-left group"
          >
            <Calendar className="w-5 h-5 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-sm font-medium text-slate-900">Weekly Report</p>
            <p className="text-xs text-slate-600">Generate & email</p>
          </button>
        </div>
      </div>

      {/* Hero Metrics - OTIF & Value at Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* OTIF Hero Card */}
        <div className="kulfi-card p-6 border-l-4 border-blue-600">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Primary KPI</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {otifMetric?.value}%
              </h2>
              <p className="text-sm text-slate-600 mt-1">On-Time In-Full Delivery</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-red-600">
                <TrendingDown className="w-5 h-5" />
                <span className="text-lg font-bold">{otifMetric?.change}%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">vs. target 95%</p>
            </div>
          </div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={otifTrendData}>
                <Line type="monotone" dataKey="otif" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="target" stroke="#d1d5db" strokeWidth={1} strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm font-medium text-red-900">
              23% below target - impacting {atRiskOrders} active orders
            </p>
          </div>
        </div>

        {/* Value at Risk Hero Card */}
        <div className="kulfi-card p-6 border-l-4 border-red-500">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Financial Exposure</p>
              <h2 className="text-3xl font-bold text-slate-900 mt-1">
                {formatCurrency(valueAtRiskMetric?.value || 0)}
              </h2>
              <p className="text-sm text-slate-600 mt-1">Orders At Risk</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-red-600">
                <TrendingUp className="w-5 h-5" />
                <span className="text-lg font-bold">+{valueAtRiskMetric?.change}%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">+€120k vs. last week</p>
            </div>
          </div>
          <div className="h-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={riskTrendData}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} fill="url(#riskGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-red-50 rounded-lg">
            <p className="text-sm font-medium text-red-900">
              Includes 2 artist tour commitments in next 7 days
            </p>
          </div>
        </div>
      </div>

      {/* What Needs Attention Now - Action Cards */}
      <div className="kulfi-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">What Needs Your Attention Now</h2>
          <div className="flex items-center space-x-2 text-sm">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-medium">
              {criticalAlerts} Critical
            </span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">
              {highAlerts} High
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {mockAlerts.slice(0, 4).map((alert) => (
            <ActionCard key={alert.id} alert={alert} />
          ))}
        </div>

        <button className="w-full mt-4 py-3 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors font-medium text-slate-700 flex items-center justify-center space-x-2">
          <span>View All {mockAlerts.length} Alerts</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickStatCard
          icon={Package2}
          label="Orders at Risk"
          value={ordersAtRiskMetric?.value.toString() || '0'}
          change="+8%"
          trend="up"
          subtext="€412k total value"
          color="red"
        />
        <QuickStatCard
          icon={Clock}
          label="Approval Blocks"
          value={approvalBlocksMetric?.value.toString() || '0'}
          change="+3"
          trend="up"
          subtext="11 days avg delay"
          color="yellow"
        />
        <QuickStatCard
          icon={CheckCircle}
          label="Delivered This Week"
          value="8"
          change="+2"
          trend="up"
          subtext="€218k completed"
          color="green"
        />
        <QuickStatCard
          icon={AlertOctagon}
          label="Quality Issues"
          value="2"
          change="-1"
          trend="down"
          subtext="In QC review"
          color="orange"
        />
      </div>

      {/* Artist Tour Tracker - Most Important! */}
      <div className="kulfi-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Artist Tour Deliveries</h2>
              <p className="text-sm text-slate-600">Upcoming merchandise deadlines</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900">{artistTours.length}</p>
            <p className="text-xs text-slate-600">Active tours</p>
          </div>
        </div>

        <div className="space-y-4">
          {artistTours.map((tour, idx) => (
            <div key={idx} className={`p-4 rounded-lg border-2 ${
              tour.status === 'at-risk' ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h3 className="text-lg font-bold text-slate-900">{tour.artist}</h3>
                    <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      tour.status === 'at-risk' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                    }`}>
                      {tour.status === 'at-risk' ? 'AT RISK' : 'On Track'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium">{tour.tour}</p>
                  <p className="text-sm text-slate-600 mt-1">{tour.merchandise}</p>
                </div>
                <div className="text-right">
                  <div className={`text-3xl font-bold mb-1 ${
                    tour.daysLeft <= 7 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {tour.daysLeft}
                  </div>
                  <p className="text-xs text-slate-600">days left</p>
                  <p className="text-xs font-medium text-slate-900 mt-1">{tour.deliveryDate}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-bold text-slate-900">{formatCurrency(tour.value)}</span>
                  <span className="text-xs text-slate-600">order value</span>
                </div>
                <div className="flex space-x-2">
                  {tour.status === 'at-risk' && (
                    <>
                      <button className="px-3 py-1 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700">
                        Escalate Now
                      </button>
                      <button className="px-3 py-1 bg-white border border-slate-300 text-xs font-medium rounded hover:bg-slate-50">
                        Call Supplier
                      </button>
                    </>
                  )}
                  {tour.status === 'on-track' && (
                    <button className="px-3 py-1 bg-white border border-slate-300 text-xs font-medium rounded hover:bg-slate-50">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Inventory & Delivery Performance - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Inventory Health */}
        <div className="kulfi-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Global Inventory</h3>
              <p className="text-xs text-slate-600">Stock levels by region</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {regionalInventory.map((region, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-900">{region.region}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900">{formatCurrency(region.value)}k</span>
                    <div className={`w-2 h-2 rounded-full ${
                      region.status === 'healthy' ? 'bg-green-500' :
                      region.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all" 
                    style={{ 
                      width: `${(region.value / 420) * 100}%`,
                      backgroundColor: region.color 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Performance Trend */}
        <div className="kulfi-card p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Delivery Success Rate</h3>
              <p className="text-xs text-slate-600">On-time vs delayed shipments</p>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deliveryPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="onTime" fill="#10b981" name="On Time" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delayed" fill="#ef4444" name="Delayed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Product Categories */}
      <div className="kulfi-card p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Top Selling Categories</h3>
            <p className="text-xs text-slate-600">What fans are buying most</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {topCategories.map((category, idx) => {
            const IconComponent = idx === 0 ? Shirt : idx === 1 ? Backpack : idx === 2 ? Disc : Frame;
            const iconColor = idx === 0 ? 'text-blue-600' : idx === 1 ? 'text-green-600' : idx === 2 ? 'text-purple-600' : 'text-amber-600';
            
            return (
              <div key={idx} className="p-4 bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <IconComponent className={`w-8 h-8 ${iconColor}`} />
                  </div>
                  <p className="text-sm font-medium text-slate-900">{category.name}</p>
                  <p className="text-2xl font-bold text-slate-900">{category.orders}</p>
                  <p className="text-xs text-slate-600">active orders</p>
                  <p className="text-xs font-medium text-blue-600 mt-1">{formatCurrency(category.value)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supplier Performance Summary */}
      <div className="kulfi-card p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Supplier Performance Summary</h3>
        <div className="space-y-3">
          {mockSuppliers.map((supplier) => (
            <div key={supplier.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-2 h-2 rounded-full ${
                  supplier.status === 'active' ? 'bg-green-500' : 
                  supplier.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
                <div>
                  <p className="font-medium text-slate-900">{supplier.name}</p>
                  <p className="text-sm text-slate-500">{supplier.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Reliability</p>
                  <p className="text-sm font-bold text-slate-900">{supplier.reliability}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Lead Time</p>
                  <p className="text-sm font-bold text-slate-900">{supplier.leadTime}d</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Active Orders</p>
                  <p className="text-sm font-bold text-slate-900">{supplier.currentOrders}</p>
                </div>
                <button className="kulfi-button-secondary text-sm py-1 px-3">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Modals */}
      {showCallModal && <CallSupplierModal onClose={() => setShowCallModal(false)} />}
      {showEmailModal && <EmailReminderModal onClose={() => setShowEmailModal(false)} />}
      {showReportModal && <WeeklyReportModal onClose={() => setShowReportModal(false)} />}
    </div>
  );
}

interface ActionCardProps {
  alert: typeof mockAlerts[0];
}

function ActionCard({ alert }: ActionCardProps) {
  const severityColors = {
    critical: 'border-red-500 bg-red-50',
    high: 'border-yellow-500 bg-yellow-50',
    medium: 'border-blue-500 bg-blue-50',
    low: 'border-slate-500 bg-slate-50',
  };

  const SeverityIcon = {
    critical: AlertOctagon,
    high: AlertCircle,
    medium: Clock,
    low: AlertCircle,
  }[alert.severity];

  const iconColor = {
    critical: 'text-red-600',
    high: 'text-yellow-600',
    medium: 'text-blue-600',
    low: 'text-slate-600',
  }[alert.severity];

  return (
    <div className={`border-l-4 p-4 rounded-lg ${severityColors[alert.severity]}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <SeverityIcon className={`w-5 h-5 ${iconColor}`} />
            <h4 className="font-bold text-slate-900">{alert.title}</h4>
          </div>
          <p className="text-sm text-slate-700 mb-3">{alert.description}</p>
          <div className="flex flex-wrap gap-2">
            {alert.recommendedActions.slice(0, 2).map((action, idx) => (
              <button
                key={idx}
                className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-1"
              >
                <span>{action}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <button className="kulfi-button-primary text-sm py-2 px-4 whitespace-nowrap">
            Take Action
          </button>
          <button className="text-xs text-slate-600 hover:text-slate-900">
            Assign to team
          </button>
        </div>
      </div>
    </div>
  );
}

interface QuickStatCardProps {
  icon: any;
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  subtext: string;
  color: 'red' | 'yellow' | 'green' | 'orange';
}

function QuickStatCard({ icon: Icon, label, value, change, trend, subtext, color }: QuickStatCardProps) {
  const colorClasses = {
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-blue-50 text-blue-600',
  };

  const trendColors = {
    up: trend && (color === 'green') ? 'text-green-600' : 'text-red-600',
    down: trend && (color === 'red' || color === 'yellow') ? 'text-green-600' : 'text-red-600',
  };

  return (
    <div className="metric-card group">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && trend && (
          <div className={`flex items-center space-x-1 ${trendColors[trend]}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-bold">{change}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{subtext}</p>
      </div>
    </div>
  );
}

// Interactive Modal Components
function CallSupplierModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Call Supplier</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <p className="text-sm font-medium text-slate-900 mb-2">Pacific Manufacturing Co.</p>
            <p className="text-xs text-slate-600 mb-3">Guangzhou Factory, China</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Main Contact:</span>
                <span className="text-sm font-medium text-slate-900">Wei Chen</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">Phone:</span>
                <span className="text-sm font-medium text-blue-600">+86 20 8765 4321</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">WhatsApp:</span>
                <span className="text-sm font-medium text-green-600">Available</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <strong>Active Issue:</strong> Drake tour order delayed - approval pending 14 days
            </p>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Call Now
            </button>
            <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailReminderModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Send Approval Reminder</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-2">To:</label>
            <input 
              type="text" 
              defaultValue="procurement@umg.com, finance@umg.com"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-2">Subject:</label>
            <input 
              type="text" 
              defaultValue="URGENT: 7 Pending Approvals - €87k Orders at Risk"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-2">Message:</label>
            <textarea 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-32"
              defaultValue={`Hi Team,

We have 7 orders worth €87,000 stuck in approval for an average of 11 days. This is impacting:
• Drake tour merchandise (delivery in 6 days)
• 2 other artist commitments

Please review and approve by EOD to avoid delays.

View dashboard: [link]`}
            />
          </div>

          <div className="flex space-x-3">
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium">
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeeklyReportModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Weekly Supply Chain Report</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Report Preview */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <h4 className="font-bold text-slate-900 mb-3">Week of Nov 4-10, 2025</h4>
            
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-slate-900 mb-1">Key Metrics</p>
                <ul className="space-y-1 text-slate-600 ml-4">
                  <li>• OTIF: 72% (↓ -3% from last week)</li>
                  <li>• Value at Risk: €412k (↑ +29%)</li>
                  <li>• Active Orders: 103 (13 at risk)</li>
                  <li>• Approval Blocks: 7 (avg 11 days)</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-slate-900 mb-1">Critical Issues</p>
                <ul className="space-y-1 text-slate-600 ml-4">
                  <li>• Drake tour order - 6 days to deadline, approval pending</li>
                  <li>• UK inventory critical - below minimum stock</li>
                  <li>• 2 quality issues in QC review</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-slate-900 mb-1">Wins This Week</p>
                <ul className="space-y-1 text-slate-600 ml-4">
                  <li>• 8 orders delivered successfully (€218k)</li>
                  <li>• Taylor Swift merch on track for Nov 18</li>
                  <li>• Bad Bunny production confirmed</li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-slate-900 mb-1">Next Week Priorities</p>
                <ul className="space-y-1 text-slate-600 ml-4">
                  <li>• Resolve Drake order approval (URGENT)</li>
                  <li>• Quality check on 15k hoodies by Nov 8</li>
                  <li>• Replenish UK inventory</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Email Options */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-2">Send to:</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-slate-700">Leadership Team (CEO, COO, CFO)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-slate-700">Operations Team</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-slate-700">Procurement Team</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 font-medium">
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
              Send Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
