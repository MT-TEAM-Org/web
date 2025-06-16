import { NewsItemType } from "@/app/(route)/news/_types/newsItemType";

export interface NewsDataProps {
  page?: string;
  size?: number;
  timePeriod?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  category?: "BASEBALL" | "FOOTBALL" | "ESPORTS" | "";
  orderType?: "DATE" | "COMMENT" | "VIEW";
  content?: string;
  withPageInfo?: boolean;
  startIndex?: number;
}

export interface NewsListWithPageInfo {
  content: NewsItemType[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElements: number;
    startIndex?: number;
  };
}