import { cn } from "@/utils";

type modalStyle = {
  boxStyle: string;
  labelStyle: string;
};

interface NoticeModalGroupProps {
  label: string;
  type: "writer" | "input";
  modalStyle: modalStyle;
}

const NoticeModalGroup = ({
  label,
  type,
  modalStyle,
}: NoticeModalGroupProps) => {
  return (
    <div
      className={cn(
        modalStyle.boxStyle,
        type === "writer" ? "h-[40px]" : "h-[56px]"
      )}
    >
      <p className={modalStyle.labelStyle}>{label}</p>
      <div
        className={cn(
          "flex-1 px-4 py-2 bg-white text-[14px] leading-5 text-gray8 border-t border-gray2",
          type === "writer" ? "h-[40px]" : "h-[56px]"
        )}
      >
        {type === "writer" ? (
          <p className="flex-1 h-full bg-white text-[14px] leading-5 text-gray8">
            플레이하이브 관리자
          </p>
        ) : (
          <input
            type="text"
            placeholder="내용을 입력해주세요."
            className="w-full h-[40px] rounded-[5px] border p-3 bg-white border-gray3"
          />
        )}
      </div>
    </div>
  );
};

export default NoticeModalGroup;
