import { Suspense } from "react";
import MyPageCommentList from "./_components/MyPageCommentList";
import { cn } from "@/utils";

const Comment = () => {
  return (
    <Suspense fallback={""}>
      <div
        className={cn(
          "max-w-[720px] min-h-[450px] rounded-[5px]",
          "mobile:w-full mobile:mx-auto"
        )}
      >
        <MyPageCommentList />
      </div>
    </Suspense>
  );
};

export default Comment;
