/**
 * Vercel Serverless API - Express 앱을 /api/* 모든 경로에 연결
 * /api/github/*, /api/gpt/*, /api/visitor/* 요청 처리
 */
const app = require('../backend/app');

module.exports = app;
