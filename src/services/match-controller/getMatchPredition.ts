import axios from "axios";
import { headers } from "next/headers";

const getMatchPrediction = async (matchId: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/match/prediction/${matchId}`
  );
  return response.data;
};

export default getMatchPrediction;
