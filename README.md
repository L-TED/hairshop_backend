# 프로젝트 총기획

### Unavailable-functions(안할거임)

- 결제(필요X)
- 알림
- 실시간 웹소켓 서비스(필요X)
- 다국어
- 소셜 로그인
- 그 외 헤어숍 사이트에 비필수적인 기능들

### Reservation

- 헤어 디자이너 선택 => 예약 스케줄 카드 출력 => 30분 단위 시간 별로 버튼 존재 (네이버 예약처럼)
- 특정 담당자에게 n시 n분 예약 확정 => 해당 시간의 버튼 비활성화
- 영업, 점심 시간 고정 => 8시 - 20시 까지 점심 시간 12시 - 13시를 제외하고 30분 단위로 예약 가능
- 예약 취소, 변경 => 취소는 가능, 변경은 상태(status) 변경
- 임시 예약은 X

### Login/Signup (확정)

- 로그인과 회원가입은 아이디/비밀번호 항목 필요
- 아이디/비밀번호 찾기 기능은 시간상 일단 제외
- 방식은 쿠키 + JWT
- 비밀번호와 리프레시 토큰은 DB에 들어갈 때 hash&salt 처리(bcrypt)
- 인증 요구 => 기본적으로 모든 UI는 로그인 없이 공개.
  단, 예약과 관련된 기능들은 모두 로그인 필수(엑세스, 리프레시 토큰 필요)

### DB schemes

- **customers** {
  id(uuid pk/ 고객 id),
  username(varchar not null unique/ 로그인 시 사용하는 ID),
  hash_password(varchar not null/ 로그인 시 사용하는 PW, db에 넣을 때 hash화)
  }
- **staffs** {
  id(serial pk/ 직원(디자이너) id, 입사 순서대로),
  name(varchar not null/ 직원 이름)
  }
- **stores** {
  id(serial pk/ 가맹점 id),
  name(varchar not null unique/ 가맹점 이름),
  address(varchar/ 가게 주소),
  latitude(decimal(n1, n2)/ 위도),
  longitude(decimal(m1, m2)/ 경도)
  }
- **services** {
  id(serial pk/ 시술 id),
  name(varchar not null/ 시술 이름),
  price(int not null/ 시술 가격)
  }
- **reservations** {
  id(uuid pk/ 예약 uuid),
  status(enum('confirmed', 'canceled') not null/ 예약 상태),
  start_at(timestamp not null/ 시술 시작 시간),
  service_id(serail fk/ 시술 id), staff_id(serial fk/ 직원 id),
  customer_id(varchar fk/ 고객 id)
  }
- **news_posts** {
  id(serial/ 포스트 id),
  title(varchar not null/ 포스트 제목),
  contents(text not null/ 포스트 본문),
  thumbnail_url(varchar null/ 포스트 사진, null 허용),
  created_at(datetime/ 업로드 날짜 및 시간)
  }
- **refresh_tokens** {
  id(serial pk/ 토큰 생성 id),
  hashed_token(varchar not null/ token 해시화),
  isRevoked(boolean not null default false/ 만료되었는지),
  expires_at(date not null/ 만료 시간),
  created_at(date not null/ 발급 시간),
  customer_id(uuid fk/ 고객 id)
  }

### API Endpoints

a) 계정 (필수, 기본 베이스)

- GET /auth/me
- POST /auth/signup
- POST /auth/login
- POST /auth/logout
- POST /auth/refresh (새로고침 시 엑세스 토큰 발급)
- PATCH /auth/password (비밀번호 변경)

b) 예약

- GET /services (예약 시 시술 선택)
- GET /availability?date=YYYY-MM-DD&service_id=…
  (db의 예약 날짜와 시술 등이 정보를 프론트가 받고, 시간 버튼에 사용, 반환 예시: [{start_at: "2026-01-15T08:00:00+09:00", available: true}, ...])
- GET /reservations => 예약 목록 확인
- GET /reservations/{id}
- POST /reservations
- PATCH /reservations/{id}
- DELETE /reservations/{id}

### Exception

-
