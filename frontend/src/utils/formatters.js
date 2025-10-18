/**
 * 날짜 포맷팅 함수
 * @param {string} dateString - ISO 날짜 문자열
 * @returns {string} 포맷된 날짜
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return '오늘';
  } else if (diffDays === 1) {
    return '어제';
  } else if (diffDays < 7) {
    return `${diffDays}일 전`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}주 전`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months}개월 전`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years}년 전`;
  }
};

/**
 * 숫자 포맷팅 (천 단위 콤마)
 * @param {number} num - 숫자
 * @returns {string} 포맷된 숫자
 */
export const formatNumber = (num) => {
  if (num === undefined || num === null) return '0';
  return num.toLocaleString('ko-KR');
};

/**
 * 바이트를 읽기 쉬운 형식으로 변환
 * @param {number} bytes - 바이트 수
 * @returns {string} 포맷된 크기
 */
export const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * GitHub 사용자명 유효성 검사
 * @param {string} username - 사용자명
 * @returns {boolean} 유효 여부
 */
export const isValidUsername = (username) => {
  if (!username) return false;
  
  // GitHub 사용자명 규칙: 영문, 숫자, 하이픈만 허용, 최대 39자
  const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
  return regex.test(username);
};

/**
 * 텍스트 자르기 (말줄임표 추가)
 * @param {string} text - 텍스트
 * @param {number} maxLength - 최대 길이
 * @returns {string} 자른 텍스트
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * 언어별 색상 매핑
 * @param {string} language - 프로그래밍 언어
 * @returns {string} 색상 코드
 */
export const getLanguageColor = (language) => {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572A5',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Shell': '#89e051',
  };
  
  return colors[language] || '#8b949e';
};

