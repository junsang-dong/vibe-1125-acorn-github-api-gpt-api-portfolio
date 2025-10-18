const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * GitHub 저장소 README를 GPT로 요약
 * @param {string} readmeContent - README 내용
 * @param {string} repoName - 저장소 이름
 * @param {string} language - 주 사용 언어
 * @returns {Promise<Object>} 요약 결과
 */
async function generateGPTSummary(readmeContent, repoName, language) {
  // README 길이 제한 (비용 절감)
  const truncatedContent = readmeContent.substring(0, 3000);
  
  const prompt = `
다음은 "${repoName}" GitHub 저장소의 README 내용입니다.
주 사용 언어: ${language || 'Unknown'}

README 내용:
${truncatedContent}

위 내용을 바탕으로 다음 정보를 JSON 형식으로 요약해주세요:
1. overview: 프로젝트의 간단한 설명 (2-3문장, 한국어)
2. technologies: 사용된 주요 기술 스택 배열 (최대 5개)
3. features: 주요 기능 목록 배열 (최대 5개, 한국어)
4. recent_updates: 최근 업데이트 내용 (있다면, 한국어)

반드시 유효한 JSON 형식으로만 응답해주세요. 다른 텍스트는 포함하지 마세요.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "당신은 GitHub 저장소를 분석하고 요약하는 전문가입니다. 항상 유효한 JSON 형식으로만 응답합니다."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    const content = completion.choices[0].message.content;
    
    // JSON 파싱 시도
    try {
      // 코드 블록으로 감싸진 경우 제거
      const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      return createDefaultSummary(language);
    }
  } catch (error) {
    console.error('GPT API Error:', error.message);
    return createDefaultSummary(language);
  }
}

/**
 * 기본 요약 객체 생성 (GPT 실패 시)
 */
function createDefaultSummary(language) {
  return {
    overview: "프로젝트 요약을 생성할 수 없습니다.",
    technologies: language ? [language] : [],
    features: [],
    recent_updates: ""
  };
}

module.exports = { generateGPTSummary };

