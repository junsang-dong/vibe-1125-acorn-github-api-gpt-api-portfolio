import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepositoryList from './components/RepositoryList';
import LanguageChart from './components/LanguageChart';
import VisitorCounter from './components/VisitorCounter';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import useGitHubData from './hooks/useGitHubData';
import useAutoRefresh from './hooks/useAutoRefresh';
import { APP_CONFIG } from './utils/constants';

function App() {
  const [currentUsername, setCurrentUsername] = useState('');
  const { userData, reposData, loading, error, fetchData, reset } = useGitHubData();

  // 검색 핸들러
  const handleSearch = useCallback((username) => {
    setCurrentUsername(username);
    fetchData(username, {
      limit: APP_CONFIG.DEFAULT_REPO_LIMIT,
      includeGPT: true
    });
  }, [fetchData]);

  // 자동 새로고침 콜백
  const refreshCallback = useCallback(() => {
    if (currentUsername) {
      console.log('Auto refreshing data...');
      fetchData(currentUsername, {
        limit: APP_CONFIG.DEFAULT_REPO_LIMIT,
        includeGPT: false // 자동 새로고침 시 GPT 요약 생략 (비용 절감)
      });
    }
  }, [currentUsername, fetchData]);

  const { isEnabled, toggleAutoRefresh, remainingTime } = useAutoRefresh(
    refreshCallback,
    APP_CONFIG.AUTO_REFRESH_INTERVAL
  );

  // 수동 새로고침
  const handleManualRefresh = () => {
    if (currentUsername) {
      fetchData(currentUsername, {
        limit: APP_CONFIG.DEFAULT_REPO_LIMIT,
        includeGPT: false
      });
    }
  };

  // 에러 재시도
  const handleRetry = () => {
    if (currentUsername) {
      handleSearch(currentUsername);
    }
  };

  // 남은 시간 포맷팅
  const formatRemainingTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-github-dark">
      <Header />
      
      <div className="container mx-auto px-4 pb-12">
        {/* 검색바 */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* 제어 패널 */}
        {userData && (
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              {/* 수동 새로고침 */}
              <button
                onClick={handleManualRefresh}
                disabled={loading}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <svg
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>새로고침</span>
              </button>

              {/* 자동 새로고침 토글 */}
              <button
                onClick={toggleAutoRefresh}
                className={`btn-secondary flex items-center space-x-2 ${isEnabled ? 'ring-2 ring-green-500' : ''}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>자동 새로고침: {isEnabled ? 'ON' : 'OFF'}</span>
              </button>

              {isEnabled && (
                <span className="text-sm text-gray-400">
                  다음 새로고침: {formatRemainingTime(remainingTime)}
                </span>
              )}
            </div>

            {/* 초기화 버튼 */}
            <button
              onClick={reset}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              초기화
            </button>
          </div>
        )}

        {/* 로딩 상태 */}
        {loading && !userData && (
          <LoadingSpinner message="GitHub 데이터를 불러오는 중... AI 요약을 생성하는 데 시간이 걸릴 수 있습니다." />
        )}

        {/* 에러 상태 */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* 데이터 표시 */}
        {userData && !error && (
          <div className="space-y-8">
            {/* 사용자 프로필 */}
            <UserProfile user={userData} />

            {/* 두 열 레이아웃 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 메인 컨텐츠 (저장소 목록) */}
              <div className="lg:col-span-2">
                {reposData && (
                  <RepositoryList repositories={reposData.repositories} />
                )}
              </div>

              {/* 사이드바 (차트, 방문자) */}
              <div className="space-y-6">
                {reposData && reposData.language_stats && (
                  <LanguageChart languageStats={reposData.language_stats} />
                )}
                
                <VisitorCounter useServer={false} />
              </div>
            </div>
          </div>
        )}

        {/* 초기 상태 안내 */}
        {!userData && !loading && !error && (
          <div className="card text-center py-16">
            <svg className="w-24 h-24 text-gray-500 mx-auto mb-6" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
            <h2 className="text-2xl font-bold text-white mb-4">
              GitHub 포트폴리오를 생성해보세요
            </h2>
            <p className="text-gray-400 mb-6">
              위의 검색창에 GitHub 사용자명을 입력하면<br />
              AI가 자동으로 멋진 포트폴리오를 생성해드립니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>저장소 자동 분석</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>AI 기반 요약</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>언어 통계 시각화</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-github-border py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <p>
            Made with ❤️ using GitHub API & GPT API
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

