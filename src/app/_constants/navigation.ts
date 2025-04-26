export const NAVBARS = [
  {
    name: "E스포츠",
    link: "/board/esports/ALL",
    id: "esports",
  },
  {
    name: "축구",
    link: "/board/football/ALL",
    id: "football",
  },
  {
    name: "야구",
    link: "/board/baseball/ALL",
    id: "baseball",
  },
  {
    name: "뉴스톡톡",
    link: "/news/ALL",
    id: "news",
  },
  {
    name: "경기중계",
    link: "/matchBroadcast/ESPORTS",
    id: "matchBroadcast",
  },
];

export const HAMBURGER_MENU = [
  {
    title: "E스포츠",
    link: "/board/esports/ALL",
    id: "esports",
  },
  {
    title: "축구",
    link: "/board/football/ALL",
    id: "football",
  },
  {
    title: "야구",
    link: "/board/baseball/ALL",
    id: "baseball",
  },
  {
    title: "뉴스톡톡",
    link: "/news/ALL",
    id: "news",
  },
  {
    title: "경기중계",
    dropDown: [
      {
        title: "E스포츠",
        link: "/matchBroadcast/ESPORTS",
      },
      {
        title: "축구",
        link: "/matchBroadcast/FOOTBALL",
      },
      {
        title: "야구",
        link: "/matchBroadcast/BASEBALL",
      },
    ],
    id: "matchBroadcast",
  },
  {
    title: "마이페이지",
    dropDown: [
      {
        title: "내가 쓴 게시물",
        link: "/mypage/posts",
      },
      {
        title: "내가 쓴 댓글",
        link: "/mypage/comments",
      },
      {
        title: "내 정보 수정",
        link: "/mypage/edit-profile",
      },
      {
        title: "나의 문의내역",
        link: "/mypage/inquiries",
      },
      {
        title: "로그아웃",
      },
    ],
    id: "mypage",
    authRequired: true,
  },
  {
    title: "고객센터",
    dropDown: [
      {
        title: "공지사항",
        link: "/customer",
      },
      {
        title: "개선요청",
        link: "/customer/feedback",
      },
      {
        title: "이용약관",
        link: "/customer/terms",
      },
      {
        title: "개인정보처리방침",
        link: "/customer/privacy-policy",
      },
    ],
    id: "customer",
  },
];

export const NEWS_NAVBAR = [
  {
    name: "뉴스톡톡",
    link: "/news/ALL",
    id: "ALL",
  },
  {
    name: "E스포츠",
    link: "/board/esports/ALL",
    id: "esports",
  },
  {
    name: "축구",
    link: "/board/football/ALL",
    id: "football",
  },
  {
    name: "야구",
    link: "/board/baseball/ALL",
    id: "baseball",
  },
  {
    name: "경기중계",
    link: "/matchBroadcast/ESPORTS",
    id: "matchBroadcast",
  }
];

export const MATCH_NAVBAR = [
  {
    name: "경기중계",
    link: "/matchBroadcast/ESPORTS",
    id: "matchBroadcast",
  },
  {
    name: "E스포츠",
    link: "/board/esports/ALL",
    id: "esports",
  },
  {
    name: "축구",
    link: "/board/football/ALL",
    id: "football",
  },
  {
    name: "야구",
    link: "/board/baseball/ALL",
    id: "baseball",
  },
  {
    name: "뉴스",
    link: "/news/ALL",
    id: "news",
  }
];

export const TOTAL_NAVBAR = [
  {
    name: "통합검색",
    link: "/total-search/board",
    id: "total-search"},
  {
    name: "E스포츠",
    link: "/board/esports/ALL",
    id: "esports",
  },
  {
    name: "축구",
    link: "/board/football/ALL",
    id: "football",
  },
  {
    name: "야구",
    link: "/board/baseball/ALL",
    id: "baseball",
  },
  {
    name: "뉴스",
    link: "/news/ALL",
    id: "news",
  },
  {
    name: "경기중계",
    link: "/matchBroadcast/ESPORTS",
    id: "matchBroadcast",
  }
];