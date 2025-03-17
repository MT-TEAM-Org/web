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