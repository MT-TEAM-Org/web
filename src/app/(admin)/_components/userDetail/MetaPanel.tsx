import React from "react";
import RadioGroup from "@/app/(admin)/_components/search/RadioGroup";
import { MetaPanelData } from "../../MockData";
import MetaPanelButtons from "./MetaPanelButtons";
import MetaPanelField from "./MetaPanelField";

interface MetaPanelProps {
  type: "inquiry" | "suggestions" | "content";
  title: string;
}

const MetaPanel = ({ type, title }: MetaPanelProps) => {
  const data = MetaPanelData[type]; // 타입 데이터

  return (
    <div className="w-1/2 flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-bold text-[18px] leading-7 tracking-[-0.04em] text-black">
          {title}
        </h2>
        <MetaPanelButtons type={type} />
      </div>
      <div className="flex flex-col">
        {data.map((item: any, idx: number) => (
          <MetaPanelField item={item} key={idx} />
        ))}
        {type === "content" && (
          <RadioGroup
            label="처리 상태"
            name="status"
            type="radio"
            className="border border-gray2 border-b-0"
            options={[
              { id: "waiting", label: "노출" },
              { id: "completed", label: "보류" },
              { id: "success", label: "숨김" },
            ]}
          />
        )}
        <div className="w-full min-h-[40px] flex items-center border border-gray2">
          <p className="w-[100px] h-full px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
            답변
          </p>
          <div className="flex-1 px-4 py-2">
            <input
              type="text"
              placeholder="내용을 입력해 주세요"
              className="w-full h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
            />
          </div>
        </div>

        {type === "suggestions" && (
          <>
            <RadioGroup
              label="처리 상태"
              name="status"
              type="radio"
              options={[
                { id: "waiting", label: "접수 전" },
                { id: "completed", label: "접수완료" },
                { id: "success", label: "개선완료" },
              ]}
            />
            <RadioGroup
              label="중요도"
              name="importance"
              type="radio"
              options={[
                { id: "low", label: "낮음" },
                { id: "medium", label: "중간" },
                { id: "high", label: "높음" },
              ]}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MetaPanel;
