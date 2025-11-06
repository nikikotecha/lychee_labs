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

// Mock Products Data - Artist Merchandise
export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Tour T-Shirt - Premium Cotton',
    category: 'Apparel',
    supplierId: 'sup-001',
    status: 'in_production',
    quantity: 5700,
    targetDate: '2025-11-22',
    currentStage: 'Cutting & Sewing',
    qualityChecks: 3,
    riskFactors: ['approval_pending']
  },
  {
    id: 'prod-002',
    name: 'Artist Hoodie - Premium Blend',
    category: 'Apparel',
    supplierId: 'sup-003',
    status: 'testing',
    quantity: 3000,
    targetDate: '2025-11-18',
    currentStage: 'Quality Control',
    qualityChecks: 5,
    riskFactors: ['low_inventory', 'qc_delays']
  },
  {
    id: 'prod-003',
    name: 'Limited Edition Vinyl + Merch Bundle',
    category: 'Bundle',
    supplierId: 'sup-002',
    status: 'delayed',
    quantity: 6300,
    targetDate: '2025-11-10',
    currentStage: 'Component Assembly',
    qualityChecks: 2,
    riskFactors: ['supplier_delay', 'approval_pending', 'customs_clearance']
  },
  {
    id: 'prod-004',
    name: 'Tour Poster + Tote Bag Set',
    category: 'Accessories',
    supplierId: 'sup-001',
    status: 'shipped',
    quantity: 4000,
    targetDate: '2025-10-28',
    currentStage: 'In Transit',
    qualityChecks: 4,
    riskFactors: []
  },
  {
    id: 'prod-005',
    name: 'Exclusive Stadium Jacket',
    category: 'Apparel',
    supplierId: 'sup-003',
    status: 'in_production',
    quantity: 1200,
    targetDate: '2025-12-05',
    currentStage: 'Material Sourcing',
    qualityChecks: 1,
    riskFactors: ['material_lead_time']
  }
];

// Mock Orders Data - Real-world artist merchandise scenarios
export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    productId: 'prod-001',
    quantity: 2500,
    orderDate: '2025-10-15',
    expectedDelivery: '2025-11-25',
    status: 'in_progress',
    priority: 'high',
    customer: 'Drake World Tour - EU Leg',
    value: 87000
  },
  {
    id: 'ord-002',
    productId: 'prod-002',
    quantity: 1800,
    orderDate: '2025-10-20',
    expectedDelivery: '2025-11-18',
    status: 'pending',
    priority: 'critical',
    customer: 'Taylor Swift Eras Tour Merch',
    value: 142000
  },
  {
    id: 'ord-003',
    productId: 'prod-003',
    quantity: 3500,
    orderDate: '2025-10-08',
    expectedDelivery: '2025-11-10',
    status: 'delayed',
    priority: 'critical',
    customer: 'Bad Bunny - Stadium Series',
    value: 98000
  },
  {
    id: 'ord-004',
    productId: 'prod-004',
    quantity: 4000,
    orderDate: '2025-10-01',
    expectedDelivery: '2025-10-28',
    actualDelivery: '2025-10-26',
    status: 'delivered',
    priority: 'medium',
    customer: 'Billie Eilish Pop-Up Store',
    value: 52000
  },
  {
    id: 'ord-005',
    productId: 'prod-001',
    quantity: 3200,
    orderDate: '2025-10-12',
    expectedDelivery: '2025-11-22',
    status: 'pending',
    priority: 'high',
    customer: 'The Weeknd Arena Tour',
    value: 76000
  },
  {
    id: 'ord-006',
    productId: 'prod-002',
    quantity: 1200,
    orderDate: '2025-10-25',
    expectedDelivery: '2025-12-05',
    status: 'in_progress',
    priority: 'medium',
    customer: 'Dua Lipa UK Venues',
    value: 48000
  },
  {
    id: 'ord-007',
    productId: 'prod-003',
    quantity: 2800,
    orderDate: '2025-10-05',
    expectedDelivery: '2025-11-15',
    status: 'delayed',
    priority: 'high',
    customer: 'Ed Sheeran Festival Circuit',
    value: 67000
  }
];

