import React, { useState } from 'react';
import { Plus, Search, Building2, Globe, Users, MapPin, Phone, Mail, TrendingUp, Filter, Grid3X3, List, Star, Award, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Companies: React.FC = () => {
  const { companies } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filters = [
    { value: 'all', label: 'All Companies', count: companies.length },
    { value: 'active', label: 'Active', count: companies.filter(c => c.status === 'active').length },
    { value: 'prospect', label: 'Prospects', count: companies.filter(c => c.status === 'prospect').length },
    { value: 'inactive', label: 'Inactive', count: companies.filter(c => c.status === 'inactive').length }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || company.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = companies.reduce((sum, company) => sum + company.revenue, 0);
  const totalEmployees = companies.reduce((sum, company) => sum + company.employees, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Companies</h1>
          <p className="text-neutral-600 mt-1">Manage your business relationships and partnerships</p>
        </div>
        <Button 
          icon={<Plus size={18} />}
          size="lg"
          className="shadow-glow hover:shadow-glow-lg"
        >
          Add Company
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-100 text-sm font-medium">Total Companies</p>
              <p className="text-3xl font-bold">{companies.length}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Building2 size={24} />
            </div>
          </div>
          <div className="flex items-center text-primary-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +12% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-success-100 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="flex items-center text-success-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +8.5% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-500 to-warning-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-warning-100 text-sm font-medium">Total Employees</p>
              <p className="text-3xl font-bold">{(totalEmployees / 1000).toFixed(1)}K</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Users size={24} />
            </div>
          </div>
          <div className="flex items-center text-warning-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +15.2% from last month
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-secondary-100 text-sm font-medium">Active Partners</p>
              <p className="text-3xl font-bold">{companies.filter(c => c.status === 'active').length}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Award size={24} />
            </div>
          </div>
          <div className="flex items-center text-secondary-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +5.7% from last month
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 animate-fade-in">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter, index) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`
                px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 
                animate-fade-in hover:scale-[1.02] active:scale-[0.98]
                ${selectedFilter === filter.value
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between space-x-4 animate-fade-in">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={<Filter size={16} />}>
            Advanced Filter
          </Button>
          
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200 p-1 shadow-soft">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {filteredCompanies.map((company, index) => (
          <div
            key={company.id}
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 hover:shadow-medium transition-all duration-300 group animate-fade-in hover:scale-[1.02] cursor-pointer"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-2xl object-cover shadow-soft group-hover:shadow-medium transition-shadow duration-300"
                    src={company.logo}
                    alt={company.name}
                  />
                  <div className="absolute -top-1 -right-1">
                    <Star size={16} className="text-warning-500 fill-current" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
                    {company.name}
                  </h3>
                  <p className="text-sm text-neutral-600 font-medium">{company.industry}</p>
                </div>
              </div>
              
              <span className={`
                px-3 py-1 rounded-xl text-xs font-semibold
                ${company.status === 'active' 
                  ? 'bg-success-100 text-success-700' 
                  : company.status === 'prospect'
                  ? 'bg-warning-100 text-warning-700'
                  : 'bg-neutral-100 text-neutral-700'
                }
              `}>
                {company.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200">
                <Building2 size={16} className="mr-3 text-neutral-400" />
                <span>{company.size} • {company.employees.toLocaleString()} employees</span>
              </div>
              <div className="flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200">
                <Globe size={16} className="mr-3 text-neutral-400" />
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {company.website.replace('https://', '')}
                </a>
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <MapPin size={16} className="mr-3 text-neutral-400" />
                <span className="line-clamp-1">{company.address}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-primary-600 font-medium">Revenue</p>
                    <p className="text-lg font-bold text-primary-700">
                      ${(company.revenue / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <TrendingUp size={20} className="text-primary-500" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-secondary-600 font-medium">Growth</p>
                    <p className="text-lg font-bold text-secondary-700">+12.5%</p>
                  </div>
                  <Target size={20} className="text-secondary-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-neutral-400" />
                <Mail size={14} className="text-neutral-400" />
                <Globe size={14} className="text-neutral-400" />
              </div>
              <span className="text-xs text-neutral-500">
                Added {new Date(company.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building2 size={32} className="text-neutral-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No companies found</h3>
          <p className="text-neutral-500 mb-6">Try adjusting your search terms or filters.</p>
          <Button>Add Your First Company</Button>
        </div>
      )}
    </div>
  );
};

export default Companies;