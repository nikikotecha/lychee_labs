import { Supplier, Product, Order, Alert, Metric, InsightRecommendation } from './types';

// Mock Suppliers Data
export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Alpine Textiles GmbH',
    location: 'Munich, Germany',
    status: 'active',
    reliability: 94,
    capacity: 15000,
    currentOrders: 8,
    leadTime: 14,
    qualityScore: 96,
    riskLevel: 'low'
  },
  {
    id: 'sup-002',
    name: 'Pacific Manufacturing Co.',
    location: 'Shenzhen, China',
    status: 'warning',
    reliability: 78,
    capacity: 25000,
    currentOrders: 12,
    leadTime: 21,
    qualityScore: 82,
    riskLevel: 'medium'
  },
  {
    id: 'sup-003',
    name: 'Milano Fashion Group',
    location: 'Milan, Italy',
    status: 'active',
    reliability: 91,
    capacity: 8000,
    currentOrders: 5,
    leadTime: 18,
    qualityScore: 98,
    riskLevel: 'low'
  },
  {
    id: 'sup-004',
    name: 'Bengal Crafts Ltd.',
    location: 'Dhaka, Bangladesh',
    status: 'inactive',
    reliability: 65,
    capacity: 12000,
    currentOrders: 0,
    leadTime: 28,
    qualityScore: 74,
    riskLevel: 'high'
  }
];

// Mock Products Data
export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Premium Cotton T-Shirt',
    category: 'Apparel',
    supplierId: 'sup-001',
    status: 'in_production',
    quantity: 5000,
    targetDate: '2024-12-25',
    currentStage: 'Cutting & Sewing',
    qualityChecks: 3,
    riskFactors: []
  },
  {
    id: 'prod-002',
    name: 'Sustainable Hoodie',
    category: 'Apparel',
    supplierId: 'sup-003',
    status: 'testing',
    quantity: 2500,
    targetDate: '2024-12-30',
    currentStage: 'Quality Testing',
    qualityChecks: 5,
    riskFactors: ['material_shortage']
  },
  {
    id: 'prod-003',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    supplierId: 'sup-002',
    status: 'delayed',
    quantity: 10000,
    targetDate: '2024-12-20',
    currentStage: 'Component Assembly',
    qualityChecks: 2,
    riskFactors: ['component_delay', 'quality_concerns']
  },
  {
    id: 'prod-004',
    name: 'Eco-Friendly Tote Bag',
    category: 'Accessories',
    supplierId: 'sup-001',
    status: 'shipped',
    quantity: 8000,
    targetDate: '2024-12-15',
    currentStage: 'Shipped',
    qualityChecks: 4,
    riskFactors: []
  }
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    productId: 'prod-001',
    quantity: 2500,
    orderDate: '2024-11-15',
    expectedDelivery: '2024-12-25',
    status: 'in_progress',
    priority: 'high',
    customer: 'Fashion Forward Inc.',
    value: 125000
  },
  {
    id: 'ord-002',
    productId: 'prod-002',
    quantity: 1500,
    orderDate: '2024-11-20',
    expectedDelivery: '2024-12-30',
    status: 'pending',
    priority: 'medium',
    customer: 'Urban Style Co.',
    value: 90000
  },
  {
    id: 'ord-003',
    productId: 'prod-003',
    quantity: 5000,
    orderDate: '2024-11-10',
    expectedDelivery: '2024-12-20',
    status: 'delayed',
    priority: 'critical',
    customer: 'Tech Retail Network',
    value: 250000
  },
  {
    id: 'ord-004',
    productId: 'prod-004',
    quantity: 4000,
    orderDate: '2024-11-05',
    expectedDelivery: '2024-12-15',
    actualDelivery: '2024-12-12',
    status: 'delivered',
    priority: 'low',
    customer: 'Green Living Stores',
    value: 60000
  }
];

