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
