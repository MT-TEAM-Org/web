import React from "react";
import BaseballTopPlayerItem from "./BaseballTopPlayerItem";

const TopPlayers = [
  {
    name: "레예스",
    stats: {
      innings: 7,
      hitsAllowed: 3,
      earnedRuns: 0,
    },
  },
  {
    name: "엔스",
    stats: {
      innings: 7,
      hitsAllowed: 3,
      earnedRuns: 0,
    },
  },
  {
    name: "레예스",
    stats: {
      innings: 7,
      hitsAllowed: 3,
      earnedRuns: 0,
    },
  },
];

const BaseballTopPlayers = () => {
  return (
    <div className="w-full min-h-[196px] flex flex-col gap-3">
      <p className="text-bold font-[18px] leading-7 tracking-[-0.04em] text-[#181818]">
        주요선수 요약
      </p>
      <div className="w-full min-h-[156px] flex flex-col gap-2">
        <div className="w-full min-h-[74px] flex flex-col gap-2">
          <div className="flex">
            {TopPlayers.map((player, index) => (
              <BaseballTopPlayerItem key={index} />
            ))}
          </div>
          <div className="flex">
            {TopPlayers.map((player, index) => (
              <BaseballTopPlayerItem key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseballTopPlayers;
