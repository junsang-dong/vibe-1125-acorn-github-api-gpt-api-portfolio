# 🚀 Vercel 올인원 배포 가이드

GitHub Portfolio Generator를 Vercel에 프론트엔드 + 백엔드(API) 함께 배포하는 방법입니다.

## 📋 사전 준비

- [ ] GitHub 계정
- [ ] Vercel 계정 (https://vercel.com)
- [ ] GitHub Personal Access Token
- [ ] OpenAI API Key

## 🔧 1단계: Vercel 프로젝트 연결

### 방법 A: Vercel 대시보드 (권장)

1. **Vercel 로그인**  
   https://vercel.com → GitHub 계정으로 로그인

2. **새 프로젝트**  
   - "Add New..." → "Project"  
   - GitHub 리포지토리 선택  
   - `vibe-1125-acorn-github-api-gpt-api-portfolio` 선택

3. **프레임워크 설정**  
   - Framework Preset: **Other** (또는 Vite)
   - Root Directory: **.** (프로젝트 루트)
   - Build Command, Output Directory는 `vercel.json`에서 자동 적용됨

4. **환경 변수 설정** (중요)

   | 변수명 | 값 | 비고 |
   |--------|-----|------|
   | `GITHUB_TOKEN` | `ghp_xxxx...` | GitHub Personal Access Token |
   | `OPENAI_API_KEY` | `sk-xxxx...` | OpenAI API Key |

   - "Environment Variables" 섹션에서 추가
   - Production, Preview, Development 모두 체크

5. **배포**  
   - "Deploy" 클릭

### 방법 B: Vercel CLI

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 루트에서 로그인 및 배포
cd vibe-1125-acorn-github-api-gpt-api-portfolio
vercel login
vercel

# 환경 변수는 대시보드에서 설정하거나
vercel env add GITHUB_TOKEN
vercel env add OPENAI_API_KEY
```

## 📁 프로젝트 구조 (Vercel 배포용)

```
├── api/
│   └── [[...path]].js      # API 라우트 핸들러 (Express → 서버리스)
├── backend/
│   ├── app.js              # Express 앱 (listen 제외)
│   ├── server.js           # 로컬 개발용
│   ├── routes/
│   └── services/
├── frontend/
│   ├── src/
│   └── dist/               # 빌드 결과물
├── vercel.json             # Vercel 설정
└── package.json
```

## 🔄 2단계: 배포 후 확인

배포가 완료되면 다음을 확인하세요.

1. **프론트엔드**  
   - `https://your-project.vercel.app` 접속

2. **API 헬스 체크**  
   ```bash
   curl https://your-project.vercel.app/api/health
   ```
   - `{"status":"OK","timestamp":"..."}` 응답 확인

3. **기능 테스트**  
   - GitHub 사용자명 검색
   - 저장소 목록 및 GPT 요약 확인

## ⚙️ 환경 변수 (Vercel 대시보드)

| 변수 | 필수 | 설명 |
|------|------|------|
| `GITHUB_TOKEN` | ✅ | GitHub API 접근용 토큰 |
| `OPENAI_API_KEY` | ✅ | GPT 요약 생성용 API 키 |
| `VITE_BASE_PATH` | ❌ | 기본값 `/` (서브경로 배포 시 변경) |

## 📝 참고 사항

### 방문자 카운터
- Vercel 서버리스에서는 인스턴스마다 메모리가 분리되어 있어, 방문자 수가 정확하지 않을 수 있습니다.
- 정확한 집계가 필요하면 Vercel KV, Supabase 등 외부 저장소 연동을 고려하세요.

### GitHub Pages와 동시 사용
- GitHub Pages에 배포할 때는 `VITE_BASE_PATH`를 `/vibe-1125-acorn-github-api-gpt-api-portfolio/`로 설정하세요.
- Vercel 배포 시에는 기본값 `/`를 사용합니다.

### 로컬 개발
```bash
# 백엔드 (포트 3002)
cd backend && npm run dev

# 프론트엔드 (포트 5159)
cd frontend && npm run dev
```

## 🐛 문제 해결

### API 500 에러
- 환경 변수(`GITHUB_TOKEN`, `OPENAI_API_KEY`)가 올바르게 설정되었는지 확인
- Vercel 대시보드 → Project → Settings → Environment Variables

### CORS 오류
- `backend/app.js`에서 Vercel 도메인(`*.vercel.app`)이 CORS에 포함되어 있습니다.
- 커스텀 도메인 사용 시 `CORS_ORIGIN` 환경 변수 추가

### 빌드 실패
- Node.js 버전: Vercel 기본 18.x 사용
- `vercel.json`의 `installCommand`가 backend, frontend 의존성을 모두 설치하는지 확인

---

배포 과정에서 문제가 있으면 GitHub Issues에 문의해 주세요.
