interface MemberDto {
  publicId: string;
  nickName: string;
}

export interface CommentContent {
  newsCommentId: number;
  newsId: number;
  memberDto: MemberDto;
  imgUrl: string;
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

export type NewsCommentList = CommentContent[];