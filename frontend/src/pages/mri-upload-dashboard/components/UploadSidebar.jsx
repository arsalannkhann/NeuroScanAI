import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import UploadProgress from './UploadProgress';

const UploadSidebar = ({ 
  file, 
  uploadProgress = 0,
  uploadStatus = 'idle',
  validationMessages = [],
  onClearFile,
  onAnalyze,
  onRetry,
  className = ''
}) => {
  const hasFile = !!file;
  const canAnalyze = hasFile && uploadStatus === 'idle' && validationMessages.filter(msg => msg.type === 'error').length === 0;
  const isUploading = uploadStatus === 'uploading' || uploadStatus === 'processing';

  const getQuickTips = () => {
    return [
      {
        icon: 'FileText',
        title: 'Supported Formats',
        description: 'JPEG, PNG files up to 10MB'
      },
      {
        icon: 'Shield',
        title: 'Secure Upload',
        description: 'All files are encrypted during transfer'
      },
      {
        icon: 'Zap',
        title: 'Fast Analysis',
        description: 'AI analysis typically completes in 2-3 minutes'
      },
      {
        icon: 'Eye',
        title: 'Quality Check',
        description: 'Images are validated for clinical standards'
      }
    ];
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Upload Progress */}
      {hasFile && (
        <div className="bg-surface rounded-lg clinical-shadow p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Upload Status
          </h3>
          <UploadProgress
            progress={uploadProgress}
            status={uploadStatus}
            message={uploadStatus === 'uploading' ? 'Uploading to secure server...' : 
                    uploadStatus === 'processing' ? 'Running AI analysis...' : 
                    uploadStatus === 'completed' ? 'Analysis complete!' : 
                    uploadStatus === 'error' ? 'Upload failed' : 'Ready for upload'}
            estimatedTime={isUploading ? '2-3 minutes' : null}
          />
        </div>
      )}

      {/* Validation Messages */}
      {validationMessages.length > 0 && (
        <div className="bg-surface rounded-lg clinical-shadow p-4">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Validation Results
          </h3>
          <div className="space-y-3">
            {validationMessages.map((message, index) => (
              <div 
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-md ${
                  message.type === 'error' ? 'bg-error-50 border border-error-200' :
                  message.type === 'warning'? 'bg-warning-50 border border-warning-200' : 'bg-success-50 border border-success-200'
                }`}
              >
                <Icon 
                  name={message.type === 'error' ? 'XCircle' : 
                        message.type === 'warning' ? 'AlertTriangle' : 'CheckCircle'} 
                  size={16} 
                  className={`mt-0.5 ${
                    message.type === 'error' ? 'text-error-600' :
                    message.type === 'warning'? 'text-warning-600' : 'text-success-600'
                  }`}
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    message.type === 'error' ? 'text-error-700' :
                    message.type === 'warning'? 'text-warning-700' : 'text-success-700'
                  }`}>
                    {message.title}
                  </p>
                  {message.description && (
                    <p className={`text-xs mt-1 ${
                      message.type === 'error' ? 'text-error-600' :
                      message.type === 'warning'? 'text-warning-600' : 'text-success-600'
                    }`}>
                      {message.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="bg-surface rounded-lg clinical-shadow p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Actions
        </h3>
        <div className="space-y-3">
          {/* Analyze Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            iconName="Brain"
            onClick={onAnalyze}
            disabled={!canAnalyze || isUploading}
            loading={isUploading}
          >
            {isUploading ? 'Analyzing...' : 'Analyze Image'}
          </Button>

          {/* Clear Button */}
          {hasFile && (
            <Button
              variant="outline"
              size="md"
              fullWidth
              iconName="Trash2"
              onClick={onClearFile}
              disabled={isUploading}
            >
              Clear Selection
            </Button>
          )}

          {/* Retry Button */}
          {uploadStatus === 'error' && (
            <Button
              variant="warning"
              size="md"
              fullWidth
              iconName="RefreshCw"
              onClick={onRetry}
            >
              Retry Upload
            </Button>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-surface rounded-lg clinical-shadow p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Quick Tips
        </h3>
        <div className="space-y-3">
          {getQuickTips().map((tip, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={tip.icon} size={16} className="text-primary-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {tip.title}
                </p>
                <p className="text-xs text-text-secondary mt-1">
                  {tip.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-primary-50 rounded-lg border border-primary-200 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Icon name="HelpCircle" size={20} className="text-primary-600" />
          <h3 className="text-lg font-semibold text-primary-800">
            Need Help?
          </h3>
        </div>
        <p className="text-sm text-primary-700 mb-3">
          Having trouble with your upload? Check our troubleshooting guide or contact support.
        </p>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Book"
            className="border-primary-300 text-primary-700 hover:bg-primary-100"
          >
            Guide
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageCircle"
            className="border-primary-300 text-primary-700 hover:bg-primary-100"
          >
            Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadSidebar;