export interface newsListConfig {
  page: number;
  size: number;
  category: "" | "BASEBALL" | "FOOTBALL" | "ESPORTS";
  orderType: "RECOMMEND" | "CREATE" | "COMMENT";
  searchType: "" | "TITLE" | "CONTENT" | "TITLE_CONTENT" | "NICKNAME" | "COMMENT";
  search: string;
  timePeriod: "DAILY" | "WEEKLY" | "MONTHLY";
}