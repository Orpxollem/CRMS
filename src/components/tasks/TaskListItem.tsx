import React from 'react';
import { Clock, User, CheckCircle, Circle, AlertCircle, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';
import { Task } from '../../types';
import { useApp } from '../../context/AppContext';

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const { contacts, updateTaskStatus } = useApp();
  
  const contact = contacts.find(c => c.id === task.contactId);
  
  const priorityConfig = {
    low: {
      bg: 'bg-success-100',
      text: 'text-success-700',
      dot: 'bg-success-500'
    },
    medium: {
      bg: 'bg-warning-100',
      text: 'text-warning-700',
      dot: 'bg-warning-500'
    },
    high: {
      bg: 'bg-error-100',
      text: 'text-error-700',
      dot: 'bg-error-500'
    }
  };

  const typeIcons = {
    call: Phone,
    email: Mail,
    meeting: Calendar,
    'follow-up': MessageSquare,
    other: Circle
  };

  const statusIcons = {
    pending: Circle,
    completed: CheckCircle,
    overdue: AlertCircle
  };

  const TypeIcon = typeIcons[task.type];
  const StatusIcon = statusIcons[task.status];
  const priorityStyle = priorityConfig[task.priority];

  const handleStatusChange = () => {
    if (task.status === 'pending') {
      updateTaskStatus(task.id, 'completed');
    } else if (task.status === 'completed') {
      updateTaskStatus(task.id, 'pending');
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'pending';

  return (
    <div className={`
      bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft p-6 border transition-all duration-300 group animate-fade-in hover:shadow-medium
      ${isOverdue ? 'border-error-200 bg-error-50/50' : 'border-neutral-100 hover:border-primary-200'}
    `}>
      <div className="flex items-start space-x-4">
        <button 
          onClick={handleStatusChange}
          className={`
            mt-1 transition-all duration-200 hover:scale-110 active:scale-95
            ${task.status === 'completed' 
              ? 'text-success-500 hover:text-success-600' 
              : isOverdue 
                ? 'text-error-500 hover:text-error-600'
                : 'text-neutral-400 hover:text-primary-500'
            }
          `}
        >
          <StatusIcon size={20} />
        </button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className={`
              text-lg font-bold transition-colors duration-200
              ${task.status === 'completed' 
                ? 'text-neutral-500 line-through' 
                : 'text-neutral-900 group-hover:text-primary-600'
              }
            `}>
              {task.title}
            </h3>
            
            <div className="flex items-center space-x-2 ml-4">
              <span className={`px-3 py-1 rounded-xl text-xs font-semibold ${priorityStyle.bg} ${priorityStyle.text}`}>
                {task.priority}
              </span>
              <div className={`p-2 rounded-xl bg-neutral-100 text-neutral-600`}>
                <TypeIcon size={14} />
              </div>
            </div>
          </div>
          
          <p className="text-sm text-neutral-600 mb-4 line-clamp-2">{task.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center text-sm ${isOverdue ? 'text-error-600' : 'text-neutral-500'}`}>
                <Clock size={14} className="mr-2" />
                <span className={isOverdue ? 'font-semibold' : ''}>
                  {new Date(task.dueDate).toLocaleDateString()}
                  {isOverdue && ' (Overdue)'}
                </span>
              </div>
              
              {contact && (
                <div className="flex items-center text-sm text-neutral-500">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-5 h-5 rounded-lg mr-2"
                  />
                  <span>{contact.name}</span>
                </div>
              )}
            </div>
            
            <div className={`w-2 h-2 rounded-full ${priorityStyle.dot}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;