const express = require('express');
const { generateGPTSummary } = require('../services/gptService');

const router = express.Router();

// GPT 요약 생성 (독립 실행용)
router.post('/summarize', async (req, res, next) => {
  try {
    const { readme_content, repo_name, language } = req.body;
    
    if (!readme_content || !repo_name) {
      return res.status(400).json({
        error: 'readme_content와 repo_name은 필수입니다.'
      });
    }
    
    const summary = await generateGPTSummary(
      readme_content,
      repo_name,
      language
    );
    
    res.json({ summary });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

