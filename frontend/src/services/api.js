import axios from 'axios';

// API 기본 설정
// Vercel 배포 시: 상대 경로 /api 사용 (같은 도메인)
const API_BASE_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.PROD ? '/api' : 'http://localhost:3002/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초 타임아웃 (GPT 처리 시간 고려)
  headers: {
    'Content-Type': 'application/json'
  }
});

// 요청 인터셉터 (로깅)
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = error.response?.data?.error ?? error.message ?? '알 수 없는 오류가 발생했습니다.';
    // 객체가 전달되면 [object Object] 방지
    if (typeof errorMessage === 'object') {
      errorMessage = errorMessage?.message ?? errorMessage?.msg ?? JSON.stringify(errorMessage);
    }
    console.error('API Error:', errorMessage);
    return Promise.reject(new Error(String(errorMessage)));
  }
);

/**
 * GitHub 사용자 정보 조회
 * @param {string} username - GitHub 사용자명
 * @returns {Promise<Object>} 사용자 정보
 */
export const fetchGitHubUser = async (username) => {
  const response = await api.get(`/github/user/${username}`);
  return response.data;
};

/**
 * GitHub 저장소 목록 조회
 * @param {string} username - GitHub 사용자명
 * @param {Object} options - 옵션 (limit, gpt)
 * @returns {Promise<Object>} 저장소 목록 및 언어 통계
 */
export const fetchGitHubRepos = async (username, options = {}) => {
  const { limit = 10, includeGPT = true } = options;
  
  const response = await api.get(`/github/repos/${username}`, {
    params: {
      limit,
      gpt: includeGPT
    }
  });
  
  return response.data;
};

/**
 * GPT 요약 생성
 * @param {Object} data - { readme_content, repo_name, language }
 * @returns {Promise<Object>} 요약 결과
 */
export const generateGPTSummary = async (data) => {
  const response = await api.post('/gpt/summarize', data);
  return response.data;
};

/**
 * 방문자 수 조회
 * @returns {Promise<Object>} 방문자 통계
 */
export const fetchVisitorCount = async () => {
  const response = await api.get('/visitor/count');
  return response.data;
};

/**
 * 방문자 수 증가
 * @returns {Promise<Object>} 업데이트된 방문자 통계
 */
export const incrementVisitorCount = async () => {
  const response = await api.post('/visitor/increment');
  return response.data;
};

export default api;

