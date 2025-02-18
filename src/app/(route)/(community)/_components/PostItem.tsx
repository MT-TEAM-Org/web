"use client";

import useGetBoardData from "@/_hooks/getBoardData";
import Image from "next/image";
import { usePathname } from "next/navigation";

const PostItem = () => {
  const pathName = usePathname();
  const boardType = pathName?.split("/")[1];
  const categoryType = pathName?.split("/")[2];
  const { data: boardData } = useGetBoardData({
    boardType: boardType?.toUpperCase(),
    categoryType: categoryType,
  });

  const boardTypeMap: { [key: string]: string } = {
    FOOTBALL: "축구",
    BASEBALL: "야구",
    ESPORTS: "E스포츠",
  };

  const categoryTypeMap: { [key: string]: string } = {
    FREE: "자유",
    QUESTION: "질문",
    ISSUE: "이슈",
    VERIFICATION: "리뷰",
    TIP: "플레이 팁",
  };

  const getKoreanBoardType = (type: string) => {
    return boardTypeMap[type] || type;
  };

  const getKoreanCategoryType = (type: string) => {
    return categoryTypeMap[type] || type;
  };

  const maskIP = (ip: string) => {
    if (!ip) return "";

    const parts = ip.split(".");
    if (parts.length !== 4) return ip;

    return `${parts[0]}.${parts[1]}.**.**`;
  };
  return (
    <div className="flex flex-col items-center w-full]">
      {boardData?.map((data: any, index: number) => (
        <div
          key={`${data.id}-${index}`}
          className="flex items-center w-[720px] min-h-[66px] gap-[12px] border-b p-[12px]"
        >
          <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1">
            <span>{data.id}</span>
          </div>
          <Image
            src="/PostItem_fake.png"
            alt="post-preview-image"
            width={56}
            height={42}
            className="w-[56px] h-[42px] rounded-[5px] object-cover"
            blurDataURL="/Preview_loading_image.png"
          />
          <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
            <div className="flex items-center gap-[2px]">
              <h2 className="text-[14px] leading-[20px] text-gray7 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {data?.title}
              </h2>
              <p className="text-Primary font-medium text-[12px] leading-[18px]">
                [{data?.commentCount}]
              </p>
            </div>
            <div className="flex font-semibold gap-1 items-center">
              <p className="text-[12px] leading-[18px] text-gray5">
                {getKoreanBoardType(data?.boardType)}
              </p>
              <span className="font-medium text-[12px] leading-[18px] text-gray5">
                {getKoreanCategoryType(data?.categoryType)}
              </span>
              <span className="font-medium text-[12px] leading-[18px] text-gray5">
                1분 전
              </span>
              <span className="font-medium text-[12px] leading-[18px] text-gray5">
                {data?.nickname}
              </span>
              <span className="font-medium text-[12px] leading-[18px] text-gray5">
                IP {maskIP(data?.createdIp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostItem;
