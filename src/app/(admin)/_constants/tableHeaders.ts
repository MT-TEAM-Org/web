// 공통 헤더
const getCommonHeaders = (isList: boolean) => ({
  status: {
    key: "status",
    label: "처리 상태",
    className: "w-[100px]",
    sortValueList: ["waiting", "completed", "success"]
  },
  nickname: {
    key: "nickname",
    label: "닉네임",
    className: "w-[160px]",
    sortValueList: ["abc", "desc"],
  },
  content: {
    key: "content",
    label: "내용",
    className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
    sortValueList: ["abc", "desc"],
  },
  date: {
    key: "date",
    label: "작성날짜",
    className: "w-[160px]",
    sortValueList: ["new", "old"],
  },
});

// 타입별 헤더
const getTypeSpecificHeaders = (isList: boolean) => ({
  // 개선요청 관리
  suggestions: {
    importance: {
      key: "importance",
      label: "중요도",
      className: "w-[100px]",
      sortValueList: ["high", "medium", "low"],
    },
    recommendations: {
      key: "recommendations",
      label: "추천수",
      className: "w-[100px]",
      sortValueList: ["many", "less"],
    },
    title: {
      key: "title",
      label: "제목",
      className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
      sortValueList: ["abc", "desc"],
    },
  },
  // 문의 관리
  inquiry: {
    member: {
      key: "member",
      label: "회원 여부",
      className: "w-[160px]",
      sortValueList: ["member", "nonMember"],
    },
    email: {
      key: "email",
      label: "닉네임/이메일",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
    },
  },
  // 공지 관리
  notice: {
    writer: {
      key: "writer",
      label: "작성자",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
    },
    title: {
      key: "title",
      label: "제목",
      className: "truncate flex-1",
      sortValueList: ["abc", "desc"],
    },
    content: {
      key: "content",
      label: "내용",
      className: "truncate flex-1",
      sortValueList: ["abc", "desc"],
    },
  },
  // 게시글/댓글 관리
  content: {
    isReport: {
      key: "isReport",
      label: "신고 여부",
      className: "w-[100px]",
      sortValueList: ["report", "notReport"],
    },
    reportCount: {
      key: "reportCount",
      label: "신고수",
      className: "w-[100px]",
      sortValueList: ["many", "less"],
    },
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "w-[100px]",
      sortValueList: ["normal", "banned", "warning"]
    },
    writer: {
      key: "writer",
      label: "작성자",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
      sortValueList: ["post", "comment", "chat"],
    },
    titleContent: {
      key: "titleContent",
      label: "제목/내용",
      className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
      sortValueList: ["abc", "desc"],
    },
  },
  // 게시글 상세
  detailContent: {
    reportUser: {
      key: "reportUser",
      label: "신고자",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
    },
    reportType: {
      key: "reportType",
      label: "신고 유형",
      className: "w-[100px]",
      sortValueList: ["abuse", "explicit", "politics", "promotion", "other"],
    },
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "w-[100px]",
      sortValueList: ["normal", "banned", "warning"],
    },
    reason: {
      key: "reason",
      label: "사유",
      className: "flex-1 truncate",
      sortValueList: ["abc", "desc"],
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
      sortValueList: ["post", "comment", "chat"],
    },
    reportDate: {
      key: "reportDate",
      label: "신고날짜",
      className: "w-[200px]",
      sortValueList: ["new", "old"],
    },
  },
  // 회원 관리
  user: {
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "flex-1 truncate",
      sortValueList: ["waiting", "completed", "success"]
    },
    post: {
      key: "post",
      label: "게시글",
      className: "flex-1 truncate",
      sortValueList: ["asc", "desc"],
    },
    comment: {
      key: "comment",
      label: "댓글",
      className: "flex-1 truncate",
      sortValueList: ["many", "less"],
    },
    getRecommendations: {
      key: "getRecommendations",
      label: "받은 추천수",
      className: "flex-1 truncate",
      sortValueList: ["many", "less"],
    },
    getReportCount: {
      key: "getReportCount",
      label: "받은 신고수",
      className: "flex-1 truncate",
      sortValueList: ["many", "less"],
    },
    gender: {
      key: "gender",
      label: "성별",
      className: "flex-1 truncate",
      sortValueList: ["male", "female", "unknown"],
    },
    joinType: {
      key: "joinType",
      label: "가입유형",
      className: "flex-1 truncate",
      sortValueList: ["google", "discord", "normal"],
    },
    email: {
      key: "email",
      label: "이메일",
      className: "flex-1 truncate",
      sortValueList: ["asc", "desc"],
    },
    phone: {
      key: "phone",
      label: "휴대폰번호",
      className: "flex-1 truncate",
      sortValueList: ["filled", "empty"],
    },
  },
  userDetail: {
    reportDate: {
      key: "reportDate",
      label: "신고날짜",
      className: "w-[160px]",
      sortValueList: ["old"],
    },
    reportCount: {
      key: "reportCount",
      label: "신고 받은 횟수",
      className: "w-[160px]",
      sortValueList: ["many", "less"],
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
      sortValueList: ["post", "comment", "chat"],
    },
    titleContent: {
      key: "titleContent",
      label: "제목/내용",
      className: "flex-1 truncate",
      sortValueList: ["abc", "desc"],
    },
  },
});

