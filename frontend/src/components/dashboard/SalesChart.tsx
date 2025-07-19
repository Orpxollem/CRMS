import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesData = [
  { name: 'Mon', calls: 24, meetings: 8, deals: 3 },
  { name: 'Tue', calls: 32, meetings: 12, deals: 5 },
  { name: 'Wed', calls: 28, meetings: 10, deals: 4 },
  { name: 'Thu', calls: 35, meetings: 15, deals: 7 },
  { name: 'Fri', calls: 42, meetings: 18, deals: 9 },
  { name: 'Sat', calls: 18, meetings: 6, deals: 2 },
  { name: 'Sun', calls: 12, meetings: 4, deals: 1 }
];

const SalesChart: React.FC = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 hover:shadow-medium transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-neutral-900">Weekly Activity</h3>
          <p className="text-sm text-neutral-600">Sales team performance</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-primary-500"></div>
            <span className="text-sm text-neutral-600">Calls</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-secondary-500"></div>
            <span className="text-sm text-neutral-600">Meetings</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-success-500"></div>
            <span className="text-sm text-neutral-600">Deals</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={salesData} barGap={10}>
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
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', 
              border: 'none', 
              borderRadius: '12px',
              boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Bar dataKey="calls" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
          <Bar dataKey="meetings" fill="#d946ef" radius={[4, 4, 0, 0]} />
          <Bar dataKey="deals" fill="#22c55e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;