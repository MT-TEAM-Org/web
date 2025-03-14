import axios from "axios";

const getDiscountGame = async ({ pageNum }: { pageNum: number }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/game/discount`,
    {
      params: { page: pageNum, size: 5 },
    }
  );
  return response?.data?.data?.list;
};

export default getDiscountGame;
