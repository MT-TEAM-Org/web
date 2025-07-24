export interface FeedbackInfoType {
  clientIp: string;
  commentCount: number;
  content: string;
  createdAt: string;
  imgUrl: string;
  improvementId: number;
  isRecommended: boolean;
  link: string;
  modifiedAt: string;
  nextId: number | null;
  nickname: string;
  previousId: number | null;
  publicId: string;
  recommendCount: number;
  status: "RECEIVED" | "COMPLETED";
  title: string;
  viewCount: number;
}