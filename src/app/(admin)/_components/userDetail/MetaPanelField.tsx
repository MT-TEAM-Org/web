import { cn } from "@/utils";

interface MetaPanelFieldProps {
  item: any; // 타입 수정 필요
}

const MetaPanelField = ({ item }: MetaPanelFieldProps) => {
  return (
    <div
      className={cn(
        "w-full min-h-[40px] flex items-center border border-gray2 border-b-0",
        item.className
      )}
    >
      <p className="w-[100px] h-full px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
        {item.name}
      </p>
      <p
        className={cn(
          "flex-1 px-4 py-2 bg-white h-full font-medium text-[14px] leading-5",
          item.style
        )}
      >
        {item.value} <span className="text-gray6">{item.subValue}</span>
      </p>
    </div>
  );
};

export default MetaPanelField;
