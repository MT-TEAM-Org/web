export const DetailTableData = (type: string) => {
  if (type === "suggestions") {
    return [
      {
        status: "대기",
        importance: "높음",
        recommendations: "15",
        nickname: "하이브짱",
        title: "로그인 관련 개선사항",
        content:
          "로그인 페이지 UI 개선이 필요합니다. 사용자 경험 향상을 위해...",
        date: "25.05.29",
      },
      {
        status: "완료",
        importance: "중간",
        recommendations: "8",
        nickname: "사용자123",
        title: "검색 기능 개선 요청",
        content: "검색 결과가 정확하지 않은 것 같습니다. 개선이 필요해요...",
        date: "25.05.28",
      },
      {
        status: "접수",
        importance: "중간",
        recommendations: "8",
        nickname: "사용자123",
        title: "검색 기능 개선 요청",
        content: "검색 결과가 정확하지 않은 것 같습니다. 개선이 필요해요...",
        date: "25.05.28",
      },
    ];
  } else if (type === "inquiry") {
    return [
      {
        status: "답변대기",
        member: "비회원",
        email: "hvie12@gmail.com",
        content:
          "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
        date: "25.05.29",
      },
      {
        status: "답변완료",
        member: "회원",
        email: "하이브짱",
        content:
          "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
        date: "25.05.29",
      },
    ];
  } else if (type === "notice") {
    return [
      {
        status: "게시중",
        date: "25.05.29",
        writer: "플레이하이브 관리자",
        title: "공지사항입니다 제목공지사항입니다 제목",
        content: "공지내용공지내용공지내용공지내용공지내용",
      },
    ];
  } else if (type === "content") {
    return [
      {
        status: "노출",
        isReport: "신고",
        reportCount: "15",
        userStatus: "정상",
        writer: "hive짱짱12",
        type: "게시글",
        titleContent:
          "댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목",
        date: "25.05.29",
      },
      {
        status: "보류",
        isReport: "미신고",
        reportCount: "12",
        userStatus: "경고",
        writer: "hive짱짱12",
        type: "댓글",
        titleContent: "게시글제목게시글제목게시글제목게시글제목",
        date: "25.05.29",
      },
      {
        status: "숨김",
        isReport: "신고",
        reportCount: "10",
        userStatus: "정상",
        writer: "hive짱짱12",
        type: "채팅",
        titleContent:
          "댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목댓글제목",
        date: "25.05.29",
      },
    ];
  } else if (type === "detailContent") {
    return [
      {
        reportUser: "hive짱짱12",
        reportType: "정치",
        reason:
          "쵸비 개새끼쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기",
        reportDate: "2025.05.29 / 18:24:32",
      },
      {
        reportUser: "hive짱짱34",
        reportType: "욕설",
        reason: "-",
        reportDate: "2025.05.29 / 18:24:32",
      },
    ];
  } else if (type === "user") {
    return [
      {
        userStatus: "정상",
        nickname: "hive짱짱12",
        post: "12",
        comment: "6",
        getRecommendations: "3",
        getReportCount: "13",
        gender: "남",
        joinType: "구글",
        email: "hive1234@gmail.com",
        phone: "01012345678",
      },
      {
        userStatus: "경고",
        nickname: "hive짱짱1234",
        post: "9",
        comment: "5",
        getRecommendations: "2",
        getReportCount: "11",
        gender: "여",
        joinType: "구글",
        email: "hive12@gmail.com",
        phone: "-",
      },
      {
        userStatus: "정지",
        nickname: "hive짱짱1234",
        post: "15",
        comment: "29",
        getRecommendations: "22",
        getReportCount: "14",
        gender: "남",
        joinType: "디코",
        email: "hive12@gmail.com",
        phone: "01012345678",
      },
    ];
  } else if (type === "userDetail") {
    return [
      {
        reportDate: "2025.05.02",
        reportCount: "12",
        type: "댓글",
        titleContent:
          "쵸비 개새끼쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기",
      },
      {
        reportDate: "2025.05.29",
        reportCount: "22",
        type: "게시글",
        titleContent:
          "쵸비 개새끼쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기쵸비 개새기",
      },
    ];
  }
};

