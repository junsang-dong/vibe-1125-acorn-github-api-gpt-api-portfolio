import { useState, useCallback } from 'react';
import { fetchGitHubUser, fetchGitHubRepos } from '../services/api';

/**
 * GitHub 데이터 fetch 훅
 */
const useGitHubData = () => {
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * GitHub 데이터 가져오기
   * @param {string} username - GitHub 사용자명
   * @param {Object} options - 옵션 (limit, includeGPT)
   */
  const fetchData = useCallback(async (username, options = {}) => {
    if (!username) {
      setError('사용자명을 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 사용자 정보와 저장소 정보 병렬 조회
      const [user, repos] = await Promise.all([
        fetchGitHubUser(username),
        fetchGitHubRepos(username, options)
      ]);

      setUserData(user);
      setReposData(repos);
    } catch (err) {
      setError(err.message);
      setUserData(null);
      setReposData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 데이터 초기화
   */
  const reset = useCallback(() => {
    setUserData(null);
    setReposData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    userData,
    reposData,
    loading,
    error,
    fetchData,
    reset
  };
};

export default useGitHubData;

