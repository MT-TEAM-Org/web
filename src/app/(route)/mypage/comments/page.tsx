import { Suspense } from "react";
import MyPageCommentList from "./_components/MyPageCommentList";
import { cn } from "@/utils";

const Comment = () => {
  return (
    <Suspense fallback={""}>
      <div className={cn("pc:min-h-[450px] rounded-[5px]", "tablet:mb-[40px]")}>
        <MyPageCommentList />
      </div>
    </Suspense>
  );
};

export default Comment;
