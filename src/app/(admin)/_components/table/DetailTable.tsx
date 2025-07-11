"use client";

import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React, { useState } from "react";
import DetailTableItem from "./DetailTableItem";
import Pagination from "./Pagination";
import PostNoticeModal from "../modal/PostNoticeModal";
import DeleteModal from "../modal/DeleteModal";
import CheckBoxIcon from "../common/CheckBoxIcon";
import { onlyNoticeButtons } from "../../_constants/onlyNoticeButtons";
import { DetailTableData } from "../../MockData";

interface DetailTableProps {
  isList: boolean;
  type: "suggestions" | "inquiry" | "notice" | "content" | "detailContent";
  title?: string;
  totalCount?: string;
}

const buttonStyle =
  "w-[120px] h-[40px] flex items-center justify-center rounded-[5px] px-4 py-[13px] font-bold text-[14px]";

const DetailTable = ({ isList, type, title, totalCount }: DetailTableProps) => {
  const [showPostModal, setShowPostModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dropDown, setDropDown] = useState<Record<string, boolean>>({});

  const handleDropDown = (key: string) => {
    setDropDown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 공통 헤더
  const commonHeaders = {
    status: {
      key: "status",
      label: "처리 상태",
      className: "w-[100px]",
    },
    nickname: {
      key: "nickname",
      label: "닉네임",
      className: "w-[160px]",
    },
    content: {
      key: "content",
      label: "내용",
      className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
    },
    date: {
      key: "date",
      label: "작성날짜",
      className: "w-[160px]",
    },
  };

  // 타입별 헤더
  const typeSpecificHeaders = {
    suggestions: {
      importance: {
        key: "importance",
        label: "중요도",
        className: "w-[100px]",
      },
      recommendations: {
        key: "recommendations",
        label: "추천수",
        className: "w-[100px]",
      },
      title: {
        key: "title",
        label: "제목",
        className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
      },
    },
    inquiry: {
      member: {
        key: "member",
        label: "회원 여부",
        className: "w-[160px]",
      },
      email: {
        key: "email",
        label: "닉네임/이메일",
        className: "w-[160px]",
      },
    },
    notice: {
      writer: {
        key: "writer",
        label: "작성자",
        className: "w-[160px]",
      },
      title: {
        key: "title",
        label: "제목",
        className: "truncate flex-1",
      },
      content: {
        key: "content",
        label: "내용",
        className: "truncate flex-1",
      },
    },
    content: {
      isReport: {
        key: "isReport",
        label: "신고 여부",
        className: "w-[100px]",
      },
      reportCount: {
        key: "reportCount",
        label: "신고수",
        className: "w-[100px]",
      },
      userStatus: {
        key: "userStatus",
        label: "회원상태",
        className: "w-[100px]",
      },
      writer: {
        key: "writer",
        label: "작성자",
        className: "w-[160px]",
      },
      type: {
        key: "type",
        label: "유형",
        className: "w-[100px]",
      },
      titleContent: {
        key: "titleContent",
        label: "제목/내용",
        className: !isList ? "truncate min-w-[103px]" : "truncate flex-1",
      },
    },
    detailContent: {
      reportUser: {
        key: "reportUser",
        label: "신고자",
        className: "w-[160px]",
      },
      reportType: {
        key: "reportType",
        label: "신고 유형",
        className: "w-[100px]",
      },
      userStatus: {
        key: "userStatus",
        label: "회원상태",
        className: "w-[100px]",
      },
      reason: {
        key: "reason",
        label: "사유",
        className: "flex-1 truncate",
      },
      type: {
        key: "type",
        label: "유형",
        className: "w-[100px]",
      },
      reportDate: {
        key: "reportDate",
        label: "신고날짜",
        className: "w-[200px]",
      },
    },
  };

  // 타입별 헤더 구성
  const getHeaders = () => {
    if (type === "suggestions") {
      return [
        commonHeaders.status,
        typeSpecificHeaders.suggestions.importance,
        typeSpecificHeaders.suggestions.recommendations,
        commonHeaders.nickname,
        typeSpecificHeaders.suggestions.title,
        commonHeaders.content,
        commonHeaders.date,
      ];
    } else if (type === "inquiry") {
      return [
        commonHeaders.status,
        typeSpecificHeaders.inquiry.member,
        typeSpecificHeaders.inquiry.email,
        commonHeaders.content,
        commonHeaders.date,
      ];
    } else if (type === "notice") {
      return [
        commonHeaders.date,
        typeSpecificHeaders.notice.writer,
        typeSpecificHeaders.notice.title,
        typeSpecificHeaders.notice.content,
      ];
    } else if (type === "content") {
      return [
        commonHeaders.status,
        typeSpecificHeaders.content.isReport,
        typeSpecificHeaders.content.reportCount,
        typeSpecificHeaders.content.userStatus,
        commonHeaders.nickname,
        typeSpecificHeaders.content.type,
        typeSpecificHeaders.content.titleContent,
        commonHeaders.date,
      ];
    } else if (type === "detailContent") {
      return [
        typeSpecificHeaders.detailContent.reportUser,
        typeSpecificHeaders.detailContent.reportType,
        typeSpecificHeaders.detailContent.reason,
        typeSpecificHeaders.detailContent.reportDate,
      ];
    }
  };

  const tableConfig = {
    headers: getHeaders(),
    data: DetailTableData(type),
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

  return (
    <div className="w-full flex flex-col gap-4">
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
      <div className="overflow-x-auto border border-b-0 rounded-md">
        <table className="min-w-full h-[36px] text-left border-collapse text-nowrap table-fixed w-full">
          <thead className="bg-gray1">
            <tr>
              {type === "notice" && (
                <th className="w-[48px]">
                  <CheckBoxIcon />
                </th>
              )}
              {tableConfig.headers.map((header) => (
                <th
                  key={header.key}
                  onClick={() => handleDropDown(header.key)}
                  className={cn(
                    "px-3 py-2 hover:bg-gray2 cursor-pointer border-b border-gray2",
                    header.className
                  )}
                >
                  <div className="flex justify-between items-center font-bold text-[14px] leading-5 text-gray8 select-none">
                    <span className="mx-auto">{header.label}</span>
                    <Icon
                      icon={
                        dropDown[header.key]
                          ? "SEARCH_DROPDOWN_UP"
                          : "SEARCH_DROPDOWN_DOWN"
                      }
                    />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
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
