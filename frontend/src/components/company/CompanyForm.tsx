import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { Company } from '../../types';
import { Building2, Globe, Users, MapPin, Phone, Mail, DollarSign, TrendingUp } from 'lucide-react';

interface CompanyFormProps {
  onSuccess: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSuccess }) => {
  const { companies } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    size: 'Small' as Company['size'],
    website: '',
    address: '',
    phone: '',
    email: '',
    status: 'prospect' as Company['status'],
    revenue: '',
    employees: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newCompany: Omit<Company, 'id' | 'createdAt'> = {
      ...formData,
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      revenue: parseFloat(formData.revenue) || 0,
      employees: parseInt(formData.employees) || 0
    };

    // In a real app, this would call addCompany from context
    console.log('New company:', newCompany);
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const sizeOptions = [
    { value: 'Startup', label: 'Startup (1-10 employees)' },
    { value: 'Small', label: 'Small (11-50 employees)' },
    { value: 'Medium', label: 'Medium (51-200 employees)' },
    { value: 'Large', label: 'Large (201-1000 employees)' },
    { value: 'Enterprise', label: 'Enterprise (1000+ employees)' }
  ];

  const statusOptions = [
    { value: 'prospect', label: 'Prospect' },
    { value: 'active', label: 'Active Client' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const industryOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Education', label: 'Education' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <Building2 className="mr-2 text-primary-600" size={20} />
            Company Information
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Company Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter company name"
              icon={<Building2 size={18} />}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                options={[{ value: '', label: 'Select Industry' }, ...industryOptions]}
              />
              <Select
                label="Company Size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                options={sizeOptions}
              />
            </div>

            <Input
              label="Website"
              name="website"
              type="url"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://company.com"
              icon={<Globe size={18} />}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <MapPin className="mr-2 text-secondary-600" size={20} />
            Contact Information
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Company address"
              icon={<MapPin size={18} />}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                icon={<Phone size={18} />}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@company.com"
                icon={<Mail size={18} />}
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-6 border border-success-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <TrendingUp className="mr-2 text-success-600" size={20} />
            Business Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Annual Revenue ($)"
              name="revenue"
              type="number"
              value={formData.revenue}
              onChange={handleChange}
              placeholder="1000000"
              icon={<DollarSign size={18} />}
            />
            <Input
              label="Number of Employees"
              name="employees"
              type="number"
              value={formData.employees}
              onChange={handleChange}
              placeholder="50"
              icon={<Users size={18} />}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-2xl p-6 border border-warning-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <Building2 className="mr-2 text-warning-600" size={20} />
            Relationship Status
          </h3>
          
          <div className="grid grid-cols-3 gap-3">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, status: option.value as Company['status'] }))}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  formData.status === option.value
                    ? option.value === 'active' 
                      ? 'border-success-500 bg-success-100 text-success-700'
                      : option.value === 'prospect'
                      ? 'border-warning-500 bg-warning-100 text-warning-700'
                      : 'border-neutral-500 bg-neutral-100 text-neutral-700'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="text-center">
                  <Building2 size={20} className="mx-auto mb-2" />
                  <p className="text-sm font-semibold">{option.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <TextArea
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Additional notes about this company..."
        />

        <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-200">
          <Button type="submit" size="lg" className="shadow-glow hover:shadow-glow-lg">
            Create Company
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;