import React from 'react';
import Card from '../ui/Card';

interface HealthChartProps {
  title: string;
  subtitle?: string;
  data: {
    labels: string[];
    values: number[];
    color?: string;
  };
  type?: 'line' | 'bar';
  height?: number;
}

const HealthChart: React.FC<HealthChartProps> = ({
  title,
  subtitle,
  data,
  type = 'line',
  height = 200
}) => {
  const maxValue = Math.max(...data.values);
  const minValue = Math.min(...data.values);
  const range = maxValue - minValue;

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
      
      <div className="relative" style={{ height: `${height}px` }}>
        <svg width="100%" height="100%" className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((percent) => (
            <line
              key={percent}
              x1="0"
              y1={`${percent}%`}
              x2="100%"
              y2={`${percent}%`}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Data visualization */}
          {type === 'line' ? (
            <g>
              {/* Line path */}
              <path
                d={`M ${data.values.map((value, index) => {
                  const x = (index / (data.values.length - 1)) * 100;
                  const y = 100 - ((value - minValue) / range) * 100;
                  return `${index === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                }).join(' ')}`}
                stroke={data.color || '#3B82F6'}
                strokeWidth="3"
                fill="none"
                className="drop-shadow-sm"
              />
              
              {/* Data points */}
              {data.values.map((value, index) => {
                const x = (index / (data.values.length - 1)) * 100;
                const y = 100 - ((value - minValue) / range) * 100;
                return (
                  <circle
                    key={index}
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill={data.color || '#3B82F6'}
                    className="drop-shadow-sm hover:r-6 transition-all cursor-pointer"
                  />
                );
              })}
            </g>
          ) : (
            <g>
              {/* Bars */}
              {data.values.map((value, index) => {
                const x = (index / data.values.length) * 100;
                const barWidth = 100 / data.values.length * 0.8;
                const height = ((value - minValue) / range) * 100;
                const y = 100 - height;
                
                return (
                  <rect
                    key={index}
                    x={`${x + (100 / data.values.length * 0.1)}%`}
                    y={`${y}%`}
                    width={`${barWidth}%`}
                    height={`${height}%`}
                    fill={data.color || '#3B82F6'}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                    rx="2"
                  />
                );
              })}
            </g>
          )}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 px-2">
          {data.labels.map((label, index) => (
            <span key={index} className="text-xs text-gray-500">
              {label}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HealthChart;