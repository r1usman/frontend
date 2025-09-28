import React, { createContext, useContext, useState } from 'react';

// Create the resources context
const ResourcesContext = createContext();

// Resources Provider Component
export function ResourcesProvider({ children }) {
  const [resources, setResources] = useState([]);

  const addResources = (newResources) => {
    console.log('Adding resources to context:', newResources);
    setResources(newResources);
  };

  const clearResources = () => {
    setResources([]);
  };

  const value = {
    resources,
    addResources,
    clearResources
  };

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
}

// Custom hook to use the resources context
export function useResources() {
  const context = useContext(ResourcesContext);
  if (!context) {
    throw new Error('useResources must be used within a ResourcesProvider');
  }
  return context;
}

export default ResourcesContext;
