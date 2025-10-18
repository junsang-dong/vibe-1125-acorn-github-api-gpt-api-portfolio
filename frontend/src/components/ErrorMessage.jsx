import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-start space-x-3">
        <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            오류가 발생했습니다
          </h3>
          <p className="text-gray-300">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 btn-secondary"
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;

