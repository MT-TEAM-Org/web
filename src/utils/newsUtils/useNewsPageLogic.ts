import { useState } from "react";

export const useNewsPageLogic = () => {
  const [orderType, setOrderType] = useState<"DATE" | "COMMENT" | "VIEW">("DATE");
  const [pageNum, setPageNum] = useState(1);

  const onPageChange = (newPage: string) => {
    setPageNum(Number(newPage));
  };

  return { orderType, setOrderType, pageNum, onPageChange };
};