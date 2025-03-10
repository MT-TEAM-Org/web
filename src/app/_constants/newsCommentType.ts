interface MemberDto {
  publicId: string;
  nickName: string;
}

export interface CommentContent {
  newsCommentId: number;
  newsId: number;
  memberDto: MemberDto;
  comment: string;
  ip: string;
  createTime: string;
  recommendCount: number;
  recommend: boolean;
}

export interface PageInfo {
  currentPage: number;
  totalPage: number;
  totalElement: number;
}

export interface NewsCommentData {
  list: {
    content: CommentContent[];
    pageInfo: PageInfo;
  };
}