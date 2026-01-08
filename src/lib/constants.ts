import { Shield, AlertTriangle, Search, Brain, TrendingUp, Users, Lock, Zap, Target, FileText, Download, Settings, Building, Globe, Filter, BarChart } from 'lucide-react';

export const flashFusionIndustries = [
  { id: 'software-dev', name: 'Software Development', vertical: 'Dev Suite', icon: '💻' },
  { id: 'ecommerce', name: 'E-commerce', vertical: 'Ecom Hub', icon: '🛒' },
  { id: 'content-creation', name: 'Content Creation', vertical: 'Creator Studio', icon: '🎨' },
  { id: 'digital-marketing', name: 'Digital Marketing', vertical: 'Creator Studio', icon: '📱' },
  { id: 'saas-tech', name: 'SaaS Technology', vertical: 'Dev Suite', icon: '☁️' },
  { id: 'ai-ml', name: 'AI/Machine Learning', vertical: 'Dev Suite', icon: '🤖' },
  { id: 'social-media', name: 'Social Media Management', vertical: 'Creator Studio', icon: '📲' },
  { id: 'online-retail', name: 'Online Retail', vertical: 'Ecom Hub', icon: '🏪' },
  { id: 'digital-agencies', name: 'Digital Agencies', vertical: 'Creator Studio', icon: '🎯' },
  { id: 'automation-tools', name: 'Automation Tools', vertical: 'Dev Suite', icon: '⚙️' },
  { id: 'marketplace-sellers', name: 'Marketplace Sellers', vertical: 'Ecom Hub', icon: '🏬' },
  { id: 'edtech', name: 'Educational Technology', vertical: 'Creator Studio', icon: '📚' },
  { id: 'creative-services', name: 'Creative Services', vertical: 'Creator Studio', icon: '🎭' },
  { id: 'prompt-engineering', name: 'Prompt Engineering', vertical: 'Dev Suite', icon: '🔧' },
  { id: 'nocode-platforms', name: 'No-Code Platforms', vertical: 'Dev Suite', icon: '🔨' },
  { id: 'casino-operations', name: 'Casino Operations', vertical: 'Gaming Hub', icon: '🎰' },
  { id: 'sports-betting', name: 'Sports Betting', vertical: 'Gaming Hub', icon: '🏈' },
  { id: 'gaming-security', name: 'Gaming Security & Compliance', vertical: 'Gaming Hub', icon: '🛡️' },
  { id: 'gaming-marketing', name: 'Gaming Marketing & Analytics', vertical: 'Gaming Hub', icon: '📊' },
  { id: 'gaming-tech', name: 'Gaming Technology & Platforms', vertical: 'Gaming Hub', icon: '💾' },
  { id: 'b2b-aiaas', name: 'B2B AI-as-a-Service', vertical: 'AI Suite', icon: '🤖' }
  ];
  
export const expansionMarkets = [
  { id: 'management-consulting', name: 'Management Consulting', category: 'Professional Services', icon: '📊' },
  { id: 'financial-services', name: 'Financial Services', category: 'Finance', icon: '💰' },
  { id: 'healthcare-tech', name: 'Healthcare Technology', category: 'Healthcare', icon: '🏥' },
  { id: 'real-estate-tech', name: 'Real Estate Technology', category: 'Real Estate', icon: '🏢' },
  { id: 'legal-tech', name: 'Legal Technology', category: 'Legal', icon: '⚖️' },
  { id: 'manufacturing', name: 'Manufacturing Operations', category: 'Industrial', icon: '🏭' },
  { id: 'supply-chain', name: 'Supply Chain Management', category: 'Logistics', icon: '🚛' },
  { id: 'hr-tech', name: 'Human Resources Technology', category: 'HR', icon: '👥' },
  { id: 'cybersecurity', name: 'Cybersecurity', category: 'Security', icon: '🔒' },
  { id: 'data-analytics', name: 'Data Analytics', category: 'Technology', icon: '📈' },
  { id: 'cloud-infrastructure', name: 'Cloud Infrastructure', category: 'Technology', icon: '☁️' },
  { id: 'mobile-development', name: 'Mobile App Development', category: 'Technology', icon: '📱' },
  { id: 'media-entertainment', name: 'Media & Entertainment', category: 'Entertainment', icon: '🎬' },
  { id: 'non-profit', name: 'Non-Profit Organizations', category: 'Social Impact', icon: '🤝' },
  { id: 'slot-machine-ops', name: 'Slot Machine Operations', category: 'Gaming Ecosystem', icon: '🎰' },
  { id: 'table-games-mgmt', name: 'Table Games Management', category: 'Gaming Ecosystem', icon: '🃏' },
  { id: 'poker-room-ops', name: 'Poker Room Operations', category: 'Gaming Ecosystem', icon: '♠️' },
  { id: 'esports-betting', name: 'Esports & Virtual Betting', category: 'Gaming Ecosystem', icon: '🎮' },
  { id: 'lottery-gaming', name: 'Lottery & State Gaming', category: 'Gaming Ecosystem', icon: '🎫' },
  { id: 'gaming-compliance', name: 'Gaming Regulatory Compliance', category: 'Gaming Ecosystem', icon: '📋' }
];

