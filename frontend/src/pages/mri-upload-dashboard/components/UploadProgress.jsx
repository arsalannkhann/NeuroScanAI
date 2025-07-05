import React from 'react';
import Icon from '../../../components/AppIcon';

const UploadProgress = ({ 
  progress = 0, 
  status = 'idle', 
  message = '',
  estimatedTime = null,
  className = ''
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
        return <Icon name="Upload" size={20} className="text-primary-600 animate-pulse" />;
      case 'processing':
        return <Icon name="Cpu" size={20} className="text-warning-600 animate-spin" />;
      case 'completed':
        return <Icon name="CheckCircle" size={20} className="text-success-600" />;
      case 'error':
        return <Icon name="XCircle" size={20} className="text-error-600" />;
      default:
        return <Icon name="Clock" size={20} className="text-text-muted" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'uploading':
        return 'bg-primary-600';
      case 'processing':
        return 'bg-warning-600';
      case 'completed':
        return 'bg-success-600';
      case 'error':
        return 'bg-error-600';
      default:
        return 'bg-secondary-300';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading...';
      case 'processing':
        return 'Processing...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
      default:
        return 'Ready';
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case 'uploading':
        return 'bg-primary-50';
      case 'processing':
        return 'bg-warning-50';
      case 'completed':
        return 'bg-success-50';
      case 'error':
        return 'bg-error-50';
      default:
        return 'bg-secondary-50';
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case 'uploading':
        return 'border-primary-200';
      case 'processing':
        return 'border-warning-200';
      case 'completed':
        return 'border-success-200';
      case 'error':
        return 'border-error-200';
      default:
        return 'border-border';
    }
  };

  return (
    <div className={`w-full border rounded-lg p-4 ${getBackgroundColor()} ${getBorderColor()} ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h4 className="text-sm font-medium text-text-primary">
              {getStatusText()}
            </h4>
            {message && (
              <p className="text-xs text-text-secondary mt-1">
                {message}
              </p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-medium text-text-primary">
            {Math.round(progress)}%
          </div>
          {estimatedTime && (
            <div className="text-xs text-text-secondary">
              {estimatedTime}
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-secondary-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ease-out ${getStatusColor()}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      {/* Status-specific additional info */}
      {status === 'uploading' && (
        <div className="mt-3 flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Wifi" size={14} />
            <span>Uploading to secure server</span>
          </div>
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-3 flex items-center space-x-4 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Brain" size={14} />
            <span>AI analysis in progress</span>
          </div>
        </div>
      )}

      {status === 'completed' && (
        <div className="mt-3 flex items-center space-x-4 text-xs text-success-600">
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span>Analysis complete</span>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-3 flex items-center space-x-4 text-xs text-error-600">
          <div className="flex items-center space-x-1">
            <Icon name="AlertTriangle" size={14} />
            <span>Upload failed - please try again</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadProgress;