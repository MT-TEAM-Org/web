export interface NoticeInfoItemType {
  noticeId: number;
  publicId: string;
  nickname: string;
  clientIp: string;
  title: string;
  content: string;
  imgUrl?: string;
  recommendCount: number;
  commentCount: number;
  viewCount: number;
  createdAt: string;
  modifiedAt: string;
  isRecommended: boolean;
  link: string;
  nextId: number;
  previousId: number;
}