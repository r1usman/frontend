import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  onSearch: (term: string) => void;
  statusOptions: FilterOption[];
  onStatusChange: (status: string) => void;
  sortOptions: FilterOption[];
  onSortChange: (sort: string) => void;
  showFilters?: boolean;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  statusOptions,
  onStatusChange,
  sortOptions,
  onSortChange,
  showFilters = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedStatus(value);
    onStatusChange(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        {/* Search input */}
        <div className="w-full sm:w-1/2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {showFilters && (
          <div className="flex sm:space-x-2 items-center w-full sm:w-auto">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="p-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </button>

            <div className={`flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full ${showFilterMenu ? 'block' : 'hidden sm:flex'}`}>
              <select
                value={selectedStatus}
                onChange={handleStatusChange}
                className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedSort}
                onChange={handleSortChange}
                className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;