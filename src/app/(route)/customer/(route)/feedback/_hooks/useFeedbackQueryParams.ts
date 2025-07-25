import { useSearchParams } from "next/navigation";
import { feedbackListConfig } from "@/app/(route)/customer/_types/feedbackListConfig";

const useFeedbackQueryParams = (): feedbackListConfig => {
  const searchParams = useSearchParams();

  return {
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    size: 20,
    orderType:
      (searchParams.get("order_type") as feedbackListConfig["orderType"]) ||
      "CREATE",
    searchType:
      (searchParams.get("search_type") as feedbackListConfig["searchType"]) ||
      "",
    search: searchParams.get("search") || "",
  };
};

export default useFeedbackQueryParams;