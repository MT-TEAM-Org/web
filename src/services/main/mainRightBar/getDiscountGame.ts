import axios from "axios";

const getDiscountGame = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/game/discount`
  );
  return response?.data?.data?.list;
};

export default getDiscountGame;
