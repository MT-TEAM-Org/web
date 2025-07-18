// 정렬 값 가져오기
export const getNextSortValue = (
  currentKey: string,
  currentValue: string | null,
  sortList: string[],
  newKey: string
): string | null => {
  if (currentKey !== newKey) return sortList[0];
  if (!currentValue) return sortList[0];
  
  const currentIndex = sortList.indexOf(currentValue);
  if (currentIndex === -1 || currentIndex === sortList.length - 1) {
    return null;
  }
  return sortList[currentIndex + 1];
};

// 정렬 파라미터 생성
export const buildSortParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string | null
): URLSearchParams => {
  const params = new URLSearchParams(searchParams);
  params.delete("sort");
  
  if (value) {
    params.set("sort", `${key}.${value}`);
  }
  
  return params;
};