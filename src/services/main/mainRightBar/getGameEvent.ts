import axios from "axios";

const getGameEvent = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/game/event`,
    {
      params: { page: 1, size: 1 },
    }
  );
  return response.data?.data?.list;
};

export default getGameEvent;
