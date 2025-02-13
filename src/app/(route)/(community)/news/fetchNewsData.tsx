import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchNewsData = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/news`,
    {
      params: {
        category: "BASEBALL",
        orderType: "DATE",
        page: 1,
        size: 10,
      },
    }
  );
  return response.data;
};

const useFetchNewsData = () => {
  return useQuery({
    queryKey: ["newsData"],
    queryFn: fetchNewsData,
  });
};

export default useFetchNewsData;
