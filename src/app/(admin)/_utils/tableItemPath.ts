import { rowDataType, tableMeta } from "../_type/DetailTable/DetailTableItem";
import { typeGuards } from "./tableItemTypeGuards";

const CONTENT_TYPE_MAP = {
  "게시글": "post",
  "댓글": "comment", 
  "채팅": "chat",
} as const;

export const getLinkPath = (rowData: rowDataType, tableMeta: tableMeta): string => {
  const { type } = rowData;
  const { idx } = tableMeta;

  switch (type) {
    case "inquiry":
      return `/dashBoard/inquiries/${idx}`;
    
    case "suggestions":
      return `/dashBoard/suggestions/${idx}`;
    
    case "notice":
      return `/dashBoard/notices/${idx}`;
    
    case "content":
      if (!typeGuards.content(rowData.row)) return "/dashBoard";
      
      const contentRoute = CONTENT_TYPE_MAP[rowData.row.type];
      return contentRoute 
        && `/dashBoard/content/${contentRoute}/${idx}`
    
    default:
      return "/dashBoard";
  }
};