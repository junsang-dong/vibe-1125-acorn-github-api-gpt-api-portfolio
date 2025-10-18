import React, { useState } from 'react';
import { isValidUsername } from '../utils/formatters';

const SearchBar = ({ onSearch, loading }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError('GitHub 사용자명을 입력해주세요.');
      return;
    }
    
    if (!isValidUsername(trimmedUsername)) {
      setError('유효하지 않은 사용자명입니다. 영문, 숫자, 하이픈(-)만 사용 가능합니다.');
      return;
    }
    
    setError('');
    onSearch(trimmedUsername);
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="card max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
            GitHub 사용자명
          </label>
          <div className="flex space-x-3">
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleChange}
              placeholder="예: octocat"
              className="input-field flex-1"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  검색 중...
                </span>
              ) : (
                '검색'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </div>
        
        <div className="text-sm text-gray-400">
          <p>💡 팁: GitHub 사용자명을 입력하면 자동으로 포트폴리오가 생성됩니다.</p>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

