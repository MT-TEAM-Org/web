import Image from "next/image";
import Link from "next/link";
import { CalculateTime } from "@/app/_components/CalculateTime";

interface MyPagePostItemProps {
  data: {
    id: number;
    boardType: string;
    categoryType: string;
    title: string;
    createdIp: string;
    thumbnail: string;
    publicId: string;
    nickname: string;
    commentCount: number;
    createdAt: string;
    lastModifiedDate: string;
  };
}

const MyPagePostItem = ({ data }: MyPagePostItemProps) => {
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

  return (
    <Link
      href={`/board/${data.boardType}/${data.categoryType}/${data.id}`}
      className="flex items-center w-[720px] min-h-[66px] gap-[12px] border-b p-[12px]"
    >
      <div className="flex items-center justify-center w-[32px] h-[32px] rounded-[2px] p-2 bg-gray1 font-[700]">
        <span>{data.id}</span>
      </div>
      <Image
        src={data?.thumbnail || "/Preview_loading_image.png"}
        alt="post-preview-image"
        width={56}
        height={42}
        className="w-[56px] h-[42px] rounded-[5px] object-cover"
        blurDataURL="/Preview_loading_image.png"
      />
      <div className="flex flex-col justify-center flex-1 gap-y-[4px]">
        <div className="w-[584px] flex items-center gap-[2px]">
          <h2 className="text-[14px] leading-[20px] text-gray7 overflow-hidden whitespace-nowrap text-ellipsis">
            {data?.title}
          </h2>
          <p className="text-Primary font-medium text-[12px] leading-[18px]">
            [{data?.commentCount}]
          </p>
          <span className="font-black text-[10px] leading-[18px] text-primary">
            N
          </span>
          <span className="font-black text-[10px] leading-[18px] text-[#DC2800]">
            H
          </span>
        </div>
        <div className="flex font-semibold gap-1 items-center">
          <p className="text-[12px] leading-[18px] text-gray5">
            {getKoreanBoardType(data?.boardType)}
          </p>
          <span className="font-medium text-[12px] leading-[18px] text-gray5">
            {getKoreanCategoryType(data?.categoryType)}
          </span>
          <span className="font-medium text-[12px] leading-[18px] text-gray5">
            {CalculateTime(data?.createdAt)}
          </span>
          <span className="font-medium text-[12px] leading-[18px] text-gray5">
            {data?.nickname}
          </span>
          <span className="font-medium text-[12px] leading-[18px] text-gray5">
            IP {data?.createdIp}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MyPagePostItem;
