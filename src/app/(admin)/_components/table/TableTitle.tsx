import React from "react";
import { cn } from "@/utils";
import { onlyNoticeButtons } from "../../_constants/onlyNoticeButtons";
import { getHeaders } from "../../_constants/tableHeaders";
import {
  ModalControls,
  TableInfo,
} from "../../_type/DetailTable/DetailTableTitle";
import { TableHeaderItem } from "../../_type/DetailTable/DetailTableHeader";
import RenderSortText from "./RenderSortText";

interface TableTitleProps {
  tableInfo: TableInfo;
  modalControls: ModalControls;
  currentSort: string;
}

const buttonStyle =
  "w-[120px] h-[40px] flex items-center justify-center rounded-[5px] px-4 py-[13px] font-bold text-[14px]";

const TableTitle = ({
  tableInfo: { isList, type, title, totalCount, isUserDetail },
  modalControls: { setShowDeleteModal, setShowPostModal },
  currentSort,
}: TableTitleProps) => {
  // TODO: 리팩터링 및 상세페이지 데이터 안 나오는 이슈 수정 필요
  // currentSort에서 정렬 정보를 추출
  const getSortText = (): string | null => {
    if (!currentSort) return null;

    const [sortKey, sortValue] = currentSort.split(".");
    if (!sortKey || !sortValue) return null;

    // 현재 타입 헤더 가져오기
    const headers = getHeaders(type, isList);
    const header = Object.values(headers).find(
      (h: TableHeaderItem) => h.key === sortKey
    );

    if (!header || !header.sortValueList || !header.sortKorean) return null;

    const sortIndex = header.sortValueList.indexOf(sortValue);
    if (sortIndex === -1 || sortIndex >= header.sortKorean.length) return null;

    return header.sortKorean[sortIndex];
  };

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
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <>
            <h3
              className={cn(
                "font-bold text-black",
                isList
                  ? "text-[20px] leading-[36px] tracking-[-0.02em]"
                  : "text-[18px] leading-7 tracking-[-0.04em]"
              )}
            >
              {title}
            </h3>
            <p className="font-bold text-[16px] leading-[24px] tracking-[-0.02em] text-gray7">
              {type === "notice" || isUserDetail || !isList
                ? "총"
                : "검색결과 총"}
              <span> {totalCount}건</span>
            </p>
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
          </>
          {/* 정렬 텍스트 */}
          {RenderSortText(getSortText)}
        </div>

        {/* 공지사항 버튼은 isList일 때만 */}
        {isList && type === "notice" && (
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
    </>
  );
};

export default TableTitle;
