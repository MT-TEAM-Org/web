import React from "react";

const double = [
  {
    player: "김도영",
    details: "(1회)",
  },
  {
    player: "구자욱",
    details: "(1회)",
  },
  {
    player: "구자욱",
    details: "(1회)",
  },
  {
    player: "구자욱",
    details: "(1회)",
  },
];

interface BaseballRecordItemProps {
  title: string;
}

const BaseballRecordItem: React.FC<BaseballRecordItemProps> = ({ title }) => {
  return (
    <div className="w-full min-h-[44px] p-3 flex gap-6">
      <p className="min-w-[37px] min-h-[20px] flex gap-[10px] text-[14px] leading-5 text-[#303030]">
        {title}
      </p>
      <div className="w-full min-h-[20px] flex gap-1">
        {double.map((player, index) => (
          <div
            key={index}
            className="min-w-[68px] min-h-[20px] flex gap-1 justify-center"
          >
            <p className="text-[14px] leading-5 text-[#303030]">
              {player.player}
            </p>
            <p className="text-[12px] leading-[18px] tracking-[-0.02em] text-[#A6A6A6]">
              {player.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseballRecordItem;
