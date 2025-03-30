export interface SearchListPageInfoType {
  currentPage: number;
  totalElement: number;
  totalPage: number;
}

export interface boardCommentSearchList {
  newsCommentId: number,
  comment: string,
  imageUrl: string,
}

export interface SearchListType {
  boardType: string,
  categoryType: string,
  commentCount: number,
  createdAt: string,
  createdIp: string,
  id: number,
  isHot: boolean,
  nickname: string,
  publicId: string,
  recommendCount: number,
  thumbnail: string,
  title: string,
  updatedAt: string,
  searchCommentSearchDto?: boardCommentSearchList
}