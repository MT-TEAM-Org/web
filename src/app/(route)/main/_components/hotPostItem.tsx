import React from 'react';

interface HotPostItemProps {
  number: number;
}

const HotPostItem: React.FC<HotPostItemProps> = ({ number }) => {
  return (
    <div className="max-w-[419px] min-h-[36px] flex items-center text-center gap-2 cursor-pointer">
      <div className="max-w-[20px] min-h-[20px] flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="max-w-[40px] min-h-[18px] mx-3 text-[#A6A6A6]">subtitle</div>
      <div className="max-w-[300px] min-h-[20px] text-sm">
        안세영 사태는 한국 스포츠계가 얼마나 후진적인지...
      </div>
    </div>
  );
};

export default HotPostItem;