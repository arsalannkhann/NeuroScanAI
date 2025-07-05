import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilePreview = ({ 
  file, 
  onRemove, 
  validationStatus = 'pending',
  className = '' 
}) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setImageError(false);

      // Cleanup URL when component unmounts or file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(null);
      setImageError(false);
    }
  }, [file]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getValidationIcon = () => {
    switch (validationStatus) {
      case 'valid':
        return <Icon name="CheckCircle" size={20} className="text-success-600" />;
      case 'invalid':
        return <Icon name="XCircle" size={20} className="text-error-600" />;
      case 'pending':
        return <Icon name="Clock" size={20} className="text-warning-600" />;
      default:
        return <Icon name="AlertCircle" size={20} className="text-text-muted" />;
    }
  };

  const getValidationMessage = () => {
    switch (validationStatus) {
      case 'valid':
        return 'File validated successfully';
      case 'invalid':
        return 'File validation failed';
      case 'pending':
        return 'Validating file...';
      default:
        return 'Ready for validation';
    }
  };

  const getValidationColor = () => {
    switch (validationStatus) {
      case 'valid':
        return 'border-success-200 bg-success-50';
      case 'invalid':
        return 'border-error-200 bg-error-50';
      case 'pending':
        return 'border-warning-200 bg-warning-50';
      default:
        return 'border-border bg-background';
    }
  };

  if (!file) {
    return (
      <div className={`w-full h-48 border-2 border-dashed border-border rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <Icon name="Image" size={48} className="text-text-muted mx-auto mb-2" />
          <p className="text-sm text-text-secondary">No file selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full border-2 rounded-lg ${getValidationColor()} ${className}`}>
      {/* Image Preview */}
      <div className="relative">
        <div className="w-full h-48 bg-secondary-100 rounded-t-lg overflow-hidden">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt="MRI scan preview"
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Icon name="Image" size={48} className="text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  {imageError ? 'Error loading preview' : 'Loading preview...'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Remove Button */}
        <Button
          variant="danger"
          size="sm"
          iconName="X"
          onClick={onRemove}
          className="absolute top-2 right-2 w-8 h-8 rounded-full shadow-md"
          title="Remove file"
        />

        {/* Validation Status Badge */}
        <div className="absolute top-2 left-2 bg-surface/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2">
          {getValidationIcon()}
          <span className="text-xs font-medium">{getValidationMessage()}</span>
        </div>
      </div>

      {/* File Metadata */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-text-primary truncate" title={file.name}>
              {file.name}
            </h4>
            <p className="text-xs text-text-secondary mt-1">
              {formatFileSize(file.size)} • {file.type}
            </p>
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-text-muted" />
          </div>
        </div>

        {/* File Properties */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-text-secondary">Type:</span>
            <span className="ml-2 text-text-primary font-medium">
              {file.type.split('/')[1].toUpperCase()}
            </span>
          </div>
          <div>
            <span className="text-text-secondary">Size:</span>
            <span className="ml-2 text-text-primary font-medium">
              {formatFileSize(file.size)}
            </span>
          </div>
          <div>
            <span className="text-text-secondary">Modified:</span>
            <span className="ml-2 text-text-primary font-medium">
              {new Date(file.lastModified).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-text-secondary">Status:</span>
            <span className={`ml-2 font-medium ${
              validationStatus === 'valid' ? 'text-success-600' :
              validationStatus === 'invalid' ? 'text-error-600' :
              validationStatus === 'pending'? 'text-warning-600' : 'text-text-muted'
            }`}>
              {validationStatus === 'valid' ? 'Valid' :
               validationStatus === 'invalid' ? 'Invalid' :
               validationStatus === 'pending'? 'Validating' : 'Ready'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;