export const blindSpotCategories = {
  security: { color: '#dc2626', icon: Shield, label: 'Security Vulnerabilities', description: 'Data protection, access controls, compliance gaps' },
  compliance: { color: '#7c3aed', icon: Lock, label: 'Regulatory Compliance', description: 'Industry regulations, data privacy, audit requirements' },
  market: { color: '#059669', icon: TrendingUp, label: 'Market Intelligence', description: 'Competitive landscape, market trends, opportunities' },
  technical: { color: '#ea580c', icon: Zap, label: 'Technical Architecture', description: 'Infrastructure gaps, technical debt, scalability' },
  operational: { color: '#0284c7', icon: Users, label: 'Operational Efficiency', description: 'Process optimization, resource allocation, workflow' },
  strategic: { color: '#7c2d12', icon: Target, label: 'Strategic Planning', description: 'Long-term vision, competitive positioning, innovation' },
  financial: { color: '#059669', icon: BarChart, label: 'Financial Risks', description: 'Revenue models, cost optimization, financial planning' },
  customer: { color: '#2563eb', icon: Users, label: 'Customer Experience', description: 'User satisfaction, retention, support processes' },
  gaming: { color: '#9333ea', icon: Target, label: 'Gaming Operations', description: 'House edge, RTP compliance, game integrity, player protection' }
};

