import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 45000, target: 50000 },
  { name: 'Feb', revenue: 52000, target: 55000 },
  { name: 'Mar', revenue: 48000, target: 52000 },
  { name: 'Apr', revenue: 61000, target: 58000 },
  { name: 'May', revenue: 55000, target: 60000 },
  { name: 'Jun', revenue: 67000, target: 65000 },
  { name: 'Jul', revenue: 78000, target: 75000 },
  { name: 'Aug', revenue: 69000, target: 72000 },
  { name: 'Sep', revenue: 84000, target: 80000 },
  { name: 'Oct', revenue: 91000, target: 85000 },
  { name: 'Nov', revenue: 87000, target: 90000 },
  { name: 'Dec', revenue: 95000, target: 95000 }
];

const RevenueChart: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 hover:shadow-medium transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Revenue Overview</h3>
          <p className="text-sm text-neutral-600">Monthly performance vs targets</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600"></div>
            <span className="text-sm text-neutral-600">Revenue</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-neutral-300"></div>
            <span className="text-sm text-neutral-600">Target</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Target']}
            labelStyle={{ color: '#1f2937' }}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: 'none', 
              borderRadius: '12px',
              boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#0ea5e9" 
            strokeWidth={3}
            fill="url(#revenueGradient)"
            dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#0ea5e9', strokeWidth: 2, fill: '#fff' }}
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="#d1d5db" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fill="none"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;