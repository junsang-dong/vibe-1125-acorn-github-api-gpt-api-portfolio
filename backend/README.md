# Backend API Server

GitHub Portfolio Generator의 백엔드 API 서버입니다.

## 설치

```bash
npm install
```

## 환경 설정

`.env` 파일을 생성하고 다음 내용을 입력하세요:

```env
GITHUB_TOKEN=your_github_token_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 실행

### 개발 모드
```bash
npm run dev
```

### 프로덕션 모드
```bash
npm start
```

## API 엔드포인트

- `GET /api/github/user/:username` - 사용자 정보 조회
- `GET /api/github/repos/:username` - 저장소 목록 조회
- `POST /api/gpt/summarize` - GPT 요약 생성
- `GET /api/visitor/count` - 방문자 수 조회
- `POST /api/visitor/increment` - 방문자 수 증가
- `GET /health` - 서버 상태 확인

