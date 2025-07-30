import { FeedbackInfoType } from "../../../_types/FeedbackInfoType";

export const InfoItems = (feedbackInfoData: FeedbackInfoType) => [
  { label: "조회수", value: feedbackInfoData?.viewCount },
  { label: "댓글", value: feedbackInfoData?.commentCount },
  { label: "추천", value: feedbackInfoData?.recommendCount },
];
