export interface CommentSearchList {
  commentId: number;
  comment: string;
  imageUrl: string;
}

export interface NoticeContentType {
  id: number;
  title: string;
  thumbnail: string;
  publicId: string;
  nickname: string;
  commentCount: number;
  recommendCount: number;
  createdAt: string;
  updatedAt: string;
  isHot?: string;
  commentSearchList: CommentSearchList;
}

export interface NoticePageInfoType {
  currentPage: number;
  totalPage: number;
  totalElement: number;
}

export interface NoticeItemType {
  content: NoticeContentType[];
  PageInfo: NoticePageInfoType;
}