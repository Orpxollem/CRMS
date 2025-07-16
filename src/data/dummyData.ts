import { Contact, Deal, Task, Company, User } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@company.com',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  role: 'Sales Manager'
};

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@techcorp.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Inc.',
    position: 'CEO',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'active',
    lastContact: '2024-01-15',
    tags: ['VIP', 'Decision Maker'],
    notes: 'Interested in enterprise solutions. Follow up next week.',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@innovate.com',
    phone: '+1 (555) 234-5678',
    company: 'Innovate Solutions',
    position: 'CTO',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'prospect',
    lastContact: '2024-01-10',
    tags: ['Tech Lead', 'Hot Lead'],
    notes: 'Evaluating our platform. Scheduled demo for next week.',
    createdAt: '2024-01-05'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@globaltech.com',
    phone: '+1 (555) 345-6789',
    company: 'Global Tech',
    position: 'VP Sales',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'active',
    lastContact: '2024-01-12',
    tags: ['Partnership', 'Strategic'],
    notes: 'Discussing partnership opportunities.',
    createdAt: '2024-01-03'
  }
];

export const deals: Deal[] = [
  {
    id: '1',
    title: 'TechCorp Enterprise License',
    value: 50000,
    stage: 'negotiation',
    probability: 80,
    contactId: '1',
    companyId: '1',
    expectedCloseDate: '2024-02-15',
    createdAt: '2024-01-01',
    lastUpdated: '2024-01-15'
  },
  {
    id: '2',
    title: 'Innovate Solutions Platform',
    value: 25000,
    stage: 'proposal',
    probability: 60,
    contactId: '2',
    companyId: '2',
    expectedCloseDate: '2024-02-28',
    createdAt: '2024-01-05',
    lastUpdated: '2024-01-10'
  },
  {
    id: '3',
    title: 'Global Tech Partnership',
    value: 100000,
    stage: 'qualified',
    probability: 40,
    contactId: '3',
    companyId: '3',
    expectedCloseDate: '2024-03-30',
    createdAt: '2024-01-03',
    lastUpdated: '2024-01-12'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Follow up with Alice Johnson',
    description: 'Discuss enterprise pricing and implementation timeline',
    type: 'call',
    priority: 'high',
    status: 'pending',
    dueDate: '2024-01-20',
    contactId: '1',
    dealId: '1',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Prepare demo for Innovate Solutions',
    description: 'Create customized demo focusing on their specific use case',
    type: 'meeting',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-01-18',
    contactId: '2',
    dealId: '2',
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'Send proposal to Global Tech',
    description: 'Draft and send partnership proposal document',
    type: 'email',
    priority: 'high',
    status: 'completed',
    dueDate: '2024-01-12',
    contactId: '3',
    dealId: '3',
    createdAt: '2024-01-08'
  }
];

export const companies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Inc.',
    industry: 'Technology',
    size: 'Enterprise',
    website: 'https://techcorp.com',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    address: '123 Tech Street, Silicon Valley, CA 94000',
    phone: '+1 (555) 123-4567',
    email: 'contact@techcorp.com',
    status: 'active',
    revenue: 5000000,
    employees: 500,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Innovate Solutions',
    industry: 'Software',
    size: 'Medium',
    website: 'https://innovate.com',
    logo: 'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    address: '456 Innovation Ave, Austin, TX 78701',
    phone: '+1 (555) 234-5678',
    email: 'hello@innovate.com',
    status: 'prospect',
    revenue: 2000000,
    employees: 150,
    createdAt: '2024-01-05'
  },
  {
    id: '3',
    name: 'Global Tech',
    industry: 'Technology',
    size: 'Enterprise',
    website: 'https://globaltech.com',
    logo: 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    address: '789 Global Way, New York, NY 10001',
    phone: '+1 (555) 345-6789',
    email: 'info@globaltech.com',
    status: 'active',
    revenue: 10000000,
    employees: 1000,
    createdAt: '2024-01-03'
  }
];