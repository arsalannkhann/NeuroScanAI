import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ActiveStateIndicator = ({ 
  showBreadcrumbs = true, 
  showProgress = false,
  currentStep = 1,
  totalSteps = 3 
}) => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/mri-upload-dashboard':
        return {
          title: 'MRI Upload Dashboard',
          description: 'Upload and manage MRI scans for brain tumor analysis',
          icon: 'Upload',
          step: 1,
          breadcrumbs: [
            { label: 'Dashboard', path: '/mri-upload-dashboard', active: true }
          ]
        };
      case '/analysis-results-display':
        return {
          title: 'Analysis Results',
          description: 'View detailed brain tumor analysis results and confidence metrics',
          icon: 'Activity',
          step: 2,
          breadcrumbs: [
            { label: 'Dashboard', path: '/mri-upload-dashboard', active: false },
            { label: 'Results', path: '/analysis-results-display', active: true }
          ]
        };
      case '/analysis-history-archive':
        return {
          title: 'Analysis History',
          description: 'Browse and manage historical analysis records and reports',
          icon: 'Archive',
          step: 3,
          breadcrumbs: [
            { label: 'Dashboard', path: '/mri-upload-dashboard', active: false },
            { label: 'History', path: '/analysis-history-archive', active: true }
          ]
        };
      default:
        return {
          title: 'NeuroScan AI',
          description: 'Medical brain tumor analysis platform',
          icon: 'Brain',
          step: 1,
          breadcrumbs: []
        };
    }
  };

  const pageInfo = getPageInfo();

  return (
    <div className="bg-surface border-b border-border">
      {/* Breadcrumbs */}
      {showBreadcrumbs && pageInfo.breadcrumbs.length > 0 && (
        <div className="px-6 py-3 border-b border-border-muted">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Icon name="Home" size={16} className="text-text-muted" />
            {pageInfo.breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                <Icon name="ChevronRight" size={14} className="text-text-muted" />
                <span
                  className={`
                    ${crumb.active 
                      ? 'text-primary-600 font-medium' :'text-text-secondary hover:text-text-primary cursor-pointer'
                    }
                    transition-colors duration-200
                  `}
                  onClick={() => !crumb.active && (window.location.href = crumb.path)}
                >
                  {crumb.label}
                </span>
              </React.Fragment>
            ))}
          </nav>
        </div>
      )}

      {/* Page Header */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-50 rounded-lg">
              <Icon name={pageInfo.icon} size={24} className="text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-text-primary font-heading">
                {pageInfo.title}
              </h1>
              <p className="text-text-secondary mt-1">
                {pageInfo.description}
              </p>
            </div>
          </div>

          {/* Workflow Progress */}
          {showProgress && (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Progress:</span>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalSteps }, (_, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;
                    
                    return (
                      <div
                        key={stepNumber}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                          ${isActive 
                            ? 'bg-primary-600 text-primary-foreground' 
                            : isCompleted 
                              ? 'bg-success-500 text-success-foreground'
                              : 'bg-secondary-100 text-text-muted'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <Icon name="Check" size={14} />
                        ) : (
                          stepNumber
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-sm text-text-secondary data-text">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
          )}
        </div>

        {/* Workflow Steps Indicator */}
        {showProgress && (
          <div className="mt-6 md:hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Workflow Progress</span>
              <span className="text-sm text-text-secondary data-text">
                {currentStep}/{totalSteps}
              </span>
            </div>
            <div className="w-full bg-secondary-100 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-xs text-text-muted">
              <span>Upload</span>
              <span>Analysis</span>
              <span>History</span>
            </div>
          </div>
        )}

        {/* Status Indicators */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success-500 rounded-full"></div>
            <span className="text-sm text-text-secondary">System Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse-subtle"></div>
            <span className="text-sm text-text-secondary">AI Model Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} className="text-accent-500" />
            <span className="text-sm text-text-secondary">HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveStateIndicator;