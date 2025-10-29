'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, Package, Users, AlertTriangle, DollarSign } from 'lucide-react';
import { mockMetrics, mockSuppliers, mockAlerts } from '@/lib/mockData';
import { formatCurrency, formatPercentage, getTrendIcon, getTrendColor } from '@/lib/utils';

// Sample data for charts
const deliveryData = [
  { month: 'Jan', onTime: 92, delayed: 8 },
  { month: 'Feb', onTime: 89, delayed: 11 },
  { month: 'Mar', onTime: 94, delayed: 6 },
  { month: 'Apr', onTime: 87, delayed: 13 },
  { month: 'May', onTime: 91, delayed: 9 },
  { month: 'Jun', onTime: 88, delayed: 12 },
];

const qualityTrend = [
  { month: 'Jan', score: 89 },
  { month: 'Feb', score: 91 },
  { month: 'Mar', score: 88 },
  { month: 'Apr', score: 93 },
  { month: 'May', score: 92 },
  { month: 'Jun', score: 92 },
];

const supplierDistribution = [
  { name: 'Active', value: 12, color: '#10b981' },
  { name: 'Warning', value: 3, color: '#f59e0b' },
  { name: 'Inactive', value: 2, color: '#ef4444' },
];

export function DashboardOverview() {
  const activeSuppliers = mockSuppliers.filter(s => s.status === 'active').length;
  const totalSuppliers = mockSuppliers.length;
  const criticalAlerts = mockAlerts.filter(a => a.severity === 'high' || a.severity === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Global Supply Chain Overview</h1>
        <p className="text-gray-600">Real-time insights into your global merchandise operations</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="On-Time Delivery"
          value="87.5%"
          change="-2.3%"
          trend="down"
          icon={Package}
          color="blue"
        />
        <MetricCard
          title="Quality Score"
          value="92.1%"
          change="+1.8%"
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <MetricCard
          title="Active Suppliers"
          value={`${activeSuppliers}/${totalSuppliers}`}
          change="No change"
          trend="stable"
          icon={Users}
          color="purple"
        />
        <MetricCard
          title="Critical Alerts"
          value={criticalAlerts.toString()}
          change="+2 from yesterday"
          trend="up"
          icon={AlertTriangle}
          color="red"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Performance Chart */}
        <div className="kulfi-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deliveryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="onTime" fill="#10b981" name="On Time %" />
              <Bar dataKey="delayed" fill="#ef4444" name="Delayed %" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Trend Chart */}
        <div className="kulfi-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={qualityTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#f97316" 
                strokeWidth={3}
                name="Quality Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supplier Status Distribution */}
        <div className="kulfi-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Supplier Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={supplierDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                dataKey="value"
              >
                {supplierDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {supplierDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="kulfi-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
            <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {mockAlerts.slice(0, 3).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                  alert.severity === 'high' || alert.severity === 'critical' 
                    ? 'text-red-500' 
                    : 'text-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                  <p className="text-xs text-gray-600">{alert.description}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.severity === 'high' || alert.severity === 'critical'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: any;
  color: 'blue' | 'green' | 'purple' | 'red';
}

function MetricCard({ title, value, change, trend, icon: Icon, color }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div className="kulfi-card p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className={`flex items-center mt-4 text-sm ${getTrendColor(trend)}`}>
        <TrendIcon className="w-4 h-4 mr-1" />
        <span>{change}</span>
      </div>
    </div>
  );
}
