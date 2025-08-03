export type BarChartFilter = {
  name: string;
  value: string;
};

export const BarChartConfig: BarChartFilter[] = [
  { name: "전체", value: "all" },
  { name: "신고", value: "report" },
  { name: "방문자", value: "visitor" },
  { name: "가입자", value: "subscriber" },
  { name: "탈퇴자", value: "withdrawn" },
  { name: "게시물", value: "post" },
  { name: "댓글", value: "comment" },
];
