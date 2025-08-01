export interface GameEventItemType {
  id: number;
  thumbImg: string;
  title: string;
  description: string;
  period: string;
  link: string;
  exposureDate: string;
}

export interface GameEventPageInfoType {
  currentPage: number;
  totalPage: number;
  totalElement: number;
}

export interface GameEventDataType {
  content: GameEventItemType[];
  pageInfo: GameEventPageInfoType;
}
