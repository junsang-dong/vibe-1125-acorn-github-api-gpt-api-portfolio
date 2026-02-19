# 🔧 GitHub Pages 배포 문제 해결 가이드

GitHub Pages 배포 시 발생할 수 있는 문제들과 해결 방법을 안내합니다.

## 🚨 주요 문제들

### 1. "HttpError: Not Found" (404) 오류

**증상:**
```
Error: Creating Pages deployment failed
Error: HttpError: Not Found
```

**원인:** GitHub Pages가 활성화되지 않음

**해결 방법:**
1. GitHub 리포지토리 → Settings → Pages
2. Source: "GitHub Actions" 선택
3. Save 클릭

### 2. 권한 오류

**증상:**
```
Error: Resource not accessible by integration
```

**원인:** GitHub Actions 권한 부족

**해결 방법:**
1. 리포지토리 Settings → Actions → General
2. "Workflow permissions" → "Read and write permissions" 선택
3. "Allow GitHub Actions to create and approve pull requests" 체크

### 3. 빌드 실패

**증상:**
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /home/runner/work/.../package.json
```

**원인:** 의존성 설치 실패

**해결 방법:**
1. `package-lock.json` 파일 확인
2. Node.js 버전 확인 (18.x 권장)
3. 캐시 클리어 후 재시도

### 4. 환경 변수 오류

**증상:**
```
Error: VITE_API_URL is not defined
```

**원인:** GitHub Secrets 미설정

**해결 방법:**
1. Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. Name: `VITE_API_URL`
4. Value: `https://your-backend-url.herokuapp.com/api`

## 🛠 해결 단계별 가이드

### Step 1: GitHub Pages 활성화

1. **리포지토리 설정**
   ```
   https://github.com/username/repository/settings/pages
   ```

2. **Source 설정**
   - "Deploy from a branch" → "gh-pages" (수동 배포)
   - "GitHub Actions" (자동 배포) ← **권장**

3. **저장**
   - "Save" 버튼 클릭

### Step 2: 권한 설정

1. **Actions 권한**
   ```
   Settings → Actions → General → Workflow permissions
   ```
   - "Read and write permissions" 선택
   - "Allow GitHub Actions to create and approve pull requests" 체크

2. **Pages 권한**
   ```
   Settings → Pages → Actions
   ```
   - "Allow GitHub Actions to create and approve pull requests" 체크

### Step 3: 환경 변수 설정

1. **Secrets 추가**
   ```
   Settings → Secrets and variables → Actions
   ```

2. **필수 Secrets**
   ```
   VITE_API_URL = https://your-backend-url.herokuapp.com/api
   ```

### Step 4: 워크플로우 재실행

1. **Actions 탭**
   - 실패한 워크플로우 클릭
   - "Re-run all jobs" 클릭

2. **또는 새 커밋 푸시**
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push origin main
   ```

## 🔄 대안 배포 방법

### 방법 1: 수동 배포 (gh-pages 브랜치)

```bash
# Frontend 빌드
cd frontend
npm run build

# gh-pages 브랜치 생성
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### 방법 2: 다른 워크플로우 사용

현재 프로젝트에는 두 가지 워크플로우가 있습니다:

1. **deploy.yml** - 공식 GitHub Actions (권장)
2. **deploy-simple.yml** - 간단한 대안

문제가 지속되면 `deploy-simple.yml`을 사용하세요.

### 방법 3: Netlify 배포

GitHub Pages 대신 Netlify 사용:

1. https://app.netlify.com 접속
2. "New site from Git" → GitHub 선택
3. 리포지토리 선택
4. 빌드 설정:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

## 📊 문제 진단 체크리스트

### GitHub Pages 설정
- [ ] Pages가 활성화되어 있음
- [ ] Source가 "GitHub Actions"로 설정됨
- [ ] Actions 권한이 "Read and write"로 설정됨

### 워크플로우
- [ ] `.github/workflows/deploy.yml` 파일이 존재함
- [ ] 권한 설정이 올바름
- [ ] 환경 변수가 설정됨

### 빌드
- [ ] Node.js 18.x 사용
- [ ] `package-lock.json` 파일 존재
- [ ] 의존성 설치 성공

### 배포
- [ ] 빌드 아티팩트 생성 성공
- [ ] GitHub Pages 배포 성공
- [ ] 사이트 접근 가능

## 🆘 추가 도움

### 로그 확인
1. Actions 탭에서 실패한 워크플로우 클릭
2. 각 단계별 로그 확인
3. 에러 메시지 분석

### 일반적인 해결책
1. **캐시 클리어**: Actions → "Clear all caches"
2. **권한 재설정**: Settings → Actions → General
3. **워크플로우 재실행**: "Re-run all jobs"

### 지원 요청
문제가 지속되면:
1. GitHub Issues에 문제 보고
2. 에러 로그와 함께 상세 설명
3. 해결 시도한 방법들 명시

---

대부분의 문제는 GitHub Pages 활성화와 권한 설정으로 해결됩니다! 🚀
