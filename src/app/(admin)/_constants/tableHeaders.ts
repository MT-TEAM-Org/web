// 공통 헤더
const getCommonHeaders = (isList: boolean) => ({
  status: {
    key: "status",
    label: "처리 상태",
    className: "w-[100px]",
  },
  nickname: {
    key: "nickname",
    label: "닉네임",
    className: "w-[160px]",
  },
  content: {
    key: "content",
    label: "내용",
    className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
  },
  date: {
    key: "date",
    label: "작성날짜",
    className: "w-[160px]",
  },
});

// 타입별 헤더
const getTypeSpecificHeaders = (isList: boolean) => ({
  suggestions: {
    importance: {
      key: "importance",
      label: "중요도",
      className: "w-[100px]",
    },
    recommendations: {
      key: "recommendations",
      label: "추천수",
      className: "w-[100px]",
    },
    title: {
      key: "title",
      label: "제목",
      className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
    },
  },
  inquiry: {
    member: {
      key: "member",
      label: "회원 여부",
      className: "w-[160px]",
    },
    email: {
      key: "email",
      label: "닉네임/이메일",
      className: "w-[160px]",
    },
  },
  notice: {
    writer: {
      key: "writer",
      label: "작성자",
      className: "w-[160px]",
    },
    title: {
      key: "title",
      label: "제목",
      className: "truncate flex-1",
    },
    content: {
      key: "content",
      label: "내용",
      className: "truncate flex-1",
    },
  },
  content: {
    isReport: {
      key: "isReport",
      label: "신고 여부",
      className: "w-[100px]",
    },
    reportCount: {
      key: "reportCount",
      label: "신고수",
      className: "w-[100px]",
    },
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "w-[100px]",
    },
    writer: {
      key: "writer",
      label: "작성자",
      className: "w-[160px]",
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
    },
    titleContent: {
      key: "titleContent",
      label: "제목/내용",
      className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
    },
  },
  detailContent: {
    reportUser: {
      key: "reportUser",
      label: "신고자",
      className: "w-[160px]",
    },
    reportType: {
      key: "reportType",
      label: "신고 유형",
      className: "w-[100px]",
    },
    userStatus: {
      key: "userStatus",
      label: "회원상태",
      className: "w-[100px]",
    },
    reason: {
      key: "reason",
      label: "사유",
      className: "flex-1 truncate",
    },
    type: {
      key: "type",
      label: "유형",
      className: "w-[100px]",
    },
    reportDate: {
      key: "reportDate",
      label: "신고날짜",
      className: "w-[200px]",
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
  }
};