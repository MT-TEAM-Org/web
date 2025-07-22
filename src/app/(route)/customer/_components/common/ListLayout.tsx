import React from "react";
import { cn } from "@/utils";
import { FeedbackContentType } from "../../_types/FeedbackItemType";
import { NoticeContentType } from "../../_types/NoticeItemType";

interface ListLayoutProps {
  children: React.ReactNode;
  data: FeedbackContentType[] | NoticeContentType[];
}

const ListLayout = ({ children, data }: ListLayoutProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[720px] min-h-[120px] rounded-[5px] mx-auto",
        "tablet:max-w-full",
        "mobile:max-w-[768px]",
        !data ? "bg-transparent" : "bg-white"
      )}
    >
      {children}
    </div>
  );
};

export default ListLayout;
