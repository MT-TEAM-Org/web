export interface CommentItem {
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
  replyList: CommentItem[];
  recommended: boolean;
}

export interface CommentResponse {
  total: number;
  content: CommentItem[];
}

export type CommentType =
  | "BOARD"
  | "IMPROVEMENT"
  | "INQUIRY"
  | "NEWS"
  | "NOTICE";

export interface PostCommentData {
  type: CommentType;
  comment: string;
  imageUrl: string;
  mentionedPublicId: string;
  parentId: number;
  id?: string;
}
