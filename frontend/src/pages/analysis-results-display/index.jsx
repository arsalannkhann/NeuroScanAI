import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ActiveStateIndicator from '../../components/ui/ActiveStateIndicator';
import LoadingOverlay from '../../components/ui/LoadingOverlay';
import NotificationToast, { useNotifications } from '../../components/ui/NotificationToast';
import MRIImageViewer from './components/MRIImageViewer';
import ResultCard from './components/ResultCard';
import DetailedBreakdown from './components/DetailedBreakdown';
import ActionPanel from './components/ActionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalysisResultsDisplay = () => {
  const navigate = useNavigate();
  const { notifications, addNotification, removeNotification, showAnalysisComplete } = useNotifications();
  
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(100);

  // Mock analysis data
  const analysisData = {
    scanInfo: {
      patientId: "P-2024-001",
      scanDate: "March 15, 2024",
      scanType: "T1-weighted FLAIR",
      imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      imageName: "brain_mri_axial_t1_flair.dcm",
      processingTime: "2.3 minutes",
      analysisId: "ANA-2024-03-15-001"
    },
    results: [
      {
        id: 1,
        tumorType: "Glioma",
        classification: "Grade II Astrocytoma",
        confidence: 89,
        clinicalSignificance: `High-grade glioma detected with characteristic infiltrative pattern. The tumor shows heterogeneous enhancement and surrounding edema consistent with astrocytic origin. Immediate neurosurgical consultation recommended.`,
        keyFeatures: ["Irregular borders", "Heterogeneous enhancement", "Peritumoral edema", "Mass effect"],
        recommendations: "Urgent neurosurgical consultation for biopsy and treatment planning. Consider advanced imaging (DTI, perfusion MRI) for surgical planning.",
        modelVersion: "NeuroScan-v2.1",
        processingTime: "847",
        timestamp: "2024-03-15 14:32:18"
      },
      {
        id: 2,
        tumorType: "Meningioma",
        classification: "Atypical Meningioma",
        confidence: 76,
        clinicalSignificance: `Moderate confidence for meningioma classification. The lesion demonstrates dural attachment and homogeneous enhancement pattern typical of meningiomas, though some atypical features are present.`,
        keyFeatures: ["Dural attachment", "Homogeneous enhancement", "Well-defined borders", "CSF cleft"],
        recommendations: "Follow-up imaging in 3-6 months to assess growth pattern. Consider neurosurgical evaluation if symptomatic or showing growth.",
        modelVersion: "NeuroScan-v2.1",
        processingTime: "847",
        timestamp: "2024-03-15 14:32:18"
      },
      {
        id: 3,
        tumorType: "Pituitary Adenoma",
        classification: "Microadenoma",
        confidence: 62,
        clinicalSignificance: `Lower confidence detection of small pituitary lesion. The enhancement pattern and location are suggestive of pituitary adenoma, but size limitations affect classification accuracy.`,
        keyFeatures: ["Sellar location", "Mild enhancement", "Small size", "Pituitary gland displacement"],
        recommendations: "Dedicated pituitary MRI with dynamic contrast enhancement recommended for better characterization. Endocrinology consultation advised.",
        modelVersion: "NeuroScan-v2.1",
        processingTime: "847",
        timestamp: "2024-03-15 14:32:18"
      },
      {
        id: 4,
        tumorType: "No Tumor",
        classification: "Normal Brain Tissue",
        confidence: 45,
        clinicalSignificance: `Low confidence for normal classification. While no definitive tumor is identified, some areas show subtle signal changes that require clinical correlation and possible follow-up.`,
        keyFeatures: ["Normal anatomy", "No mass effect", "Symmetric structures", "Age-appropriate changes"],
        recommendations: "Clinical correlation recommended. Consider follow-up imaging if symptoms persist or worsen.",
        modelVersion: "NeuroScan-v2.1",
        processingTime: "847",
        timestamp: "2024-03-15 14:32:18"
      }
    ]
  };

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      setIsLoading(false);
      showAnalysisComplete(analysisData.results[0].confidence);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleNewAnalysis = () => {
    navigate('/mri-upload-dashboard');
  };

  const handleSaveResults = async () => {
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 1000));
    addNotification({
      type: 'success',
      title: 'Results Saved',
      message: 'Analysis results have been saved to patient record.',
      details: `Analysis ID: ${analysisData.scanInfo.analysisId}`
    });
  };

  const handleGenerateReport = async () => {
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    addNotification({
      type: 'success',
      title: 'Report Generated',
      message: 'Comprehensive analysis report has been generated successfully.',
      actions: [
        {
          label: 'Download PDF',
          primary: true,
          onClick: () => console.log('Download PDF'),
          dismissOnClick: true
        }
      ]
    });
  };

  const handleResultSelect = (index) => {
    setSelectedResult(index);
  };

  const handleImageModalToggle = () => {
    setShowImageModal(!showImageModal);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <LoadingOverlay
          isVisible={true}
          message="Finalizing Analysis Results..."
          progress={analysisProgress}
          estimatedTime="30 seconds"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ActiveStateIndicator 
        showBreadcrumbs={true}
        showProgress={true}
        currentStep={2}
        totalSteps={3}
      />
      
      <main className="pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Analysis Summary Header */}
          <div className="bg-surface rounded-lg clinical-shadow p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-text-primary font-heading">
                    Analysis Complete
                  </h2>
                  <p className="text-text-secondary">
                    Brain tumor classification completed with AI confidence analysis
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-text-secondary">Analysis ID</div>
                <div className="font-medium text-text-primary data-text">
                  {analysisData.scanInfo.analysisId}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="text-sm text-primary-700">Patient ID</div>
                <div className="font-semibold text-primary-800 data-text">
                  {analysisData.scanInfo.patientId}
                </div>
              </div>
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="text-sm text-secondary-700">Scan Date</div>
                <div className="font-semibold text-secondary-800">
                  {analysisData.scanInfo.scanDate}
                </div>
              </div>
              <div className="bg-accent-50 rounded-lg p-4">
                <div className="text-sm text-accent-700">Scan Type</div>
                <div className="font-semibold text-accent-800">
                  {analysisData.scanInfo.scanType}
                </div>
              </div>
              <div className="bg-warning-50 rounded-lg p-4">
                <div className="text-sm text-warning-700">Processing Time</div>
                <div className="font-semibold text-warning-800">
                  {analysisData.scanInfo.processingTime}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Image Viewer */}
            <div className="lg:col-span-1">
              <MRIImageViewer
                imageUrl={analysisData.scanInfo.imageUrl}
                imageName={analysisData.scanInfo.imageName}
              />
            </div>

            {/* Middle Column - Results */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-surface rounded-lg clinical-shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-text-primary font-heading">
                    Classification Results
                  </h3>
                  <div className="text-sm text-text-secondary">
                    {analysisData.results.length} classifications found
                  </div>
                </div>
                
                <div className="space-y-4">
                  {analysisData.results.map((result, index) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultSelect(index)}
                      className="cursor-pointer"
                    >
                      <ResultCard
                        result={result}
                        isHighlighted={selectedResult === index}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Action Panel */}
            <div className="lg:col-span-1">
              <ActionPanel
                onNewAnalysis={handleNewAnalysis}
                onSaveResults={handleSaveResults}
                onGenerateReport={handleGenerateReport}
              />
            </div>
          </div>

          {/* Detailed Breakdown Section */}
          <div className="mt-8">
            <DetailedBreakdown analysisData={analysisData} />
          </div>

          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6 z-50">
            <Button
              variant="primary"
              iconName="Plus"
              onClick={handleNewAnalysis}
              className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
              title="Start New Analysis"
            />
          </div>
        </div>
      </main>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-1200 bg-background/90 backdrop-blur-sm">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="max-w-4xl w-full">
              <MRIImageViewer
                imageUrl={analysisData.scanInfo.imageUrl}
                imageName={analysisData.scanInfo.imageName}
                onClose={handleImageModalToggle}
              />
            </div>
          </div>
        </div>
      )}

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

export default AnalysisResultsDisplay;