// Mock Alerts Data
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'delay',
    severity: 'high',
    title: 'Production Delay - Wireless Earbuds',
    description: 'Component shortage causing 5-day delay in assembly line',
    timestamp: '2024-12-14T09:30:00Z',
    affectedItems: ['prod-003', 'ord-003'],
    recommendedActions: [
      'Contact backup component supplier',
      'Negotiate expedited shipping',
      'Notify customer of revised timeline'
    ],
    status: 'active'
  },
  {
    id: 'alert-002',
    type: 'quality',
    severity: 'medium',
    title: 'Quality Check Failed - Sustainable Hoodie',
    description: 'Color inconsistency detected in batch testing',
    timestamp: '2024-12-14T14:15:00Z',
    affectedItems: ['prod-002'],
    recommendedActions: [
      'Implement additional color matching process',
      'Review dye supplier quality standards',
      'Schedule re-testing for affected batch'
    ],
    status: 'investigating'
  },
  {
    id: 'alert-003',
    type: 'supplier',
    severity: 'medium',
    title: 'Supplier Performance Warning',
    description: 'Pacific Manufacturing reliability dropped below threshold',
    timestamp: '2024-12-14T11:00:00Z',
    affectedItems: ['sup-002'],
    recommendedActions: [
      'Schedule supplier performance review',
      'Identify backup suppliers for critical orders',
      'Implement enhanced monitoring'
    ],
    status: 'active'
  }
];

// Mock Metrics Data
export const mockMetrics: Metric[] = [
  {
    id: 'metric-001',
    name: 'On-Time Delivery Rate',
    value: 87.5,
    unit: '%',
    trend: 'down',
    change: -2.3,
    target: 95,
    category: 'delivery'
  },
  {
    id: 'metric-002',
    name: 'Quality Score',
    value: 92.1,
    unit: '%',
    trend: 'up',
    change: 1.8,
    target: 95,
    category: 'quality'
  },
  {
    id: 'metric-003',
    name: 'Production Efficiency',
    value: 89.3,
    unit: '%',
    trend: 'stable',
    change: 0.2,
    target: 90,
    category: 'production'
  },
  {
    id: 'metric-004',
    name: 'Cost Variance',
    value: 3.7,
    unit: '%',
    trend: 'up',
    change: 0.8,
    target: 5,
    category: 'financial'
  }
];

// Mock AI Insights and Recommendations
export const mockInsights: InsightRecommendation[] = [
  {
    id: 'insight-001',
    title: 'Optimize Supplier Mix',
    description: 'Analysis shows over-reliance on single supplier causing delivery risk',
    impact: 'high',
    effort: 'medium',
    category: 'Risk Management',
    metrics: ['On-Time Delivery Rate', 'Supplier Reliability'],
    actions: [
      'Diversify supplier base across 3-4 reliable partners',
      'Implement dual-sourcing for critical components',
      'Establish regional backup suppliers'
    ],
    estimatedBenefit: '12% improvement in delivery reliability'
  },
  {
    id: 'insight-002',
    title: 'Predictive Quality Monitoring',
    description: 'AI model identifies early quality indicators to prevent defects',
    impact: 'high',
    effort: 'low',
    category: 'Quality Optimization',
    metrics: ['Quality Score', 'Defect Rate'],
    actions: [
      'Deploy IoT sensors on production lines',
      'Implement real-time quality analytics',
      'Set up automated alert thresholds'
    ],
    estimatedBenefit: '15% reduction in quality issues'
  },
  {
    id: 'insight-003',
    title: 'Demand Forecasting Enhancement',
    description: 'Improve production planning with advanced demand prediction',
    impact: 'medium',
    effort: 'medium',
    category: 'Planning Optimization',
    metrics: ['Production Efficiency', 'Inventory Turnover'],
    actions: [
      'Integrate external market data sources',
      'Deploy machine learning forecasting models',
      'Automate production schedule adjustments'
    ],
    estimatedBenefit: '8% improvement in production efficiency'
  }
];
