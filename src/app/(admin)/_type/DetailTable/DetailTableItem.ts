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
  
// 테이블 아이템 타입
export type rowDataType = {
  row:
    | InquiryTableRow
    | SuggestionsTableRow
    | NoticeTableRow
    | ContentTableRow
    | DetailContentTableRow;
  type: "inquiry" | "suggestions" | "notice" | "content" | "detailContent";
};

export type tableMeta = {
  idx: number;
  isList: boolean;
};