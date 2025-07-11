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