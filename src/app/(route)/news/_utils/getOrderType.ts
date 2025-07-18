export const getOrderType = (searchParams: URLSearchParams) => {
  const orderTypeParam = searchParams.get("order_type");

  if (!orderTypeParam) {
    return "DATE";
  }

  switch (orderTypeParam) {
    case "RECOMMEND":
      return "VIEW";
    case "CREATE":
      return "DATE";
    case "COMMENT":
      return "COMMENT";
    default:
      return "DATE";
  }
};