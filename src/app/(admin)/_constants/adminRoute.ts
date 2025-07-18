import { IconList } from "@/app/_components/IconComponents/constants";

export const ADMIN_ROUTE: {
  id: string;
  name: string;
  link: string;
  icon: IconList;
}[] = [
  { id: "dashBoard", name: "대시보드", link: "/dashBoard", icon: "HOME" },
  { id: "users", name: "회원 관리", link: "/dashBoard/users", icon: "MY" },
  {
    id: "posts",
    name: "게시글/댓글 관리",
    link: "/dashBoard/content",
    icon: "CONTENT",
  },
  {
    id: "inquiries",
    name: "문의 관리",
    link: "/dashBoard/inquiries",
    icon: "MAIL",
  },
  {
    id: "suggestions",
    name: "개선요청 관리",
    link: "/dashBoard/suggestions",
    icon: "REVIEW",
  },
  {
    id: "notices",
    name: "공지 관리",
    link: "/dashBoard/notices",
    icon: "EDIT",
  },
];
