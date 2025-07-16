import React from 'react';
import { Users, DollarSign, CheckSquare, Building2, TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatsCard from '../components/dashboard/StatsCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import SalesChart from '../components/dashboard/SalesChart';
import PipelineChart from '../components/dashboard/PipelineChart';

const Dashboard: React.FC = () => {
  const { contacts, deals, tasks, companies, user } = useApp();

  const totalRevenue = deals
    .filter(deal => deal.stage === 'closed-won')
    .reduce((sum, deal) => sum + deal.value, 0);

  const openTasks = tasks.filter(task => task.status === 'pending').length;
  const activeContacts = contacts.filter(contact => contact.status === 'active').length;
  const activeCompanies = companies.filter(company => company.status === 'active').length;
  const activeDeals = deals.filter(d => !d.stage.includes('closed')).length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-3xl p-8 text-white shadow-large relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {getGreeting()}, {user.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-primary-100 text-lg">
                Here's what's happening with your business today
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-2xl border-4 border-white/20 shadow-soft"
              />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold">{activeDeals}</div>
              <div className="text-primary-100 text-sm">Active Deals</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(0)}k</div>
              <div className="text-primary-100 text-sm">Revenue</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold">{openTasks}</div>
              <div className="text-primary-100 text-sm">Pending Tasks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
              <div className="text-2xl font-bold">{activeContacts}</div>
              <div className="text-primary-100 text-sm">Active Contacts</div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Contacts"
          value={contacts.length.toString()}
          change="+12%"
          changeType="increase"
          icon={Users}
          color="primary"
        />
        <StatsCard
          title="Active Deals"
          value={activeDeals.toString()}
          change="+8%"
          changeType="increase"
          icon={DollarSign}
          color="success"
        />
        <StatsCard
          title="Completed Tasks"
          value={completedTasks.toString()}
          change="+15%"
          changeType="increase"
          icon={CheckSquare}
          color="secondary"
        />
        <StatsCard
          title="Active Companies"
          value={activeCompanies.toString()}
          change="+5%"
          changeType="increase"
          icon={Building2}
          color="warning"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <SalesChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PipelineChart />
        </div>
        
        {/* Recent Activity */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 hover:shadow-medium transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900">Recent Activity</h3>
            <Calendar size={20} className="text-neutral-400" />
          </div>
          
          <div className="space-y-4">
            {tasks.slice(0, 5).map((task, index) => (
              <div 
                key={task.id} 
                className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-2xl hover:bg-neutral-100 transition-colors duration-200"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-3 h-3 rounded-full ${
                  task.status === 'completed' ? 'bg-success-500' : 
                  task.priority === 'high' ? 'bg-error-500' : 
                  task.priority === 'medium' ? 'bg-warning-500' : 'bg-primary-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{task.title}</p>
                  <p className="text-xs text-neutral-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  task.status === 'completed' ? 'bg-success-100 text-success-700' :
                  task.status === 'overdue' ? 'bg-error-100 text-error-700' :
                  'bg-primary-100 text-primary-700'
                }`}>
                  {task.status}
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-3 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-2xl transition-all duration-200">
            View All Activities
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-success-100 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold">24.5%</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="flex items-center text-success-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +2.1% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-500 to-warning-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-warning-100 text-sm">Target Achievement</p>
              <p className="text-3xl font-bold">87%</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl">
              <Target size={24} />
            </div>
          </div>
          <div className="flex items-center text-warning-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +5.3% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-secondary-100 text-sm">Team Performance</p>
              <p className="text-3xl font-bold">92%</p>
            </div>
            <div className="p-3 bg-white/20 rounded-2xl">
              <Award size={24} />
            </div>
          </div>
          <div className="flex items-center text-secondary-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +1.8% from last month
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;