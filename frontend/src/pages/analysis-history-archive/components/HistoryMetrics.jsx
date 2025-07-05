import React from 'react';
import Icon from '../../../components/AppIcon';

const HistoryMetrics = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Analyses",
      value: "2,847",
      change: "+12.5%",
      changeType: "increase",
      icon: "Activity",
      color: "primary"
    },
    {
      id: 2,
      title: "This Month",
      value: "324",
      change: "+8.2%",
      changeType: "increase",
      icon: "Calendar",
      color: "accent"
    },
    {
      id: 3,
      title: "Avg Confidence",
      value: "94.2%",
      change: "+2.1%",
      changeType: "increase",
      icon: "TrendingUp",
      color: "success"
    },
    {
      id: 4,
      title: "Processing Time",
      value: "2.3s",
      change: "-0.5s",
      changeType: "decrease",
      icon: "Clock",
      color: "warning"
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary-50',
          icon: 'text-primary-600',
          value: 'text-primary-700'
        };
      case 'accent':
        return {
          bg: 'bg-accent-50',
          icon: 'text-accent-600',
          value: 'text-accent-700'
        };
      case 'success':
        return {
          bg: 'bg-success-50',
          icon: 'text-success-600',
          value: 'text-success-700'
        };
      case 'warning':
        return {
          bg: 'bg-warning-50',
          icon: 'text-warning-600',
          value: 'text-warning-700'
        };
      default:
        return {
          bg: 'bg-secondary-50',
          icon: 'text-secondary-600',
          value: 'text-secondary-700'
        };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => {
        const colors = getColorClasses(metric.color);
        
        return (
          <div
            key={metric.id}
            className="bg-surface rounded-lg clinical-shadow p-6 border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                <Icon name={metric.icon} size={24} className={colors.icon} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.changeType === 'increase' ? 'text-success-600' : 'text-error-600'
              }`}>
                <Icon 
                  name={metric.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={16} 
                />
                <span className="font-medium data-text">{metric.change}</span>
              </div>
            </div>
            
            <div>
              <h3 className={`text-2xl font-semibold ${colors.value} mb-1 data-text`}>
                {metric.value}
              </h3>
              <p className="text-sm text-text-secondary font-medium">
                {metric.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryMetrics;