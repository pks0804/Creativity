# 약학 연구실 자료실 (MVP)

연구 자료·수업 자료를 공유하고 대학원생과 댓글로 토론하는 웹사이트입니다.

> **현재 단계(1단계)**: 화면과 데이터 구조만 완성된 상태입니다.
> 데이터는 **각자 브라우저(localStorage)에만** 저장되고, 로그인은 **테스트용**입니다.
> 즉, 지금 배포해도 다른 사람과 자료가 공유되지는 않습니다. 공유는 2단계(Firebase 연동) 후에 가능합니다.

⚠️ 환자 정보 등 개인식별정보와 미공개 민감 데이터는 업로드하지 마세요. 파일은 Google Drive 등에 올리고 **링크만** 등록합니다.

---

## 자주 고치는 곳

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 홈 화면 연구실 소개 문구, 사이트 이름 | `src/lib/siteConfig.ts` |
| 처음 보이는 샘플 데이터 | `src/services/seed.ts` |
| 사이트 대표 색상(brand) | `src/index.css` 맨 위 `@theme` 부분 |

> 글꼴은 무료 한글 글꼴 **Pretendard**를 인터넷(CDN)에서 불러옵니다. 별도 설치는 필요 없습니다.

## 폴더 구조 (간단히)

- `src/pages` – 각 화면(홈, 로그인, 연구 자료, 수업 자료 …)
- `src/components` – 여러 화면에서 같이 쓰는 부품(상단 메뉴, 링크 목록, 댓글 영역 …)
- `src/services` – **데이터 읽기/쓰기 전담**. 2단계에서 이 폴더 안만 Firebase용으로 바꾸면 됩니다.
- `src/contexts` – 로그인 상태(AuthContext)
- `src/lib` – 작은 도우미 함수(날짜 표시, 링크 검사 등)

## 권한

| | 비로그인 | 대학원생(member) | 교수(admin) |
|---|---|---|---|
| 홈·로그인 페이지 | ✅ | ✅ | ✅ |
| 자료 열람 | ❌ (로그인으로 이동) | ✅ | ✅ |
| 댓글 작성 | ❌ | ✅ | ✅ |
| 댓글 삭제 | ❌ | 본인 것만 | 모두 |
| 연구·수업 자료 등록/수정/삭제 | ❌ | ❌ | ✅ |

테스트 단계에서는 로그인 화면의 "Google로 로그인" 버튼이 **테스트 교수(admin)**, 그 아래 작은 링크가 **테스트 대학원생(member)** 으로 로그인시킵니다.

---

## ① 내 컴퓨터에서 실행하기

1. [Node.js](https://nodejs.org) LTS 버전을 설치합니다. (설치 후 터미널에서 `node -v` 로 확인)
2. 이 폴더에서 터미널을 열고 아래를 차례로 입력합니다.

```bash
npm install
```

```bash
npm run dev
```

3. 화면에 나온 주소(보통 `http://localhost:5173`)를 브라우저에서 엽니다.
4. 배포 전에 오류가 없는지 확인하려면:

```bash
npm run build
```

> 샘플 데이터를 처음 상태로 되돌리려면 브라우저 개발자도구 → Application → Local Storage 에서 `lab:`으로 시작하는 항목을 지우고 새로고침하세요.

## ② GitHub에 올리기

> 이 코드는 이미 `pks0804/Creativity` 저장소의 `claude/peaceful-faraday-vx80ec` 브랜치에 올라가 있습니다. GitHub에서 Pull Request를 만들어 `main`에 합치면 됩니다. 아래는 새 저장소에 처음부터 올릴 때의 방법입니다.

1. [github.com](https://github.com)에서 새 저장소(Repository)를 만듭니다. (Private 권장)
2. 이 폴더에서 아래 명령을 실행합니다. (`내아이디/저장소이름`은 바꿔 주세요)

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "첫 버전"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/내아이디/저장소이름.git
```

```bash
git push -u origin main
```

> `node_modules`, `dist`, `.env` 는 `.gitignore`에 등록되어 있어 올라가지 않습니다. (정상입니다)
> 명령어가 어렵다면 [GitHub Desktop](https://desktop.github.com) 프로그램으로 같은 작업을 버튼으로 할 수 있습니다.

## ③ Netlify에 배포하기

1. [netlify.com](https://www.netlify.com)에 GitHub 계정으로 가입/로그인합니다.
2. **Add new site → Import an existing project → GitHub** 를 선택하고 위 저장소를 고릅니다.
3. 빌드 설정은 `netlify.toml` 파일에 이미 들어 있어 자동으로 채워집니다.
   - Build command: `npm run build`
   - Publish directory: `dist`
4. **Deploy** 를 누르면 1~2분 뒤 `https://○○○.netlify.app` 주소가 생깁니다.
5. 이후에는 GitHub에 새로 올릴(push) 때마다 자동으로 다시 배포됩니다.

> 주소를 직접 입력하거나 새로고침해도 404가 나지 않도록 `netlify.toml`에 설정이 들어 있습니다.

## ④ 배포 후 Firebase 연동 체크리스트 (2단계)

- [ ] [Firebase 콘솔](https://console.firebase.google.com)에서 프로젝트 생성 (요금제: **Spark 무료**)
- [ ] 프로젝트 설정 → **웹 앱 추가** → 표시되는 `apiKey`, `authDomain`, `projectId`, `appId` 값 메모
- [ ] **Authentication → 로그인 방법 → Google** 사용 설정
- [ ] **Authentication → 설정 → 승인된 도메인**에 Netlify 주소(`○○○.netlify.app`) 추가
- [ ] **Firestore Database** 생성 (위치: `asia-northeast3` 서울 권장)
- [ ] Firestore에 `allowedEmails` 컬렉션 생성 → 문서 ID를 구성원 구글 이메일로, 필드 `role` = `admin`(교수) / `member`(대학원생)
- [ ] Firestore **규칙** 탭에 이 저장소의 `firestore.rules` 내용을 붙여넣고 게시
- [ ] Netlify → Site configuration → **Environment variables** 에 4개 등록 후 재배포
  - `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`
- [ ] 내 컴퓨터에서 테스트할 때는 `.env.example`을 복사해 `.env` 파일을 만들고 같은 값을 넣기 (`.env`는 GitHub에 올라가지 않습니다)
- [ ] 코드 작업: `src/services/` 안의 함수들을 Firestore 버전으로 교체, `authService.ts`의 `IS_TEST_LOGIN`을 `false`로 변경 (Claude Code에 요청하면 됩니다)
- [ ] 교수 계정·대학원생 계정으로 각각 로그인해 권한이 맞게 동작하는지 확인
