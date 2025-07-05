import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ActiveStateIndicator from '../../components/ui/ActiveStateIndicator';
import NotificationToast, { useNotifications } from '../../components/ui/NotificationToast';
import FileUploadZone from './components/FileUploadZone';
import FilePreview from './components/FilePreview';
import UploadSidebar from './components/UploadSidebar';
import Icon from '../../components/AppIcon';

const MRIUploadDashboard = () => {
  const navigate = useNavigate();
  const { notifications, addNotification, removeNotification } = useNotifications();
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, processing, completed, error
  const [validationStatus, setValidationStatus] = useState('idle'); // idle, pending, valid, invalid
  const [validationMessages, setValidationMessages] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  // Simulate file validation
  useEffect(() => {
    if (selectedFile) {
      setValidationStatus('pending');
      setValidationMessages([]);
      
      const timer = setTimeout(() => {
        // Simulate validation logic
        const messages = [];
        let isValid = true;

        // Check file size
        if (selectedFile.size > 10 * 1024 * 1024) {
          messages.push({
            type: 'error',
            title: 'File Too Large',
            description: 'Maximum file size is 10MB'
          });
          isValid = false;
        }

        // Check file type
        if (!['image/jpeg', 'image/png'].includes(selectedFile.type)) {
          messages.push({
            type: 'error',
            title: 'Invalid File Format',
            description: 'Only JPEG and PNG files are supported'
          });
          isValid = false;
        }

        // Add success message if valid
        if (isValid) {
          messages.push({
            type: 'success',
            title: 'File Validated',
            description: 'Your MRI scan is ready for analysis'
          });
        }

        setValidationMessages(messages);
        setValidationStatus(isValid ? 'valid' : 'invalid');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [selectedFile]);

  const handleFileSelect = (file, error) => {
    if (error) {
      setUploadError(error.message);
      setSelectedFile(null);
      setValidationStatus('idle');
      setValidationMessages([]);
      
      addNotification({
        type: 'error',
        title: 'Upload Error',
        message: error.message
      });
    } else {
      setUploadError(null);
      setSelectedFile(file);
      setUploadStatus('idle');
      setUploadProgress(0);
      
      addNotification({
        type: 'success',
        title: 'File Selected',
        message: `${file.name} has been selected for analysis`
      });
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUploadError(null);
    setUploadStatus('idle');
    setUploadProgress(0);
    setValidationStatus('idle');
    setValidationMessages([]);
    
    addNotification({
      type: 'info',
      title: 'File Cleared',
      message: 'Ready for new upload'
    });
  };

  const handleAnalyze = async () => {
    if (!selectedFile || validationStatus !== 'valid') return;

    try {
      setUploadStatus('uploading');
      setUploadProgress(0);

      // Simulate upload progress
      const uploadInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(uploadInterval);
            setUploadStatus('processing');
            
            // Simulate processing
            setTimeout(() => {
              setUploadStatus('completed');
              
              addNotification({
                type: 'success',
                title: 'Analysis Complete',
                message: 'Your MRI scan has been analyzed successfully',
                actions: [
                  {
                    label: 'View Results',
                    primary: true,
                    onClick: () => navigate('/analysis-results-display'),
                    dismissOnClick: true
                  }
                ]
              });
            }, 3000);
            
            return 100;
          }
          return prev + 10;
        });
      }, 200);

    } catch (error) {
      setUploadStatus('error');
      addNotification({
        type: 'error',
        title: 'Analysis Failed',
        message: 'Failed to analyze the MRI scan. Please try again.',
        details: error.message
      });
    }
  };

  const handleRetry = () => {
    setUploadStatus('idle');
    setUploadProgress(0);
    handleAnalyze();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ActiveStateIndicator 
        showBreadcrumbs={true}
        showProgress={true}
        currentStep={1}
        totalSteps={3}
      />
      
      <main className="pt-4 pb-8">
        <div className="medical-container">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary-600" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-text-primary font-heading">
                  MRI Upload Dashboard
                </h1>
                <p className="text-lg text-text-secondary mt-1">
                  Upload brain MRI scans for AI-powered tumor classification analysis
                </p>
              </div>
            </div>
            
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary-600 mt-0.5" />
                <div>
                  <p className="text-sm text-primary-800 font-medium">
                    Secure Medical Image Processing
                  </p>
                  <p className="text-sm text-primary-700 mt-1">
                    All uploaded images are processed securely and comply with HIPAA standards. 
                    Analysis typically completes within 2-3 minutes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column - Upload Zone */}
            <div className="xl:col-span-2 space-y-6">
              {/* Upload Zone */}
              <div className="bg-surface rounded-lg clinical-shadow p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Upload MRI Scan
                </h2>
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  disabled={uploadStatus === 'uploading' || uploadStatus === 'processing'}
                  error={uploadError}
                />
              </div>

              {/* File Preview */}
              <div className="bg-surface rounded-lg clinical-shadow p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  File Preview
                </h2>
                <FilePreview
                  file={selectedFile}
                  onRemove={handleClearFile}
                  validationStatus={validationStatus}
                />
              </div>

              {/* Upload Instructions - Mobile/Tablet */}
              <div className="xl:hidden bg-surface rounded-lg clinical-shadow p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Upload Guidelines
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="FileText" size={20} className="text-primary-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-text-primary">File Requirements</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        Upload high-quality JPEG or PNG files up to 10MB in size
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Eye" size={20} className="text-primary-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-text-primary">Image Quality</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        Ensure images are clear, properly oriented, and show adequate contrast
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Icon name="Shield" size={20} className="text-primary-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-text-primary">Privacy & Security</h4>
                      <p className="text-sm text-text-secondary mt-1">
                        All uploads are encrypted and comply with medical privacy standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="xl:col-span-1">
              <UploadSidebar
                file={selectedFile}
                uploadProgress={uploadProgress}
                uploadStatus={uploadStatus}
                validationMessages={validationMessages}
                onClearFile={handleClearFile}
                onAnalyze={handleAnalyze}
                onRetry={handleRetry}
              />
            </div>
          </div>

          {/* Recent Uploads Section */}
          <div className="mt-12">
            <div className="bg-surface rounded-lg clinical-shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Recent Uploads
                </h2>
                <button
                  onClick={() => navigate('/analysis-history-archive')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>View All</span>
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              
              <div className="text-center py-8">
                <Icon name="FileText" size={48} className="text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary">
                  No recent uploads found. Upload your first MRI scan to get started.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={removeNotification}
        position="top-right"
        autoHideDuration={5000}
      />
    </div>
  );
};

export default MRIUploadDashboard;