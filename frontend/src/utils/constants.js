// 앱 상수 정의

export const APP_CONFIG = {
  DEFAULT_REPO_LIMIT: 10,
  AUTO_REFRESH_INTERVAL: 300000, // 5분 (밀리초)
  MAX_README_LENGTH: 500, // 표시할 최대 README 길이
};

export const CHART_COLORS = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
  '#FF6384',
  '#C9CBCF',
  '#4BC0C0',
  '#FF9F40'
];

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: '사용자를 찾을 수 없습니다. GitHub 아이디를 확인해주세요.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  API_ERROR: 'API 요청 중 오류가 발생했습니다.',
  INVALID_USERNAME: '유효하지 않은 사용자명입니다. 영문, 숫자, 하이픈(-)만 사용 가능합니다.',
};

export const LOADING_MESSAGES = {
  FETCHING_USER: '사용자 정보를 불러오는 중...',
  FETCHING_REPOS: '저장소 목록을 불러오는 중...',
  GENERATING_SUMMARY: 'AI 요약을 생성하는 중... (시간이 걸릴 수 있습니다)',
};

