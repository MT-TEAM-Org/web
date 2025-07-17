export interface TableHeaderItem {
  key: string;
  label: string;
  className?: string;
}

interface TableData {
  data: any; // 타입 수정 필요
}

export interface TableConfig {
  headers: TableHeaderItem[];
  data: TableData;
}

export type TableType =
  | "suggestions"
  | "inquiry"
  | "notice"
  | "content"
  | "detailContent"
  | "user";

// 테이블 헤더 타입
export type DropDownControl = {
  dropDown: Record<string, boolean>;
  setDropDown: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};