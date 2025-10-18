import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * 자동 새로고침 훅
 * @param {Function} callback - 실행할 콜백 함수
 * @param {number} interval - 새로고침 간격 (밀리초)
 */
const useAutoRefresh = (callback, interval = 300000) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(interval);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  // 자동 새로고침 토글
  const toggleAutoRefresh = useCallback(() => {
    setIsEnabled(prev => !prev);
  }, []);

  // 자동 새로고침 활성화/비활성화
  useEffect(() => {
    if (!isEnabled) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
      }
      setRemainingTime(interval);
      return;
    }

    // 남은 시간 카운트다운
    setRemainingTime(interval);
    countdownRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1000) return interval;
        return prev - 1000;
      });
    }, 1000);

    // 자동 새로고침 타이머
    timerRef.current = setInterval(() => {
      callback();
      setRemainingTime(interval);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [isEnabled, callback, interval]);

  return {
    isEnabled,
    toggleAutoRefresh,
    remainingTime
  };
};

export default useAutoRefresh;

