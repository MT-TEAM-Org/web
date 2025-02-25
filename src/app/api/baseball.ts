import axios from "axios";

// 환경 변수에서 API 키 및 기본 URL 가져오기
const API_KEY =
  process.env.NEXT_PUBLIC_API_KEY || "692dfbba089eaecd71c8c6a1434561d7";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://v1.baseball.api-sports.io";

// axios 클라이언트 생성
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-apisports-key": API_KEY,
    "Content-Type": "application/json",
  },
});

//시즌 목록
export const getSeasons = async () => {
  const response = await apiClient.get("/seasons");
  return response.data;
};

//  특정 시즌과 리그의 팀
export const getTeams = async (season: string, leagueId: string) => {
  const response = await apiClient.get(
    `/teams?season=${encodeURIComponent(season)}&league=${encodeURIComponent(
      leagueId
    )}`
  );
  return response.data;
};

// 팀의 경기 통계
export const getTeamStatistics = async (season: string, teamId: string) => {
  const response = await apiClient.get(
    `/statistics?season=${encodeURIComponent(season)}&team=${encodeURIComponent(
      teamId
    )}`
  );
  return response.data;
};

// 특정 시즌과 리그의 순위표
export const getStandings = async (season: string, leagueId: string) => {
  const response = await apiClient.get(
    `/standings?season=${encodeURIComponent(
      season
    )}&league=${encodeURIComponent(leagueId)}`
  );
  return response.data;
};

// 리그의 순위표 스테이지
export const getStandingStages = async (leagueId: string) => {
  const response = await apiClient.get(
    `/standing/stages?league=${encodeURIComponent(leagueId)}`
  );
  return response.data;
};

// 특정 시즌과 리그의 경기 일정
export const getGames = async (season: string, leagueId: string) => {
  const response = await apiClient.get(
    `/games?season=${encodeURIComponent(season)}&league=${encodeURIComponent(
      leagueId
    )}`
  );
  return response.data;
};

//  두 팀 간의 상대 전적 가져오기
export const getH2HGames = async (team1Id: string, team2Id: string) => {
  const response = await apiClient.get(
    `/games/h2h?team1=${encodeURIComponent(team1Id)}&team2=${encodeURIComponent(
      team2Id
    )}`
  );
  return response.data;
};
