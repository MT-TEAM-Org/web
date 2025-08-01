export interface CommentSearchList {
  commentId: number;
  comment: string;
  imageUrl: string;
}

export interface FeedbackContentType {
  id: number;
  title: string;
  createdIp: string;
  thumbnail: string;
  status: string;
  publicId: string;
  nickname: string;
  commentCount: number;
  recommendCount: number;
  createdAt: string;
  updatedAt: string;
  isHot?: string;
  improvementCommentSearchList: CommentSearchList;
}

export interface FeedbackPageInfoType {
  currentPage: number;
  totalPage: number;
  totalElement: number;
}

export interface FeedbackItemType {
  content: FeedbackContentType[];
  pageInfo: FeedbackPageInfoType;
}