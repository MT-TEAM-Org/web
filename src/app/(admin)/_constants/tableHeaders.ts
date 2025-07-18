// 공통 헤더
const getCommonHeaders = (isList: boolean) => ({
  status: {
    key: "status",
    label: "처리 상태",
    className: "w-[100px]",
    sortValueList: ["view", "pause", "hide"],
    sortKorean: ["처리 상태 노출, 보류, 숨김 순", "처리 상태 보류, 숨김, 노출 순", "처리 상태 숨김, 노출, 보류 순"]
  },
  nickname: {
    key: "nickname",
    label: "닉네임",
    className: "w-[160px]",
    sortValueList: ["abc", "desc"],
    sortKorean: ["닉네임 가나다순, ABCD 순", "닉네임 가나다 역순, ABCD 역순"]
  },
  content: {
    key: "content",
    label: "내용",
    className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
    sortValueList: ["abc", "desc"],
    sortKorean: ["내용 가나다순, ABCD 순", "내용 가나다 역순, ABCD 역순"]
  },
  date: {
    key: "date",
    label: "작성날짜",
    className: "w-[160px]",
    sortValueList: ["new", "old"],
    sortKorean: ["작성날짜 최신순, 오래된순", "작성날짜 오래된순, 최신순"]
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
      sortKorean: ["중요도 높음, 중간, 낮음 순", "중요도 중간, 낮음, 높음 순", "중요도 낮음, 높음, 중간 순"]
    },
    recommendations: {
      key: "recommendations",
      label: "추천수",
      className: "w-[100px]",
      sortValueList: ["many", "less"],
      sortKorean: ["추천수 많은 순", "추천수 적은 순"]
    },
    title: {
      key: "title",
      label: "제목",
      className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
      sortValueList: ["abc", "desc"],
      sortKorean: ["제목 가나다순, ABCD 순", "제목 가나다 역순, ABCD 역순"]
    },
  },
  // 문의 관리
  inquiry: {
    member: {
      key: "member",
      label: "회원 여부",
      className: "w-[160px]",
      sortValueList: ["member", "nonMember"],
      sortKorean: ["회원 여부 회원, 비회원 순", "회원 여부 비회원, 회원 순"]
    },
    email: {
      key: "email",
      label: "닉네임/이메일",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
      sortKorean: ["닉네임/이메일 가나다순, ABCD 순", "닉네임/이메일 가나다 역순, ABCD 역순"]
    },
  },
  // 공지 관리
  notice: {
    writer: {
      key: "writer",
      label: "작성자",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
      sortKorean: ["작성자 가나다순, ABCD 순", "작성자 가나다 역순, ABCD 역순"]
    },
    title: {
      key: "title",
      label: "제목",
      className: "truncate flex-1",
      sortValueList: ["abc", "desc"],
      sortKorean: ["제목 가나다순, ABCD 순", "제목 가나다 역순, ABCD 역순"]
    },
    content: {
      key: "content",
      label: "내용",
      className: "truncate flex-1",
      sortValueList: ["abc", "desc"],
      sortKorean: ["내용 가나다순, ABCD 순", "내용 가나다 역순, ABCD 역순"]
    },
  },
  // 게시글/댓글 관리
  content: {
    isReport: {
      key: "isReport",
      label: "신고 여부",
      className: "w-[100px]",
      sortValueList: ["report", "notReport"],
      sortKorean: ["신고 여부 신고, 미신고 순", "신고 여부 미신고, 신고 순"]
    },
    reportCount: {
      key: "reportCount",
      label: "신고수",
      className: "w-[100px]",
      sortValueList: ["many", "less"],
      sortKorean: ["신고수 많은 순", "신고수 적은 순"]
    },
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "w-[100px]",
      sortValueList: ["normal", "banned", "warning"],
      sortKorean: ["회원상태 정상, 경고, 정지 순", "회원상태 경고, 정지, 정상 순", "회원상태 정지, 정상, 경고 순"]
    },
    writer: {
      key: "writer",
      label: "작성자",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
      sortKorean: ["작성자 가나다순, ABCD 순", "작성자 가나다 역순, ABCD 역순"]
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
      sortValueList: ["post", "comment", "chat"],
      sortKorean: ["유형 게시글, 댓글, 채팅 순", "유형 댓글, 채팅, 게시글 순", "유형 채팅, 게시글, 댓글 순"]
    },
    titleContent: {
      key: "titleContent",
      label: "제목/내용",
      className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
      sortValueList: ["abc", "desc"],
      sortKorean: ["제목/내용 가나다순, ABCD 순", "제목/내용 가나다 역순, ABCD 역순"]
    },
  },
  // 게시글 상세
  detailContent: {
    reportUser: {
      key: "reportUser",
      label: "신고자",
      className: "w-[160px]",
      sortValueList: ["abc", "desc"],
      sortKorean: ["신고자 가나다순, ABCD 순", "신고자 가나다 역순, ABCD 역순"]
    },
    reportType: {
      key: "reportType",
      label: "신고 유형",
      className: "w-[100px]",
      sortValueList: ["abuse", "explicit", "politics", "promotion", "other"],
      sortKorean: ["신고 유형 상습비방, 음란, 정치, 홍보, 기타 순", "신고 유형 음란, 상습비방, 정치, 홍보, 기타 순", "신고 유형 정치, 음란, 상습비방, 홍보, 기타 순", "신고 유형 홍보, 정치, 음란, 상습비방, 기타 순", "신고 유형 기타, 홍보, 정치, 음란, 상습비방 순"]
    },
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "w-[100px]",
      sortValueList: ["normal", "banned", "warning"],
      sortKorean: ["회원상태 정상, 정지, 경고 순", "회원상태 정지, 경고, 정상 순", "회원상태 경고, 정상, 정지 순"]
    },
    reason: {
      key: "reason",
      label: "사유",
      className: "flex-1 truncate",
      sortValueList: ["abc", "desc"],
      sortKorean: ["사유 가나다순, ABCD 순", "사유 가나다 역순, ABCD 역순"]
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
      sortValueList: ["post", "comment", "chat"],
      sortKorean: ["유형 게시글, 댓글, 채팅 순", "유형 댓글, 게시글, 채팅 순", "유형 채팅, 게시글, 댓글 순"]
    },
    reportDate: {
      key: "reportDate",
      label: "신고날짜",
      className: "w-[200px]",
      sortValueList: ["new", "old"],
      sortKorean: ["신고날짜 최신순, 오래된순", "신고날짜 오래된순, 최신순"]
    },
  },
  // 회원 관리
  user: {
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "flex-1 truncate",
      sortValueList: ["waiting", "completed", "success"],
      sortKorean: ["회원상태 정상, 경고, 정지 순", "회원상태 경고, 정지, 정상 순", "회원상태 정지, 정상, 경고 순"]
    },
    post: {
      key: "post",
      label: "게시글",
      className: "flex-1 truncate",
      sortValueList: ["asc", "desc"],
      sortKorean: ["게시글 많은 순", "게시글 적은 순"]
    },
    comment: {
      key: "comment",
      label: "댓글",
      className: "flex-1 truncate",
      sortValueList: ["many", "less"],
      sortKorean: ["댓글 많은 순", "댓글 적은 순"]
    },
    getRecommendations: {
      key: "getRecommendations",
      label: "받은 추천수",
      className: "flex-1 truncate",
      sortValueList: ["many", "less"],
      sortKorean: ["추천 많은 순", "추천 적은 순"]
    },
    getReportCount: {
      key: "getReportCount",
      label: "받은 신고수",
      className: "flex-1 truncate",
      sortValueList: ["many", "less"],
      sortKorean: ["받은 신고 많은 순", "받은 신고 적은 순"]
    },
    gender: {
      key: "gender",
      label: "성별",
      className: "flex-1 truncate",
      sortValueList: ["male", "female", "unknown"],
      sortKorean: ["성별 남자, 여자 순", "성별 여자, 남자 순"]
    },
    joinType: {
      key: "joinType",
      label: "가입유형",
      className: "flex-1 truncate",
      sortValueList: ["google", "discord", "normal"],
      sortKorean: ["가입유형 구글, 디코, 일반 순", "가입유형 디코, 일반, 구글 순", "가입유형 일반, 구글, 디코 순"]
    },
    email: {
      key: "email",
      label: "이메일",
      className: "flex-1 truncate",
      sortValueList: ["asc", "desc"],
      sortKorean: ["이메일 ABCD 순", "이메일 ABCD 역순"]
    },
    phone: {
      key: "phone",
      label: "휴대폰번호",
      className: "flex-1 truncate",
      sortValueList: ["filled", "empty"],
      sortKorean: ["휴대폰번호 010-1... 순", "휴대폰번호 010-9... 순"]
    },
  },
  // 회원 관리 상세
  userDetail: {
    reportDate: {
      key: "reportDate",
      label: "신고날짜",
      className: "w-[160px]",
      sortValueList: ["old"],
      sortKorean: ["신고날짜 오래된순"]
    },
    reportCount: {
      key: "reportCount",
      label: "신고 받은 횟수",
      className: "w-[160px]",
      sortValueList: ["many", "less"],
      sortKorean: ["받은 신고수 많은 순", "받은 신고수 적은 순"]
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
      sortValueList: ["post", "comment", "chat"],
      sortKorean: ["유형 게시글, 댓글, 채팅 순", "유형 댓글, 채팅, 게시글 순", "유형 채팅, 게시글, 댓글 순"]
    },
    titleContent: {
      key: "titleContent",
      label: "제목/내용",
      className: "flex-1 truncate",
      sortValueList: ["abc", "desc"],
      sortKorean: ["제목/내용 가나다순, ABCD 순", "제목/내용 가나다 역순, ABCD 역순"]
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