export interface PostListConfig {
  page: number;
  size: number;
  orderType: "CREATE" | "RECOMMEND" | "COMMENT";
  searchType: "TITLE" | "CONTENT" | "TITLE_CONTENT" | "COMMENT";
  search: string;
}

export interface PostListData {
  content: {
    id: number;
    boardType: string;
    categoryType: string;
    title: string;
    createdIp: string;
    thumbnail: string;
    publicId: string;
    nickname: string;
    commentCount: number;
    createDate: string;
    lastModifiedDate: string;
  }[];
  pageInfo: {
    currentPage: number;
    totalPage: number;
    totalElement: number;
  };
}