export const MetaPanelData = {
  inquiry: [
    { name: "처리상태", value: "답변대기", style: "text-warning" },
    { name: "작성날짜", value: "2025.05.05 / 18:24:32 (IP 106.101.44.321)" },
    { name: "문의유형", value: "일반문의" },
    { name: "회원 여부", value: "비회원" },
    { name: "닉네임", value: "-" },
    { name: "이메일", value: "hive12@gmail.com" },
    {
      name: "내용",
      value:
        "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
    },
  ],
  suggestions: [
    {
      name: "닉네임",
      value: "하이브짱짱",
    },
    {
      name: "작성날짜",
      value: "2025.05.05/18:24:32 (IP 106.101.44.321)",
    },
    {
      name: "제목",
      value: "개선요청 제목개선요청 제목개선요청 제목개선요청 제목",
    },
    {
      name: "내용",
      value:
        "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
    },
  ],
  content: [
    {
      name: "처리상태",
      value: "노출",
    },
    {
      name: "신고여부",
      value: "신고",
    },
    {
      name: "신고수",
      value: "12",
    },
    {
      name: "추천수",
      value: "12",
    },
    {
      name: "작성날짜",
      value: "2025.05.05/18:24:32 (IP 106.101.44.321)",
    },
    {
      name: "회원상태",
      value: "정상",
    },
    {
      name: "작성자",
      value: "hive짱짱12",
    },
    {
      name: "첨부링크",
      value: "https://www.vaver.com/23423432",
    },
    {
      name: "제목",
      value: "게시글제목게시글제목게시글제목게시글제목",
    },
    {
      name: "내용",
      value: "내용내용내용내용내용내용",
    },
    {
      name: "투표",
      value: "-",
    },
  ],
};

export const NotificationListData = {
  report: [
    {
      id: "1",
      type: "게시물",
      status: "노출",
      date: "2시간전",
      content: "신고된 게시글 내용 호날두 미친신고된 게시글 내용 호날두 미친신고된 내용 호날두 미친",
      writer: "토트넘 좋아",
      isRead: false,
    },
    {
      id: "3",
      type: "게시물",
      status: "노출",
      date: "2시간전",
      content: "신고된 게시글 내용 호날두 미친신고된 게시글 내용 호날두 미친신고된 내용 호날두 미친",
      writer: "토트넘 좋아",
      isRead: false,
    },
    {
      id: "2",
      type: "댓글",
      status: "노출",
      date: "2시간전",
      content: "페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네",
      writer: "내닉네임은페이커",
      isRead: true,
    },    
    {
      id: "4",
      type: "댓글",
      status: "노출",
      date: "2시간전",
      content: "페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네",
      writer: "내닉네임은페이커",
      isRead: true,
    },    {
      id: "5",
      type: "게시물",
      status: "노출",
      date: "2시간전",
      content: "신고된 게시글 내용 호날두 미친신고된 게시글 내용 호날두 미친신고된 내용 호날두 미친",
      writer: "토트넘 좋아",
      isRead: false,
    },
    {
      id: "6",
      type: "댓글",
      status: "노출",
      date: "2시간전",
      content: "페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네",
      writer: "내닉네임은페이커",
      isRead: true,
    },    {
      id: "7",
      type: "게시물",
      status: "노출",
      date: "2시간전",
      content: "신고된 게시글 내용 호날두 미친신고된 게시글 내용 호날두 미친신고된 내용 호날두 미친",
      writer: "토트넘 좋아",
      isRead: false,
    },
    {
      id: "8",
      type: "댓글",
      status: "노출",
      date: "2시간전",
      content: "페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네페이커 또라이네",
      writer: "내닉네임은페이커",
      isRead: true,
    },
  ],
  inquiry: [
    {
      id: "1",
      type: "문의",
      status: "답변대기",
      date: "2시간전",
      content: "문의내용 로그인이안되요문의내용 로그인이안되요",
      writer: "토트넘 좋아",
      isRead: false,
    },
    {
      id: "2",
      type: "문의",
      status: "답변완료",
      date: "3시간전",
      content: "문의내용 로그인이안되요문의내용 로그인이안되요",
      writer: "hive234@naver.com",
      isRead: false,
    },
    {
      id: "3",
      type: "문의",
      status: "답변대기",
      date: "2시간전",
      content: "문의내용 로그인이안되요문의내용 로그인이안되요",
      writer: "토트넘 좋아",
      isRead: true,
    },
    {
      id: "4",
      type: "문의",
      status: "답변완료",
      date: "3시간전",
      content: "문의내용 로그인이안되요문의내용 로그인이안되요",
      writer: "hive234@naver.com",
      isRead: true,
    }
  ],
  suggestion: [
    {
      id: "1",
      type: "개선요청",
      status: "개선완료",
      date: "2시간전",
      content: "요청사항이 있어요",
      writer: "하이브원투쓰리",
      isRead: false,
    },
    {
      id: "2",
      type: "개선요청",
      status: "개선완료",
      date: "3시간전",
      content: "요청사항이 있어요",
      writer: "토트넘 좋아",
      isRead: true,
    }
  ],
};
