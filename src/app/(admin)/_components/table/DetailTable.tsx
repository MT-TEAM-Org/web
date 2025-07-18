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
import { TableType } from "../../_type/DetailTable/DetailTableHeader";
import EmptyTable from "./EmptyTable";
import { useSearchParams } from "next/navigation";

interface DetailTableProps {
  isList: boolean;
  type: TableType;
  title?: string;
  totalCount?: string;
  isUserDetail?: boolean;
}

const DetailTable = ({
  isList,
  type,
  title,
  totalCount,
  isUserDetail,
}: DetailTableProps) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dropDown, setDropDown] = useState<Record<string, boolean>>({});
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";

  // 테이블 구성
  const tableConfig = {
    headers: getHeaders(type, isList),
    data: DetailTableData(type),
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2">
        <TableTitle
          tableInfo={{ isList, type, title, totalCount, isUserDetail }}
          modalControls={{ setShowDeleteModal, setShowPostModal }}
          currentSort={currentSort}
        />
        {/* 데이터가 없을 때 */}
        {tableConfig.data.length === 0 && <EmptyTable />}
        {/* 데이터가 있을 때 */}
        {tableConfig.data.length > 0 && (
          <div className="overflow-x-auto border border-b-0 rounded-md">
            <table className="min-w-full h-[36px] text-left border-collapse text-nowrap table-fixed w-full">
              <DetailTableHeader
                type={type}
                dropDownControl={{ dropDown, setDropDown }}
                tableConfig={tableConfig}
              />
              <tbody className="text-gray8 select-none">
                {Array.from({ length: 10 }, (_, idx) => {
                  const rowData =
                    tableConfig.data[idx % tableConfig.data.length];
                  return (
                    <DetailTableItem
                      key={idx}
                      rowData={{ row: rowData, type }}
                      tableMeta={{ idx, isList }}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {tableConfig.data.length > 0 && <Pagination />}

      <PostNoticeModal show={showPostModal} setShow={setShowPostModal} />
      <DeleteModal show={showDeleteModal} setShow={setShowDeleteModal} />
    </div>
  );
};

export default DetailTable;
