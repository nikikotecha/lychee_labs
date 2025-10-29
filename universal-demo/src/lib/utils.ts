import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  const statusColors = {
    active: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    inactive: 'text-red-600 bg-red-100',
    in_production: 'text-blue-600 bg-blue-100',
    testing: 'text-purple-600 bg-purple-100',
    shipped: 'text-green-600 bg-green-100',
    delayed: 'text-red-600 bg-red-100',
    pending: 'text-gray-600 bg-gray-100',
    in_progress: 'text-blue-600 bg-blue-100',
    delivered: 'text-green-600 bg-green-100',
    resolved: 'text-green-600 bg-green-100',
    investigating: 'text-yellow-600 bg-yellow-100',
  };
  return statusColors[status as keyof typeof statusColors] || 'text-gray-600 bg-gray-100';
}

export function getRiskColor(risk: string): string {
  const riskColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-red-600 bg-red-100',
    critical: 'text-red-800 bg-red-200',
  };
  return riskColors[risk as keyof typeof riskColors] || 'text-gray-600 bg-gray-100';
}

export function getTrendIcon(trend: string): string {
  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→',
  };
  return trendIcons[trend as keyof typeof trendIcons] || '→';
}

export function getTrendColor(trend: string): string {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    stable: 'text-gray-600',
  };
  return trendColors[trend as keyof typeof trendColors] || 'text-gray-600';
}
