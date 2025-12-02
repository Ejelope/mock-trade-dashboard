**Mock Trade Dashboard Setup Guide**

---

**프로젝트 개요**

React(Vite) + Spring Boot 기반의 모의투자 대시보드 프로젝트입니다.  
프론트엔드와 백엔드가 각각 독립적으로 실행되며, REST API로 통신합니다.

---

**1. 필수 설치 프로그램**

| 구분 | 필요 버전 | 설명 |
|------|------------|------|
| Java JDK | 17 | Spring Boot 실행용 |
| Gradle | 내장(`gradlew`) 사용 가능 | JDK가 있으면 자동 사용 |
| Node.js | 18 이상 | React(Vite) 실행용 |
| npm | Node.js에 포함됨 | 프론트엔드 패키지 설치용 |
| IntelliJ IDEA | Community 이상 | 백엔드 개발용 |
| VS Code | 선택 | 프론트엔드 수정용 |
| Git | 최신 버전 | 레포 클론 및 버전관리용 |

---

**2. 환경변수 설정 (Windows 기준)**

1. JDK 설치 경로 확인  
   예: `C:\Program Files\Java\jdk-17`

2. 시스템 환경변수 추가  
   - JAVA_HOME = `C:\Program Files\Java\jdk-17`  
   - Path에 `%JAVA_HOME%\bin` 추가  

3. 확인  
   ```
   java -version
   ```
   → `openjdk version "17..."` 출력 시 성공

---

**3. 백엔드(Spring Boot) 실행**

1. 레포 클론  
   ```
   git clone https://github.com/Ejelope/mock-trade-dashboard.git
   cd mock-trade-dashboard/backend
   ```

2. 실행  
   ```
   gradlew bootRun   (Windows)
   ./gradlew bootRun (Mac/Linux)
   ```

3. 정상 메시지 예시  
   ```
   Tomcat started on port 8080
   Started BackendApplication in 3.2 seconds
   ```

4. 브라우저 확인  
   ```
   http://localhost:8080/api/users
   ```
   → JSON 결과 확인 시 성공

---

**4. 프론트엔드(React + Vite) 실행**

1. 폴더 이동  
   ```
   cd ../frontend
   ```

2. 패키지 설치  
   ```
   npm install
   ```

3. (필요 시) vite 직접 설치  
   ```
   npm install vite --save-dev
   ```

4. 개발 서버 실행  
   ```
   npm run dev
   ```

5. 정상 메시지 예시  
   ```
   VITE v5.x.x  ready in 500ms
   ➜  Local:   http://localhost:5173/
   ```

---

**5. 프로젝트 구조**

```
mock-trade-dashboard/
│
├── backend/             
│   ├── build.gradle
│   ├── src/main/java/com/example/backend
│   └── src/test/java/
│
└── frontend/            
    ├── package.json
    ├── vite.config.js
    ├── src/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
```

---

**6. 자주 발생하는 오류와 해결법**

| 오류 메시지 | 원인 | 해결법 |
|--------------|------|--------|
| `'vite'은 내부 명령이 아닙니다` | vite 미설치 | `npm install vite --save-dev` |
| `JAVA_HOME is not set` | 환경변수 누락 | JAVA_HOME 설정 |
| `package org.json does not exist` | JSON 라이브러리 누락 | `implementation 'org.json:json:20210307'` 추가 |
| `localhost:8080 연결 안 됨` | 백엔드 미실행 | `gradlew bootRun` 실행 |
| CORS 오류 | 포트 다름 (8080↔5173) | `@CrossOrigin("http://localhost:5173")` 추가 |

---

**7. 실행 요약**

| 항목 | 백엔드 | 프론트엔드 |
|------|---------|------------|
| 언어 | Java 17 | JavaScript (ES6) |
| 프레임워크 | Spring Boot | React (Vite) |
| 실행 명령 | `gradlew bootRun` | `npm run dev` |
| 기본 포트 | 8080 | 5173 |
| 통신 방식 | REST API | Axios 요청 |
| 주요 경로 | `/api/...` | `/src/pages` |

---

**8. 기능 확장 계획**

- 로그인 / 회원가입 (JWT)
- DB 교체: H2 → MySQL
- 거래 데이터 시각화 (Chart.js / Recharts)
- 잔액 관리 로직 (Service 계층 추가)
- 글로벌 예외 처리 및 응답 DTO 적용
- 사용자별 거래 내역 필터링

---

**작성자**
- Developer: Eunjeong Hwang
- IDE: IntelliJ + VS Code
- Backend: Spring Boot 3.x
- Frontend: React (Vite)
