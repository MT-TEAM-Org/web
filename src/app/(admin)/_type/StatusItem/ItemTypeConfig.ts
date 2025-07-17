import { StatusBannerItemType } from "./ItemTypes"

const ItemTypeConfigMap: Record<StatusBannerItemType, { name: string; icon: string }[]> = {
  users: [
    { name: "가입자수", icon: "USER_JOIN_COUNT" },
    { name: "방문자수", icon: "USER_VISIT_COUNT" },
    { name: "탈퇴자수", icon: "USER_LEAVE_COUNT" },
    { name: "경고", icon: "USER_WARNING_COUNT" },
    { name: "정지", icon: "USER_STOP_COUNT" },
  ],
  content: [
    { name: "전체 게시글", icon: "CONTENT_ALL" },
    { name: "전체 댓글", icon: "CONTENT_ALL_COMMENT" },
    { name: "신고된 게시글", icon: "CONTENT_ALL" },
    { name: "숨긴 게시글", icon: "CONTENT_ALL_COMMENT" },
    { name: "숨긴 댓글", icon: "CONTENT_ALL" },
  ],
  inquiries: [
    { name: "전체 문의", icon: "CONTENT_ALL" },
    { name: "답변대기", icon: "CONTENT_ALL" },
    { name: "답변완료", icon: "CONTENT_ALL" },
    { name: "회원 문의", icon: "CONTENT_ALL" },
    { name: "비회원 문의", icon: "CONTENT_ALL" },
  ],
  suggestions: [
    { name: "개선 요청", icon: "CONTENT_ALL" },
    { name: "접수 전", icon: "CONTENT_ALL" },
    { name: "접수 완료", icon: "CONTENT_ALL" },
    { name: "개선완료", icon: "CONTENT_ALL" },
  ],
}

export const ItemTypeConfig = (type: StatusBannerItemType) => {
  return ItemTypeConfigMap[type]
}