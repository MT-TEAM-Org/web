import { Skeleton } from "@heroui/react";

const PostItemSkeleton = () => {
  return (
    <div className="flex flex-col items-center w-full mobile:mb-[40px] mobile:w-full mobile:max-w-[768px]">
      {Array(15)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex items-center w-full max-w-[720px] mobile:w-full mobile:max-w-[768px] min-h-[66px] gap-[12px] border-b p-[12px]"
          >
            {/* 게시글 ID 영역 */}
            <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1">
              <Skeleton className="w-4 h-4 rounded-md" />
            </div>

            {/* 썸네일 이미지 영역 */}
            <Skeleton className="w-[56px] h-[42px] rounded-[5px]" />

            {/* 제목과 메타데이터 영역 */}
            <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
              {/* 제목 영역 */}
              <div className="flex items-center gap-[2px]">
                <Skeleton className="h-[20px] w-[60%] rounded-md" />
              </div>

              {/* 메타데이터 영역 (게시판 유형, 카테고리, 시간, 닉네임, IP) */}
              <div className="flex gap-1 items-center">
                <Skeleton className="h-[18px] w-[30px] rounded-md" />{" "}
                {/* 게시판 유형 */}
                <Skeleton className="h-[18px] w-[40px] rounded-md" />{" "}
                {/* 카테고리 */}
                <Skeleton className="h-[18px] w-[40px] rounded-md" />{" "}
                {/* 시간 */}
                <Skeleton className="h-[18px] w-[60px] rounded-md" />{" "}
                {/* 닉네임 */}
                <Skeleton className="h-[18px] w-[80px] rounded-md" /> {/* IP */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostItemSkeleton;
