export interface searchListConfig {
  page: number;
  size: number;
  domainType: 'NEWS' | "BOARD" | "INQUIRY" | "COMMENT" | "IMPROVEMENT" | "NOTICE" ;
  timePeriod: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ALL";
  orderType: "CREATE" | "RECOMMEND" | "COMMENT";
  searchType: "" | "TITLE" | "CONTENT" | "TITLE_CONTENT" | "NICKNAME" | "COMMENT";
  search: string;
}