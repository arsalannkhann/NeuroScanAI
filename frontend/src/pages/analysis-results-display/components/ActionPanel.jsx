import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionPanel = ({ onNewAnalysis, onSaveResults, onGenerateReport }) => {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true);
    try {
      await onGenerateReport();
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleSaveResults = async () => {
    setIsSaving(true);
    try {
      await onSaveResults();
    } finally {
      setIsSaving(false);
    }
  };

  const quickActions = [
    {
      id: 'new-analysis',
      label: 'New Analysis',
      icon: 'Plus',
      variant: 'primary',
      onClick: onNewAnalysis,
      description: 'Start a new MRI analysis'
    },
    {
      id: 'save-results',
      label: 'Save Results',
      icon: 'Save',
      variant: 'secondary',
      onClick: handleSaveResults,
      loading: isSaving,
      description: 'Save current analysis results'
    },
    {
      id: 'generate-report',
      label: 'Generate Report',
      icon: 'FileText',
      variant: 'outline',
      onClick: handleGenerateReport,
      loading: isGeneratingReport,
      description: 'Create comprehensive PDF report'
    }
  ];

  const shareOptions = [
    {
      id: 'email',
      label: 'Email Report',
      icon: 'Mail',
      onClick: () => console.log('Email report')
    },
    {
      id: 'print',
      label: 'Print Results',
      icon: 'Printer',
      onClick: () => window.print()
    },
    {
      id: 'export',
      label: 'Export Data',
      icon: 'Download',
      onClick: () => console.log('Export data')
    }
  ];

  const consultationOptions = [
    {
      id: 'second-opinion',
      label: 'Request Second Opinion',
      icon: 'Users',
      description: 'Get additional expert review'
    },
    {
      id: 'schedule-followup',
      label: 'Schedule Follow-up',
      icon: 'Calendar',
      description: 'Plan next appointment'
    },
    {
      id: 'patient-discussion',
      label: 'Patient Discussion',
      icon: 'MessageCircle',
      description: 'Prepare patient consultation'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-surface rounded-lg clinical-shadow p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Quick Actions
        </h3>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant={action.variant}
              iconName={action.icon}
              onClick={action.onClick}
              loading={action.loading}
              fullWidth
              className="justify-start"
            >
              <div className="flex flex-col items-start ml-2">
                <span className="font-medium">{action.label}</span>
                <span className="text-xs opacity-75">{action.description}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Share & Export */}
      <div className="bg-surface rounded-lg clinical-shadow p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Share & Export
        </h3>
        <div className="space-y-2">
          {shareOptions.map((option) => (
            <button
              key={option.id}
              onClick={option.onClick}
              className="w-full flex items-center space-x-3 p-3 rounded-md text-left hover:bg-secondary-50 transition-colors duration-200 focus-ring"
            >
              <Icon name={option.icon} size={18} className="text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clinical Workflow */}
      <div className="bg-surface rounded-lg clinical-shadow p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Clinical Workflow
        </h3>
        <div className="space-y-3">
          {consultationOptions.map((option) => (
            <button
              key={option.id}
              className="w-full flex items-start space-x-3 p-3 rounded-md text-left hover:bg-secondary-50 transition-colors duration-200 focus-ring"
            >
              <Icon name={option.icon} size={18} className="text-primary-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-text-primary">{option.label}</div>
                <div className="text-xs text-text-secondary mt-1">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis History Quick Access */}
      <div className="bg-surface rounded-lg clinical-shadow p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Recent Analyses
        </h3>
        <div className="space-y-3">
          {[
            { id: 1, patient: 'Patient #2024-001', date: '2024-03-14', type: 'Glioma' },
            { id: 2, patient: 'Patient #2024-002', date: '2024-03-13', type: 'Meningioma' },
            { id: 3, patient: 'Patient #2024-003', date: '2024-03-12', type: 'No Tumor' }
          ].map((analysis) => (
            <button
              key={analysis.id}
              className="w-full flex items-center justify-between p-3 rounded-md text-left hover:bg-secondary-50 transition-colors duration-200 focus-ring"
            >
              <div>
                <div className="text-sm font-medium text-text-primary">{analysis.patient}</div>
                <div className="text-xs text-text-secondary">{analysis.date}</div>
              </div>
              <div className="text-xs text-primary-600 font-medium">{analysis.type}</div>
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          iconName="Archive"
          size="sm"
          fullWidth
          className="mt-3"
          onClick={() => window.location.href = '/analysis-history-archive'}
        >
          View All History
        </Button>
      </div>

      {/* System Status */}
      <div className="bg-surface rounded-lg clinical-shadow p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          System Status
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-text-secondary">AI Model</span>
            </div>
            <span className="text-sm font-medium text-success-600">Online</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-sm text-text-secondary">Database</span>
            </div>
            <span className="text-sm font-medium text-success-600">Connected</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning-500 rounded-full"></div>
              <span className="text-sm text-text-secondary">Queue</span>
            </div>
            <span className="text-sm font-medium text-warning-600">2 pending</span>
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-warning-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-warning-800 mb-1">Medical Disclaimer</h4>
            <p className="text-xs text-warning-700 leading-relaxed">
              This AI analysis is for diagnostic assistance only. Always consult with qualified medical professionals for final diagnosis and treatment decisions. Results should be interpreted in conjunction with clinical findings and patient history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPanel;