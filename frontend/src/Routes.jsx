import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import MRIUploadDashboard from "pages/mri-upload-dashboard";
import AnalysisResultsDisplay from "pages/analysis-results-display";
import AnalysisHistoryArchive from "pages/analysis-history-archive";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MRIUploadDashboard />} />
        <Route path="/mri-upload-dashboard" element={<MRIUploadDashboard />} />
        <Route path="/analysis-results-display" element={<AnalysisResultsDisplay />} />
        <Route path="/analysis-history-archive" element={<AnalysisHistoryArchive />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;