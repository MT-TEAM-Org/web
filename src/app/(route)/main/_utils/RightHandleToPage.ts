export const handleToPage = (
  type: "prev" | "next",
  currentPage: string,
  setCurrentPage: (value: string) => void,
  filteredNewsData: any
) => {
  const current = Number(currentPage);
  const total = filteredNewsData?.pageInfo?.totalPage ?? 1;
  if (type === "prev" && current > 1) {
    setCurrentPage(String(current - 1));
  } else if (type === "next" && current < total) {
    setCurrentPage(String(current + 1));
  }
};
