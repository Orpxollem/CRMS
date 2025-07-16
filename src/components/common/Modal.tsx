import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-all duration-300 bg-neutral-900/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`
          inline-block align-bottom bg-white rounded-3xl px-6 pt-6 pb-6 text-left
          overflow-hidden shadow-large transform transition-all duration-300 ease-out
          sm:my-8 sm:align-middle sm:p-8 w-full ${sizeClasses[size]}
          animate-scale-in
        `}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-xl transition-all duration-200 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>
          <div className="animate-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;