import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const HistoryTable = ({ data, onViewDetails, onReanalyze, onGenerateReport }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(data.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== id));
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { color: 'bg-success-100 text-success-700', icon: 'CheckCircle' },
      processing: { color: 'bg-warning-100 text-warning-700', icon: 'Clock' },
      failed: { color: 'bg-error-100 text-error-700', icon: 'XCircle' },
      pending: { color: 'bg-secondary-100 text-secondary-700', icon: 'AlertCircle' }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success-600';
    if (confidence >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  const getTumorTypeColor = (type) => {
    const colors = {
      'glioma': 'bg-error-100 text-error-700',
      'meningioma': 'bg-warning-100 text-warning-700',
      'pituitary': 'bg-primary-100 text-primary-700',
      'no_tumor': 'bg-success-100 text-success-700'
    };
    return colors[type] || 'bg-secondary-100 text-secondary-700';
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) {
      return <Icon name="ArrowUpDown" size={14} className="text-text-muted" />;
    }
    return (
      <Icon 
        name={sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary-600" 
      />
    );
  };

  return (
    <div className="bg-surface rounded-lg clinical-shadow border border-border overflow-hidden">
      {/* Table Header with Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="bg-primary-50 border-b border-primary-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-700">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Download">
                Export Selected
              </Button>
              <Button variant="outline" size="sm" iconName="Trash2">
                Delete Selected
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary-50 border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border focus:ring-primary"
                />
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Date</span>
                  <SortIcon column="date" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Patient/File
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('tumorType')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Classification</span>
                  <SortIcon column="tumorType" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                <button
                  onClick={() => handleSort('confidence')}
                  className="flex items-center space-x-1 hover:text-text-primary"
                >
                  <span>Confidence</span>
                  <SortIcon column="confidence" />
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-secondary-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    className="rounded border-border focus:ring-primary"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-primary font-medium data-text">
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-text-secondary data-text">
                    {new Date(item.date).toLocaleTimeString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-secondary-100">
                      <Image
                        src={item.thumbnailUrl}
                        alt="MRI Scan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">
                        {item.patientId || 'Anonymous'}
                      </div>
                      <div className="text-xs text-text-secondary truncate max-w-32">
                        {item.filename}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTumorTypeColor(item.tumorType)}`}>
                    {item.tumorType.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className={`text-sm font-semibold data-text ${getConfidenceColor(item.confidence)}`}>
                    {item.confidence}%
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(item.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewDetails(item.id)}
                      className="p-1 text-text-secondary hover:text-primary-600 transition-colors duration-200"
                      title="View Details"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button
                      onClick={() => onReanalyze(item.id)}
                      className="p-1 text-text-secondary hover:text-accent-600 transition-colors duration-200"
                      title="Reanalyze"
                    >
                      <Icon name="RefreshCw" size={16} />
                    </button>
                    <button
                      onClick={() => onGenerateReport(item.id)}
                      className="p-1 text-text-secondary hover:text-warning-600 transition-colors duration-200"
                      title="Generate Report"
                    >
                      <Icon name="FileText" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-border">
        {paginatedData.map((item) => (
          <div key={item.id} className="p-4">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                className="mt-1 rounded border-border focus:ring-primary"
              />
              
              <div className="w-16 h-16 rounded-md overflow-hidden bg-secondary-100 flex-shrink-0">
                <Image
                  src={item.thumbnailUrl}
                  alt="MRI Scan"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {item.patientId || 'Anonymous'}
                  </h3>
                  {getStatusBadge(item.status)}
                </div>
                
                <div className="space-y-1 mb-3">
                  <p className="text-xs text-text-secondary truncate">
                    {item.filename}
                  </p>
                  <p className="text-xs text-text-secondary data-text">
                    {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString()}
                  </p>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTumorTypeColor(item.tumorType)}`}>
                    {item.tumorType.replace('_', ' ').toUpperCase()}
                  </span>
                  <div className={`text-sm font-semibold data-text ${getConfidenceColor(item.confidence)}`}>
                    {item.confidence}%
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onViewDetails(item.id)}
                    className="flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-700"
                  >
                    <Icon name="Eye" size={14} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onReanalyze(item.id)}
                    className="flex items-center space-x-1 text-xs text-accent-600 hover:text-accent-700"
                  >
                    <Icon name="RefreshCw" size={14} />
                    <span>Reanalyze</span>
                  </button>
                  <button
                    onClick={() => onGenerateReport(item.id)}
                    className="flex items-center space-x-1 text-xs text-warning-600 hover:text-warning-700"
                  >
                    <Icon name="FileText" size={14} />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="bg-secondary-50 px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 text-sm rounded-md transition-colors duration-200 ${
                      currentPage === pageNum
                        ? 'bg-primary-600 text-primary-foreground'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              iconPosition="right"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;