export const industryBlindSpotTemplates = {
  'software-dev': [
    { category: 'security', title: 'API Security Gaps', severity: 'Critical', focus: 'Authentication & authorization vulnerabilities' },
    { category: 'technical', title: 'Code Quality Debt', severity: 'High', focus: 'Technical debt accumulation patterns' },
    { category: 'operational', title: 'DevOps Pipeline Gaps', severity: 'Medium', focus: 'CI/CD process optimization' }
  ],
  'ecommerce': [
    { category: 'compliance', title: 'PCI DSS Compliance', severity: 'Critical', focus: 'Payment processing security' },
    { category: 'market', title: 'Competitive Pricing', severity: 'High', focus: 'Dynamic pricing strategies' },
    { category: 'customer', title: 'Checkout Abandonment', severity: 'High', focus: 'Conversion rate optimization' }
  ],
  'content-creation': [
    { category: 'strategic', title: 'Content Distribution', severity: 'Medium', focus: 'Multi-platform strategy gaps' },
    { category: 'operational', title: 'Content Workflow', severity: 'Medium', focus: 'Production efficiency bottlenecks' },
    { category: 'market', title: 'Audience Analytics', severity: 'High', focus: 'Engagement pattern analysis' }
  ],
  'healthcare-tech': [
    { category: 'compliance', title: 'HIPAA Compliance', severity: 'Critical', focus: 'Patient data protection' },
    { category: 'security', title: 'Medical Device Security', severity: 'Critical', focus: 'IoT security vulnerabilities' },
    { category: 'operational', title: 'Interoperability', severity: 'High', focus: 'System integration challenges' }
  ],
  'financial-services': [
    { category: 'compliance', title: 'SOX Compliance', severity: 'Critical', focus: 'Financial reporting accuracy' },
    { category: 'security', title: 'Fraud Detection', severity: 'Critical', focus: 'Real-time threat monitoring' },
    { category: 'market', title: 'Fintech Competition', severity: 'High', focus: 'Digital transformation gaps' }
  ],
  'casino-operations': [
    { category: 'compliance', title: 'Gaming Commission Compliance', severity: 'Critical', focus: 'Regulatory audit preparedness and license maintenance' },
    { category: 'security', title: 'Game Integrity Monitoring', severity: 'Critical', focus: 'Anti-cheating systems and house edge protection' },
    { category: 'operational', title: 'Floor Management Optimization', severity: 'High', focus: 'Table utilization and dealer scheduling efficiency' },
    { category: 'financial', title: 'Cash Handling Procedures', severity: 'Critical', focus: 'AML compliance and transaction monitoring' },
    { category: 'customer', title: 'Responsible Gaming Implementation', severity: 'High', focus: 'Player protection and addiction prevention systems' }
  ],
  'sports-betting': [
    { category: 'compliance', title: 'Sports Integrity Monitoring', severity: 'Critical', focus: 'Match-fixing detection and reporting compliance' },
    { category: 'security', title: 'Live Betting Risk Management', severity: 'Critical', focus: 'Real-time odds adjustment and exposure monitoring' },
    { category: 'technical', title: 'Platform Scalability', severity: 'High', focus: 'High-volume event processing during peak times' },
    { category: 'operational', title: 'Odds Compilation Accuracy', severity: 'High', focus: 'Market-making algorithms and trader oversight' },
    { category: 'market', title: 'Competitive Positioning', severity: 'Medium', focus: 'Odds competitiveness and market share analysis' }
  ],
  'gaming-security': [
    { category: 'security', title: 'Surveillance System Integration', severity: 'Critical', focus: 'AI-powered threat detection and incident response' },
    { category: 'compliance', title: 'AML Transaction Monitoring', severity: 'Critical', focus: 'Suspicious activity reporting and CTR compliance' },
    { category: 'operational', title: 'Identity Verification Systems', severity: 'High', focus: 'KYC processes and document verification automation' },
    { category: 'technical', title: 'Cybersecurity Framework', severity: 'Critical', focus: 'Payment system security and data breach prevention' },
    { category: 'strategic', title: 'Fraud Pattern Recognition', severity: 'High', focus: 'Machine learning detection and prevention systems' }
  ],
  'gaming-marketing': [
    { category: 'compliance', title: 'Responsible Marketing Standards', severity: 'Critical', focus: 'Advertising compliance and vulnerable player protection' },
    { category: 'customer', title: 'Player Segmentation Strategy', severity: 'High', focus: 'VIP program optimization and retention analytics' },
    { category: 'operational', title: 'Loyalty Program Efficiency', severity: 'Medium', focus: 'Comp calculation accuracy and tier management' },
    { category: 'market', title: 'Customer Acquisition Cost', severity: 'High', focus: 'Marketing channel effectiveness and ROI optimization' },
    { category: 'strategic', title: 'Player Lifetime Value', severity: 'Medium', focus: 'Predictive analytics and churn prevention' }
  ],
  'gaming-tech': [
    { category: 'technical', title: 'Payment Processing Integration', severity: 'Critical', focus: 'Multi-currency support and transaction processing speed' },
    { category: 'security', title: 'Platform Security Architecture', severity: 'Critical', focus: 'End-to-end encryption and secure API design' },
    { category: 'operational', title: 'Game RTP Management', severity: 'High', focus: 'Return-to-player compliance and variance control' },
    { category: 'compliance', title: 'Gaming Software Certification', severity: 'High', focus: 'GLI/eCOGRA compliance and testing procedures' },
    { category: 'market', title: 'Mobile Gaming Optimization', severity: 'Medium', focus: 'Cross-platform compatibility and user experience' }
  ],
  'slot-machine-ops': [
    { category: 'operational', title: 'Machine Performance Analytics', severity: 'High', focus: 'Hold percentage optimization and machine placement strategy' },
    { category: 'technical', title: 'Progressive Jackpot Management', severity: 'Critical', focus: 'Network integrity and payout verification systems' },
    { category: 'compliance', title: 'Machine Certification Compliance', severity: 'Critical', focus: 'Gaming commission approval and testing requirements' }
  ],
  'table-games-mgmt': [
    { category: 'operational', title: 'Dealer Performance Monitoring', severity: 'High', focus: 'Game pace optimization and error reduction training' },
    { category: 'security', title: 'Table Game Surveillance', severity: 'Critical', focus: 'Chip tracking and suspicious play pattern detection' },
    { category: 'financial', title: 'House Edge Maintenance', severity: 'High', focus: 'Game rule optimization and variance management' }
  ],
  'poker-room-ops': [
    { category: 'operational', title: 'Tournament Management', severity: 'Medium', focus: 'Structure optimization and player experience enhancement' },
    { category: 'security', title: 'Collusion Detection', severity: 'Critical', focus: 'Player behavior analysis and integrity monitoring' },
    { category: 'customer', title: 'Rake Structure Optimization', severity: 'High', focus: 'Competitive positioning and revenue maximization' }
  ],
  'esports-betting': [
    { category: 'market', title: 'Esports Market Intelligence', severity: 'High', focus: 'Game meta analysis and competitive landscape monitoring' },
    { category: 'technical', title: 'Live Data Integration', severity: 'Critical', focus: 'Real-time game data feeds and API reliability' },
    { category: 'compliance', title: 'Age Verification Systems', severity: 'Critical', focus: 'Underage gambling prevention and identity verification' }
  ],
  'lottery-gaming': [
    { category: 'security', title: 'Draw Integrity Systems', severity: 'Critical', focus: 'Random number generation and audit trail maintenance' },
    { category: 'operational', title: 'Retailer Network Management', severity: 'High', focus: 'Commission structure and sales optimization' },
    { category: 'compliance', title: 'Prize Payout Procedures', severity: 'Critical', focus: 'Tax reporting and claim verification processes' }
  ],
  'gaming-compliance': [
    { category: 'compliance', title: 'Multi-Jurisdiction Regulatory', severity: 'Critical', focus: 'Cross-border compliance and licensing requirements' },
    { category: 'operational', title: 'Audit Preparation Systems', severity: 'High', focus: 'Documentation management and regulatory reporting' },
    { category: 'strategic', title: 'Regulatory Change Management', severity: 'Medium', focus: 'Law update tracking and implementation planning' }
  ],
  'b2b-aiaas': [
    { category: 'technical', title: 'Model Hallucination Risks', severity: 'Critical', focus: 'Accuracy & reliability of AI outputs in business contexts' },
    { category: 'compliance', title: 'Data Sovereignty Gaps', severity: 'Critical', focus: 'Cross-border data flow and regional privacy regulation' },
    { category: 'technical', title: 'Inference Latency', severity: 'High', focus: 'Real-time performance bottlenecks in production' },
    { category: 'financial', title: 'API Token Economics', severity: 'High', focus: 'Cost optimization and usage forecasting' }
  ]
};
