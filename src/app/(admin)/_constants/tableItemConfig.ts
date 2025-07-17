import { rowDataType } from "../_type/DetailTable/DetailTableItem";
import { cn } from "@/utils";
import { tableMeta } from "../_type/DetailTable/DetailTableItem";
import { typeGuards } from "../_utils/tableItemTypeGuards";

// 테이블 아이템 타입별 셀 구성
// TODO: 리팩터링 필요, 객체지향 설계 고려중
export const getCellConfig = (rowData: rowDataType, tableMeta: tableMeta) => {
  if (typeGuards.inquiry(rowData.row)) {
    return [
      {
        key: "status",
        value: rowData.row.status,
        className: cn(
          "font-bold w-[100px]",
          rowData.row.status === "답변대기" ? "text-warning" : "text-gray8"
        ),
      },
      {
        key: "member",
        value: rowData.row.member,
        className: "w-[160px]",
      },
      {
        key: "email",
        value: rowData.row.email,
        className: "w-[160px]",
      },
      {
        key: "content",
        value: rowData.row.content,
        className: !tableMeta.isList
          ? "max-w-[103px] truncate"
          : "flex-1 truncate",
      },
      {
        key: "date",
        value: rowData.row.date,
        className: "w-[160px]",
      },
    ];
  } else if (typeGuards.notice(rowData.row)) {
    return [
      {
        key: "date",
        value: rowData.row.date,
        className: "w-[160px]",
      },
      {
        key: "writer",
        value: rowData.row.writer,
        className: "w-[160px]",
      },
      {
        key: "title",
        value: rowData.row.title,
        className: !tableMeta.isList ? "min-w-[103px]" : "flex-1",
      },
      {
        key: "content",
        value: rowData.row.content,
        className: !tableMeta.isList ? "max-w-[103px]" : "flex-1",
      },
    ];
  } else if (typeGuards.content(rowData.row)) {
    return [
      {
        key: "status",
        value: rowData.row.status,
        className: cn(
          "w-[100px]",
          rowData.row.status === "숨김" && "text-gra"
        ),
      },
      {
        key: "isReport",
        value: rowData.row.isReport,
        className: cn(
          "w-[100px] font-bold",
          rowData.row.isReport === "신고" && "text-warning"
        ),
      },
      {
        key: "reportCount",
        value: rowData.row.reportCount,
        className: "w-[80px]",
      },
      {
        key: "userStatus",
        value: rowData.row.userStatus,
        className: cn(
          "w-[100px]",
          rowData.row.userStatus === "경고" && "text-[#FF7300]"
        ),
      },
      {
        key: "writer",
        value: rowData.row.writer,
        className: "w-[120px]",
      },
      {
        key: "type",
        value: rowData.row.type,
        className: "w-[80px]",
      },
      {
        key: "titleContent",
        value: rowData.row.titleContent,
        className: !tableMeta.isList
          ? "max-w-[872px]"
          : "truncate flex-1 text-center",
      },
      {
        key: "date",
        value: rowData.row.date,
        className: "w-[120px]",
      },
    ];
  } else if (typeGuards.suggestions(rowData.row)) {
    return [
      {
        key: "status",
        value: rowData.row.status,
        className: cn(
          "font-bold w-[100px]",
          rowData.row.status === "접수"
            ? "text-warning"
            : rowData.row.status === "완료"
            ? "text-gra"
            : "text-gray8"
        ),
      },
      {
        key: "importance",
        value: rowData.row.importance,
        className: cn(
          "font-bold w-[100px]",
          rowData.row.importance === "높음" && "text-warning"
        ),
      },
      {
        key: "recommendations",
        value: rowData.row.recommendations,
        className: !tableMeta.isList ? "w-[100px]" : "w-[100px]",
      },
      {
        key: "nickname",
        value: rowData.row.nickname,
        className: !tableMeta.isList ? "w-[160px]" : "w-[160px]",
      },
      {
        key: "title",
        value: rowData.row.title,
        className: !tableMeta.isList
          ? "min-w-[103px] truncate"
          : "flex-1 truncate",
      },
      {
        key: "content",
        value: rowData.row.content,
        className: !tableMeta.isList
          ? "min-w-[103px] truncate"
          : "flex-1 truncate",
      },
      {
        key: "date",
        value: rowData.row.date,
        className: !tableMeta.isList ? "w-[160px]" : "w-[160px]",
      },
    ];
  } else if (typeGuards.detailContent(rowData.row)) {
    return [
      {
        key: "reportUser",
        value: rowData.row.reportUser,
        className: "w-[160px]",
      },
      {
        key: "reportType",
        value: rowData.row.reportType,
        className: "w-[160px]",
      },
      {
        key: "reason",
        value: rowData.row.reason,
        className: !tableMeta.isList
          ? "min-w-[103px] truncate"
          : "flex-1 truncate",
      },
      {
        key: "reportDate",
        value: rowData.row.reportDate,
        className: "w-[160px]",
      },
    ];
  } else if (typeGuards.user(rowData.row)) {
    return [
      {
        key: "userStatus",
        value: rowData.row.userStatus,
        className: cn("flex-1 truncate",
          rowData.row.userStatus === "경고" && "text-[#FF7300]",
          rowData.row.userStatus === "정지" && "text-[#D1504B]"
        )
      },
      {
        key: "nickname",
        value: rowData.row.nickname,
        className: "flex-1 truncate",
      },
      {
        key: "post",
        value: rowData.row.post,
        className: "flex-1 truncate",
      },
      {
        key: "comment",
        value: rowData.row.comment,
        className: "flex-1 truncate",
      },
      {
        key: "getRecommendations",
        value: rowData.row.getRecommendations,
        className: "flex-1 truncate",
      },
      {
        key: "getReportCount",
        value: rowData.row.getReportCount,
        className: "flex-1 truncate",
      },
      {
        key: "gender",
        value: rowData.row.gender,
        className: "flex-1 truncate",
      },
      {
        key: "joinType",
        value: rowData.row.joinType,
        className: "flex-1 truncate",
      },
      {
        key: "email",
        value: rowData.row.email,
        className: "flex-1 truncate",
      },
      {
        key: "phone",
        value: rowData.row.phone,
        className: "flex-1 truncate",
      },
    ];
  }

  return [];
};