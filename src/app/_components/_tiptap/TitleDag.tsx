"use client";

import React, { useEffect, useState } from "react";
import Arrow_down from "../icon/Arrow_down";
import { set, UseFormRegister, UseFormWatch } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useEditStore } from "@/utils/Store";
import WriteModal from "../WriteModal";
import CustomIcon from "../IconComponents/Icon";
import { cn } from "@/utils";
import LeftSidebar from "@/app/(route)/(community)/_components/LeftSidebar";

interface TitleDagProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  selectedCategory?: string;
}

const TitleDag = ({ register }: TitleDagProps) => {
  const { isEditMode } = useEditStore();
  const [selectedCategory, setSelectedCategory] = useState("FREE");
  const [writeGuideVisible, setWriteGuideVisible] = useState(false);

  const router = useRouter();

  const pathName = usePathname();
  const boardType = pathName.split("/")[2];
  const modalId = `write-guide-global`;

  const optionValues = [
    { name: "자유", value: "FREE" },
    { name: "질문", value: "QUESTION" },
    { name: "이슈", value: "ISSUE" },
    ...(boardType === "esports"
      ? [
          { name: "전적인증", value: "VERIFICATION" },
          { name: "플레이 팁", value: "TIP" },
        ]
      : []),
    { name: "개선요청", value: "SUGGESTION" },
  ];

  useEffect(() => {
    const categoryFromPath = pathName.split("/")[3] || "FREE";
    setSelectedCategory(categoryFromPath);
  }, [pathName]);

  const writeGuidClick = () => {
    setWriteGuideVisible(true);
  };
  const handleCloseModal = () => {
    setWriteGuideVisible(false);
  };

  return (
    <div className="w-full h-full mobile:max-w-[768px]">
      {writeGuideVisible && (
        <WriteModal
          modalId={modalId}
          forceShow={true}
          onClose={handleCloseModal}
        />
      )}
      <div className="hidden tablet:flex w-full max-w-[688px] h-[52px]">
        <LeftSidebar />
      </div>
      <div
        className={cn(
          "flex justify-between items-center mx-auto max-w-[696px] min-h-[40px] pt-2",
          "mobile:flex mobile:justify-start tablet:w-full tablet:max-w-[664px] mobile:items-center mobile:w-full mobile:min-w-[360px] mobile:max-w-[688px] mobile:h-[48px] mobile:py-[10px] mobile:border-b mobile:border-gray2"
        )}
      >
        <div
          onClick={() => router.push(`/`)}
          className="hidden mobile:flex w-[48px] h-[48px] mobile:items-center mobile:justify-center"
        >
          <CustomIcon
            icon="MOBILE_ARROW_LEFT"
            className="w-[18px] h-[18px] text-white"
          />
        </div>
        <h1 className="flex max-w-[80px] min-h-[28px] font-[700] text-[18px] leading-[28px] whitespace-nowrap mobile:w-full mobile:max-w-[664px] mobile:h-[40px] mobile:flex mobile:items-center">
          {isEditMode ? "게시글 수정" : "게시글 작성"}
        </h1>
        <button
          onClick={writeGuidClick}
          type="button"
          className="max-w-[121px] min-h-[40px] rounded-[5px] border border-gray3 py-[13px] px-[16px] font-[700] text-[14px] leading-[14px] whitespace-nowrap bg-gray1 mobile:hidden"
        >
          글쓰기 유의사항
        </button>
      </div>
      <div
        className={cn(
          "hidden mobile:flex gap-2 w-full max-w-[768px] px-[12px] mt-[12px] overflow-x-scroll scrollbar-hide"
        )}
      >
        {optionValues.map((option) => (
          <div
            key={option.value}
            onClick={() => setSelectedCategory(option.value)}
            className={cn(
              "flex items-center justify-center w-full h-[32px] whitespace-nowrap text-center border  rounded-[5px] px-[8px] py-[9px]",
              selectedCategory === option.value
                ? "border-gray7"
                : "border-gray3"
            )}
          >
            {option.name}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mx-auto w-full max-w-[696px] h-[50px] space-x-1 mt-[8px] mobile:mt-[12px] tablet:w-full tablet:max-w-[664px] mobile:space-x-0 mobile:max-w-[768px] mobile:px-[12px]">
        <div className="relative w-[160px] h-[50px] border rounded-[5px] mobile:hidden">
          <select
            {...register("categoryType")}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-[45px] appearance-none py-3 px-4"
          >
            {optionValues.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <div className="absolute top-3 right-3 pointer-events-none">
            <Arrow_down />
          </div>
        </div>
        <div
          className={cn(
            "w-[528px] min-h-[45px] border rounded-[5px]",
            "mobile:w-full mobile:min-w-[328px] mobile:max-w-[768px] "
          )}
        >
          <input
            {...register("title")}
            type="text"
            maxLength={30}
            placeholder="제목을 입력해주세요"
            className="w-full min-h-[40px] rounded-[5px] py-3 px-4 moble:w-full mobile:h-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default TitleDag;
