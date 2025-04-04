import axios from "axios";
import { MatchScheduleResponse } from "./getMatchSchedule";

const getEsportsMatch = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}api/match/schedule/ESPORTS`
  );
  return response.data;
};

export default getEsportsMatch;
