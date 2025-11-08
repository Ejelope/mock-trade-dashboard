# 💹 Mock Trade Dashboard
**업비트 Open API 기반 모의투자 대시보드**

React와 Spring Boot를 기반으로 실제 업비트 시세를 활용한  
가상 매수/매도 시뮬레이션을 제공하는 웹 애플리케이션입니다.

---

## 🚀 프로젝트 개요

> “실제 자금 없이 코인 거래를 연습할 수 있는 가상투자 플랫폼”

- 업비트 Open API를 이용해 실시간 시세를 표시
- 가상 계좌 생성 및 예치금 관리
- 가상의 매수/매도 거래 시뮬레이션
- 거래내역과 수익률을 대시보드로 시각화

---

## 🎯 개발 목표

| 단계 | 주요 내용 | 상태 |
|------|------------|------|
| 1단계 | React–Spring Boot–MySQL 연결 및 기본 CRUD (회원 등록·조회) | ✅ 완료 |
| 2단계 | 계좌(Account) 엔티티 및 잔액 관리 API | 🔜 진행 예정 |
| 3단계 | 업비트 시세 API 연동 (BTC, ETH 등) | 🔜 예정 |
| 4단계 | 가상 매수/매도 거래 로직 구현 | 🔜 예정 |
| 5단계 | 대시보드 UI (보유자산, 거래내역, 수익률 시각화) | 🔜 예정 |
| 6단계 | JWT 로그인 및 사용자별 계좌 관리 | 🔜 선택적 |
| 7단계 | Docker 또는 클라우드 배포 | 🔜 선택적 |

---

## ⚙️ 기술 스택

### 🖥 Frontend
- **React 18 (Vite)**
- **Axios** — 백엔드 API 통신
- **Chart.js / Recharts** — 대시보드 시각화
- **JavaScript (ES6)**

### 🧩 Backend
- **Spring Boot 3.x**
- **Spring Data JPA**
- **Lombok**
- **Gradle**
- **Java 17**

### 🗄 Database
- **MySQL 8.x** — 운영용 DB
- **H2 (in-memory)** — 테스트용 DB

### 🌐 External API
- **Upbit Open API** (https://api.upbit.com)

---

## 📁 프로젝트 구조

```bash
mock-trade-dashboard/
│
├─ backend/                # Spring Boot 서버
│  ├─ src/
│  │  ├─ main/
│  │  │  ├─ java/com/example/backend/
│  │  │  │   ├─ controller/     # REST API 엔드포인트
│  │  │  │   ├─ entity/         # DB 엔티티 클래스
│  │  │  │   ├─ repository/     # JPA 인터페이스
│  │  │  │   └─ BackendApplication.java
│  │  │  └─ resources/
│  │  │      ├─ application.yml # DB 설정
│  │  │      └─ static/, templates/ (필요시)
│  │  └─ test/                  # JUnit 테스트 코드
│  ├─ build.gradle
│  └─ gradlew, gradlew.bat
│
└─ frontend/              # React (Vite)
   ├─ src/
   │  ├─ components/       # 공통 UI 컴포넌트
   │  ├─ pages/            # 화면 단위 컴포넌트
   │  ├─ services/         # axios API 모듈
   │  ├─ App.jsx           # 메인 컴포넌트
   │  └─ main.jsx          # 진입점
   ├─ public/
   ├─ package.json
   └─ vite.config.js
 ``` 
---

## 🔁 데이터 흐름
1. React → (axios) → Spring Boot API 호출  
2. Spring Boot → (JPA) → MySQL CRUD 수행  
3. 결과 JSON → React로 응답  
4. React 화면에서 데이터 렌더링  


---

## 🧩 실행 방법

1️⃣ 백엔드 (Spring Boot)  
```bash
cd backend  
./gradlew bootRun
```

➡️ 실행 후 접속: http://localhost:8080

2️⃣ 프론트엔드 (React)
```bash
cd frontend
npm install
npm run dev
```

➡️ 실행 후 접속: http://localhost:5173

---
## 📈 주요 화면 (예정)

- 계좌 현황 및 잔액 표시

- 실시간 시세표 (업비트 API)

- 가상 매수/매도 시뮬레이터

- 거래내역 / 수익률 그래프

---
## 🧑‍💻 개발자 노트

이 프로젝트는 JSP 기반 환경에서 React + Spring Boot 구조로 확장하며,
프론트엔드와 백엔드의 완전 분리형 아키텍처를 학습하고 실습하기 위한 목적도 포함합니다.