import Icon from "@/app/_components/IconComponents";
import { cn } from "@/utils";
import React from "react";
import DetailTableItem from "./DetailTableItem";
import Pagination from "./Pagination";

interface DetailTableProps {
  isList: boolean;
  type: "improvement" | "inquiry";
  title?: string;
  totalCount?: string;
}

const DetailTable = ({ isList, type, title, totalCount }: DetailTableProps) => {
  // 공통 헤더
  const commonHeaders = {
    status: {
      key: "status",
      label: "처리 상태",
      icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      className: "w-[100px]",
    },
    nickname: {
      key: "nickname",
      label: "닉네임",
      icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      className: "w-[160px]",
    },
    content: {
      key: "content",
      label: "내용",
      icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      className: !isList ? "truncate max-w-[246px]" : "truncate flex-1",
    },
    date: {
      key: "date",
      label: "작성일자",
      icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
      className: "w-[160px]",
    },
  };

  // 타입별 헤더
  const typeSpecificHeaders = {
    improvement: {
      importance: {
        key: "importance",
        label: "중요도",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[100px]",
      },
      recommendations: {
        key: "recommendations",
        label: "추천수",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[100px]",
      },
      title: {
        key: "title",
        label: "제목",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        // improvement 타입의 제목 width 수정 필요
        className: !isList ? "truncate max-w-[246px]" : "truncate flex-1",
      },
    },
    inquiry: {
      member: {
        key: "member",
        label: "회원 여부",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[160px]",
      },
      email: {
        key: "email",
        label: "닉네임/이메일",
        icons: <Icon icon="SEARCH_DROPDOWN_DOWN" />,
        className: "w-[160px]",
      },
    },
  };

  // 타입별 헤더 구성
  const getHeaders = () => {
    if (type === "improvement") {
      return [
        commonHeaders.status,
        typeSpecificHeaders.improvement.importance,
        typeSpecificHeaders.improvement.recommendations,
        commonHeaders.nickname,
        typeSpecificHeaders.improvement.title,
        commonHeaders.content,
        commonHeaders.date,
      ];
    } else {
      return [
        commonHeaders.status,
        typeSpecificHeaders.inquiry.member,
        typeSpecificHeaders.inquiry.email,
        commonHeaders.content,
        commonHeaders.date,
      ];
    }
  };

  // 타입별 목업 데이터
  const getMockData = () => {
    if (type === "improvement") {
      return [
        {
          status: "대기",
          importance: "높음",
          recommendations: "15",
          nickname: "하이브짱",
          title: "로그인 관련 개선사항",
          content:
            "로그인 페이지 UI 개선이 필요합니다. 사용자 경험 향상을 위해...",
          date: "25.05.29",
        },
        {
          status: "완료",
          importance: "중간",
          recommendations: "8",
          nickname: "사용자123",
          title: "검색 기능 개선 요청",
          content: "검색 결과가 정확하지 않은 것 같습니다. 개선이 필요해요...",
          date: "25.05.28",
        },
        {
          status: "접수",
          importance: "중간",
          recommendations: "8",
          nickname: "사용자123",
          title: "검색 기능 개선 요청",
          content: "검색 결과가 정확하지 않은 것 같습니다. 개선이 필요해요...",
          date: "25.05.28",
        },
      ];
    } else {
      return [
        {
          status: "답변대기",
          member: "비회원",
          email: "hvie12@gmail.com",
          content:
            "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
          date: "25.05.29",
        },
        {
          status: "답변완료",
          member: "회원",
          email: "하이브짱",
          content:
            "문의하려고하는데요 로그인이 안되요 문의내용문의하려고하는데요 로그인이 안되요 문의내용",
          date: "25.05.29",
        },
      ];
    }
  };

  const tableConfig = {
    headers: getHeaders(),
    data: getMockData(),
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {isList && (
        <div className="flex gap-2 items-center">
          <h3 className="font-bold text-[20px] leading-[36px] tracking-[-0.02em] text-black">
            {title}
          </h3>
          <p className="font-bold text-[16px] leading-[24px] tracking-[-0.02em] text-gray7">
            검색결과 총 {totalCount}건
          </p>
        </div>
      )}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full h-[36px] text-left border-collapse text-nowrap">
          <thead className="bg-gray1">
            <tr>
              {tableConfig.headers.map((header) => (
                <th
                  key={header.key}
                  className={cn("px-3 py-2", header.className)}
                >
                  <div className="flex justify-between items-center font-bold text-[14px] leading-5 text-gray8 cursor-pointer select-none">
                    <span className="mx-auto">{header.label}</span>
                    <span>{header.icons}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray8">
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
    </div>
  );
};

export default DetailTable;
