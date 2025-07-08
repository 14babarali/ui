import React, { useState } from 'react';
import { 
  Filter, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  RefreshCw,
  Download,
  Plus
} from 'lucide-react';
import { z } from 'zod';

// Define a generic table data schema
const tableDataSchema = z.array(
  z.object({}).passthrough() // Allows any object shape but still validates it's an array of objects
);

const TableSection = ({ 
  children, 
  data = [], 
  onSearch, 
  onFilterChange,
  onRefresh,
  onAddNew,
  onPageChange,
  currentPage = 1,
  totalPages = 1,
  selectedCount = 0
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [validationError, setValidationError] = useState(null);

  // Validate data when it changes
  React.useEffect(() => {
    try {
      const validatedData = tableDataSchema.parse(data);
      setValidationError(null);
    } catch (err) {
      console.error('Table data validation failed:', err);
      setValidationError('Invalid table data format');
    }
  }, [data]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    if (onFilterChange) onFilterChange(value);
  };

  const handleRefresh = () => {
    if (onRefresh) onRefresh();
  };

  const handleAddNew = () => {
    if (onAddNew) onAddNew();
  };

  const handlePageChange = (direction) => {
    if (onPageChange) {
      const newPage = direction === 'next' 
        ? Math.min(currentPage + 1, totalPages)
        : Math.max(currentPage - 1, 1);
      onPageChange(newPage);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Controls */}
      <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={filterValue}
              onChange={handleFilterChange}
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {selectedCount > 0 && (
            <span className="text-sm text-gray-600 px-3 py-1 bg-gray-100 rounded-md">
              {selectedCount} selected
            </span>
          )}

          <button 
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            title="Refresh"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button 
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            title="Download"
          >
            <Download className="h-4 w-4" />
          </button>

          <button 
            onClick={handleAddNew}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {validationError ? (
          <div className="p-6 text-center text-red-600">
            {validationError}
          </div>
        ) : (
          children
        )}
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{totalPages}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableSection;