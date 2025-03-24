export interface newsListConfig {
  page: number;
  size: number;
  category: "" | "BASEBALL" | "FOOTBALL" | "ESPORTS";
  orderType: "DATE" | "VIEW" | "COMMENT";
  searchType: "" | "TITLE" | "CONTENT" | "TITLE_CONTENT" | "NICKNAME" | "COMMENT";
  content: string;
  timePeriod: "DAILY" | "WEEKLY" | "MONTHLY";
}