import { DropdownOption } from "../_types/toolbarType";
import { ListConfig } from "../_types/toolbarType";

export const MODE_OBJECT = {
  posts: {
    title: "내가 쓴 게시물",
    button: "최신순",
  },
  comments: {
    title: "내가 쓴 댓글",
    button: "최신순",
  },
  inquries: {
    title: "나의 문의내역",
    button: "최신순",
  },
};

export const POST_SEARCH_OPTIONS: DropdownOption[] = [
  {
    label: "제목+내용",
    value: "TITLE_CONTENT" as ListConfig["searchType"],
  },
  { label: "제목", value: "TITLE" as ListConfig["searchType"] },
  { label: "내용", value: "CONTENT" as ListConfig["searchType"] },
  { label: "댓글", value: "COMMENT" as ListConfig["searchType"] },
];

export const INQURIES_SEARCH_OPTIONS: DropdownOption[] = [
  { label: "내용", value: "CONTENT" },
  { label: "댓글", value: "COMMENT" },
];
