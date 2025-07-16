import React from 'react';
import { Calendar, DollarSign, TrendingUp, User, Building2 } from 'lucide-react';
import { Deal } from '../../types';
import { useApp } from '../../context/AppContext';

interface DealCardProps {
  deal: Deal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const { contacts, companies } = useApp();
  
  const contact = contacts.find(c => c.id === deal.contactId);
  const company = companies.find(c => c.id === deal.companyId);

  const stageConfig = {
    prospecting: {
      bg: 'bg-neutral-100',
      text: 'text-neutral-700',
      color: '#64748b'
    },
    qualified: {
      bg: 'bg-primary-100',
      text: 'text-primary-700',
      color: '#0ea5e9'
    },
    proposal: {
      bg: 'bg-warning-100',
      text: 'text-warning-700',
      color: '#f97316'
    },
    negotiation: {
      bg: 'bg-secondary-100',
      text: 'text-secondary-700',
      color: '#d946ef'
    },
    'closed-won': {
      bg: 'bg-success-100',
      text: 'text-success-700',
      color: '#22c55e'
    },
    'closed-lost': {
      bg: 'bg-error-100',
      text: 'text-error-700',
      color: '#ef4444'
    }
  };

  const stageLabels = {
    prospecting: 'Prospecting',
    qualified: 'Qualified',
    proposal: 'Proposal',
    negotiation: 'Negotiation',
    'closed-won': 'Closed Won',
    'closed-lost': 'Closed Lost'
  };

  const config = stageConfig[deal.stage];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 hover:shadow-medium transition-all duration-300 group animate-fade-in hover:scale-[1.02]">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
          {deal.title}
        </h3>
        <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${config.bg} ${config.text} whitespace-nowrap`}>
          {stageLabels[deal.stage]}
        </span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center text-neutral-600">
          <DollarSign size={16} className="mr-3 text-success-500" />
          <span className="text-xl font-bold text-success-600">
            ${deal.value.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-neutral-600">
          <TrendingUp size={16} className="mr-3 text-neutral-400" />
          <span>{deal.probability}% probability</span>
        </div>
        
        <div className="flex items-center text-sm text-neutral-600">
          <Calendar size={16} className="mr-3 text-neutral-400" />
          <span>Expected: {new Date(deal.expectedCloseDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-neutral-600">Progress</span>
          <span className="text-xs font-bold text-neutral-900">{deal.probability}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500 ease-out"
            style={{ 
              width: `${deal.probability}%`,
              backgroundColor: config.color
            }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {contact && (
              <div className="flex items-center space-x-2">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-8 h-8 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{contact.name}</p>
                  <p className="text-xs text-neutral-500">{company?.name}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <p className="text-xs text-neutral-500">Updated</p>
            <p className="text-xs font-medium text-neutral-700">
              {new Date(deal.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealCard;