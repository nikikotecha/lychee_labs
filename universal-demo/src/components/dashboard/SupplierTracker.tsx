'use client';

import { Search, Filter, MapPin, Star, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { mockSuppliers } from '@/lib/mockData';
import { formatNumber, getStatusColor, getRiskColor } from '@/lib/utils';

export function SupplierTracker() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Supplier Management</h1>
        <p className="text-gray-600">Monitor and manage your global supplier network</p>
      </div>

      {/* Filters and Search */}
      <div className="kulfi-card p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search suppliers..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="kulfi-button-secondary flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="kulfi-button-primary">Add Supplier</button>
          </div>
        </div>
      </div>

      {/* Supplier Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockSuppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="kulfi-card p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Active Suppliers</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {mockSuppliers.filter(s => s.status === 'active').length}
          </p>
        </div>

        <div className="kulfi-card p-6 text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Need Attention</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {mockSuppliers.filter(s => s.status === 'warning').length}
          </p>
        </div>

        <div className="kulfi-card p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Inactive</h3>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {mockSuppliers.filter(s => s.status === 'inactive').length}
          </p>
        </div>
      </div>
    </div>
  );
}

interface SupplierCardProps {
  supplier: typeof mockSuppliers[0];
}

function SupplierCard({ supplier }: SupplierCardProps) {
  const reliabilityColor = supplier.reliability >= 90 ? 'text-green-600' : 
                          supplier.reliability >= 80 ? 'text-yellow-600' : 'text-red-600';
  
  const qualityColor = supplier.qualityScore >= 95 ? 'text-green-600' : 
                      supplier.qualityScore >= 85 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="kulfi-card p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
          <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
            <MapPin className="w-4 h-4" />
            <span>{supplier.location}</span>
          </div>
        </div>
        <span className={`status-badge ${getStatusColor(supplier.status)}`}>
          {supplier.status}
        </span>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Reliability</span>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${reliabilityColor.includes('green') ? 'bg-green-500' : 
                  reliabilityColor.includes('yellow') ? 'bg-yellow-500' : 'bg-red-500'}`}
                style={{ width: `${supplier.reliability}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${reliabilityColor}`}>
              {supplier.reliability}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Quality Score</span>
          <div className="flex items-center space-x-2">
            <Star className={`w-4 h-4 ${qualityColor}`} />
            <span className={`text-sm font-medium ${qualityColor}`}>
              {supplier.qualityScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Capacity</span>
          <span className="text-sm font-medium text-gray-900">
            {formatNumber(supplier.capacity)} units
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Current Orders</span>
          <span className="text-sm font-medium text-gray-900">
            {supplier.currentOrders}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Lead Time</span>
          <span className="text-sm font-medium text-gray-900">
            {supplier.leadTime} days
          </span>
        </div>
      </div>

      {/* Risk Level */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Risk Level</span>
          <span className={`status-badge ${getRiskColor(supplier.riskLevel)}`}>
            {supplier.riskLevel}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 kulfi-button-secondary text-sm py-2">
          View Details
        </button>
        <button className="flex-1 kulfi-button-primary text-sm py-2">
          Contact
        </button>
      </div>
    </div>
  );
}
