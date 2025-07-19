export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  avatar: string;
  status: 'active' | 'inactive' | 'prospect';
  lastContact: string;
  tags: string[];
  notes: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'prospecting' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number;
  contactId: string;
  companyId: string;
  expectedCloseDate: string;
  createdAt: string;
  lastUpdated: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'call' | 'email' | 'meeting' | 'follow-up' | 'other';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'overdue';
  dueDate: string;
  contactId?: string;
  dealId?: string;
  createdAt: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  size: string;
  website: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'prospect';
  revenue: number;
  employees: number;
  createdAt: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  role: string;
  phone?: string;
  job_title?: string;
  company?: string;
  department?: string;
}
