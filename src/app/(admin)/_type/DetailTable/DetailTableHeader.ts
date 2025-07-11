export interface TableHeaderItem {
  key: string;
  label: string;
  className?: string;
}

interface TableData {
  data: any;
}

export interface TableConfig {
  headers: TableHeaderItem[];
  data: TableData;
}

// 테이블 헤더 타입
export type DropDownControl = {
  dropDown: Record<string, boolean>;
  setDropDown: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};