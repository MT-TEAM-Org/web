import Link from "next/link";
import { cn } from "@/utils";

interface MetaPanelButtonsProps {
  type: "inquiry" | "suggestions" | "content";
}

const buttonStyle =
  "w-[120px] h-[40px] rounded-[5px] text-center text-white font-bold text-[14px] transition-colors flex items-center justify-center";

const MetaPanelButtons = ({ type }: MetaPanelButtonsProps) => {
  return (
    <div className="flex gap-2 items-center">
      {(type === "suggestions" || type === "content") && (
        <Link
          href="/"
          className={cn(
            buttonStyle,
            "bg-white border border-gray3 hover:bg-gray1 text-black"
          )}
        >
          게시물 새창열기
        </Link>
      )}
      <button className={cn(buttonStyle, "bg-gra hover:bg-gra/80")}>
        저장
      </button>
    </div>
  );
};

export default MetaPanelButtons;
