'use client';

import { useState } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle, XCircle, Clock, TrendingUp, Filter, Search, Phone, Mail, Users, Calendar } from 'lucide-react';
import { mockAlerts } from '@/lib/mockData';

export function AlertsPanel() {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesType = filterType === 'all' || alert.type === filterType;
    return matchesSearch && matchesSeverity && matchesType;
  });

  const severityCounts = {
    all: mockAlerts.length,
    critical: mockAlerts.filter(a => a.severity === 'critical').length,
    high: mockAlerts.filter(a => a.severity === 'high').length,
    medium: mockAlerts.filter(a => a.severity === 'medium').length,
    low: mockAlerts.filter(a => a.severity === 'low').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Alerts & Risk Management</h1>
        <p className="text-slate-600">Monitor and resolve supply chain risks</p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card border-l-4 border-red-500">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-xs font-medium text-slate-600">CRITICAL</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{severityCounts.critical}</p>
          <p className="text-xs text-slate-600 mt-1">Immediate action required</p>
        </div>
        <div className="metric-card border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-xs font-medium text-slate-600">HIGH</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{severityCounts.high}</p>
          <p className="text-xs text-slate-600 mt-1">Priority attention</p>
        </div>
        <div className="metric-card border-l-4 border-yellow-500">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="text-xs font-medium text-slate-600">MEDIUM</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{severityCounts.medium}</p>
          <p className="text-xs text-slate-600 mt-1">Monitor closely</p>
        </div>
        <div className="metric-card border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <Info className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-medium text-slate-600">LOW</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{severityCounts.low}</p>
          <p className="text-xs text-slate-600 mt-1">Informational</p>
        </div>
      </div>

      {/* Filters */}
      <div className="kulfi-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-600" />
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Severity ({severityCounts.all})</option>
              <option value="critical">Critical ({severityCounts.critical})</option>
              <option value="high">High ({severityCounts.high})</option>
              <option value="medium">Medium ({severityCounts.medium})</option>
              <option value="low">Low ({severityCounts.low})</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Types</option>
              <option value="delay">Delays</option>
              <option value="supplier">Supplier Issues</option>
              <option value="inventory">Inventory</option>
              <option value="quality">Quality</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="kulfi-card p-12 text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-slate-600">No alerts matching your criteria</p>
        </div>
      )}
    </div>
  );
}

interface AlertCardProps {
  alert: typeof mockAlerts[0];
}

function AlertCard({ alert }: AlertCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [assignee, setAssignee] = useState<string>('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  const severityConfig = {
    critical: {
      icon: AlertCircle,
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-900',
      badge: 'bg-red-200 text-red-800',
      iconColor: 'text-red-600'
    },
    high: {
      icon: AlertTriangle,
      bg: 'bg-orange-50',
      border: 'border-orange-500',
      text: 'text-orange-900',
      badge: 'bg-orange-200 text-orange-800',
      iconColor: 'text-orange-600'
    },
    medium: {
      icon: Clock,
      bg: 'bg-yellow-50',
      border: 'border-yellow-500',
      text: 'text-yellow-900',
      badge: 'bg-yellow-200 text-yellow-800',
      iconColor: 'text-yellow-600'
    },
    low: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-900',
      badge: 'bg-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
    }
  };

  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <div className={`kulfi-card p-5 border-l-4 ${config.border} ${config.bg}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <Icon className={`w-5 h-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className={`font-bold ${config.text}`}>{alert.title}</h3>
              <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${config.badge}`}>
                {alert.severity.toUpperCase()}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium bg-slate-200 text-slate-700 rounded-full">
                {alert.type}
              </span>
            </div>
            <p className="text-sm text-slate-700 mb-3">{alert.description}</p>
            
            <div className="flex items-center space-x-4 text-xs text-slate-600 mb-3">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{new Date(alert.timestamp).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{alert.affectedItems.length} items affected</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {alert.recommendedActions.slice(0, isExpanded ? undefined : 2).map((action, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-xs font-medium"
                >
                  {action}
                </button>
              ))}
              {alert.recommendedActions.length > 2 && !isExpanded && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="px-3 py-1.5 text-xs font-medium text-orange-600 hover:text-orange-700"
                >
                  +{alert.recommendedActions.length - 2} more actions
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <button className="kulfi-button-primary text-sm py-2 px-4 whitespace-nowrap">
            Take Action
          </button>
          <button
            onClick={() => setShowAssignModal(!showAssignModal)}
            className="text-xs text-slate-600 hover:text-slate-900 flex items-center space-x-1"
          >
            <Users className="w-3 h-3" />
            <span>Assign to team</span>
          </button>
          <button className="text-xs text-slate-600 hover:text-slate-900 flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>Snooze</span>
          </button>
        </div>
      </div>

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-600" />
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select team member...</option>
              <option value="joel">Joel Martinez - Supply Chain Lead</option>
              <option value="sarah">Sarah Chen - Procurement Manager</option>
              <option value="mike">Mike Johnson - Operations Director</option>
              <option value="emma">Emma Davis - Quality Assurance</option>
            </select>
            <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700">
              Assign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
