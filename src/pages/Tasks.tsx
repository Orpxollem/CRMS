import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, Clock, CheckCircle, AlertTriangle, User, Target, TrendingUp, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import TaskListItem from '../components/tasks/TaskListItem';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Tasks: React.FC = () => {
  const { tasks } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const filters = [
    { value: 'all', label: 'All Tasks', count: tasks.length },
    { value: 'pending', label: 'Pending', count: tasks.filter(t => t.status === 'pending').length },
    { value: 'completed', label: 'Completed', count: tasks.filter(t => t.status === 'completed').length },
    { value: 'overdue', label: 'Overdue', count: tasks.filter(t => new Date(t.dueDate) < new Date() && t.status === 'pending').length }
  ];

  const priorityFilters = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesFilter = true;
    if (selectedFilter === 'overdue') {
      matchesFilter = new Date(task.dueDate) < new Date() && task.status === 'pending';
    } else if (selectedFilter !== 'all') {
      matchesFilter = task.status === selectedFilter;
    }
    
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesFilter && matchesPriority;
  });

  const completedCount = tasks.filter(task => task.status === 'completed').length;
  const pendingCount = tasks.filter(task => task.status === 'pending').length;
  const overdueCount = tasks.filter(task => 
    new Date(task.dueDate) < new Date() && task.status === 'pending'
  ).length;
  const todayCount = tasks.filter(task => 
    new Date(task.dueDate).toDateString() === new Date().toDateString()
  ).length;

  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Tasks</h1>
          <p className="text-neutral-600 mt-1">Manage your activities and stay productive</p>
        </div>
        <Button 
          icon={<Plus size={18} />}
          size="lg"
          className="shadow-glow hover:shadow-glow-lg"
        >
          Add Task
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-100 text-sm font-medium">Total Tasks</p>
              <p className="text-3xl font-bold">{tasks.length}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Target size={24} />
            </div>
          </div>
          <div className="flex items-center text-primary-100 text-sm">
            <TrendingUp size={14} className="mr-1" />
            +8 new this week
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-500 to-warning-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-warning-100 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold">{pendingCount}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Clock size={24} />
            </div>
          </div>
          <div className="flex items-center text-warning-100 text-sm">
            <Calendar size={14} className="mr-1" />
            {todayCount} due today
          </div>
        </div>

        <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-success-100 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold">{completedCount}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <CheckCircle size={24} />
            </div>
          </div>
          <div className="flex items-center text-success-100 text-sm">
            <Zap size={14} className="mr-1" />
            {completionRate}% completion rate
          </div>
        </div>

        <div className="bg-gradient-to-br from-error-500 to-error-600 rounded-3xl p-6 text-white shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-error-100 text-sm font-medium">Overdue</p>
              <p className="text-3xl font-bold">{overdueCount}</p>
            </div>
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <AlertTriangle size={24} />
            </div>
          </div>
          <div className="flex items-center text-error-100 text-sm">
            <AlertTriangle size={14} className="mr-1" />
            Needs attention
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-neutral-900">Progress Overview</h3>
          <div className="text-right">
            <p className="text-2xl font-bold text-neutral-900">{completionRate}%</p>
            <p className="text-sm text-neutral-500">Completion Rate</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-neutral-600">Overall Progress</span>
            <span className="text-sm font-bold text-neutral-900">{completedCount}/{tasks.length}</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-success-500 to-success-600 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
            <p className="text-2xl font-bold text-primary-600">{tasks.filter(t => t.priority === 'high').length}</p>
            <p className="text-sm text-primary-700">High Priority</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-warning-50 to-warning-100 rounded-2xl">
            <p className="text-2xl font-bold text-warning-600">{tasks.filter(t => t.priority === 'medium').length}</p>
            <p className="text-sm text-warning-700">Medium Priority</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-success-50 to-success-100 rounded-2xl">
            <p className="text-2xl font-bold text-success-600">{tasks.filter(t => t.priority === 'low').length}</p>
            <p className="text-sm text-success-700">Low Priority</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl">
            <p className="text-2xl font-bold text-secondary-600">{todayCount}</p>
            <p className="text-sm text-secondary-700">Due Today</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 animate-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-wrap gap-2">
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
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-4 py-2 border-2 border-neutral-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-0 focus:border-primary-500 transition-all duration-200"
            >
              {priorityFilters.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
            <Button variant="outline" icon={<Filter size={16} />}>
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="animate-fade-in">
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search size={18} />}
          className="max-w-md"
        />
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task, index) => (
          <div
            key={task.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <TaskListItem task={task} />
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target size={32} className="text-neutral-400" />
          </div>
          <h3 className="text-xl font-bold text-neutral-900 mb-2">No tasks found</h3>
          <p className="text-neutral-500 mb-6">Try adjusting your search terms or filters.</p>
          <Button>Create Your First Task</Button>
        </div>
      )}
    </div>
  );
};

export default Tasks;