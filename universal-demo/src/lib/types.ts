// Types for the Kulfi Dashboard MVP

export interface Supplier {
  id: string;
  name: string;
  location: string;
  status: 'active' | 'warning' | 'inactive';
  reliability: number; // 0-100
  capacity: number;
  currentOrders: number;
  leadTime: number; // days
  qualityScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  supplierId: string;
  status: 'in_production' | 'testing' | 'shipped' | 'delayed';
  quantity: number;
  targetDate: string;
  currentStage: string;
  qualityChecks: number;
  riskFactors: string[];
}

export interface Order {
  id: string;
  productId: string;
  quantity: number;
  orderDate: string;
  expectedDelivery: string;
  actualDelivery?: string;
  status: 'pending' | 'in_progress' | 'shipped' | 'delivered' | 'delayed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  customer: string;
  value: number;
}

export interface Alert {
  id: string;
  type: 'quality' | 'delay' | 'supplier' | 'inventory' | 'compliance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
  affectedItems: string[];
  recommendedActions: string[];
  status: 'active' | 'resolved' | 'investigating';
}

export interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  change: number; // percentage
  target?: number;
  category: 'production' | 'quality' | 'delivery' | 'financial';
}

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: string;
  attachments?: string[];
}

export interface InsightRecommendation {
  id: string;
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: 'low' | 'medium' | 'high';
  category: string;
  metrics: string[];
  actions: string[];
  estimatedBenefit: string;
}
