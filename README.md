# 약학 연구실 자료실

계명대학교 약학대학 PMD 연구실(Protein Modulator Discovery Lab) 홈페이지입니다.

> **현재 단계(2단계)**: Firebase에 연결되어 있습니다.
> 구글 계정으로 로그인하고, '최근 논문' 목록은 Firestore(구글 클라우드 데이터베이스)에 저장됩니다.
> 홈페이지는 **누구나** 볼 수 있고, 논문 원문 링크 열기는 **교수님이 구성원 명단(`allowedEmails`)에 등록한 구글 계정**으로 로그인해야 합니다.

⚠️ 환자 정보 등 개인식별정보와 미공개 민감 데이터는 업로드하지 마세요. 파일은 Google Drive 등에 올리고 **링크만** 등록합니다.

---

## 자주 고치는 곳

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 홈 화면 연구실 소개 문구, 사이트 이름 | `src/lib/siteConfig.ts` |
| 구성원 추가·삭제, 역할 변경 | Firebase 콘솔 → Firestore → `allowedEmails` (아래 ⑤ 참고) |
| 최근 논문 탭의 "한 번에 불러오기" 논문 목록 | `src/data/preparedContent.ts` |
| 연락처(이메일·전화·주소) | `src/content/labInfo.ts` |
| 홈 소개 글(Welcome, Expertise, Focus Areas) | `src/content/homeContent.ts` |
| 연구 분야 페이지 | `src/content/researchAreas.ts` |
| 논문 목록(Publications) | `src/content/publications.ts` (해당 연도 맨 앞에 한 줄 추가) |
| 구성원·사진 페이지 | `src/content/people.ts` |
| 지원 안내(Join us) | `src/content/joinUs.ts` |
| 사이트 대표 색상(brand) | `src/index.css` 맨 위 `@theme` 부분 |

> 글꼴은 무료 한글 글꼴 **Pretendard**를 인터넷(CDN)에서 불러옵니다. 별도 설치는 필요 없습니다.

## 폴더 구조 (간단히)

- `src/pages` – 각 화면(홈, 연구 분야, 논문, 구성원, 사진, 지원 안내, 최근 논문, 로그인)
- `src/components` – 여러 화면에서 같이 쓰는 부품(상단 메뉴, 링크 목록, 사진 칸 …)
- `src/services` – **데이터 읽기/쓰기 전담** (Firestore·구글 로그인과 통신하는 부분)
- `src/contexts` – 로그인 상태(AuthContext)
- `src/lib` – 작은 도우미 함수(날짜 표시, 링크 검사, Firebase 연결 설정 등)
- `firestore.rules` – 데이터 접근 보안 규칙 (Firebase 콘솔 규칙 탭에 붙여넣는 내용)

## 권한

| | 비로그인 방문자 | 대학원생(member) | 교수(admin) |
|---|---|---|---|
| 모든 페이지 열람 (홈·연구 분야·논문·구성원·사진·지원 안내·최근 논문) | ✅ | ✅ | ✅ |
| 논문·자료 원문 링크 열기 | 🔒 로그인 안내 | ✅ | ✅ |
| 최근 논문 등록/수정/삭제 | ❌ | ❌ | ✅ |

이 권한은 화면에서 버튼을 숨기는 것과 별개로, `firestore.rules` 보안 규칙이 서버에서 한 번 더 막습니다.
(논문 링크 잠금은 화면에서만 적용됩니다. DOI 주소 자체는 공개 정보이기 때문입니다.)

## 사진·그림 넣는 방법

사진은 `public/images/` 폴더에 **아래 파일 이름 그대로** 넣으면 자동으로 표시됩니다. 파일이 없는 자리는 "이미지 준비 중"으로 보입니다.

| 위치 | 파일 이름 |
|---|---|
| 홈 – Welcome 옆 대표 사진 | `home-main.jpg` |
| 연구 분야 – 상단 그림 2장 | `research-overview.jpg`, `research-examples.jpg` |
| 연구 분야 – 대표 논문 그림 | `toc-bridged-protac.jpg`, `toc-g9a-covalent.jpg`, `toc-otub1-biophostac.jpg` |
| 구성원 – 교수 사진 | `pi.jpg` |
| 구성원 – 단체 사진 3장 | `members-2025-spring.jpg`, `members-2025-spring-jin.jpg`, `members-2025-may.jpg` |
| 사진 – 2025 Spring 앨범 | `gallery-2025-jin-1.jpg` ~ `gallery-2025-jin-3.jpg` |
| 사진 – 2025 Group Photo | `gallery-2025-group-1.jpg`, `gallery-2025-group-2.jpg` |
| 사진 – 2024 Group Photo | `gallery-2024-group.jpg` |

