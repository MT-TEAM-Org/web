import getDiscountGame from "@/services/main/mainRightBar/getDiscountGame";
import { useQuery } from "@tanstack/react-query";

const useGetGameDiscount = ({ pageNum }: { pageNum: number }) => {
  return useQuery({
    queryKey: ["gameDiscount", pageNum],
    queryFn: () => getDiscountGame({ pageNum }),
  });
};

export default useGetGameDiscount;
