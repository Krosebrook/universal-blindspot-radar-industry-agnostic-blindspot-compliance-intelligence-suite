import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Search, Brain, TrendingUp, Users, Lock, Zap, Target, FileText, Download, Settings, Building, Globe, Filter, BarChart, LogOut, History } from 'lucide-react';
import { blink } from '@/lib/blink';
import { useAuth } from '@/hooks/use-auth';
import { db, Analysis, BlindSpot } from '@/lib/db';
import { flashFusionIndustries, expansionMarkets, blindSpotCategories, industryBlindSpotTemplates } from '@/lib/constants';
import { RadarVisualization } from './analysis/RadarVisualization';
import { DetailedList } from './analysis/DetailedList';
import { BlindSpotCard } from './analysis/BlindSpotCard';
import { SeverityBadge } from './analysis/SeverityBadge';
import { AnalysisHistory } from './analysis/AnalysisHistory';
import { ServiceCatalog } from './analysis/ServiceCatalog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const UniversalBlindSpotRadar = () => {
  const { user, login, logout } = useAuth();
  const [activeView, setActiveView] = useState('setup');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [analysisInput, setAnalysisInput] = useState('');
  const [blindSpots, setBlindSpots] = useState<BlindSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [securityMode, setSecurityMode] = useState(true);
  const [complianceMode, setComplianceMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedBlindSpot, setSelectedBlindSpot] = useState<BlindSpot | null>(null);
  const [history, setHistory] = useState<Analysis[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis | null>(null);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user) return;
    try {
      const data = await db.analyses.list(user.id);
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  const sanitizeInput = (input: string) => {
    return input.replace(/[<>\"']/g, '').trim().substring(0, 1000);
  };

  const performAnalysis = async () => {
    if (!user) {
      toast.error('Please login to run analysis');
      login();
      return;
    }
    if (!selectedIndustry || !analysisInput.trim()) {
      toast.error('Please select an industry and enter context');
      return;
    }

    setLoading(true);
    try {
      // Simulate analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      const selectedData = [...flashFusionIndustries, ...expansionMarkets].find(ind => ind.id === selectedIndustry);
      const isGaming = selectedIndustry.includes('gaming') || selectedIndustry.includes('casino');
      const isB2B = selectedIndustry === 'b2b-aiaas';

      // Mock generation of blindspots based on current logic
      const generatedBlindSpots: Omit<BlindSpot, 'id' | 'analysisId'>[] = [
        {
          category: isGaming ? 'compliance' : (isB2B ? 'technical' : 'security'),
          title: isGaming ? 'Gaming Commission Compliance Framework' : (isB2B ? 'Model Hallucination Monitoring' : 'Data Protection Framework'),
          severity: 'Critical',
          riskScore: isGaming ? 9.4 : (isB2B ? 9.6 : 9.1),
          description: isB2B 
            ? 'High probability of non-deterministic model outputs impacting business critical decisions.'
            : `Critical gaps in regulations for ${selectedData?.name || 'industry'}`,
          impact: isB2B ? 'Operational errors and loss of user trust' : 'High financial and legal risk',
          recommendation: isB2B ? 'Implement human-in-the-loop validation and automated factual checking' : 'Implement comprehensive monitoring systems',
          timeline: '6-12 weeks',
          effort: 'High',
          coordinates: JSON.stringify({ angle: 15, radius: 92 }),
          industrySpecific: 1
        },
        {
          category: isB2B ? 'compliance' : 'market',
          title: isB2B ? 'AI Data Sovereignty Audit' : 'Competitive Intelligence Gap',
          severity: 'High',
          riskScore: 8.2,
          description: isB2B 
            ? 'Regional AI data processing regulations (e.g., EU AI Act) not fully addressed.'
            : `Missing systematic competitor monitoring in ${selectedData?.name}`,
          impact: isB2B ? 'Fines up to 6% of global turnover' : 'Market share erosion',
          recommendation: isB2B ? 'Set up regional model instances and data residency controls' : 'Deploy automated tracking',
          timeline: '3-5 weeks',
          effort: 'Medium',
          coordinates: JSON.stringify({ angle: 85, radius: 78 }),
          industrySpecific: 1
        }
      ];

      // Save to Database
      const analysis = await db.analyses.create({
        userId: user.id,
        industry: selectedData?.name || 'Unknown',
        market: null,
        input: sanitizeInput(analysisInput),
        complianceMode: complianceMode ? 1 : 0,
        securityMode: securityMode ? 1 : 0
      });

      const fullBlindSpots = await db.blindspots.createMany(
        generatedBlindSpots.map(bs => ({ ...bs, analysisId: analysis.id }))
      );

      setBlindSpots(fullBlindSpots);
      setCurrentAnalysis(analysis);
      setHistory([analysis, ...history]);
      setActiveView('radar');
      toast.success('Analysis complete and saved');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to perform analysis');
    } finally {
      setLoading(false);
    }
  };

  const loadAnalysis = async (analysis: Analysis) => {
    try {
      const data = await db.blindspots.listForAnalysis(analysis.id);
      setBlindSpots(data);
      setCurrentAnalysis(analysis);
      setSelectedIndustry(flashFusionIndustries.find(i => i.name === analysis.industry)?.id || '');
      setAnalysisInput(analysis.input);
      setActiveView('radar');
    } catch (error) {
      console.error('Failed to load analysis:', error);
      toast.error('Failed to load report');
    }
  };

  const deleteAnalysis = async (id: string) => {
    try {
      await db.analyses.delete(id);
      setHistory(history.filter(h => h.id !== id));
      if (currentAnalysis?.id === id) {
        setCurrentAnalysis(null);
        setBlindSpots([]);
      }
      toast.success('Report deleted');
    } catch (error) {
      toast.error('Failed to delete report');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">BlindSpot Radar</h1>
              <p className="text-xs text-gray-500">Intelligence Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.displayName || user.email}</p>
                  <p className="text-xs text-gray-500">Enterprise Access</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => logout()}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button onClick={() => login()}>Sign In</Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl mb-8 w-fit overflow-x-auto">
          {[
            { id: 'setup', label: 'Setup', icon: Building },
            { id: 'radar', label: 'Radar', icon: Target },
            { id: 'history', label: 'History', icon: History },
            { id: 'services', label: 'Service Catalog', icon: Brain },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-all ${
                activeView === tab.id ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {activeView === 'setup' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-sm border p-8">
              <h2 className="text-xl font-bold mb-6">Configure Your Analysis</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Target Industry</h3>
                  <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {[...flashFusionIndustries, ...expansionMarkets].map(ind => (
                      <button
                        key={ind.id}
                        onClick={() => setSelectedIndustry(ind.id)}
                        className={`p-4 rounded-xl border-2 transition-all text-left group ${
                          selectedIndustry === ind.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-100 hover:border-gray-200 bg-white'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{ind.icon}</span>
                        <p className="font-bold text-sm group-hover:text-blue-600 transition-colors">{ind.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Context & Parameters</h3>
                  <textarea
                    value={analysisInput}
                    onChange={(e) => setAnalysisInput(e.target.value)}
                    placeholder="Describe your system, business model, or specific areas of concern..."
                    className="w-full h-48 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-slate-50"
                  />
                  <div className="flex space-x-6">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={complianceMode}
                        onChange={(e) => setComplianceMode(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Compliance Focus</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={securityMode}
                        onChange={(e) => setSecurityMode(e.target.checked)}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Security Focus</span>
                    </label>
                  </div>
                  <Button 
                    className="w-full py-6 text-lg font-bold shadow-lg" 
                    onClick={performAnalysis}
                    disabled={loading}
                  >
                    {loading ? 'Running Analysis...' : 'Run Intelligence Scan'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'radar' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Risk Distribution Radar</h2>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium border-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Risk Factors</option>
                  {Object.entries(blindSpotCategories).map(([key, cat]) => (
                    <option key={key} value={key}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <RadarVisualization 
                radarData={blindSpots} 
                filterCategory={filterCategory}
                onPointClick={setSelectedBlindSpot}
              />
            </div>
            <div className="lg:col-span-4 space-y-6">
              {selectedBlindSpot ? (
                <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Risk Details</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-bold text-gray-900 leading-tight">{selectedBlindSpot.title}</h4>
                        <SeverityBadge severity={selectedBlindSpot.severity} />
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{selectedBlindSpot.description}</p>
                    </div>
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase">Impact Analysis</span>
                        <p className="text-sm text-gray-800 mt-1">{selectedBlindSpot.impact}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase">Recommended Remediation</span>
                        <p className="text-sm text-gray-800 mt-1">{selectedBlindSpot.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 rounded-2xl border border-blue-100 p-8 text-center">
                  <Target className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-blue-900 font-medium">Select a data point on the radar to view detailed risk analysis and remediation steps.</p>
                </div>
              )}
            </div>
            <div className="lg:col-span-12">
              <DetailedList blindSpots={blindSpots} />
            </div>
          </div>
        )}

        {activeView === 'history' && (
          <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Analysis History</h2>
              <p className="text-sm text-gray-500">{history.length} reports archived</p>
            </div>
            <AnalysisHistory 
              analyses={history} 
              onSelect={loadAnalysis} 
              onDelete={deleteAnalysis} 
            />
          </div>
        )}

        {activeView === 'services' && (
          <ServiceCatalog />
        )}
      </main>
    </div>
  );
};

export default UniversalBlindSpotRadar;
