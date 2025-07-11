import React from "react";
import { cn } from "@/utils";
import { onlyNoticeButtons } from "../../_constants/onlyNoticeButtons";

interface TableTitleProps {
  isList: boolean;
  type: string;
  title?: string;
  totalCount?: string;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPostModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const buttonStyle =
  "w-[120px] h-[40px] flex items-center justify-center rounded-[5px] px-4 py-[13px] font-bold text-[14px]";

const TableTitle = ({
  isList,
  type,
  title,
  totalCount,
  setShowDeleteModal,
  setShowPostModal,
}: TableTitleProps) => {
  // 공지 버튼 핸들러
  const handleNoticeButton = (value: string) => {
    if (value === "deleteAll") {
      // setShowDeleteModal(true);
    } else if (value === "delete") {
      setShowDeleteModal(true);
    } else if (value === "register") {
      setShowPostModal(true);
    }
  };

  return (
    <>
      {isList && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <h3 className="font-bold text-[20px] leading-[36px] tracking-[-0.02em] text-black">
              {title}
            </h3>
            <p className="font-bold text-[16px] leading-[24px] tracking-[-0.02em] text-gray7">
              {type === "notice" ? "총" : "검색결과 총"} {totalCount}건
            </p>
          </div>
          {type === "notice" && (
            <div className="flex gap-2">
              {onlyNoticeButtons.map((button) => (
                <button
                  key={button.value}
                  className={cn(buttonStyle, button.style)}
                  onClick={() => handleNoticeButton(button.value)}
                >
                  {button.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TableTitle;
