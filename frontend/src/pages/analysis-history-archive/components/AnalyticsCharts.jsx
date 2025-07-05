import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsCharts = () => {
  const monthlyData = [
    { month: 'Jan', analyses: 245, accuracy: 94.2 },
    { month: 'Feb', analyses: 289, accuracy: 95.1 },
    { month: 'Mar', analyses: 312, accuracy: 93.8 },
    { month: 'Apr', analyses: 298, accuracy: 96.3 },
    { month: 'May', analyses: 334, accuracy: 94.7 },
    { month: 'Jun', analyses: 356, accuracy: 95.9 }
  ];

  const tumorDistribution = [
    { name: 'Glioma', value: 35, color: '#DC2626' },
    { name: 'Meningioma', value: 28, color: '#F59E0B' },
    { name: 'Pituitary', value: 22, color: '#2563EB' },
    { name: 'No Tumor', value: 15, color: '#059669' }
  ];

  const confidenceData = [
    { range: '90-100%', count: 1847, percentage: 65 },
    { range: '80-89%', count: 623, percentage: 22 },
    { range: '70-79%', count: 289, percentage: 10 },
    { range: '60-69%', count: 88, percentage: 3 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg clinical-shadow p-3">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <span style={{ color: entry.color }}>{entry.dataKey}: </span>
              {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Monthly Analysis Trends */}
      <div className="bg-surface rounded-lg clinical-shadow border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary font-heading">
              Monthly Analysis Trends
            </h3>
            <p className="text-sm text-text-secondary">
              Analysis volume and accuracy over time
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-success-600" />
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="analyses" 
                fill="#2563EB" 
                radius={[4, 4, 0, 0]}
                name="Analyses"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tumor Type Distribution */}
      <div className="bg-surface rounded-lg clinical-shadow border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary font-heading">
              Tumor Classification Distribution
            </h3>
            <p className="text-sm text-text-secondary">
              Breakdown of detected tumor types
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="PieChart" size={20} className="text-primary-600" />
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={tumorDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {tumorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          {tumorDistribution.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-text-secondary">
                {item.name}: <span className="font-medium data-text">{item.value}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Level Distribution */}
      <div className="bg-surface rounded-lg clinical-shadow border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary font-heading">
              Confidence Level Distribution
            </h3>
            <p className="text-sm text-text-secondary">
              Analysis confidence score breakdown
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="BarChart3" size={20} className="text-accent-600" />
          </div>
        </div>
        
        <div className="space-y-4">
          {confidenceData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-text-primary min-w-16">
                  {item.range}
                </span>
                <div className="flex-1 bg-secondary-100 rounded-full h-2 min-w-32">
                  <div 
                    className="bg-accent-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-text-primary data-text">
                  {item.count}
                </div>
                <div className="text-xs text-text-secondary">
                  {item.percentage}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accuracy Trends */}
      <div className="bg-surface rounded-lg clinical-shadow border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-text-primary font-heading">
              Accuracy Trends
            </h3>
            <p className="text-sm text-text-secondary">
              Model accuracy performance over time
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-success-600" />
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <YAxis 
                domain={['dataMin - 1', 'dataMax + 1']}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#64748B', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#059669" 
                strokeWidth={3}
                dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#059669', strokeWidth: 2 }}
                name="Accuracy %"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;