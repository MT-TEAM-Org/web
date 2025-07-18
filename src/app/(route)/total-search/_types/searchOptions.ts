import { searchListConfig } from "./searchListConfig";

export const searchOptions = (searchParams: URLSearchParams): searchListConfig => {
    return {
    page: Number(searchParams.get("page")) || 1,
    size: 20,
    domainType:
      (searchParams.get("domainType") as searchListConfig["domainType"]) ||
      "BOARD",
    orderType:
      (searchParams.get("orderType") as searchListConfig["orderType"]) ||
      "CREATE",
    searchType:
      (searchParams.get("searchType") as searchListConfig["searchType"]) ||
      "TITLE_CONTENT",
    search: searchParams.get("search") || "",
    timePeriod:
      (searchParams.get("time") as searchListConfig["timePeriod"]) || "ALL",
    };
  };