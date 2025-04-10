import { ListConfig } from "../_types/toolbarType";

const changeURLParams = (
  searchParams: URLSearchParams,
  key: string,
  value: string,
  searchType?: string,
  commentType?: string
) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  if (key === "search" && commentType) {
    params.set("comment_type", commentType as ListConfig["commentType"]);
    params.set("search_type", searchType as ListConfig["searchType"]);
  } else if (key === "search" && searchType) {
    params.set("search_type", searchType as ListConfig["searchType"]);
  }

  return `?${params.toString()}`;
};

export default changeURLParams;
