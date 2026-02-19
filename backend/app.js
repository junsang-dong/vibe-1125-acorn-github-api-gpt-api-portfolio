require('dotenv').config();
const express = require('express');
const cors = require('cors');
const githubRoutes = require('./routes/github');
const gptRoutes = require('./routes/gpt');
const visitorRoutes = require('./routes/visitor');

const app = express();

// CORS - Vercel 배포 시 여러 origin 허용
const allowedOrigins = [
  'http://localhost:5159',
  'http://localhost:5173',
  /\.vercel\.app$/,
  /\.on\.vercel\.app$/
];
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => 
      typeof o === 'string' ? o === origin : o.test(origin)
    )) {
      callback(null, true);
    } else {
      callback(null, true); // 개발 편의상 허용 (프로덕션에서 필요시 제한)
    }
  },
  credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/github', githubRoutes);
app.use('/api/gpt', gptRoutes);
app.use('/api/visitor', visitorRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app;
