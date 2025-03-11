import { useState } from "react";

export const useNewsPageLogic = () => {
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">("DATE");
  const [timePeriod, setTimePeriod] = useState<"DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY">("DAILY");
  const [searchType, setSearchType] = useState("");
  const [page, setPage] = useState(1);

  const onPageChange = (newPage: string) => {
    setPage(Number(newPage));
  };

  return { 
    orderType, 
    setOrderType, 
    timePeriod, 
    setTimePeriod, 
    page, 
    onPageChange,
    searchType,
    setSearchType,
  };
};