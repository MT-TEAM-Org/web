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
}

export interface NoticePageInfoType {
  currentPage: number;
  totalPage: number;
  totalElement: number;
}

export interface NoticeItemType {
  content: NoticeContentType;
  PageInfo: NoticePageInfoType;
}