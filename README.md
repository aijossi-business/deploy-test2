# 당신의 전생은? 🔮

이름을 입력하면 AI가 당신의 전생을 알려주는 흥미유발형 스토리텔링 서비스입니다.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 서비스 소개

사용자가 이름을 입력하면 **랜덤한 전생 정보**가 생성되고, OpenAI API를 통해 **몰입감 있는 전생 스토리**가 만들어집니다.

### 핵심 특징

- **300개 이상의 직업/존재** - 인간뿐 아니라 동물, 미생물, 무생물, 외계인까지
- **시대 정확도** - 조선시대(1392~1897), 고려시대(918~1392) 등 실제 역사와 매칭
- **시간 범위** - 기원전 150,000년부터 1980년까지 (미생물/무생물은 수십억년 전까지)
- **카테고리별 사망 원인** - 존재 유형에 맞는 웃긴 사인 135개+
- **AI 스토리텔링** - GPT-4o-mini가 이름, 시대, 직업, 사인을 엮어 이야기 생성
- **공유 기능** - 모바일 네이티브 공유 / PC 클립보드 복사

---

## 존재 유형 예시

| 카테고리 | 예시 |
|---------|------|
| 🧑 인간 | 조선시대 과거시험 만년 낙방생, 해적선 요리사, 클레오파트라 전속 부채질 담당 |
| 🦕 동물 | 티라노사우루스, 도도새, 타이타닉호에 탑승한 쥐, 파블로프의 실험견 |
| 🦠 미생물 | 흑사병 페스트균, 페니실린 발견 직전의 포도상구균, 최초의 단세포 생물 |
| 🗿 무생물 | 엑스칼리버, 고려청자 한 점, 달에 꽂힌 미국 깃발, 빅뱅 직후 수소 원자 |
| 👽 외계인 | 로즈웰에 불시착한 외계인 조종사, 시리우스 성계 택배 기사, 4차원 관광객 |

---

## 프로젝트 구조

```
deploy-test2/
├── server.js              # Express 서버 + OpenAI API 연동
├── public/
│   └── index.html         # 프론트엔드 (우주 테마 UI)
├── data/
│   ├── occupations.json   # 300개+ 직업/존재 데이터
│   └── deaths.json        # 카테고리별 사망 원인 데이터
├── package.json
├── .env.example           # 환경변수 템플릿
└── .gitignore
```

---

## 설치 및 실행

### 1. 클론

```bash
git clone https://github.com/aijossi-business/deploy-test2.git
cd deploy-test2
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일을 열고 OpenAI API 키를 입력합니다:

```
OPENAI_API_KEY=sk-proj-your-api-key-here
```

> OpenAI API 키는 https://platform.openai.com/api-keys 에서 발급받을 수 있습니다.

### 4. 서버 실행

```bash
npm start
```

브라우저에서 `http://localhost:3333` 접속

---

## API 명세

### POST `/api/past-life`

이름을 받아 전생 정보와 AI 스토리를 반환합니다.

**Request**
```json
{
  "name": "민수"
}
```

**Response**
```json
{
  "name": "민수",
  "occupation": "엑스칼리버 (아서왕의 검)",
  "category": "object",
  "year": 586,
  "yearFormatted": "586년",
  "deathCause": "주인이 바뀌면서 창고에 버려짐",
  "story": "586년 영국의 전투가 벌어지던 시기..."
}
```

| 필드 | 설명 |
|------|------|
| `name` | 입력한 이름 |
| `occupation` | 전생 직업/정체 |
| `category` | 존재 유형 (`human`, `animal`, `microbe`, `object`, `alien`) |
| `year` | 전생 연도 (음수 = 기원전) |
| `yearFormatted` | 읽기 쉬운 연도 표기 |
| `deathCause` | 사망 원인 |
| `story` | AI가 생성한 전생 스토리 |

---

## 데이터 커스터마이징

### 직업/존재 추가 (`data/occupations.json`)

```json
{
  "name": "백두산 호랑이",
  "era": [1392, 1900],
  "category": "animal"
}
```

- `era`: `[시작년도, 끝년도]` — 이 범위에서 랜덤 연도가 선택됩니다
- `category`: `human` | `animal` | `microbe` | `object` | `alien`

### 사망 원인 추가 (`data/deaths.json`)

카테고리별 배열에 문자열을 추가하면 됩니다:

```json
{
  "animal": [
    "기존 항목...",
    "새로운 사망 원인"
  ]
}
```

---

## 응용 예시

### 1. 이벤트/파티 아이스브레이커
참가자들이 각자 이름을 입력하고 전생 결과를 발표하면서 대화를 시작하는 용도로 활용할 수 있습니다.

### 2. SNS 바이럴 콘텐츠
공유 버튼을 통해 결과를 카카오톡, 인스타그램 스토리 등에 퍼뜨려 자연스러운 바이럴 효과를 만들 수 있습니다.

### 3. 카페/매장 키오스크
태블릿에 서비스를 띄워두고 방문 고객이 직접 전생을 확인하게 하면 체류 시간을 늘릴 수 있습니다.

### 4. 교육 콘텐츠
역사 교육과 결합하여 학생들이 특정 시대의 직업과 생활상에 흥미를 갖도록 유도할 수 있습니다. 직업 데이터에 교육 목적에 맞는 항목을 추가하면 됩니다.

### 5. 커플/친구 매칭
두 사람의 전생을 비교하여 "전생에도 인연이었을까?" 같은 콘텐츠로 확장할 수 있습니다.

### 6. 커스텀 테마
직업 데이터를 교체하면 다른 테마로 변형 가능합니다:
- **전생 동물 테스트** — category를 animal로만 구성
- **전생 외계인 테스트** — category를 alien으로만 구성
- **조선시대 전생** — era를 조선시대로 한정

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Backend | Node.js, Express |
| Frontend | Vanilla HTML/CSS/JS |
| AI | OpenAI GPT-4o-mini |
| 데이터 | JSON 파일 기반 |

---

## 라이선스

MIT License
