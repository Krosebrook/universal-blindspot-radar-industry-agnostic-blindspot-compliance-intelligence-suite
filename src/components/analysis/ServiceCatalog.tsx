import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, FileText, Search, Zap, Code, ShieldCheck, User } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';

const services = [
  {
    id: 'predictive-analytics',
    title: 'Predictive Analytics',
    description: 'Advanced forecasting models for revenue, churn, and market trends.',
    icon: Zap,
    category: 'Analytics',
    status: 'Available',
    price: '$499/mo'
  },
  {
    id: 'nlp-legal',
    title: 'NLP for Legal',
    description: 'Contract analysis, clause extraction, and regulatory risk detection.',
    icon: FileText,
    category: 'Legal',
    status: 'Popular',
    price: '$799/mo'
  },
  {
    id: 'automated-procurement',
    title: 'Automated Procurement',
    description: 'AI-driven vendor selection and purchase order optimization.',
    icon: Search,
    category: 'Operations',
    status: 'Available',
    price: '$599/mo'
  },
  {
    id: 'code-security-audit',
    title: 'Code Security Audit',
    description: 'Real-time vulnerability scanning and dependency risk assessment.',
    icon: Code,
    category: 'Development',
    status: 'Available',
    price: '$399/mo'
  },
  {
    id: 'fraud-detection-suite',
    title: 'Fraud Detection Suite',
    description: 'Real-time anomaly detection for B2B transactions and access logs.',
    icon: ShieldCheck,
    category: 'Security',
    status: 'Critical',
    price: '$899/mo'
  },
  {
    id: 'custom-llm-training',
    title: 'Custom LLM Training',
    description: 'Fine-tune models on your proprietary business documentation.',
    icon: Brain,
    category: 'AI Suite',
    status: 'Bespoke',
    price: 'Custom'
  }
];

export const ServiceCatalog = () => {
  const { user } = useAuth();
  const businessType = user?.metadata?.businessType as string || 'General Enterprise';

  const handleSubscribe = (serviceName: string) => {
    toast.success(`Subscription request sent for ${serviceName}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">AI Service Catalog</h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-gray-500">Browse and subscribe to enterprise-grade AI solutions tailored for your industry.</p>
            {user && (
              <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200">
                <User className="w-3 h-3 mr-1" />
                Profile: {businessType}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <Brain className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-semibold text-blue-700">AIaaS Vertical Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="group hover:shadow-lg transition-all border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <service.icon className="w-6 h-6 text-slate-600 group-hover:text-blue-600" />
                </div>
                <Badge variant={service.status === 'Critical' ? 'destructive' : 'secondary'} className="font-medium">
                  {service.status}
                </Badge>
              </div>
              <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
              <CardDescription className="text-slate-500 line-clamp-2">{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400 font-medium uppercase tracking-wider text-[10px]">{service.category}</span>
                <span className="text-slate-900 font-bold">{service.price}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full font-semibold group-hover:bg-blue-600 group-hover:text-white"
                variant="outline"
                onClick={() => handleSubscribe(service.title)}
              >
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Can't find what you need?</CardTitle>
          <CardDescription className="text-slate-400">
            Our AI engineering team can build custom solutions tailored to your unique business logic.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
            Contact Enterprise Sales
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};