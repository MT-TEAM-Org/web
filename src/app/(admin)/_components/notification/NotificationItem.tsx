import React from "react";

interface NotificationItem {
  id: string;
  type: string;
  status: string;
  date: string;
  content: string;
  writer: string; // TODO: 타입 수정 필요 (임시)
}

const NotificationItem = ({ item }: { item: NotificationItem }) => {
  return (
    <div className="w-full h-[96px] border-b p-3 flex flex-col items-start justify-center gap-2 bg-white border-gray2">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-1">
          <p className="h-[24px] rounded-[2px] flex items-center justify-center p-2 bg-gray1 font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-gray7">
            {/* 타입 */}
            {item.type}
          </p>
          <p className="h-[24px] rounded-[2px] flex items-center justify-center p-2 bg-gray1 font-bold text-[12px] leading-[18px] tracking-[-0.02em] text-gray7">
            {/* 상태 */}
            {item.status}
          </p>
        </div>
        <p className="font-medium text-[12px] leading-[18px] tracking-[-0.02em] text-gray6">
          {/* 시간 */}
          {item.date}
        </p>
      </div>
      <div className="w-full h-[40px] flex flex-col gap-[2px] items-start justify-start">
        {/* 내용 */}
        <p className="w-full font-bold text-[14px] leading-5 text-gray8 truncate text-start">
          {item.content}
        </p>
        {/* 작성자 */}
        <p className="w-full font-medium text-[12px] leading-[18px] tracking-[-0.02em] text-gray5 text-start">
          {item.writer}
        </p>
      </div>
    </div>
  );
};

export default NotificationItem;
