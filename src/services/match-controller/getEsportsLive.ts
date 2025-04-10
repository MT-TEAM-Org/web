import axios from "axios";

const getEsportsLive = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/match/esports/youtube`
  );

  return response.data;
};

export default getEsportsLive;
