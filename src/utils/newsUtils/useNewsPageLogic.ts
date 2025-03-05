import { useState } from "react";

export const useNewsPageLogic = () => {
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">("DATE");
  const [timeType, setTimeType] = useState<"DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY">("DAILY");
  const [searchType, setSearchType] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const onPageChange = (newPage: string) => {
    setPageNum(Number(newPage));
  };

  return { 
    orderType, 
    setOrderType, 
    timeType, 
    setTimeType, 
    pageNum, 
    onPageChange,
    searchType,
    setSearchType,
  };
};