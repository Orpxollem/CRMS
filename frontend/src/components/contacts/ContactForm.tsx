import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { Contact } from '../../types';

interface ContactFormProps {
  onSuccess: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const { addContact } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    status: 'prospect' as Contact['status'],
    tags: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newContact: Omit<Contact, 'id' | 'createdAt'> = {
      ...formData,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
      lastContact: new Date().toISOString().split('T')[0],
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };

    addContact(newContact);
    onSuccess();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <Input
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
        />
        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={[
            { value: 'prospect', label: 'Prospect' },
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' }
          ]}
        />
      </div>

      <Input
        label="Tags (comma-separated)"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="VIP, Decision Maker, Hot Lead"
      />

      <TextArea
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={3}
        placeholder="Additional notes about this contact..."
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="submit">
          Add Contact
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;