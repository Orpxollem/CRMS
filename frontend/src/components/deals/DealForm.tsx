import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { Deal } from '../../types';
import { DollarSign, Calendar, TrendingUp, User, Building2 } from 'lucide-react';

interface DealFormProps {
  onSuccess: () => void;
}

const DealForm: React.FC<DealFormProps> = ({ onSuccess }) => {
  const { addDeal, contacts, companies } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    stage: 'prospecting' as Deal['stage'],
    probability: '50',
    contactId: '',
    companyId: '',
    expectedCloseDate: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDeal: Omit<Deal, 'id' | 'createdAt' | 'lastUpdated'> = {
      title: formData.title,
      value: parseFloat(formData.value),
      stage: formData.stage,
      probability: parseInt(formData.probability),
      contactId: formData.contactId,
      companyId: formData.companyId,
      expectedCloseDate: formData.expectedCloseDate
    };

    addDeal(newDeal);
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const stageOptions = [
    { value: 'prospecting', label: 'Prospecting' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'proposal', label: 'Proposal' },
    { value: 'negotiation', label: 'Negotiation' },
    { value: 'closed-won', label: 'Closed Won' },
    { value: 'closed-lost', label: 'Closed Lost' }
  ];

  const contactOptions = [
    { value: '', label: 'Select Contact' },
    ...contacts.map(contact => ({ value: contact.id, label: contact.name }))
  ];

  const companyOptions = [
    { value: '', label: 'Select Company' },
    ...companies.map(company => ({ value: company.id, label: company.name }))
  ];

  return (
    <div className="animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-6 border border-primary-100">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <DollarSign className="mr-2 text-primary-600" size={20} />
            Deal Information
          </h3>
          
          <div className="space-y-4">
            <Input
              label="Deal Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter deal title"
              icon={<DollarSign size={18} />}
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Deal Value ($)"
                name="value"
                type="number"
                value={formData.value}
                onChange={handleChange}
                placeholder="0.00"
                icon={<DollarSign size={18} />}
                required
              />
              <Input
                label="Probability (%)"
                name="probability"
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={handleChange}
                icon={<TrendingUp size={18} />}
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <User className="mr-2 text-secondary-600" size={20} />
            Associations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Contact"
              name="contactId"
              value={formData.contactId}
              onChange={handleChange}
              options={contactOptions}
            />
            <Select
              label="Company"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              options={companyOptions}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-warning-50 to-warning-100 rounded-2xl p-6 border border-warning-200">
          <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
            <Calendar className="mr-2 text-warning-600" size={20} />
            Timeline & Status
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Stage"
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              options={stageOptions}
            />
            <Input
              label="Expected Close Date"
              name="expectedCloseDate"
              type="date"
              value={formData.expectedCloseDate}
              onChange={handleChange}
              icon={<Calendar size={18} />}
              required
            />
          </div>
        </div>

        <TextArea
          label="Description (Optional)"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Additional details about this deal..."
        />

        <div className="flex justify-end space-x-3 pt-4 border-t border-neutral-200">
          <Button type="submit" size="lg" className="shadow-glow hover:shadow-glow-lg">
            Create Deal
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DealForm;