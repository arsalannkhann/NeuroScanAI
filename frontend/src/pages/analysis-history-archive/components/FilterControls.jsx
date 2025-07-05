import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterControls = ({ onFiltersChange, onExport, onClearFilters }) => {
  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: 'all',
    tumorType: 'all',
    confidenceLevel: 'all',
    status: 'all'
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const tumorTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'glioma', label: 'Glioma' },
    { value: 'meningioma', label: 'Meningioma' },
    { value: 'pituitary', label: 'Pituitary Tumor' },
    { value: 'no_tumor', label: 'No Tumor' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const confidenceLevels = [
    { value: 'all', label: 'All Confidence Levels' },
    { value: 'high', label: 'High (≥90%)' },
    { value: 'medium', label: 'Medium (70-89%)' },
    { value: 'low', label: 'Low (<70%)' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'processing', label: 'Processing' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending Review' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      searchQuery: '',
      dateRange: 'all',
      tumorType: 'all',
      confidenceLevel: 'all',
      status: 'all'
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== 'all' && value !== '');

  return (
    <div className="bg-surface rounded-lg clinical-shadow border border-border p-6 mb-6">
      {/* Search and Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
            />
            <Input
              type="search"
              placeholder="Search by patient ID, filename, or notes..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Filter"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={showAdvancedFilters ? 'bg-primary-50 border-primary-200' : ''}
          >
            Filters
          </Button>
          
          <Button
            variant="outline"
            iconName="Download"
            onClick={onExport}
          >
            Export
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              iconName="X"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border-muted pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {dateRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tumor Type Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Tumor Type
              </label>
              <select
                value={filters.tumorType}
                onChange={(e) => handleFilterChange('tumorType', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {tumorTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Confidence Level Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Confidence Level
              </label>
              <select
                value={filters.confidenceLevel}
                onChange={(e) => handleFilterChange('confidenceLevel', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {confidenceLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Date
                </label>
                <Input
                  type="date"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Date
                </label>
                <Input
                  type="date"
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;