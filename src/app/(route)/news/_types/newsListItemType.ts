export interface NewsCommentSearchList {
  newsCommentId: number;
  comment: string;
  imageUrl: string;
}

export interface TotalSearchNewsList {
  comment: string;
  imageUrl: string;
  commentId: number;
}

export interface NewsListType {
  id: number;
  title: string;
  category: string;
  thumbImg: string;
  postDate: string;
  content: string;
  commentCount: number;
  source?: string;
  viewCount?: number;
  recommendCount?: number;
  hot?: string;
  newsCommentSearchDto?: NewsCommentSearchList;

  recommend?: boolean;
  boardType?: string;
  categoryType?: string;
  createdAt?: string;
  createdIp?: string;
  nickname?: string;
  publicId?: string;
  thumbnail?: string;
  updatedAt?: string;
  nextId?: number;
  previousId?: number;
  commentSearchList?: TotalSearchNewsList;
}

export interface NewsListPageInfoType {
  currentPage: number;
  totalElement: number;
  totalPage: number;
}

export interface NewsListDataType {
  content: NewsListType[];
  pageInfo: NewsListPageInfoType;
}
