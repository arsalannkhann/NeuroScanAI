import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultCard = ({ result, isHighlighted = false }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'success';
    if (confidence >= 60) return 'warning';
    return 'error';
  };

  const getConfidenceStyles = (confidence) => {
    const color = getConfidenceColor(confidence);
    switch (color) {
      case 'success':
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          text: 'text-success-700',
          badge: 'bg-success-100 text-success-800',
          icon: 'text-success-600'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          border: 'border-warning-200',
          text: 'text-warning-700',
          badge: 'bg-warning-100 text-warning-800',
          icon: 'text-warning-600'
        };
      case 'error':
        return {
          bg: 'bg-error-50',
          border: 'border-error-200',
          text: 'text-error-700',
          badge: 'bg-error-100 text-error-800',
          icon: 'text-error-600'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          border: 'border-secondary-200',
          text: 'text-secondary-700',
          badge: 'bg-secondary-100 text-secondary-800',
          icon: 'text-secondary-600'
        };
    }
  };

  const getTumorIcon = (tumorType) => {
    switch (tumorType.toLowerCase()) {
      case 'glioma':
        return 'Brain';
      case 'meningioma':
        return 'Circle';
      case 'pituitary':
        return 'Target';
      case 'no tumor':
        return 'CheckCircle';
      default:
        return 'AlertCircle';
    }
  };

  const styles = getConfidenceStyles(result.confidence);

  return (
    <div className={`
      ${styles.bg} ${styles.border} border-2 rounded-lg p-6 transition-all duration-200
      ${isHighlighted ? 'ring-2 ring-primary-500 ring-offset-2' : ''}
      hover:shadow-md cursor-pointer
    `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full ${styles.badge} flex items-center justify-center`}>
            <Icon 
              name={getTumorIcon(result.tumorType)} 
              size={20} 
              className={styles.icon}
            />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${styles.text} font-heading`}>
              {result.tumorType}
            </h3>
            <p className="text-sm text-text-secondary">
              {result.classification}
            </p>
          </div>
        </div>
        
        {/* Confidence Badge */}
        <div className={`${styles.badge} px-3 py-1 rounded-full`}>
          <span className="text-sm font-semibold data-text">
            {result.confidence}%
          </span>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-text-primary">Confidence Level</span>
          <span className="text-sm text-text-secondary">
            {result.confidence >= 80 ? 'High' : result.confidence >= 60 ? 'Moderate' : 'Low'}
          </span>
        </div>
        <div className="w-full bg-secondary-100 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              result.confidence >= 80 ? 'bg-success-500' : 
              result.confidence >= 60 ? 'bg-warning-500' : 'bg-error-500'
            }`}
            style={{ width: `${result.confidence}%` }}
          ></div>
        </div>
      </div>

      {/* Clinical Significance */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Clinical Significance</h4>
        <p className="text-sm text-text-secondary leading-relaxed">
          {result.clinicalSignificance}
        </p>
      </div>

      {/* Key Features */}
      {result.keyFeatures && result.keyFeatures.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-text-primary mb-2">Key Features Detected</h4>
          <div className="flex flex-wrap gap-2">
            {result.keyFeatures.map((feature, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {result.recommendations && (
        <div className="border-t border-border-muted pt-4">
          <div className="flex items-start space-x-2">
            <Icon name="Lightbulb" size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Recommendations</h4>
              <p className="text-sm text-text-secondary">
                {result.recommendations}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Processing Info */}
      <div className="mt-4 pt-4 border-t border-border-muted">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center space-x-4">
            <span>Model: {result.modelVersion}</span>
            <span>Processing: {result.processingTime}ms</span>
          </div>
          <span>{result.timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;