import React from 'react';
import { Phone, Mail, Building2, Tag, MoreVertical } from 'lucide-react';
import { Contact } from '../../types';

interface ContactCardProps {
  contact: Contact;
  onClick: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onClick }) => {
  const statusConfig = {
    active: {
      bg: 'bg-success-100',
      text: 'text-success-700',
      dot: 'bg-success-500'
    },
    inactive: {
      bg: 'bg-neutral-100',
      text: 'text-neutral-700',
      dot: 'bg-neutral-500'
    },
    prospect: {
      bg: 'bg-warning-100',
      text: 'text-warning-700',
      dot: 'bg-warning-500'
    }
  };

  const config = statusConfig[contact.status];

  return (
    <div 
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border border-neutral-100 hover:shadow-medium transition-all duration-300 cursor-pointer group animate-fade-in hover:scale-[1.02] active:scale-[0.98]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              className="w-14 h-14 rounded-2xl object-cover shadow-soft group-hover:shadow-medium transition-shadow duration-300"
              src={contact.avatar}
              alt={contact.name}
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${config.dot} rounded-full border-2 border-white`}></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-200">
              {contact.name}
            </h3>
            <p className="text-sm text-neutral-600">{contact.position}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${config.bg} ${config.text}`}>
            {contact.status}
          </span>
          <button className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 opacity-0 group-hover:opacity-100">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200">
          <Building2 size={16} className="mr-3 text-neutral-400" />
          <span className="truncate">{contact.company}</span>
        </div>
        <div className="flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200">
          <Mail size={16} className="mr-3 text-neutral-400" />
          <span className="truncate">{contact.email}</span>
        </div>
        <div className="flex items-center text-sm text-neutral-600 hover:text-primary-600 transition-colors duration-200">
          <Phone size={16} className="mr-3 text-neutral-400" />
          <span>{contact.phone}</span>
        </div>
      </div>

      {contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {contact.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors duration-200"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
          {contact.tags.length > 2 && (
            <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-neutral-100 text-neutral-600">
              +{contact.tags.length - 2} more
            </span>
          )}
        </div>
      )}

      <div className="pt-4 border-t border-neutral-100">
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Last contact: {new Date(contact.lastContact).toLocaleDateString()}</span>
          <span>Added: {new Date(contact.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;