import getDiscountGame from "@/services/main/mainRightBar/getDiscountGame";
import { useQuery } from "@tanstack/react-query";

const useGetGameDiscount = () => {
  return useQuery({
    queryKey: ["gameDiscount"],
    queryFn: getDiscountGame,
  });
};

export default useGetGameDiscount;
