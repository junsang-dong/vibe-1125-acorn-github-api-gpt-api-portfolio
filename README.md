# 🚀 GitHub Portfolio Generator

GitHub API와 GPT API를 활용하여 사용자의 GitHub 저장소 정보를 자동으로 분석하고, AI 기반 요약을 통해 전문적인 포트폴리오를 생성하는 웹 애플리케이션입니다.

![GitHub Portfolio Generator](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![GPT](https://img.shields.io/badge/OpenAI-GPT--3.5-orange)

## ✨ 주요 기능

- 🔍 **GitHub 사용자 검색**: 사용자명으로 프로필과 저장소 정보 조회
- 🤖 **AI 기반 요약**: GPT-3.5를 활용한 README 자동 요약
- 📊 **언어 통계 시각화**: Chart.js를 이용한 프로그래밍 언어 사용 비율 차트
- 🔄 **자동 새로고침**: 설정 가능한 자동 데이터 갱신 기능
- 👥 **방문자 카운터**: 방문자 수 추적 및 표시
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 완벽 지원

## 🛠 기술 스택

### Frontend
- **React 18.x** - UI 라이브러리
- **Vite 5.x** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Chart.js + react-chartjs-2** - 데이터 시각화
- **Axios** - HTTP 클라이언트

### Backend
- **Node.js + Express** - 서버 프레임워크
- **GitHub REST API v3** - GitHub 데이터 조회
- **OpenAI GPT-3.5 Turbo** - AI 요약 생성

## 📦 설치 방법

### 사전 요구사항
- Node.js 16.x 이상
- npm 또는 yarn
- GitHub Personal Access Token
- OpenAI API Key

### 1. 저장소 클론
```bash
git clone <repository-url>
cd vibe-1125-acorn-github-api-gpt-api-portfolio
```

### 2. Backend 설정

```bash
cd backend
npm install
```

`.env` 파일 생성:
```env
# GitHub Personal Access Token
GITHUB_TOKEN=ghp_your_github_token_here

# OpenAI API Key
OPENAI_API_KEY=sk-your_openai_api_key_here

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS 허용 도메인
CORS_ORIGIN=http://localhost:5173
```

### 3. Frontend 설정

```bash
cd ../frontend
npm install
```

(선택사항) `.env` 파일 생성:
```env
# API Base URL (프록시 사용 시 불필요)
VITE_API_URL=http://localhost:3001/api
```

## 🚀 실행 방법

### 개발 환경

**Backend 실행:**
```bash
cd backend
npm run dev
# 또는
npm start
```
서버가 http://localhost:3001 에서 실행됩니다.

**Frontend 실행:**
```bash
cd frontend
npm run dev
```
앱이 http://localhost:5173 에서 실행됩니다.

### 프로덕션 빌드

**Frontend 빌드:**
```bash
cd frontend
npm run build
npm run preview  # 빌드 미리보기
```

## 🔑 API 키 발급 방법

### GitHub Personal Access Token

1. GitHub 로그인 → Settings
2. Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token (classic)" 클릭
4. 권한 선택:
   - `public_repo` - 공개 저장소 접근
   - `read:user` - 사용자 정보 읽기
5. 토큰 생성 및 복사 (한 번만 표시됨)

### OpenAI API Key

1. https://platform.openai.com/ 접속 및 로그인
2. API keys 메뉴로 이동
3. "Create new secret key" 클릭
4. 키 이름 입력 및 생성
5. 생성된 키 복사 (한 번만 표시됨)
6. (권장) Usage limits 설정으로 비용 제한

## 📁 프로젝트 구조

```
vibe-1125-acorn-github-api-gpt-api-portfolio/
├── backend/
│   ├── routes/
│   │   ├── github.js          # GitHub API 라우트
│   │   ├── gpt.js              # GPT API 라우트
│   │   └── visitor.js          # 방문자 카운터 라우트
│   ├── services/
│   │   └── gptService.js       # GPT 서비스 로직
│   ├── server.js               # Express 서버 설정
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── UserProfile.jsx
│   │   │   ├── RepositoryCard.jsx
│   │   │   ├── RepositoryList.jsx
│   │   │   ├── LanguageChart.jsx
│   │   │   ├── VisitorCounter.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── hooks/
│   │   │   ├── useGitHubData.js
│   │   │   ├── useAutoRefresh.js
│   │   │   └── useVisitorCount.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── formatters.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md
```

## 🎯 사용 방법

1. **애플리케이션 실행**
   - Backend와 Frontend를 각각 실행합니다.

2. **GitHub 사용자 검색**
   - 검색창에 GitHub 사용자명을 입력합니다 (예: octocat)
   - "검색" 버튼을 클릭하거나 Enter 키를 누릅니다.

3. **결과 확인**
   - 사용자 프로필 정보가 표시됩니다.
   - 저장소 목록과 AI 요약을 확인할 수 있습니다.
   - 프로그래밍 언어 사용 비율 차트를 확인합니다.

4. **자동 새로고침**
   - "자동 새로고침" 버튼을 클릭하여 활성화합니다.
   - 5분마다 자동으로 데이터가 갱신됩니다.

## 🌐 API 엔드포인트

### Backend API

#### 사용자 정보 조회
```
GET /api/github/user/:username
```

#### 저장소 목록 조회
```
GET /api/github/repos/:username
Query Parameters:
  - limit: number (기본값: 10)
  - gpt: boolean (기본값: true)
```

#### GPT 요약 생성
```
POST /api/gpt/summarize
Body: {
  "readme_content": string,
  "repo_name": string,
  "language": string
}
```

#### 방문자 카운트
```
GET /api/visitor/count
POST /api/visitor/increment
```

## ⚙️ 설정 옵션

### Frontend 설정 (`src/utils/constants.js`)

```javascript
export const APP_CONFIG = {
  DEFAULT_REPO_LIMIT: 10,           // 기본 저장소 표시 개수
  AUTO_REFRESH_INTERVAL: 300000,    // 자동 새로고침 간격 (5분)
  MAX_README_LENGTH: 500,           // 표시할 최대 README 길이
};
```

### Backend 설정

GPT 요약 길이 제한은 `backend/services/gptService.js`에서 수정 가능:
```javascript
const truncatedContent = readmeContent.substring(0, 3000); // README 길이 제한
```

## 🔒 보안 고려사항

- ✅ 모든 API 키는 환경변수로 관리
- ✅ Frontend에서 직접 API 호출 금지 (Backend를 통해서만)
- ✅ `.gitignore`에 `.env` 파일 포함
- ✅ GitHub 사용자명 유효성 검사
- ✅ CORS 설정으로 허용된 도메인만 접근 가능

## 💰 비용 최적화

### GitHub API
- Personal Access Token 사용 시 시간당 5,000회 요청 가능
- Rate Limit 초과 주의

### OpenAI API
- GPT-3.5-turbo 모델 사용 (GPT-4 대비 10배 저렴)
- README 길이 3,000자로 제한
- 자동 새로고침 시 GPT 호출 생략
- README가 100자 이하인 경우 GPT 호출 생략

## 🐛 문제 해결

### "사용자를 찾을 수 없습니다" 오류
- GitHub 사용자명이 정확한지 확인
- 사용자명은 대소문자를 구분하지 않음

### "API 요청 중 오류가 발생했습니다" 오류
- Backend 서버가 실행 중인지 확인
- `.env` 파일의 API 키가 올바른지 확인
- GitHub API Rate Limit 확인

### GPT 요약이 생성되지 않음
- OpenAI API 키가 유효한지 확인
- API 사용 한도 확인
- 네트워크 연결 확인

## 📝 라이선스

MIT License

## 👨‍💻 개발자

Made with ❤️ using GitHub API & GPT API

## 🔗 참고 자료

- [GitHub REST API 문서](https://docs.github.com/en/rest)
- [OpenAI API 문서](https://platform.openai.com/docs)
- [React 공식 문서](https://react.dev)
- [Chart.js 문서](https://www.chartjs.org/docs)
- [Vite 문서](https://vitejs.dev)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

---

## 🚀 향후 개선 사항

- [ ] GitHub OAuth 로그인 구현
- [ ] 포트폴리오 PDF 내보내기
- [ ] 커밋 활동 그래프 추가
- [ ] 다국어 지원 (i18n)
- [ ] 테마 커스터마이징
- [ ] 저장소 검색 기능
- [ ] 소셜 공유 기능
- [ ] 사용자 비교 기능

