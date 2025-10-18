# 🚀 배포 가이드

GitHub Portfolio Generator를 Netlify와 Heroku/Railway에 배포하는 방법을 안내합니다.

## 📋 배포 전 준비사항

### 1. API 키 준비
- **GitHub Personal Access Token**
- **OpenAI API Key**

### 2. GitHub 리포지토리
- ✅ 코드가 GitHub에 업로드되어 있어야 함
- ✅ Public 리포지토리 권장

## 🌐 Frontend 배포 (Netlify)

### 방법 1: GitHub 연동 (권장)

1. **Netlify 접속**
   - https://app.netlify.com 접속
   - GitHub 계정으로 로그인

2. **새 사이트 생성**
   - "New site from Git" 클릭
   - GitHub 선택
   - `junsang-dong/vibe-1125-acorn-github-api-gpt-api-portfolio` 선택

3. **빌드 설정**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **환경 변수 설정**
   - Site settings → Environment variables
   ```
   VITE_API_URL = https://your-backend-url.herokuapp.com/api
   ```

5. **배포**
   - "Deploy site" 클릭

### 방법 2: Netlify CLI

```bash
# Netlify CLI 설치
npm install -g netlify-cli

# 로그인
netlify login

# Frontend 빌드
cd frontend
npm run build

# 배포
netlify deploy --prod --dir=dist
```

## ⚙️ Backend 배포 (Heroku)

### 1. Heroku CLI 설치 및 로그인

```bash
# Heroku CLI 설치 (macOS)
brew tap heroku/brew && brew install heroku

# 로그인
heroku login
```

### 2. Heroku 앱 생성

```bash
cd backend
heroku create your-app-name-backend
```

### 3. 환경 변수 설정

```bash
heroku config:set GITHUB_TOKEN=your_github_token
heroku config:set OPENAI_API_KEY=your_openai_key
heroku config:set NODE_ENV=production
heroku config:set CORS_ORIGIN=https://your-netlify-app.netlify.app
```

### 4. 배포

```bash
git subtree push --prefix=backend heroku main
```

## ⚙️ Backend 배포 (Railway) - 대안

### 1. Railway 접속
- https://railway.app 접속
- GitHub 계정으로 로그인

### 2. 새 프로젝트 생성
- "New Project" → "Deploy from GitHub repo"
- 리포지토리 선택

### 3. 서비스 설정
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

### 4. 환경 변수 설정
```
GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key
NODE_ENV=production
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

## 🔧 배포 후 설정

### 1. CORS 설정 업데이트
Backend의 `CORS_ORIGIN`을 Netlify URL로 업데이트:

```bash
# Heroku
heroku config:set CORS_ORIGIN=https://your-app.netlify.app

# Railway
# Railway 대시보드에서 환경 변수 수정
```

### 2. Netlify 프록시 설정 업데이트
`netlify.toml`에서 Backend URL 업데이트:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.herokuapp.com/api/:splat"
  status = 200
  force = true
```

### 3. Frontend 환경 변수 업데이트
Netlify에서 `VITE_API_URL` 업데이트:

```
VITE_API_URL=https://your-backend-url.herokuapp.com/api
```

## 🧪 배포 테스트

### 1. Backend 테스트
```bash
curl https://your-backend-url.herokuapp.com/health
```

### 2. Frontend 테스트
- Netlify URL 접속
- GitHub 사용자명 검색 테스트

## 🔍 문제 해결

### CORS 오류
- Backend의 `CORS_ORIGIN`이 Frontend URL과 일치하는지 확인
- Netlify의 환경 변수가 올바른지 확인

### API 연결 오류
- Backend 서버가 정상 실행 중인지 확인
- 환경 변수(GitHub Token, OpenAI Key)가 올바른지 확인

### 빌드 오류
- Node.js 버전 확인 (18.x 권장)
- 의존성 설치 오류 확인

## 📊 모니터링

### Heroku
- Heroku Dashboard에서 로그 확인
- Metrics 탭에서 성능 모니터링

### Netlify
- Netlify Dashboard에서 빌드 로그 확인
- Analytics 탭에서 사용량 모니터링

### Railway
- Railway Dashboard에서 로그 및 메트릭 확인

## 💰 비용 최적화

### Heroku
- Eco Dyno 사용 (월 $5)
- Sleep 모드로 비용 절약

### Netlify
- 무료 플랜: 100GB 대역폭/월
- Pro 플랜: $19/월 (필요시)

### Railway
- 무료 플랜: $5 크레딧/월
- Pro 플랜: $5/월

## 🔄 자동 배포 설정

### GitHub Actions (선택사항)

`.github/workflows/deploy.yml` 파일 생성:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [ main ]
    paths: [ 'frontend/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: |
          cd frontend
          npm install
      - name: Build
        run: |
          cd frontend
          npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
        with:
          publish-dir: './frontend/dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📝 체크리스트

- [ ] GitHub 리포지토리에 코드 업로드
- [ ] GitHub Token 발급 및 설정
- [ ] OpenAI API Key 발급 및 설정
- [ ] Backend 배포 (Heroku/Railway)
- [ ] Frontend 배포 (Netlify)
- [ ] CORS 설정 확인
- [ ] 환경 변수 설정 확인
- [ ] 배포 테스트 완료
- [ ] 도메인 연결 (선택사항)

---

배포 과정에서 문제가 발생하면 GitHub Issues에 문의해주세요! 🚀
