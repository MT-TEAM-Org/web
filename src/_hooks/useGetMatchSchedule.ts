"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMatchScheduleData = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/match/schedule`, {
    params: {
      matchCategory: "BASEBALL",
    },
  });

  return response
};

// 경기중계 api 테스트
const useGetMatchSchedule = () => {
  return useQuery({
    queryKey: ["matchScheduleData"],
    queryFn: fetchMatchScheduleData,
    retry: 1,
  });
};

export default useGetMatchSchedule;