import React, { useState } from 'react';
import { Plus, Search, Filter, Grid3X3, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ContactCard from '../components/contacts/ContactCard';
import ContactForm from '../components/contacts/ContactForm';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Contacts: React.FC = () => {
  const { contacts } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (contactId: string) => {
    console.log('Navigate to contact:', contactId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Contacts</h1>
          <p className="text-neutral-600 mt-1">Manage your customer relationships</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          icon={<Plus size={18} />}
          size="lg"
        >
          Add Contact
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-neutral-100">
          <div className="text-2xl font-bold text-neutral-900">{contacts.length}</div>
          <div className="text-sm text-neutral-600">Total Contacts</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-neutral-100">
          <div className="text-2xl font-bold text-success-600">
            {contacts.filter(c => c.status === 'active').length}
          </div>
          <div className="text-sm text-neutral-600">Active</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-neutral-100">
          <div className="text-2xl font-bold text-warning-600">
            {contacts.filter(c => c.status === 'prospect').length}
          </div>
          <div className="text-sm text-neutral-600">Prospects</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-neutral-100">
          <div className="text-2xl font-bold text-neutral-600">
            {contacts.filter(c => c.status === 'inactive').length}
          </div>
          <div className="text-sm text-neutral-600">Inactive</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 max-w-md">
          <Input
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={18} />}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" icon={<Filter size={16} />}>
            Filter
          </Button>
          
          <div className="flex items-center bg-white rounded-2xl border border-neutral-200 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <Grid3X3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all duration-200 ${
                viewMode === 'list' 
                  ? 'bg-primary-500 text-white shadow-soft' 
                  : 'text-neutral-400 hover:text-neutral-600'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {filteredContacts.map((contact, index) => (
          <div
            key={contact.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ContactCard
              contact={contact}
              onClick={() => handleContactClick(contact.id)}
            />
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-neutral-400" />
          </div>
          <p className="text-neutral-500 text-lg">No contacts found matching your search.</p>
          <p className="text-neutral-400 text-sm mt-1">Try adjusting your search terms or add a new contact.</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Contact"
        size="lg"
      >
        <ContactForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Contacts;