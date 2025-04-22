import axios from "axios";

interface getGameEventProps {
  pageNum: number;
  size: number;
}

const getGameEvent = async ({ pageNum, size = 5 }: getGameEventProps) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/game/event`,
    {
      params: { page: pageNum, size },
    }
  );
  return response.data?.data?.list;
};

export default getGameEvent;
