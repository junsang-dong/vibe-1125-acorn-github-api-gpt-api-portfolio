import React from 'react';
import { formatNumber } from '../utils/formatters';
import useVisitorCount from '../hooks/useVisitorCount';

const VisitorCounter = ({ useServer = false }) => {
  const { count, uniqueToday } = useVisitorCount(useServer);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <div>
            <h3 className="text-lg font-semibold text-white">방문자 수</h3>
            <p className="text-sm text-gray-400">총 방문자</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-green-400">
            {formatNumber(count)}
          </div>
          {useServer && uniqueToday > 0 && (
            <div className="text-sm text-gray-400">
              오늘: {formatNumber(uniqueToday)}명
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;

