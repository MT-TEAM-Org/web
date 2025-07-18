// 공통 타입
interface BaseTableRow {
  status: string;
  content: string;
  date: string;
}

export interface InquiryTableRow extends BaseTableRow {
  member: string;
  email: string;
}

export interface SuggestionsTableRow extends BaseTableRow {
  importance: string;
  recommendations: string;
  nickname: string;
  title: string;
}

export interface NoticeTableRow extends BaseTableRow {
  writer: string;
  title: string;
}

export interface ContentTableRow extends Omit<BaseTableRow, 'content'> {
  isReport: string;
  reportCount: string;
  userStatus: string;
  writer: string;
  type: string;
  titleContent: string;
}

export interface DetailContentTableRow {
  reportUser: string;
  reportType: string;
  reason: string;
  reportDate: string;
}

export interface UserTableRow {
  userStatus: string;
  nickname: string;
  post: string;
  comment: string;
  getRecommendations: string;
  getReportCount: string;
  gender: string;
  joinType: string;
  email: string;
  phone: string;
}

// 테이블 아이템 타입
export type rowDataType = {
  row:
    | InquiryTableRow
    | SuggestionsTableRow
    | NoticeTableRow
    | ContentTableRow
    | DetailContentTableRow
    | UserTableRow;
  type: "inquiry" | "suggestions" | "notice" | "content" | "detailContent" | "user";
};

export type tableMeta = {
  idx: number;
  isList: boolean;
};