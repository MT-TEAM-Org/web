"use client";

import useGetEsportsLive from "@/_hooks/fetcher/match-controller/useGetEsportsLive";

interface ScheduleDataProps {
  matchId: number;
}

const LiveSection = ({ matchId }) => {
  const { data: esportsLiveData } = useGetEsportsLive();
  console.log(esportsLiveData, "esportsLiveData");

  const isLive = esportsLiveData?.data?.live === true;

  return (
    <div className="w-[800px] h-[440px]">
      {isLive ? (
        <iframe
          src={`https://www.youtube.com/embed/${esportsLiveData?.data?.videoId}`}
          width="800"
          height="440"
          allowFullScreen
        />
      ) : (
        <div className="w-[800px] h-[440px] flex justify-center items-center mx-auto text-center">
          빈 값
        </div>
      )}
    </div>
  );
};
export default LiveSection;
