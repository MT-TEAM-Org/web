"use client";

import React, { useEffect, useState } from "react";
import Arrow_down from "../icon/Arrow_down";
import { set, UseFormRegister, UseFormWatch } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { useEditStore } from "@/utils/Store";
import WriteModal from "../WriteModal";
import CustomIcon from "../IconComponents/Icon";
import { cn } from "@/utils";

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
          { name: "플레이팁", value: "TIP" },
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
    <div className="w-full h-full">
      {writeGuideVisible && (
        <WriteModal
          modalId={modalId}
          forceShow={true}
          onClose={handleCloseModal}
        />
      )}
      <div
        className={cn(
          "flex justify-between items-center mx-auto max-w-[696px] min-h-[40px] pt-2",
          "mobile:flex mobile:justify-start mobile:items-center mobile:w-full mobile:min-w-[360px] mobile:max-w-[688px] mobile:h-[48px] mobile:py-[10px] mobile:border-b mobile:border-gray2"
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
        <h1 className="flex max-w-[80px] min-h-[28px] font-[700] text-[18px] leading-[28px] whitespace-nowrap">
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
      <div className="flex justify-between items-center mx-auto w-full max-w-[696px] h-[50px] space-x-1 mt-2 mobile:space-x-0 mobile:px-[12px]">
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
            "mobile:w-full mobile:min-w-[328px] mobile:max-w-[687px] "
          )}
        >
          <input
            {...register("title")}
            type="text"
            placeholder="제목을 입력해주세요"
            className="w-full min-h-[40px] rounded-[5px] py-3 px-4 mobile:h-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default TitleDag;
