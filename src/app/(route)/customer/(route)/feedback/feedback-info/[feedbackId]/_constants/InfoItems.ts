export const InfoItems = (feedbackInfoData: any) => [  // TODO: 타입 변경
  { label: "조회수", value: feedbackInfoData?.viewCount },
  { label: "댓글", value: feedbackInfoData?.commentCount },
  { label: "추천", value: feedbackInfoData?.recommendCount },
];
