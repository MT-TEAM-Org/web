export const subCategories = {
  free: "자유",
  question: "질문",
  issue: "이슈",
  record: "전적인증",
  tips: "플레이팁",
  feedback: "개선요청",
};

export interface CommunityData {
  boardType: string;
  categoryType: string;
  title: string;
  content: string;
  link: string;
  thumnail: string;
}
