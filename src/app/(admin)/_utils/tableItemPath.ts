import { rowDataType, tableMeta } from "../_type/DetailTable/DetailTableItem";
import { typeGuards } from "./tableItemTypeGuards";

export const getLinkPath = (rowData: rowDataType, tableMeta: tableMeta) => {
    switch (rowData.type) {
      case "inquiry":
        return `/dashBoard/inquiries/${tableMeta.idx}`;
      case "suggestions":
        return `/dashBoard/suggestions/${tableMeta.idx}`;
      case "content":
        if (typeGuards.content(rowData.row)) {
          return rowData.row.type === "게시글"
            ? `/dashBoard/content/post/${tableMeta.idx}`
            : rowData.row.type === "댓글"
            ? `/dashBoard/content/comment/${tableMeta.idx}`
            : rowData.row.type === "채팅"
            ? `/dashBoard/content/chat/${tableMeta.idx}`
            : "/dashBoard";
        }
        return "#";
      case "notice":
        return `/dashBoard/notices/${tableMeta.idx}`;
      default:
        return "#";
    }
  };