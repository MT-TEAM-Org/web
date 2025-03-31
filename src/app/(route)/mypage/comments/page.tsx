import { Suspense } from "react";
import MyPageCommentList from "./_components/MyPageCommentList";

const Comment = () => {
  return (
    <Suspense fallback={""}>
      <div className="max-w-[720px] min-h-[450px] bg-gray1 rounded-[5px]">
        <MyPageCommentList />
      </div>
    </Suspense>
  );
};

export default Comment;
