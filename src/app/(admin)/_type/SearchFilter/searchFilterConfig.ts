export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterConfig {
  type: "radio" | "search";
  label: string;
  name: string;
  options?: FilterOption[];
  placeholder?: string;
}

export interface SearchFilterConfig {
  left: FilterConfig[];
  right: FilterConfig[];
}

export const SEARCH_FILTER_CONFIG: Record<string, SearchFilterConfig> = {
  // 일반
  default: {
    left: [
      {
        type: "radio",
        label: "회원 여부",
        name: "memberType",
        options: [
          { id: "member", label: "회원" },
          { id: "non-member", label: "비회원" },
        ],
      },
      {
        type: "radio",
        label: "처리 상태",
        name: "status",
        options: [
          { id: "waiting", label: "답변대기" },
          { id: "completed", label: "답변완료" },
        ],
      },
      {
        type: "search",
        label: "문의내용",
        name: "content",
        placeholder: "검색어를 입력해 주세요.",
      },
    ],
    right: [
      {
        type: "search",
        label: "닉네임",
        name: "nickname",
        placeholder: "닉네임을 입력해 주세요.",
      },
      {
        type: "search",
        label: "이메일",
        name: "email",
        placeholder: "이메일을 입력해 주세요.",
      },
    ],
  },
  
  // 게시글/댓글
  content: {
    left: [
      {
        type: "radio",
        label: "신고 여부",
        name: "isReport",
        options: [
          { id: "true", label: "신고" },
          { id: "false", label: "미신고" },
        ],
      },
      {
        type: "radio",
        label: "처리 상태",
        name: "status",
        options: [
          { id: "show", label: "노출" },
          { id: "waiting", label: "보류" },
          { id: "hide", label: "숨김" },
        ],
      },
      {
        type: "radio",
        label: "유형",
        name: "type",
        options: [
          { id: "board", label: "게시글" },
          { id: "comment", label: "댓글" },
          { id: "chat", label: "채팅" },
        ],
      },
    ],
    right: [
      {
        type: "radio",
        label: "검색 유형",
        name: "searchType",
        options: [
          { id: "title", label: "제목" },
          { id: "titleContent", label: "제목+내용" },
          { id: "writer", label: "작성자" },
        ],
      },
      {
        type: "search",
        label: "검색내용",
        name: "searchContent",
        placeholder: "검색어를 입력해 주세요.",
      },
    ],
  },
};