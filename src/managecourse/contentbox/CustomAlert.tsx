import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface CustomAlertProps {
  message: string;
  onClose: () => void;
  type?: 'error' | 'info';
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onClose, type = 'error' }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgColor = type === 'error' 
    ? 'bg-red-50 border-l-4 border-red-500' 
    : 'bg-blue-50 border-l-4 border-blue-500';
  
  const textColor = type === 'error' ? 'text-red-800' : 'text-blue-800';
  const iconColor = type === 'error' ? 'text-red-500' : 'text-blue-500';

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideInRight max-w-sm w-full">
      <div className={`${bgColor} p-4 rounded-lg shadow-lg`}>
        <div className="flex items-start">
          {type === 'error' ? (
            <AlertCircle className={`${iconColor} h-5 w-5 mr-3 mt-0.5 flex-shrink-0`} />
          ) : (
            <CheckCircle className={`${iconColor} h-5 w-5 mr-3 mt-0.5 flex-shrink-0`} />
          )}
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${textColor}`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className={`ml-3 flex-shrink-0 ${iconColor} hover:text-gray-500 focus:outline-none`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomAlert;