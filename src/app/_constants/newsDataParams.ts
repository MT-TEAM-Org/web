export interface NewsDataParams {
  category?: "BASEBALL" | "FOOTBALL" | "ESPORTS";
  orderType?: "DATE" | "COMMENT" | "VIEW";
  page?: number;
  timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  searchType?: string;
}