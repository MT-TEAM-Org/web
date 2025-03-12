import Fake_scheduleItem from "@/app/_components/icon/Fake_scheduleItem";
import Gameboard_cross_arrow from "@/app/_components/icon/Gameboard_cross_arrow";
import React from "react";

const players = [
  { name: "뱅크스", sub: "바우어 28`" },
  { name: "티에츠", sub: "에센데 72’" },
  { name: "마이어", sub: "오니에카 72’" },
  { name: "쿠도수", sub: "굼니 72’" },
  { name: "옌센", sub: "클로드 모리스 82’" },
  { name: "무니에", sub: null },
  { name: "브라이트하웁트", sub: null },
  { name: "쾨뮈르", sub: null },
  { name: "라브로비치", sub: null },
];

const FootballSubPlayersList = () => {
  return (
    <div className="w-full min-h-[586px]">
      <div className="w-full max-w-[367px] min-h-[46px] p-1 flex gap-1 items-center justify-start">
        <Fake_scheduleItem />
        <p className="font-bold text-[18px] leading-7">
          아우크스 부르크 후보선수
        </p>
        {/* 목 데이터 */}
      </div>

      {players.map((player, index) => (
        <div
          key={index}
          className="w-full max-w-[367px] min-h-[60px] border-b py-2 px-3 border-[#EEEEEE]"
        >
          <p className="text-[16px] leading-6 text-[#424242]">{player.name}</p>
          {player.sub ? (
            <div className="text-[14px] leading-5 text-[#A6A6A6] flex gap-1 items-center justify-start">
              <div className="w-[16px] h-[16px]">
                <Gameboard_cross_arrow />
              </div>
              <p>{player.sub}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default FootballSubPlayersList;
