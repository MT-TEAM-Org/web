import axios from "axios";
import { apiRequest } from "../instant";

type Team = {
  id: number;
  name: string;
  logo: string;
  category: string;
};

type MatchGroup = {
  date?: string;
  startTime: string;
  list: MatchItem[];
};

type MatchItem = {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  place: string;
  category: string;
  startTime: string;
  leagueName: string;
};

type MatchScheduleResponse = {
  data: {
    list: MatchItem[];
  };
};

const getMatchSchedule = async (
  category?: string
): Promise<MatchScheduleResponse> => {
  const endpoint = category
    ? `${process.env.NEXT_PUBLIC_API_URL}api/match/schedule/${category}`
    : `${process.env.NEXT_PUBLIC_API_URL}api/match/schedule`;

  const response = await axios.get(endpoint);
  return response.data as MatchScheduleResponse;
};

export default getMatchSchedule;

export type { Team, MatchItem, MatchScheduleResponse, MatchGroup };
