import React, { useState } from 'react';
import { Plus, Search, Filter, DollarSign, TrendingUp, Target, Calendar, Award, BarChart3, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import DealCard from '../components/deals/DealCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import DealForm from '../components/deals/DealForm';
import Modal from '../components/common/Modal';

const Deals: React.FC = () => {
  const { deals } = useApp();
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'pipeline'>('cards');

  const stages = [
    { value: 'all', label: 'All Deals', count: deals.length },
    { value: 'prospecting', label: 'Prospecting', count: deals.filter(d => d.stage === 'prospecting').length },
    { value: 'qualified', label: 'Qualified', count: deals.filter(d => d.stage === 'qualified').length },
    { value: 'proposal', label: 'Proposal', count: deals.filter(d => d.stage === 'proposal').length },
    { value: 'negotiation', label: 'Negotiation', count: deals.filter(d => d.stage === 'negotiation').length },
    { value: 'closed-won', label: 'Closed Won', count: deals.filter(d => d.stage === 'closed-won').length },
    { value: 'closed-lost', label: 'Closed Lost', count: deals.filter(d => d.stage === 'closed-lost').length }
  ];

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = selectedStage === 'all' || deal.stage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(d => d.stage === 'closed-won');
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);
  const activeDeals = deals.filter(d => !d.stage.includes('closed'));
  const averageDealSize = deals.length > 0 ? totalValue / deals.length : 0;
  const winRate = deals.length > 0 ? Math.round((wonDeals.length / deals.length) * 100) : 0;

  const pipelineStages = [
    { name: 'Prospecting', deals: deals.filter(d => d.stage === 'prospecting'), color: 'from-neutral-400 to-neutral-500' },
    { name: 'Qualified', deals: deals.filter(d => d.stage === 'qualified'), color: 'from-primary-400 to-primary-500' },
    { name: 'Proposal', deals: deals.filter(d => d.stage === 'proposal'), color: 'from-warning-400 to-warning-500' },
    { name: 'Negotiation', deals: deals.filter(d => d.stage === 'negotiation'), color: 'from-secondary-400 to-secondary-500' },
    { name: 'Closed Won', deals: deals.filter(d => d.stage === 'closed-won'), color: 'from-success-400 to-success-500' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Sales Pipeline</h1>
          <p className="text-neutral-600 mt-1">Track your deals and revenue opportunities</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200 p-1 shadow-soft">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                viewMode === 'cards' 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                viewMode === 'pipeline' 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
            >
              Pipeline
            </button>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            icon={<Plus size={18} />}
            size="lg"
            className="shadow-glow hover:shadow-glow-lg"
          >
            Add Deal
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-100 text-sm font-medium">Total Pipeline</p>
              <p className="text-3xl font-bold">${(totalValue / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="flex items-center text-primary-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +15% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-success-100 text-sm font-medium">Won Deals</p>
              <p className="text-3xl font-bold">${(wonValue / 1000).toFixed(0)}K</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Award size={24} />
            </div>
          </div>
          <div className="flex items-center text-success-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            {wonDeals.length} deals closed
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-500 to-warning-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-warning-100 text-sm font-medium">Active Deals</p>
              <p className="text-3xl font-bold">{activeDeals.length}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Target size={24} />
            </div>
          </div>
          <div className="flex items-center text-warning-100 text-sm">
            <Calendar size={14} className="mr-1" />
            In progress
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-secondary-100 text-sm font-medium">Win Rate</p>
              <p className="text-3xl font-bold">{winRate}%</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <BarChart3 size={24} />
            </div>
          </div>
          <div className="flex items-center text-secondary-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            Above target
          </div>
        </div>
      </div>

      {/* Pipeline Performance */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-neutral-900">Pipeline Performance</h3>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-2xl font-bold text-neutral-900">${(averageDealSize / 1000).toFixed(0)}K</p>
              <p className="text-sm text-neutral-500">Avg Deal Size</p>
            </div>
            <PieChart size={20} className="text-neutral-400" />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {pipelineStages.map((stage, index) => (
            <div 
              key={stage.name}
              className="text-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl hover:shadow-soft transition-all duration-200 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${stage.color} rounded-2xl mx-auto mb-3 flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{stage.deals.length}</span>
              </div>
              <p className="text-sm font-semibold text-neutral-900">{stage.name}</p>
              <p className="text-xs text-neutral-500">
                ${(stage.deals.reduce((sum, deal) => sum + deal.value, 0) / 1000).toFixed(0)}K
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
            {stages.map((stage, index) => (
              <button
                key={stage.value}
                onClick={() => setSelectedStage(stage.value)}
                className={`
                  px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 
                  animate-fade-in hover:scale-[1.02] active:scale-[0.98]
                  ${selectedStage === stage.value
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {stage.label} ({stage.count})
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-3">
            <Input
              placeholder="Search deals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search size={18} />}
              className="max-w-xs"
            />
            <Button variant="outline" icon={<Filter size={16} />}>
              Advanced Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Deals Display */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <DealCard deal={deal} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-neutral-100 overflow-hidden animate-fade-in">
          <div className="grid grid-cols-5 gap-0">
            {pipelineStages.map((stage, stageIndex) => (
              <div key={stage.name} className="border-r border-neutral-200 last:border-r-0">
                <div className={`bg-gradient-to-r ${stage.color} p-4 text-white`}>
                  <h3 className="font-semibold text-sm">{stage.name}</h3>
                  <p className="text-xs opacity-90">{stage.deals.length} deals</p>
                </div>
                <div className="p-4 space-y-3 min-h-[400px]">
                  {stage.deals.map((deal, dealIndex) => (
                    <div
                      key={deal.id}
                      className="bg-white rounded-2xl p-4 shadow-soft border border-neutral-100 hover:shadow-medium transition-all duration-200 cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${(stageIndex * 100) + (dealIndex * 50)}ms` }}
                    >
                      <h4 className="font-semibold text-sm text-neutral-900 mb-2 line-clamp-2">
                        {deal.title}
                      </h4>
                      <p className="text-lg font-bold text-success-600 mb-2">
                        ${deal.value.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>{deal.probability}%</span>
                        <span>{new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredDeals.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign size={32} className="text-neutral-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No deals found</h3>
          <p className="text-neutral-500 mb-6">Try adjusting your search terms or filters.</p>
          <Button>Create Your First Deal</Button>
        </div>
      )}

            {/* Deal Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Contact"
        size="lg"
      >
        <DealForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Deals;