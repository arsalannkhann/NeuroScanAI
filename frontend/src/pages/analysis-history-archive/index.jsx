import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ActiveStateIndicator from '../../components/ui/ActiveStateIndicator';
import NotificationToast, { useNotifications } from '../../components/ui/NotificationToast';
import HistoryMetrics from './components/HistoryMetrics';
import FilterControls from './components/FilterControls';
import HistoryTable from './components/HistoryTable';
import AnalyticsCharts from './components/AnalyticsCharts';
import ExportSidebar from './components/ExportSidebar';

const AnalysisHistoryArchive = () => {
  const navigate = useNavigate();
  const { notifications, addNotification, removeNotification } = useNotifications();
  
  const [isExportSidebarOpen, setIsExportSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});

  // Mock historical analysis data
  const mockHistoryData = [
    {
      id: 1,
      date: new Date('2024-01-15T10:30:00'),
      patientId: 'PT-2024-001',
      filename: 'brain_mri_axial_t1.jpg',
      tumorType: 'glioma',
      confidence: 94.2,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',
      processingTime: 2.3,
      notes: 'High-grade glioma detected in left frontal lobe'
    },
    {
      id: 2,
      date: new Date('2024-01-14T14:15:00'),
      patientId: 'PT-2024-002',
      filename: 'mri_scan_sagittal_t2.png',
      tumorType: 'meningioma',
      confidence: 87.6,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop',
      processingTime: 1.8,
      notes: 'Meningioma identified in right parietal region'
    },
    {
      id: 3,
      date: new Date('2024-01-14T09:45:00'),
      patientId: 'PT-2024-003',
      filename: 'brain_scan_coronal_flair.jpg',
      tumorType: 'pituitary',
      confidence: 91.3,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=100&h=100&fit=crop',
      processingTime: 2.1,
      notes: 'Pituitary adenoma detected'
    },
    {
      id: 4,
      date: new Date('2024-01-13T16:20:00'),
      patientId: 'PT-2024-004',
      filename: 'normal_brain_mri.png',
      tumorType: 'no_tumor',
      confidence: 96.8,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop',
      processingTime: 1.5,
      notes: 'No tumor detected - normal brain anatomy'
    },
    {
      id: 5,
      date: new Date('2024-01-13T11:30:00'),
      patientId: 'PT-2024-005',
      filename: 'complex_case_multi_sequence.jpg',
      tumorType: 'glioma',
      confidence: 89.4,
      status: 'pending',
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop',
      processingTime: 3.2,
      notes: 'Complex case requiring radiologist review'
    },
    {
      id: 6,
      date: new Date('2024-01-12T13:45:00'),
      patientId: 'PT-2024-006',
      filename: 'pediatric_brain_scan.png',
      tumorType: 'meningioma',
      confidence: 82.1,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop',
      processingTime: 2.7,
      notes: 'Pediatric case - small meningioma'
    },
    {
      id: 7,
      date: new Date('2024-01-12T08:15:00'),
      patientId: 'PT-2024-007',
      filename: 'emergency_scan_trauma.jpg',
      tumorType: 'no_tumor',
      confidence: 93.7,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop',
      processingTime: 1.2,
      notes: 'Emergency scan - no tumor, trauma-related changes'
    },
    {
      id: 8,
      date: new Date('2024-01-11T15:30:00'),
      patientId: 'PT-2024-008',
      filename: 'follow_up_post_surgery.png',
      tumorType: 'glioma',
      confidence: 76.3,
      status: 'failed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',
      processingTime: 0,
      notes: 'Analysis failed - image quality issues'
    },
    {
      id: 9,
      date: new Date('2024-01-11T10:00:00'),
      patientId: 'PT-2024-009',
      filename: 'research_volunteer_scan.jpg',
      tumorType: 'pituitary',
      confidence: 88.9,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=100&h=100&fit=crop',
      processingTime: 2.0,
      notes: 'Research study participant'
    },
    {
      id: 10,
      date: new Date('2024-01-10T14:45:00'),
      patientId: 'PT-2024-010',
      filename: 'routine_screening_mri.png',
      tumorType: 'no_tumor',
      confidence: 95.2,
      status: 'completed',
      thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop',
      processingTime: 1.6,
      notes: 'Routine screening - normal findings'
    }
  ];

  useEffect(() => {
    setFilteredData(mockHistoryData);
  }, []);

  const handleFiltersChange = (filters) => {
    setCurrentFilters(filters);
    
    let filtered = [...mockHistoryData];
    
    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.patientId.toLowerCase().includes(query) ||
        item.filename.toLowerCase().includes(query) ||
        item.notes.toLowerCase().includes(query)
      );
    }
    
    // Apply tumor type filter
    if (filters.tumorType !== 'all') {
      filtered = filtered.filter(item => item.tumorType === filters.tumorType);
    }
    
    // Apply confidence level filter
    if (filters.confidenceLevel !== 'all') {
      switch (filters.confidenceLevel) {
        case 'high':
          filtered = filtered.filter(item => item.confidence >= 90);
          break;
        case 'medium':
          filtered = filtered.filter(item => item.confidence >= 70 && item.confidence < 90);
          break;
        case 'low':
          filtered = filtered.filter(item => item.confidence < 70);
          break;
      }
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    
    setFilteredData(filtered);
  };

  const handleClearFilters = () => {
    setFilteredData(mockHistoryData);
    setCurrentFilters({});
  };

  const handleExport = () => {
    setIsExportSidebarOpen(true);
  };

  const handleViewDetails = (id) => {
    addNotification({
      type: 'info',
      title: 'Navigating to Results',
      message: 'Loading detailed analysis results...'
    });
    
    setTimeout(() => {
      navigate('/analysis-results-display', { state: { analysisId: id } });
    }, 1000);
  };

  const handleReanalyze = (id) => {
    const item = mockHistoryData.find(item => item.id === id);
    
    addNotification({
      type: 'info',
      title: 'Reanalysis Started',
      message: `Reanalyzing ${item?.filename}...`,
      details: 'This may take a few minutes to complete.'
    });
    
    // Simulate reanalysis process
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Reanalysis Complete',
        message: `${item?.filename} has been reanalyzed successfully.`,
        actions: [
          {
            label: 'View Results',
            primary: true,
            onClick: () => handleViewDetails(id),
            dismissOnClick: true
          }
        ]
      });
    }, 3000);
  };

  const handleGenerateReport = (id) => {
    const item = mockHistoryData.find(item => item.id === id);
    
    addNotification({
      type: 'info',
      title: 'Generating Report',
      message: `Creating diagnostic report for ${item?.filename}...`
    });
    
    // Simulate report generation
    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'Report Generated',
        message: 'Diagnostic report is ready for download.',
        actions: [
          {
            label: 'Download PDF',
            primary: true,
            onClick: () => console.log('Downloading report...'),
            dismissOnClick: true
          }
        ]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <ActiveStateIndicator 
          showBreadcrumbs={true}
          showProgress={false}
        />
        
        <div className="px-6 py-8">
          {/* Metrics Overview */}
          <HistoryMetrics />
          
          {/* Analytics Charts */}
          <AnalyticsCharts />
          
          {/* Filter Controls */}
          <FilterControls
            onFiltersChange={handleFiltersChange}
            onExport={handleExport}
            onClearFilters={handleClearFilters}
          />
          
          {/* History Table */}
          <HistoryTable
            data={filteredData}
            onViewDetails={handleViewDetails}
            onReanalyze={handleReanalyze}
            onGenerateReport={handleGenerateReport}
          />
        </div>
      </main>

      {/* Export Sidebar */}
      <ExportSidebar
        isOpen={isExportSidebarOpen}
        onClose={() => setIsExportSidebarOpen(false)}
        selectedItems={selectedItems}
      />

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

export default AnalysisHistoryArchive;