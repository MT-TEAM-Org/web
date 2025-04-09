import { cn } from "@/utils";
import MyPagePostList from "./_components/MyPagePostList";
import { Suspense } from "react";

const Posts = () => {
  return (
    <Suspense fallback={""}>
      <div
        className={cn(
          "max-w-[720px] min-h-[450px] bg-gray1 rounded-[5px]",
          "mobile:bg-white mobile:w-full mobile:mx-auto"
        )}
      >
        <MyPagePostList />
      </div>
    </Suspense>
  );
};

export default Posts;
