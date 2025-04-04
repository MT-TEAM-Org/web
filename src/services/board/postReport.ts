import axios from "axios";
import { ReportData } from "./types/report";

const postReport = async (data: ReportData) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/reports`,
    data,
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
  return response.data;
};

export default postReport;
