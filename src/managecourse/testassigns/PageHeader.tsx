import React from 'react';
import Button from './Button';

interface PageHeaderProps {
  title: string;
  description: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
  onButtonClick: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  buttonText,
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="mt-4 sm:mt-0">
        <Button
          variant="primary"
          icon={buttonIcon}
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;