const express = require('express');

const router = express.Router();

// 메모리 기반 방문자 카운터
let visitorCount = 0;
const todayVisitors = new Set();
let lastResetDate = new Date().toDateString();

// 매일 자정에 오늘 방문자 초기화 (체크)
function checkAndResetDaily() {
  const today = new Date().toDateString();
  if (lastResetDate !== today) {
    todayVisitors.clear();
    lastResetDate = today;
    console.log('Daily visitor counter reset');
  }
}

// 방문자 수 조회
router.get('/count', (req, res) => {
  checkAndResetDaily();
  
  res.json({
    total: visitorCount,
    unique_today: todayVisitors.size
  });
});

// 방문자 수 증가
router.post('/increment', (req, res) => {
  checkAndResetDaily();
  
  // IP 주소로 고유 방문자 판단
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  visitorCount++;
  todayVisitors.add(ip);
  
  res.json({
    total: visitorCount,
    unique_today: todayVisitors.size
  });
});

module.exports = router;

