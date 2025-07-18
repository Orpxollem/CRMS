import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { Task } from '../../types';
import { CheckSquare, Calendar, AlertTriangle, User, Phone, Mail, MessageSquare, Target } from 'lucide-react';

interface TaskFormProps {
  onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSuccess }) => {
  const { addTask, contacts, deals } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'call' as Task['type'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    contactId: '',
    dealId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTask: Omit<Task, 'id' | 'createdAt'> = {
      ...formData,
      status: 'pending' as Task['status'],
      contactId: formData.contactId || undefined,
      dealId: formData.dealId || undefined
    };

    addTask(newTask);
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const typeOptions = [
    { value: 'call', label: 'Phone Call' },
    { value: 'email', label: 'Email' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const contactOptions = [
    { value: '', label: 'No Contact' },
    ...contacts.map(contact => ({ value: contact.id, label: contact.name }))
  ];

  const dealOptions = [
    { value: '', label: 'No Deal' },
    ...deals.map(deal => ({ value: deal.id, label: deal.title }))
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone size={18} />;
      case 'email': return <Mail size={18} />;
      case 'meeting': return <Calendar size={18} />;
      case 'follow-up': return <MessageSquare size={18} />;
      default: return <Target size={18} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-error-50 to-error-100 border-error-200';
      case 'medium': return 'from-warning-50 to-warning-100 border-warning-200';
      case 'low': return 'from-success-50 to-success-100 border-success-200';
      default: return 'from-neutral-50 to-neutral-100 border-neutral-200';
    }
  };

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <CheckSquare className="mr-2 text-primary-600" size={20} />
            Task Details
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Task Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              icon={<CheckSquare size={18} />}
              required
            />
            
            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe what needs to be done..."
              required
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <Target className="mr-2 text-secondary-600" size={20} />
            Task Configuration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-neutral-700">Task Type</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  {getTypeIcon(formData.type)}
                </div>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-0 focus:border-primary-500 focus:bg-white transition-all duration-200 hover:border-neutral-300"
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Input
              label="Due Date"
              name="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={handleChange}
              icon={<Calendar size={18} />}
              required
            />
          </div>
        </div>

        <div className={`bg-gradient-to-br ${getPriorityColor(formData.priority)} rounded-2xl p-6 border transition-all duration-300`}>
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-warning-600" size={20} />
            Priority Level
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            {priorityOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, priority: option.value as Task['priority'] }))}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  formData.priority === option.value
                    ? option.value === 'high' 
                      ? 'border-error-500 bg-error-100 text-error-700'
                      : option.value === 'medium'
                      ? 'border-warning-500 bg-warning-100 text-warning-700'
                      : 'border-success-500 bg-success-100 text-success-700'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="text-center">
                  <AlertTriangle size={20} className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">{option.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border border-secondary-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <User className="mr-2 text-secondary-600" size={20} />
            Associations (Optional)
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Related Contact"
              name="contactId"
              value={formData.contactId}
              onChange={handleChange}
              options={contactOptions}
            />
            <Select
              label="Related Deal"
              name="dealId"
              value={formData.dealId}
              onChange={handleChange}
              options={dealOptions}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-200">
          <Button type="submit" size="lg" className="shadow-glow hover:shadow-glow-lg">
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;