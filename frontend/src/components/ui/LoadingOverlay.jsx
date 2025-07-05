import React from 'react';
import Icon from '../AppIcon';

const LoadingOverlay = ({ 
  isVisible = false, 
  message = "Processing MRI Analysis...", 
  progress = null,
  estimatedTime = null,
  onCancel = null 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-1200 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-surface rounded-lg clinical-shadow-elevated p-8 max-w-md w-full">
          {/* Loading Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-100 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-primary-600" />
              </div>
            </div>
          </div>

          {/* Loading Message */}
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
              {message}
            </h3>
            <p className="text-sm text-text-secondary">
              Our AI is analyzing your MRI scan for tumor detection and classification.
            </p>
          </div>

          {/* Progress Bar */}
          {progress !== null && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-text-primary">Progress</span>
                <span className="text-sm text-text-secondary data-text">{progress}%</span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Estimated Time */}
          {estimatedTime && (
            <div className="mb-6 p-3 bg-primary-50 rounded-md border border-primary-100">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary-600" />
                <span className="text-sm text-primary-700">
                  Estimated time remaining: <span className="font-medium data-text">{estimatedTime}</span>
                </span>
              </div>
            </div>
          )}

          {/* Processing Steps */}
          <div className="mb-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span className="text-sm text-text-secondary">Image preprocessing completed</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse-subtle"></div>
                <span className="text-sm text-text-primary font-medium">AI model analysis in progress</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-200 rounded-full"></div>
                <span className="text-sm text-text-muted">Generating confidence metrics</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-secondary-200 rounded-full"></div>
                <span className="text-sm text-text-muted">Preparing diagnostic report</span>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          {onCancel && (
            <div className="flex justify-center">
              <button
                onClick={onCancel}
                className="px-6 py-2 text-sm font-medium text-text-secondary hover:text-text-primary border border-border rounded-md hover:bg-secondary-50 transition-colors duration-200 focus-ring"
              >
                Cancel Analysis
              </button>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="mt-6 p-3 bg-warning-50 border border-warning-100 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-warning-700">
                This AI analysis is for diagnostic assistance only. Always consult with qualified medical professionals for final diagnosis and treatment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;