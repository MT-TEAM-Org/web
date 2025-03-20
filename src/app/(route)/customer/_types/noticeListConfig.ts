export interface noticeListConfig {
  page: number;
  size: number;
  searchType: "" | "TITLE" | "CONTENT" | "TITLE_CONTENT" | "NICKNAME" | "COMMENT";
  search: string;
}