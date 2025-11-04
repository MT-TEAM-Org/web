<div style="max-width: 100%; height: 150px; border-radius: 8px; background-color: #f0f0f0; border: 2px solid #ccc;">
  <img src="public/readme-background.png" alt="PlayHive Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
</div>

# PlayHive

**PlayHive**는 스포츠를 주제로 한 **클린 커뮤니티 플랫폼**입니다.  
축구, 야구, E-Sports 등 다양한 카테고리에서 사용자들이 자유롭게 의견을 나누고 건전한 커뮤니티 문화를 만들어갑니다.

---

## 시작하기 (Getting Started)

로컬 환경에서 PlayHive 프로젝트를 실행하기 위한 가이드입니다.

```bash
# 1. 저장소 클론
git clone https://github.com/MT-TEAM-Org/web.git
cd web

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 빌드
npm run build
```

## 사용 기술 (Built With)

- [Next.js](https://nextjs.org/) - 사용된 웹 프레임워크
- [TypeScript](https://www.typescriptlang.org/) - 타입 안전한 JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - CSS 프레임워크
- [react-hook-form](https://react-hook-form.com/) - 폼 유효성 검사
- [tanstack-query](https://tanstack.com/query/latest) - 서버 상태 관리
- [Zustand](https://github.com/pmndrs/zustand) - 전역 상태 관리
- [dompurify](https://github.com/cure53/DOMPurify) - HTML 인젝션 방지

## 프로젝트 구조

```bash
src/
├── _hooks/              # 커스텀 훅
├── _types_/             # 타입 정의
├── app/                 # Next.js App Router
├── _emailTemplates/     # 이메일 템플릿
├── lib/                 # 유틸리티 함수
├── services/            # API 서비스
└── utils/               # 유틸 함수
```

## 프로젝트 주요 기능

- 축구, 야구, E스포츠 게시판
- 축구, 야구, E스포츠 뉴스 정보
- 유튜브 영상 임베드 실시간 중계
