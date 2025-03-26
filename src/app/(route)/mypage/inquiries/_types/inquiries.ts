export interface InquiriesListConfig {
  page: number;
  size: number;
  orderType: "" | "ANSWERED";
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

export interface ParentsComment {
  commentId: number;
  createdIp: string;
  publicId: string;
  nickname: string;
  commenterImg: string | null;
  imageUrl: string | null;
  comment: string;
  recommendCount: number;
  mentionedPublicId: string;
  mentionedNickname: string;
  createDate: string;
  lastModifiedDate: string;
  replyList: ParentsComment[];
  recommended: boolean;
}
