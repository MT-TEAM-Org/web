export interface NoticeButtonItem {
  name: string;
  value: string;
  style: string;
}

export const onlyNoticeButtons: NoticeButtonItem[] = [
  {
    name: "전체 삭제",
    value: "deleteAll",
    style: "bg-white border border-gray3 hover:bg-gray1",
  },
  {
    name: "삭제",
    value: "delete",
    style: "bg-white border border-gray3 hover:bg-gray1",
  },
  {
    name: "공지 등록",
    value: "register",
    style: "bg-Primary text-white hover:bg-primary/80",
  },
];