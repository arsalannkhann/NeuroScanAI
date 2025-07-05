import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ExportSidebar = ({ isOpen, onClose, selectedItems = [] }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'csv',
    includeImages: false,
    includeMetadata: true,
    includeConfidenceScores: true,
    dateRange: 'all',
    customStartDate: '',
    customEndDate: ''
  });

  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { value: 'csv', label: 'CSV', icon: 'FileText', description: 'Comma-separated values for spreadsheet applications' },
    { value: 'json', label: 'JSON', icon: 'Code', description: 'JavaScript Object Notation for API integration' },
    { value: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Formatted report with charts and summaries' },
    { value: 'dicom', label: 'DICOM', icon: 'Activity', description: 'Medical imaging standard format' }
  ];

  const integrationOptions = [
    { id: 'epic', name: 'Epic EHR', icon: 'Database', status: 'connected' },
    { id: 'cerner', name: 'Cerner PowerChart', icon: 'Database', status: 'available' },
    { id: 'allscripts', name: 'Allscripts', icon: 'Database', status: 'available' },
    { id: 'athenahealth', name: 'athenahealth', icon: 'Database', status: 'available' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock download trigger
    const filename = `neuroscan_export_${new Date().toISOString().split('T')[0]}.${exportConfig.format}`;
    console.log('Exporting:', { filename, config: exportConfig, selectedItems });
    
    setIsExporting(false);
    onClose();
  };

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1100"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-surface border-l border-border clinical-shadow-elevated z-1200 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-text-primary font-heading">
                Export & Integration
              </h2>
              <p className="text-sm text-text-secondary">
                Export analysis data or integrate with EHR systems
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-text-muted hover:text-text-primary rounded-md hover:bg-secondary-50 transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Selection Summary */}
          {selectedItems.length > 0 && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="CheckCircle" size={16} className="text-primary-600" />
                <span className="text-sm font-medium text-primary-700">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <p className="text-xs text-primary-600">
                Export will include only selected analyses
              </p>
            </div>
          )}

          {/* Export Format Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Export Format</h3>
            <div className="space-y-2">
              {exportFormats.map((format) => (
                <label
                  key={format.value}
                  className={`
                    flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-200
                    ${exportConfig.format === format.value
                      ? 'border-primary-200 bg-primary-50' :'border-border hover:border-primary-200 hover:bg-primary-50/50'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={exportConfig.format === format.value}
                    onChange={(e) => handleConfigChange('format', e.target.value)}
                    className="mt-1 text-primary-600 focus:ring-primary"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon name={format.icon} size={16} className="text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">
                        {format.label}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      {format.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Export Options</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportConfig.includeImages}
                  onChange={(e) => handleConfigChange('includeImages', e.target.checked)}
                  className="rounded border-border text-primary-600 focus:ring-primary"
                />
                <div>
                  <span className="text-sm text-text-primary">Include MRI Images</span>
                  <p className="text-xs text-text-secondary">Export original scan files</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportConfig.includeMetadata}
                  onChange={(e) => handleConfigChange('includeMetadata', e.target.checked)}
                  className="rounded border-border text-primary-600 focus:ring-primary"
                />
                <div>
                  <span className="text-sm text-text-primary">Include Metadata</span>
                  <p className="text-xs text-text-secondary">Scan parameters and technical details</p>
                </div>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={exportConfig.includeConfidenceScores}
                  onChange={(e) => handleConfigChange('includeConfidenceScores', e.target.checked)}
                  className="rounded border-border text-primary-600 focus:ring-primary"
                />
                <div>
                  <span className="text-sm text-text-primary">Include Confidence Scores</span>
                  <p className="text-xs text-text-secondary">AI model confidence metrics</p>
                </div>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Date Range</h3>
            <select
              value={exportConfig.dateRange}
              onChange={(e) => handleConfigChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>

            {exportConfig.dateRange === 'custom' && (
              <div className="mt-3 space-y-2">
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={exportConfig.customStartDate}
                  onChange={(e) => handleConfigChange('customStartDate', e.target.value)}
                />
                <Input
                  type="date"
                  placeholder="End Date"
                  value={exportConfig.customEndDate}
                  onChange={(e) => handleConfigChange('customEndDate', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* EHR Integration */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">EHR Integration</h3>
            <div className="space-y-2">
              {integrationOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={option.icon} size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{option.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {option.status === 'connected' ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        <Icon name="CheckCircle" size={12} />
                        <span>Connected</span>
                      </span>
                    ) : (
                      <Button variant="outline" size="xs">
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Button */}
          <div className="space-y-3">
            <Button
              variant="primary"
              fullWidth
              loading={isExporting}
              onClick={handleExport}
              iconName="Download"
            >
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>

            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>

          {/* Compliance Notice */}
          <div className="mt-6 p-3 bg-warning-50 border border-warning-100 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-warning-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-warning-700 mb-1">
                  HIPAA Compliance Notice
                </p>
                <p className="text-xs text-warning-600">
                  Exported data contains protected health information. Ensure secure handling and transmission according to your organization's policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExportSidebar;