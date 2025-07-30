import { useSearchParams } from "next/navigation";
import { noticeListConfig } from "@/app/(route)/customer/_types/noticeListConfig";

const useNoticeQueryParams = (): noticeListConfig => {
  const searchParams = useSearchParams();

  return {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    searchType:
      (searchParams.get("search_type") as noticeListConfig["searchType"]) ||
      "",
    search: searchParams.get("search") || "",
  };
};

export default useNoticeQueryParams;