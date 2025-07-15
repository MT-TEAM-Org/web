type NoticeFormField = {
  label: string;
  type: "writer" | "input";
};

export const noticeFormFields: NoticeFormField[] = [
  { label: "작성자", type: "writer" },
  { label: "제목", type: "input" },
  { label: "첨부링크", type: "input" },
];