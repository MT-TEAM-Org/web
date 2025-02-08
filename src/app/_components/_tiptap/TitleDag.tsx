"use client";

import React, { useEffect, useState } from "react";
import Arrow_down from "../icon/Arrow_down";
import { UseFormRegister } from "react-hook-form";
import { usePathname } from "next/navigation";

interface TitleDagProps {
  register: UseFormRegister<any>;
}

const TitleDag = ({ register }: TitleDagProps) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("FREE");

  const pathName = usePathname();

  const optionValues = [
    { name: "자유", value: "FREE" },
    { name: "질문", value: "QUESTION" },
    { name: "이슈", value: "ISSUE" },
    { name: "전적인증", value: "RECORD_CERTIFICATION" },
    { name: "플레이팁", value: "PLAY_TIP" },
    { name: "개선요청", value: "SUGGESTION" },
  ];

  const boardType = pathName.split("/")[1];

  const filteredOptions = optionValues.filter((option) => {
    if (
      boardType !== "e-sports" &&
      (option.value === "RECORD_CERTIFICATION" || option.value === "PLAY_TIP")
    ) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const setSelectOptions = pathName.split("/")[2];
    setSelectedCategory(setSelectOptions);
  }, [pathName]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Tags:", tags);
  };

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center max-w-[696px] min-h-[40px] mb-3">
        <h1 className="max-w-[80px] min-h-[28px] font-[700] text-[18px] leading-[28px] whitespace-nowrap">
          게시글 작성
        </h1>
        <button className="max-w-[121px] min-h-[40px] rounded-[5px] border border-[#DBDBDB] py-[13px] px-[16px] font-[700] text-[14px] leading-[14px] whitespace-nowrap bg-[#FAFAFA]">
          글쓰기 유의사항
        </button>
      </div>
      <form onSubmit={handleSubmit} className="h-[40px]">
        <div className="flex justify-between w-[696px] h-[50px] space-x-1">
          <div className="relative w-[160px] h-[50px] border rounded-[5px]">
            <select
              {...register("category")}
              value={selectedCategory}
              className="w-full h-[45px] appearance-none py-3 px-4"
            >
              {filteredOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className="absolute top-3 right-3 pointer-events-none">
              <Arrow_down />
            </div>
          </div>
          <div className="w-[528px] min-h-[50px] border rounded-[5px]">
            <input
              id="title"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="제목을 입력해주세요"
              className="w-full min-h-[40px] rounded-[5px] py-3 px-4"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TitleDag;
