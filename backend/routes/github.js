const express = require('express');
const axios = require('axios');
const { generateGPTSummary } = require('../services/gptService');

const router = express.Router();

// GitHub API 기본 설정
const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json'
  }
});

// 사용자 정보 조회
router.get('/user/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    
    const response = await githubAPI.get(`/users/${username}`);
    
    res.json(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: '사용자를 찾을 수 없습니다.'
      });
    }
    next(error);
  }
});

// 저장소 목록 조회
router.get('/repos/:username', async (req, res, next) => {
  try {
    const { username } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    const includeGPT = req.query.gpt !== 'false';
    
    console.log(`Fetching repositories for ${username} (limit: ${limit}, GPT: ${includeGPT})`);
    
    // 저장소 목록 조회
    const reposResponse = await githubAPI.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page: limit,
        type: 'owner'
      }
    });
    
    const repos = reposResponse.data;
    const languageStats = {};
    
    // 각 저장소 처리
    const processedRepos = await Promise.all(
      repos.map(async (repo) => {
        // 언어 통계 수집
        try {
          const langResponse = await githubAPI.get(`/repos/${repo.full_name}/languages`);
          
          Object.entries(langResponse.data).forEach(([lang, bytes]) => {
            languageStats[lang] = (languageStats[lang] || 0) + bytes;
          });
        } catch (err) {
          console.error(`Error fetching languages for ${repo.name}:`, err.message);
        }
        
        // README 조회 및 GPT 요약 (옵션)
        if (includeGPT) {
          try {
            const readmeResponse = await githubAPI.get(
              `/repos/${repo.full_name}/readme`,
              {
                headers: {
                  'Accept': 'application/vnd.github.v3.raw'
                }
              }
            );
            
            const readmeContent = readmeResponse.data;
            
            // README가 너무 짧으면 GPT 호출 생략
            if (readmeContent && readmeContent.length > 100) {
              console.log(`Generating GPT summary for ${repo.name}...`);
              repo.gpt_summary = await generateGPTSummary(
                readmeContent,
                repo.name,
                repo.language
              );
            } else {
              repo.gpt_summary = null;
            }
          } catch (err) {
            console.log(`No README or error for ${repo.name}`);
            repo.gpt_summary = null;
          }
        } else {
          repo.gpt_summary = null;
        }
        
        return repo;
      })
    );
    
    res.json({
      repositories: processedRepos,
      language_stats: languageStats
    });
  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({
        error: '사용자를 찾을 수 없습니다.'
      });
    }
    next(error);
  }
});

module.exports = router;

