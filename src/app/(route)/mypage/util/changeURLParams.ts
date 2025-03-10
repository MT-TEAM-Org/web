import { ListConfig } from "../_types/toolbarType";

const changeURLParams = (
  searchParams: any,
  key: string,
  value: string,
  searchType?: string
) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  if (key === "search" && searchType)
    params.set("search_type", searchType as ListConfig["searchType"]);

  return `?${params.toString()}`;
};

export default changeURLParams;
