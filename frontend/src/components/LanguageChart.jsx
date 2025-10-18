import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { CHART_COLORS } from '../utils/constants';
import { formatBytes } from '../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

const LanguageChart = ({ languageStats }) => {
  if (!languageStats || Object.keys(languageStats).length === 0) {
    return null;
  }

  const languages = Object.keys(languageStats);
  const bytes = Object.values(languageStats);
  const total = bytes.reduce((a, b) => a + b, 0);

  const data = {
    labels: languages,
    datasets: [
      {
        label: '사용 비율',
        data: bytes,
        backgroundColor: CHART_COLORS,
        borderWidth: 2,
        borderColor: '#161b22'
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#c9d1d9',
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: '#161b22',
        titleColor: '#c9d1d9',
        bodyColor: '#8b949e',
        borderColor: '#30363d',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => {
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            const size = formatBytes(context.parsed);
            return `${context.label}: ${percentage}% (${size})`;
          }
        }
      }
    }
  };

  return (
    <div className="card mb-8">
      <h3 className="text-xl font-bold text-white mb-6">프로그래밍 언어 사용 비율</h3>
      <div className="h-80">
        <Doughnut data={data} options={options} />
      </div>
      
      {/* 상세 정보 */}
      <div className="mt-6 space-y-2">
        {languages.map((lang, idx) => {
          const percentage = ((bytes[idx] / total) * 100).toFixed(1);
          return (
            <div key={lang} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[idx] }}
                ></span>
                <span className="text-gray-300">{lang}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">{formatBytes(bytes[idx])}</span>
                <span className="text-blue-400 font-semibold min-w-[50px] text-right">
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageChart;

