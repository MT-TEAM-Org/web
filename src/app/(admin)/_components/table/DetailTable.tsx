"use client";

import React, { useState } from "react";
import DetailTableItem from "./DetailTableItem";
import Pagination from "./Pagination";
import PostNoticeModal from "../modal/PostNoticeModal";
import DeleteModal from "../modal/DeleteModal";
import { DetailTableData } from "../../MockData";
import { getHeaders } from "../../_constants/tableHeaders";
import TableTitle from "./TableTitle";
import DetailTableHeader from "./DetailTableHeader";

interface DetailTableProps {
  isList: boolean;
  type: "suggestions" | "inquiry" | "notice" | "content" | "detailContent";
  title?: string;
  totalCount?: string;
}

const DetailTable = ({ isList, type, title, totalCount }: DetailTableProps) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dropDown, setDropDown] = useState<Record<string, boolean>>({});

  // 테이블 구성
  const tableConfig = {
    headers: getHeaders(type, isList),
    data: DetailTableData(type),
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <TableTitle
        isList={isList}
        type={type}
        title={title}
        totalCount={totalCount}
        setShowDeleteModal={setShowDeleteModal}
        setShowPostModal={setShowPostModal}
      />
      <div className="overflow-x-auto border border-b-0 rounded-md">
        <table className="min-w-full h-[36px] text-left border-collapse text-nowrap table-fixed w-full">
          <DetailTableHeader
            type={type}
            dropDown={dropDown}
            setDropDown={setDropDown}
            tableConfig={tableConfig}
          />
          <tbody className="text-gray8 select-none">
            {Array.from({ length: 10 }, (_, idx) => {
              const rowData = tableConfig.data[idx % tableConfig.data.length];
              return (
                <DetailTableItem
                  key={idx}
                  row={rowData}
                  idx={idx}
                  type={type}
                  isList={isList}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination />

      <PostNoticeModal show={showPostModal} setShow={setShowPostModal} />
      <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} />
    </div>
  );
};

export default DetailTable;
