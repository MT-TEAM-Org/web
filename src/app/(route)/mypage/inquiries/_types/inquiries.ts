export interface InquiriesListConfig {
  page: number;
  size: number;
  orderType: "NONE" | "ANSWERED";
  searchType: "CONTENT" | "COMMENT";
  search: string;
}

export interface InquiriesListData {
  content: {
    id: number;
    content: string;
    clientIp: string;
    createdAt: string;
    publicId: string;
    nickname: string;
    isAdminAnswered: string;
    commentCount: number;
  }[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
}
