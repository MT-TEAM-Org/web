import { cn } from "@/utils";
import MyPagePostList from "./_components/MyPagePostList";
import { Suspense } from "react";

const Posts = () => {
  return (
    <Suspense fallback={""}>
      <div
        className={cn(
          "pc:min-h-[450px] bg-gray1 rounded-[5px]",
          "tablet:mb-[40px]",
          "mobile:bg-white"
        )}
      >
        <MyPagePostList />
      </div>
    </Suspense>
  );
};

export default Posts;
