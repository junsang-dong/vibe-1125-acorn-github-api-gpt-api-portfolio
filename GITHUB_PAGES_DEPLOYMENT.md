# 🌐 GitHub Pages 배포 가이드

GitHub Portfolio Generator를 GitHub Pages에 배포하는 방법을 안내합니다.

## 📋 사전 준비사항

### 1. Backend API 서버 배포
GitHub Pages는 정적 사이트만 호스팅하므로, Backend API 서버를 별도로 배포해야 합니다.

**추천 플랫폼:**
- **Heroku** (무료 플랜 사용 가능)
- **Railway** (무료 크레딧 제공)
- **Render** (무료 플랜 제공)

### 2. API 키 준비
- GitHub Personal Access Token
- OpenAI API Key

## 🚀 GitHub Pages 배포 단계

### 1단계: Backend API 서버 배포

#### Heroku 배포 (권장)

```bash
# Heroku CLI 설치
brew install heroku/brew/heroku

# 로그인
heroku login

# Backend 디렉토리로 이동
cd backend

# Heroku 앱 생성
heroku create your-app-name-backend

# 환경 변수 설정
heroku config:set GITHUB_TOKEN=your_github_token
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://junsang-dong.github.io

# 배포
git subtree push --prefix=backend heroku main
```

#### Railway 배포 (대안)

1. https://railway.app 접속
2. GitHub 계정으로 로그인
3. "New Project" → "Deploy from GitHub repo"
4. 리포지토리 선택
5. 서비스 설정:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. 환경 변수 설정:
   ```
   GITHUB_TOKEN=your_github_token
   OPENAI_API_KEY=your_openai_key
   NODE_ENV=production
   CORS_ORIGIN=https://junsang-dong.github.io
   ```

### 2단계: GitHub Pages 설정

#### 방법 1: GitHub Actions (권장)

1. **리포지토리 설정**
   - GitHub 리포지토리 → Settings
   - Pages → Source: "GitHub Actions"

2. **Secrets 설정**
   - Settings → Secrets and variables → Actions
   - "New repository secret" 클릭
   - 다음 시크릿 추가:
     ```
     VITE_API_URL = https://your-backend-url.herokuapp.com/api
     ```

3. **자동 배포**
   - `main` 브랜치에 푸시하면 자동으로 배포됩니다
   - Actions 탭에서 배포 상태 확인

#### 방법 2: 수동 배포

```bash
# Frontend 빌드
cd frontend
npm install
npm run build

# GitHub Pages 브랜치 생성
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### 3단계: GitHub Pages 활성화

1. **리포지토리 설정**
   - GitHub 리포지토리 → Settings
   - Pages → Source: "Deploy from a branch" 또는 "GitHub Actions"

2. **도메인 설정** (선택사항)
   - Custom domain 입력 (예: `portfolio.yourdomain.com`)
   - DNS 설정에서 CNAME 레코드 추가

## 🔧 환경 변수 설정

### GitHub Secrets 설정
리포지토리 Settings → Secrets and variables → Actions에서 설정:

```
VITE_API_URL = https://your-backend-url.herokuapp.com/api
```

### Backend 환경 변수
Heroku/Railway에서 설정:

```
GITHUB_TOKEN = ghp_your_github_token
OPENAI_API_KEY = sk_your_openai_key
NODE_ENV = production
CORS_ORIGIN = https://junsang-dong.github.io
```

## 📁 프로젝트 구조

```
vibe-1125-acorn-github-api-gpt-api-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 워크플로우
├── frontend/
│   ├── src/
│   ├── dist/                   # 빌드 결과물 (자동 생성)
│   ├── vite.config.js          # GitHub Pages base 경로 설정
│   └── package.json
├── backend/                    # 별도 배포 필요
└── README.md
```

## 🌐 배포 URL

배포 완료 후 접속 URL:
```
https://junsang-dong.github.io/vibe-1125-acorn-github-api-gpt-api-portfolio/
```

## 🧪 배포 테스트

### 1. Backend API 테스트
```bash
curl https://your-backend-url.herokuapp.com/health
```

### 2. Frontend 테스트
- GitHub Pages URL 접속
- GitHub 사용자명 검색 테스트
- API 연결 확인

## 🔍 문제 해결

### CORS 오류
- Backend의 `CORS_ORIGIN`이 GitHub Pages URL과 일치하는지 확인
- `https://junsang-dong.github.io` 형식으로 설정

### 404 오류
- `vite.config.js`의 `base` 경로가 올바른지 확인
- GitHub Pages URL 경로와 일치해야 함

### API 연결 오류
- Backend 서버가 정상 실행 중인지 확인
- `VITE_API_URL` 환경 변수가 올바른지 확인

### 빌드 실패
- Node.js 버전 확인 (18.x 권장)
- 의존성 설치 오류 확인
- GitHub Actions 로그 확인

## 📊 모니터링

### GitHub Actions
- Actions 탭에서 빌드 및 배포 상태 확인
- 실패 시 로그 확인

### GitHub Pages
- Settings → Pages에서 배포 상태 확인
- Analytics 탭에서 사용량 모니터링

## 🔄 자동 배포

### 트리거 조건
- `main` 브랜치에 푸시
- `frontend/` 디렉토리 변경 시

### 배포 과정
1. 코드 푸시
2. GitHub Actions 실행
3. Frontend 빌드
4. GitHub Pages 배포
5. 자동으로 사이트 업데이트

## 💰 비용

### GitHub Pages
- **무료**: Public 리포지토리
- **Pro**: Private 리포지토리 ($4/월)

### Backend 호스팅
- **Heroku**: Eco Dyno $5/월
- **Railway**: $5 크레딧/월 (무료)
- **Render**: 무료 플랜 제공

## 📝 체크리스트

- [ ] Backend API 서버 배포 (Heroku/Railway)
- [ ] GitHub Secrets 설정 (VITE_API_URL)
- [ ] GitHub Pages 설정 활성화
- [ ] GitHub Actions 워크플로우 실행
- [ ] CORS 설정 확인
- [ ] 배포 테스트 완료
- [ ] 도메인 연결 (선택사항)

## 🎯 최종 결과

배포 완료 후:
- **Frontend**: https://junsang-dong.github.io/vibe-1125-acorn-github-api-gpt-api-portfolio/
- **Backend**: https://your-backend-url.herokuapp.com
- **자동 배포**: 코드 푸시 시 자동 업데이트

---

배포 과정에서 문제가 발생하면 GitHub Issues에 문의해주세요! 🚀
