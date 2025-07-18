import { useMemo } from "react";
import { getHeaders } from "../../_constants/tableHeaders";
import { TableHeaderItem } from "../../_type/DetailTable/DetailTableHeader";

export const useSortText = (currentSort: string, type: string, isList: boolean) => {
  return useMemo(() => {
    if (!currentSort) return null;

    const [sortKey, sortValue] = currentSort.split(".");
    if (!sortKey || !sortValue) return null;

    const headers = getHeaders(type, isList);
    const header = Object.values(headers).find(
      (h: TableHeaderItem) => h.key === sortKey
    );

    if (!header?.sortValueList || !header?.sortKorean) return null;

    const sortIndex = header.sortValueList.indexOf(sortValue);
    if (sortIndex === -1 || sortIndex >= header.sortKorean.length) return null;

    return header.sortKorean[sortIndex];
  }, [currentSort, type, isList]);
};