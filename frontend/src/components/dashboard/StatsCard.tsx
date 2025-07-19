import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: {
      bg: 'from-primary-500 to-primary-600',
      icon: 'bg-primary-100 text-primary-600',
      text: 'text-primary-600'
    },
    secondary: {
      bg: 'from-secondary-500 to-secondary-600',
      icon: 'bg-secondary-100 text-secondary-600',
      text: 'text-secondary-600'
    },
    success: {
      bg: 'from-success-500 to-success-600',
      icon: 'bg-success-100 text-success-600',
      text: 'text-success-600'
    },
    warning: {
      bg: 'from-warning-500 to-warning-600',
      icon: 'bg-warning-100 text-warning-600',
      text: 'text-warning-600'
    },
    error: {
      bg: 'from-error-500 to-error-600',
      icon: 'bg-error-100 text-error-600',
      text: 'text-error-600'
    }
  };

  const changeColor = {
    increase: 'text-success-600 bg-success-50',
    decrease: 'text-error-600 bg-error-50',
    neutral: 'text-neutral-600 bg-neutral-50'
  };

  const TrendIcon = changeType === 'increase' ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 hover:shadow-medium transition-all duration-300 group animate-fade-in hover:scale-[1.02]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-neutral-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-neutral-900 group-hover:scale-105 transition-transform duration-200">{value}</p>
        </div>
        <div className={`p-4 rounded-2xl ${colorClasses[color].icon} group-hover:scale-110 transition-transform duration-200`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className={`flex items-center px-3 py-1 rounded-xl text-sm font-medium ${changeColor[changeType]}`}>
          <TrendIcon size={14} className="mr-1" />
          {change}
        </div>
        <span className="text-xs text-neutral-500">vs last month</span>
      </div>
      
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].bg} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />
    </div>
  );
};

export default StatsCard;