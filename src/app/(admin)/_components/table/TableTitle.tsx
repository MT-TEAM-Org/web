import React from "react";
import { cn } from "@/utils";
import {
  ModalControls,
  TableInfo,
} from "../../_type/DetailTable/DetailTableTitle";
import RenderSortText from "./RenderSortText";
import { useSortText } from "../../_hooks/sort/useSortText";
import NoticeListBtn from "../../dashBoard/notices/_components/NoticeListBtn";

interface TableTitleProps {
  tableInfo: TableInfo;
  modalControls: ModalControls;
  currentSort: string;
}

const TableTitle = ({
  tableInfo: { isList, type, title, totalCount, isUserDetail },
  modalControls: { setShowDeleteModal, setShowPostModal },
  currentSort,
}: TableTitleProps) => {
  const sortText = useSortText(currentSort, type, isList);

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
    <div className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
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
          {type === "notice" || isUserDetail || !isList ? "총" : "검색결과 총"}
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

        {/* 정렬 텍스트 */}
        {RenderSortText(() => sortText)}
      </div>

      {/* isList, 공지사항 버튼 */}
      {isList && type === "notice" && (
        <NoticeListBtn handleNoticeButton={handleNoticeButton} />
      )}
    </div>
  );
};

export default TableTitle;
