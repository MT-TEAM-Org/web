const boardTypeMap: { [key: string]: string } = {
  FOOTBALL: "축구",
  BASEBALL: "야구",
  ESPORTS: "E스포츠",
};

const categoryTypeMap: { [key: string]: string } = {
  FREE: "자유",
  QUESTION: "질문",
  ISSUE: "이슈",
  VERIFICATION: "리뷰",
  TIP: "플레이 팁",
};

export const getKoreanBoardType = (type: string) => {
  return boardTypeMap[type] || type;
};

export const getKoreanCategoryType = (type: string) => {
  return categoryTypeMap[type] || type;
};