// Mock Alerts Data - Risk-First Approach
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'delay',
    severity: 'critical',
    title: 'Order #1247 Missing Delivery Window',
    description: 'Artist merchandise for Drake tour - expected delivery in 6 days but approval still pending (stuck 14 days)',
    timestamp: '2025-11-04T08:15:00Z',
    affectedItems: ['ord-003', 'sup-002'],
    recommendedActions: [
      'Escalate to supplier lead immediately',
      'Call Pacific Manufacturing procurement',
      'Notify customer of potential 8-day delay'
    ],
    status: 'active'
  },
  {
    id: 'alert-002',
    type: 'supplier',
    severity: 'critical',
    title: 'Approval Block - Alpine Textiles',
    description: '3 orders worth €87k stuck in approval for 11+ days. Production cannot start.',
    timestamp: '2025-11-03T16:30:00Z',
    affectedItems: ['sup-001', 'ord-001', 'ord-005'],
    recommendedActions: [
      'Chase approval from procurement team',
      'Show impact dashboard to leadership',
      'Request emergency sign-off'
    ],
    status: 'active'
  },
  {
    id: 'alert-003',
    type: 'inventory',
    severity: 'high',
    title: 'Critical SKU Below Minimum Stock',
    description: 'Premium hoodies (SKU-2847) at 240 units - below 500 minimum. Next order 18 days away.',
    timestamp: '2025-11-04T07:00:00Z',
    affectedItems: ['prod-002'],
    recommendedActions: [
      'Request expedited production from Milano Fashion',
      'Check if alternative suppliers can fulfill',
      'Review upcoming order commitments'
    ],
    status: 'active'
  },
  {
    id: 'alert-004',
    type: 'delay',
    severity: 'high',
    title: '⚠️ Supplier Lead Time Variance +35%',
    description: 'Bengal Crafts average lead time increased from 28 to 38 days. 4 active orders affected.',
    timestamp: '2025-11-02T14:20:00Z',
    affectedItems: ['sup-004'],
    recommendedActions: [
      '📞 Schedule supplier performance review',
      '🔍 Investigate root cause of delays',
      '📊 Notify affected customers proactively'
    ],
    status: 'investigating'
  },
  {
    id: 'alert-005',
    type: 'compliance',
    severity: 'medium',
    title: '🕒 Production Not Started - 12 Days Overdue',
    description: 'PO #8921 placed 22 days ago, production status still "Pending". Customer expecting delivery in 18 days.',
    timestamp: '2025-11-01T11:45:00Z',
    affectedItems: ['ord-007', 'sup-003'],
    recommendedActions: [
      '📧 Request immediate status update',
      '⏰ Set 48-hour follow-up reminder',
      '🔄 Identify backup production options'
    ],
    status: 'active'
  },
  {
    id: 'alert-006',
    type: 'quality',
    severity: 'medium',
    title: '🕒 Quality Control Taking 2x Expected Time',
    description: 'Pacific Manufacturing QC process averaging 8 days vs. expected 4 days. Impacting 5 shipments.',
    timestamp: '2025-10-31T09:15:00Z',
    affectedItems: ['sup-002'],
    recommendedActions: [
      '📋 Review QC process with supplier',
      '🔍 Identify bottlenecks in inspection',
      '⚡ Request priority handling for critical orders'
    ],
    status: 'investigating'
  }
];

// Mock Metrics Data
export const mockMetrics: Metric[] = [
  {
    id: 'metric-001',
    name: 'OTIF % (On-Time In-Full)',
    value: 72,
    unit: '%',
    trend: 'down',
    change: -11,
    target: 95,
    category: 'delivery'
  },
  {
    id: 'metric-002',
    name: 'Value at Risk',
    value: 412000,
    unit: '€',
    trend: 'up',
    change: 29,
    target: 100000,
    category: 'financial'
  },
  {
    id: 'metric-003',
    name: 'Orders at Risk',
    value: 6,
    unit: 'orders',
    trend: 'up',
    change: 50,
    target: 2,
    category: 'delivery'
  },
  {
    id: 'metric-004',
    name: 'Approval Blocks',
    value: 3,
    unit: 'suppliers',
    trend: 'stable',
    change: 0,
    target: 0,
    category: 'production'
  },
  {
    id: 'metric-005',
    name: 'Below Min Inventory',
    value: 2,
    unit: 'SKUs',
    trend: 'down',
    change: -33,
    target: 0,
    category: 'production'
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
