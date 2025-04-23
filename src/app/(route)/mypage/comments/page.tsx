import { Suspense } from "react";
import MyPageCommentList from "./_components/MyPageCommentList";
import { cn } from "@/utils";

const Comment = () => {
  return (
    <Suspense fallback={""}>
      <div className={cn("min-h-[450px] rounded-[5px]", "mobile:w-full")}>
        <MyPageCommentList />
      </div>
    </Suspense>
  );
};

export default Comment;
