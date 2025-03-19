import MyPagePostList from "./_components/MyPagePostList";
import { Suspense } from "react";

const Posts = () => {
  return (
    <Suspense fallback={""}>
      <div className="max-w-[720px] min-h-[450px] bg-gray1 rounded-[5px]">
        <MyPagePostList />
      </div>
    </Suspense>
  );
};

export default Posts;
