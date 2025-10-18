import { useState, useEffect } from 'react';
import { fetchVisitorCount, incrementVisitorCount } from '../services/api';

/**
 * 방문자 카운트 훅
 * @param {boolean} useServer - 서버 기반 카운터 사용 여부
 */
const useVisitorCount = (useServer = false) => {
  const [count, setCount] = useState(0);
  const [uniqueToday, setUniqueToday] = useState(0);

  useEffect(() => {
    if (useServer) {
      // 서버 기반 카운터
      loadServerCount();
    } else {
      // localStorage 기반 카운터
      loadLocalCount();
    }
  }, [useServer]);

  // 서버 기반 카운터 로드
  const loadServerCount = async () => {
    try {
      // 방문자 수 증가
      const data = await incrementVisitorCount();
      setCount(data.total);
      setUniqueToday(data.unique_today);
    } catch (error) {
      console.error('Failed to load server visitor count:', error);
      // 실패 시 localStorage로 폴백
      loadLocalCount();
    }
  };

  // localStorage 기반 카운터 로드
  const loadLocalCount = () => {
    const storedCount = parseInt(localStorage.getItem('visitorCount') || '0');
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();

    if (lastVisit !== today) {
      // 오늘 처음 방문
      const newCount = storedCount + 1;
      setCount(newCount);
      localStorage.setItem('visitorCount', newCount.toString());
      localStorage.setItem('lastVisit', today);
    } else {
      // 오늘 이미 방문함
      setCount(storedCount);
    }
  };

  return { count, uniqueToday };
};

export default useVisitorCount;

