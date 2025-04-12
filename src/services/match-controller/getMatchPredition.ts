import axios from "axios";

interface Team {
  id: number;
  name: string;
  logo: string;
  category: string;
}

interface PredictionData {
  home: number;
  away: number;
  homeTeam: Team;
  awayTeam: Team;
  id: number;
  matchId: number;
}

interface PredictionResponse {
  status: string;
  msg: string;
  data: PredictionData;
}

const getMatchPrediction = async (
  matchId: number
): Promise<PredictionResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/match/prediction/${matchId}`
  );
  return response.data;
};

export default getMatchPrediction;
