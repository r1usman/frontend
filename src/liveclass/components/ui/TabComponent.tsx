import React from 'react';

interface TabItemProps {
  id: string;
  label: string;
  children: React.ReactNode;
}

export const TabItem: React.FC<TabItemProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TabComponentProps {
  activeTab: string;
  onChange: (tabId: string) => void;
  children: React.ReactElement<TabItemProps>[];
}

export const TabComponent: React.FC<TabComponentProps> = ({ 
  activeTab, 
  onChange, 
  children 
}) => {
  const tabs = React.Children.map(children, (child) => ({
    id: child.props.id,
    label: child.props.label,
  }));

  const activeContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.id === activeTab
  );

  return (
    <div>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 focus:outline-none ${
              activeTab === tab.id
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-500 border-transparent hover:text-indigo-500 hover:border-indigo-300'
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4">{activeContent}</div>
    </div>
  );
};