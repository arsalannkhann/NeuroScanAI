import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedBreakdown = ({ analysisData }) => {
  const [activeTab, setActiveTab] = useState('model-insights');

  const tabs = [
    {
      id: 'model-insights',
      label: 'Model Insights',
      icon: 'Brain'
    },
    {
      id: 'processing-metadata',
      label: 'Processing Data',
      icon: 'Settings'
    },
    {
      id: 'technical-details',
      label: 'Technical Details',
      icon: 'Code'
    }
  ];

  const modelInsights = {
    layerActivations: [
      { layer: 'Conv2D_1', activation: 0.87, description: 'Edge detection and basic feature extraction' },
      { layer: 'Conv2D_5', activation: 0.92, description: 'Texture pattern recognition' },
      { layer: 'Conv2D_10', activation: 0.78, description: 'Shape and boundary identification' },
      { layer: 'Dense_1', activation: 0.94, description: 'High-level feature combination' },
      { layer: 'Output', activation: 0.89, description: 'Final classification decision' }
    ],
    attentionMaps: [
      { region: 'Frontal Lobe', attention: 0.23, significance: 'Low' },
      { region: 'Parietal Lobe', attention: 0.89, significance: 'High' },
      { region: 'Temporal Lobe', attention: 0.45, significance: 'Moderate' },
      { region: 'Occipital Lobe', attention: 0.12, significance: 'Low' },
      { region: 'Cerebellum', attention: 0.67, significance: 'Moderate' }
    ],
    uncertaintyAnalysis: {
      epistemic: 0.15,
      aleatoric: 0.08,
      total: 0.23,
      interpretation: 'Low model uncertainty indicates high confidence in prediction reliability'
    }
  };

  const processingMetadata = {
    imageProperties: {
      dimensions: '256x256x128',
      voxelSize: '1.0x1.0x1.0 mm',
      scanType: 'T1-weighted FLAIR',
      contrast: 'Gadolinium enhanced',
      acquisitionTime: '8 minutes 32 seconds'
    },
    preprocessing: [
      { step: 'Skull Stripping', status: 'completed', duration: '2.3s' },
      { step: 'Bias Field Correction', status: 'completed', duration: '1.8s' },
      { step: 'Intensity Normalization', status: 'completed', duration: '0.9s' },
      { step: 'Registration to Atlas', status: 'completed', duration: '4.2s' },
      { step: 'Noise Reduction', status: 'completed', duration: '1.5s' }
    ],
    qualityMetrics: {
      signalToNoise: 28.5,
      contrastToNoise: 15.2,
      imageSharpness: 0.87,
      artifactScore: 0.12
    }
  };

  const technicalDetails = {
    modelArchitecture: {
      name: 'NeuroScan-CNN-v2.1',
      parameters: '2.3M',
      layers: 47,
      inputShape: '[256, 256, 128, 1]',
      outputClasses: 4
    },
    trainingData: {
      totalSamples: 15420,
      validationAccuracy: 0.94,
      testAccuracy: 0.92,
      lastTraining: 'February 2024',
      datasetSources: 'BraTS 2023, TCGA-GBM, TCGA-LGG'
    },
    performance: {
      inferenceTime: '847ms',
      memoryUsage: '2.1GB',
      gpuUtilization: '78%',
      batchSize: 1
    }
  };

  const renderModelInsights = () => (
    <div className="space-y-6">
      {/* Layer Activations */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Neural Network Layer Activations
        </h4>
        <div className="space-y-3">
          {modelInsights.layerActivations.map((layer, index) => (
            <div key={index} className="bg-secondary-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-text-primary data-text">{layer.layer}</span>
                <span className="text-sm font-semibold text-primary-600 data-text">
                  {(layer.activation * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${layer.activation * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-text-secondary">{layer.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Attention Maps */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Brain Region Attention Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modelInsights.attentionMaps.map((region, index) => (
            <div key={index} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-text-primary">{region.region}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  region.significance === 'High' ? 'bg-success-100 text-success-800' :
                  region.significance === 'Moderate'? 'bg-warning-100 text-warning-800' : 'bg-secondary-100 text-secondary-800'
                }`}>
                  {region.significance}
                </span>
              </div>
              <div className="w-full bg-secondary-100 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    region.significance === 'High' ? 'bg-success-500' :
                    region.significance === 'Moderate'? 'bg-warning-500' : 'bg-secondary-400'
                  }`}
                  style={{ width: `${region.attention * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-text-secondary mt-1 data-text">
                Attention: {(region.attention * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Uncertainty Analysis */}
      <div className="bg-primary-50 border border-primary-100 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-primary-700 mb-4 font-heading">
          Model Uncertainty Analysis
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 data-text">
              {(modelInsights.uncertaintyAnalysis.epistemic * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-primary-700">Epistemic</div>
            <div className="text-xs text-primary-600">Model Knowledge</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 data-text">
              {(modelInsights.uncertaintyAnalysis.aleatoric * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-primary-700">Aleatoric</div>
            <div className="text-xs text-primary-600">Data Noise</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 data-text">
              {(modelInsights.uncertaintyAnalysis.total * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-primary-700">Total</div>
            <div className="text-xs text-primary-600">Combined</div>
          </div>
        </div>
        <p className="text-sm text-primary-700 bg-primary-100 rounded-md p-3">
          <Icon name="Info" size={16} className="inline mr-2" />
          {modelInsights.uncertaintyAnalysis.interpretation}
        </p>
      </div>
    </div>
  );

  const renderProcessingMetadata = () => (
    <div className="space-y-6">
      {/* Image Properties */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Image Properties
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(processingMetadata.imageProperties).map(([key, value]) => (
            <div key={key} className="bg-secondary-50 rounded-lg p-4">
              <div className="text-sm text-text-secondary capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="text-lg font-semibold text-text-primary data-text">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preprocessing Steps */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Preprocessing Pipeline
        </h4>
        <div className="space-y-3">
          {processingMetadata.preprocessing.map((step, index) => (
            <div key={index} className="flex items-center justify-between bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} className="text-success-600" />
                </div>
                <span className="font-medium text-text-primary">{step.step}</span>
              </div>
              <div className="text-sm text-text-secondary data-text">{step.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Metrics */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Image Quality Metrics
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(processingMetadata.qualityMetrics).map(([key, value]) => (
            <div key={key} className="bg-surface border border-border rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary-600 data-text">{value}</div>
              <div className="text-sm text-text-secondary capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTechnicalDetails = () => (
    <div className="space-y-6">
      {/* Model Architecture */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Model Architecture
        </h4>
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(technicalDetails.modelArchitecture).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-border-muted last:border-b-0">
                <span className="text-text-secondary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="font-medium text-text-primary data-text">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training Data */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Training Information
        </h4>
        <div className="bg-surface border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(technicalDetails.trainingData).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b border-border-muted last:border-b-0">
                <span className="text-text-secondary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="font-medium text-text-primary data-text">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h4 className="text-lg font-semibold text-text-primary mb-4 font-heading">
          Runtime Performance
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(technicalDetails.performance).map(([key, value]) => (
            <div key={key} className="bg-accent-50 border border-accent-100 rounded-lg p-4 text-center">
              <div className="text-xl font-bold text-accent-600 data-text">{value}</div>
              <div className="text-sm text-accent-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-lg clinical-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-text-primary font-heading">
              Detailed Analysis Breakdown
            </h3>
            <p className="text-text-secondary mt-1">
              Comprehensive AI model insights and processing information
            </p>
          </div>
          <Button
            variant="outline"
            iconName="Download"
            size="sm"
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-primary-600 text-primary-600' :'border-transparent text-text-secondary hover:text-text-primary hover:border-secondary-300'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'model-insights' && renderModelInsights()}
        {activeTab === 'processing-metadata' && renderProcessingMetadata()}
        {activeTab === 'technical-details' && renderTechnicalDetails()}
      </div>
    </div>
  );
};

export default DetailedBreakdown;