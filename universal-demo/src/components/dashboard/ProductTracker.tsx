'use client';

import { useState } from 'react';
import { Package, Search, Filter, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, Music, ChevronRight } from 'lucide-react';
import { mockProducts, mockOrders } from '@/lib/mockData';
import { formatNumber } from '@/lib/utils';

export function ProductTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: mockProducts.length,
    in_production: mockProducts.filter(p => p.status === 'in_production').length,
    testing: mockProducts.filter(p => p.status === 'testing').length,
    shipped: mockProducts.filter(p => p.status === 'shipped').length,
    delayed: mockProducts.filter(p => p.status === 'delayed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Product Lifecycle Tracker</h1>
        <p className="text-slate-600">Monitor all merchandise from production to delivery</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-xs font-medium text-slate-600">TOTAL</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{mockProducts.length}</p>
          <p className="text-xs text-slate-600 mt-1">Active products</p>
        </div>
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-xs font-medium text-slate-600">IN PRODUCTION</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{statusCounts.in_production}</p>
          <p className="text-xs text-slate-600 mt-1">Being manufactured</p>
        </div>
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-xs font-medium text-slate-600">TESTING</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{statusCounts.testing}</p>
          <p className="text-xs text-slate-600 mt-1">Quality control</p>
        </div>
        <div className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-xs font-medium text-slate-600">SHIPPED</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{statusCounts.shipped}</p>
          <p className="text-xs text-slate-600 mt-1">Ready to deliver</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="kulfi-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Status ({statusCounts.all})</option>
              <option value="in_production">In Production ({statusCounts.in_production})</option>
              <option value="testing">Testing ({statusCounts.testing})</option>
              <option value="shipped">Shipped ({statusCounts.shipped})</option>
              <option value="delayed">Delayed ({statusCounts.delayed})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="kulfi-card p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Product Pipeline</h2>
        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Music className="w-4 h-4 text-orange-600" />
                    <h3 className="font-bold text-slate-900">{product.name}</h3>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      product.status === 'shipped' ? 'bg-green-100 text-green-800' :
                      product.status === 'in_production' ? 'bg-blue-100 text-blue-800' :
                      product.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                      product.status === 'delayed' ? 'bg-red-100 text-red-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {product.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-600">Category</p>
                      <p className="font-medium text-slate-900">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Current Stage</p>
                      <p className="font-medium text-slate-900">{product.currentStage}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Quantity</p>
                      <p className="font-medium text-slate-900">{formatNumber(product.quantity)} units</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-600">Target Date</p>
                      <p className="font-medium text-slate-900">{new Date(product.targetDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <button className="kulfi-button-secondary text-sm py-2 px-4 ml-4">
                  View Details
                </button>
              </div>
              
              {/* Risk Factors */}
              {product.riskFactors && product.riskFactors.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span className="text-xs font-medium text-slate-700">Risk Factors:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.riskFactors.map((risk, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded">
                          {risk.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quality Checks Progress */}
              <div className="mt-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Quality Checks: {product.qualityChecks}/5 passed</span>
                  <div className="w-48 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all"
                      style={{ width: `${(product.qualityChecks / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600">No products found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
