import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUploadZone = ({ 
  onFileSelect, 
  acceptedFormats = ['image/jpeg', 'image/png'],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  disabled = false,
  error = null,
  className = '' 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef(null);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer?.items?.length > 0) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setDragCounter(0);

    if (disabled) return;

    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [disabled]);

  const handleFileSelection = (file) => {
    // Validate file type
    if (!acceptedFormats.includes(file.type)) {
      onFileSelect?.(null, {
        type: 'error',
        message: `Invalid file format. Please upload ${acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(' or ')} files only.`
      });
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      onFileSelect?.(null, {
        type: 'error',
        message: `File size too large. Maximum allowed size is ${Math.round(maxFileSize / (1024 * 1024))}MB.`
      });
      return;
    }

    onFileSelect?.(file, null);
  };

  const handleFileInputChange = (e) => {
    const file = e.target?.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleBrowseClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const getZoneClasses = () => {
    const baseClasses = `
      relative w-full h-64 border-2 border-dashed rounded-lg
      transition-all duration-300 ease-out cursor-pointer
      flex flex-col items-center justify-center p-8
      ${className}
    `;

    if (disabled) {
      return `${baseClasses} border-border bg-secondary-50 opacity-50 cursor-not-allowed`;
    }

    if (error) {
      return `${baseClasses} border-error bg-error-50 text-error-700`;
    }

    if (isDragOver) {
      return `${baseClasses} border-primary bg-primary-50 text-primary-700`;
    }

    return `${baseClasses} border-border bg-background hover:border-primary hover:bg-primary-50 text-text-secondary hover:text-primary-600`;
  };

  const getIconClasses = () => {
    if (error) return 'text-error-500';
    if (isDragOver) return 'text-primary-600';
    return 'text-text-muted';
  };

  return (
    <div className="w-full">
      <div
        className={getZoneClasses()}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
        role="button"
        tabIndex={0}
        aria-label="Upload MRI image file"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrowseClick();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className="file-input-hidden"
          disabled={disabled}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center">
            <Icon 
              name={error ? "AlertCircle" : isDragOver ? "Download" : "Upload"} 
              size={32} 
              className={getIconClasses()}
            />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              {error ? 'Upload Error' : isDragOver ? 'Drop your MRI scan here' : 'Upload MRI Scan'}
            </h3>
            
            {error ? (
              <p className="text-sm text-error-600 mb-4">{error}</p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-text-secondary">
                  Drag and drop your MRI image file here, or click to browse
                </p>
                <p className="text-xs text-text-muted">
                  Supported formats: JPEG, PNG • Max file size: {Math.round(maxFileSize / (1024 * 1024))}MB
                </p>
              </div>
            )}
          </div>

          {!error && (
            <Button
              variant="outline"
              size="sm"
              iconName="FolderOpen"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                handleBrowseClick();
              }}
              className="mt-2"
            >
              Browse Files
            </Button>
          )}
        </div>

        {/* Visual indicator for drag over */}
        {isDragOver && (
          <div className="absolute inset-0 rounded-lg bg-primary-500/10 border-2 border-primary-500 pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default FileUploadZone;