import React from "react";
import { cn } from "@/utils";
import { onlyNoticeButtons } from "../../_constants/onlyNoticeButtons";
import {
  ModalControls,
  TableInfo,
} from "../../_type/DetailTable/DetailTableTitle";
import { useSearchParams } from "next/navigation";

interface TableTitleProps {
  tableInfo: TableInfo;
  modalControls: ModalControls;
}

const buttonStyle =
  "w-[120px] h-[40px] flex items-center justify-center rounded-[5px] px-4 py-[13px] font-bold text-[14px]";

const TableTitle = ({
  tableInfo: { isList, type, title, totalCount, isUserDetail },
  modalControls: { setShowDeleteModal, setShowPostModal },
}: TableTitleProps) => {
  const params = useSearchParams();

  // TODO: 수정 필요, 정렬 기능 추가 후 추가
  const option = params.get("option");

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

  const getTotalReport = [
    { name: "상습비방", count: 21 },
    { name: "음란", count: 33 },
    { name: "정치", count: 14 },
    { name: "홍보", count: 88 },
    { name: "기타", count: 12 },
  ];

  return (
    <>
      {isList && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <h3 className="font-bold text-[20px] leading-[36px] tracking-[-0.02em] text-black">
              {title}
            </h3>
            <p className="font-bold text-[16px] leading-[24px] tracking-[-0.02em] text-gray7">
              {type === "notice" || isUserDetail ? "총" : "검색결과 총"}
              <span> {totalCount}건</span>
            </p>
            {option && (
              <p className="font-bold text-[14px] leading-5 text-gra">
                {option}
              </p>
            )}
            {/* 사용자 상세 정보 */}
            {isUserDetail && (
              <div className="flex items-center gap-2 font-medium text-[14px] leading-5 text-gray5">
                {getTotalReport.map((report) => (
                  <p key={report.name}>
                    {report.name} {report.count}건
                  </p>
                ))}
              </div>
            )}
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