- **방법 1 (가장 쉬움):** Claude Code 대화창에 사진을 첨부하고 "이건 pi.jpg" 처럼 어디에 쓸지 알려 주세요.
- **방법 2:** GitHub 저장소 → `public/images` 폴더 → **Add file → Upload files** 로 위 이름의 파일을 올리면 자동 배포됩니다.
- 사진 한 장은 1MB 이하(가로 1600px 정도)를 권장합니다. 저장소가 공개 상태이므로 학생 사진은 본인 동의를 받고 올려 주세요.

---

## ① 내 컴퓨터에서 실행하기

1. [Node.js](https://nodejs.org) LTS 버전을 설치합니다. (설치 후 터미널에서 `node -v` 로 확인)
2. `.env.example` 파일을 복사해 이름을 `.env` 로 바꾸고, `=` 뒤에 Firebase 값 4개를 넣습니다. (값은 아래 ④ 표 참고. `.env`는 GitHub에 올라가지 않습니다)
3. 이 폴더에서 터미널을 열고 아래를 차례로 입력합니다.

```bash
npm install
```

```bash
npm run dev
```

4. 화면에 나온 주소(보통 `http://localhost:5173`)를 브라우저에서 엽니다. (`localhost`는 Firebase 승인된 도메인에 기본으로 들어 있습니다)
5. 배포 전에 오류가 없는지 확인하려면:

```bash
npm run build
```

## ② GitHub에 올리기

> 이 코드는 이미 `pks0804/Creativity` 저장소에 올라가 있습니다(기본 브랜치: `claude/peaceful-faraday-vx80ec`). 아래는 새 저장소에 처음부터 올릴 때의 방법입니다.

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

## ④ Netlify 환경변수 등록 (Firebase 연결 정보)

Firebase 연결 정보는 코드에 직접 넣지 않고 Netlify에 등록합니다. 값은 Firebase 콘솔 → ⚙️ 프로젝트 설정 → 내 앱(웹 앱)의 `firebaseConfig`에 있습니다.

| Key (이름) | 넣을 값 (`firebaseConfig`의 항목) |
|---|---|
| `VITE_FIREBASE_API_KEY` | `apiKey` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `VITE_FIREBASE_PROJECT_ID` | `projectId` |
| `VITE_FIREBASE_APP_ID` | `appId` |

1. [app.netlify.com](https://app.netlify.com) → 이 사이트 클릭
2. 왼쪽 **Site configuration** → **Environment variables**
3. **Add a variable** → **Add a single variable**
4. **Key**에 이름, **Values**에 값을 붙여넣기 (따옴표·공백 없이) → **Create variable**
5. 4개를 모두 등록한 뒤 **Deploys** → **Trigger deploy** → **Deploy site** 로 다시 배포

> 값이 빠져 있으면 사이트에 "Firebase 설정값이 필요합니다" 안내와 빠진 항목 이름이 표시됩니다.
> 이 값들은 비밀번호가 아니라 "어느 Firebase 프로젝트인지" 알려주는 정보입니다. 실제 보안은 Firestore 규칙이 담당합니다.

## ⑤ Firebase 설정과 구성원 관리

### 처음 한 번 하는 설정
- [x] Firebase 프로젝트 생성 (Spark 무료 요금제)
- [x] **Authentication → 로그인 방법 → Google** 사용 설정
- [x] **Authentication → 설정 → 승인된 도메인**에 Netlify 주소(`○○○.netlify.app`) 추가
- [x] **Firestore Database** 생성
- [ ] Firestore **규칙** 탭에 `firestore.rules` 파일 내용을 통째로 붙여넣고 **게시**
- [ ] 아래 방법으로 교수님 본인을 `admin`으로 등록
- [ ] ④ Netlify 환경변수 4개 등록 후 재배포
- [ ] 배포된 사이트에서 교수 계정으로 로그인 → 최근 논문 탭에서 "한 번에 불러오기" → 논문 링크 열림 확인

### 구성원 추가하는 방법 (Firebase 콘솔)
1. Firestore Database → **데이터** 탭
2. (처음만) **컬렉션 시작** → 컬렉션 ID: `allowedEmails`
3. **문서 추가** → 문서 ID: 구성원의 구글 이메일 **소문자** (예: `student01@gmail.com`)
4. 필드 추가
   - `role` (string): 교수는 `admin`, 대학원생은 `member`
   - `name` (string, 선택): 사이트에 표시할 이름 (예: `김○○`). 비워 두면 구글 계정 이름이 표시됩니다.
5. 저장하면 그 사람은 바로 로그인할 수 있습니다. 졸업 등으로 접근을 막으려면 해당 문서를 삭제하세요.

> 명단에 없는 구글 계정으로 로그인하면 "연구실 구성원 명단에 등록되지 않은 계정입니다" 안내가 뜨고 자동으로 로그아웃됩니다.
