import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { buildSortParams, getNextSortValue } from "../../_utils/sorting";

// 테이블 정렬 훅
export const useTableSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const sortState = useMemo(() => {
    const currentSort = searchParams.get("sort");
    if (!currentSort) return { key: null, value: null };
    
    const [key, value] = currentSort.split(".");
    return { key: key || null, value: value || null };
  }, [searchParams]);

  const handleSort = useCallback((key: string, sortList: string[]) => {
    const nextValue = getNextSortValue(
      sortState.key || "",
      sortState.value,
      sortList,
      key
    );

    const params = buildSortParams(searchParams, key, nextValue);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [router, searchParams, sortState.key, sortState.value]);

  return {
    sortState,
    handleSort,
  };
};