// 타입별 헤더 구성
export const getHeaders = (type: string, isList: boolean) => {
  const commonHeaders = getCommonHeaders(isList);
  const typeSpecificHeaders = getTypeSpecificHeaders(isList);
  if (type === "suggestions") {
    return [
      commonHeaders.status,
      typeSpecificHeaders.suggestions.importance,
      typeSpecificHeaders.suggestions.recommendations,
      commonHeaders.nickname,
      typeSpecificHeaders.suggestions.title,
      commonHeaders.content,
      commonHeaders.date,
    ];
  } else if (type === "inquiry") {
    return [
      commonHeaders.status,
      typeSpecificHeaders.inquiry.member,
      typeSpecificHeaders.inquiry.email,
      commonHeaders.content,
      commonHeaders.date,
    ];
  } else if (type === "notice") {
    return [
      commonHeaders.date,
      typeSpecificHeaders.notice.writer,
      typeSpecificHeaders.notice.title,
      typeSpecificHeaders.notice.content,
    ];
  } else if (type === "content") {
    return [
      commonHeaders.status,
      typeSpecificHeaders.content.isReport,
      typeSpecificHeaders.content.reportCount,
      typeSpecificHeaders.content.userStatus,
      commonHeaders.nickname,
      typeSpecificHeaders.content.type,
      typeSpecificHeaders.content.titleContent,
      commonHeaders.date,
    ];
  } else if (type === "detailContent") {
    return [
      typeSpecificHeaders.detailContent.reportUser,
      typeSpecificHeaders.detailContent.reportType,
      typeSpecificHeaders.detailContent.reason,
      typeSpecificHeaders.detailContent.reportDate,
    ];
  } else if (type === "user") {
    return [
      typeSpecificHeaders.user.userStatus,
      commonHeaders.nickname,
      typeSpecificHeaders.user.post,
      typeSpecificHeaders.user.comment,
      typeSpecificHeaders.user.getRecommendations,
      typeSpecificHeaders.user.getReportCount,
      typeSpecificHeaders.user.gender,
      typeSpecificHeaders.user.joinType,
      typeSpecificHeaders.user.email,
      typeSpecificHeaders.user.phone,
    ];
  } else if (type === "userDetail") {
    return [
      typeSpecificHeaders.userDetail.reportDate,
      typeSpecificHeaders.userDetail.reportCount,
      typeSpecificHeaders.userDetail.type,
      typeSpecificHeaders.userDetail.titleContent,
    ];
  }
};