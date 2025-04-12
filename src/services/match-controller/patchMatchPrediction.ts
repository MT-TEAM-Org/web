import axios from "axios";

export interface PatchPreditonData {
  matchPredictionId: number;
  side: string;
}

const patchMatchPrediction = async (data: PatchPreditonData) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}api/match/prediction`,
    data,
    {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export default patchMatchPrediction;
