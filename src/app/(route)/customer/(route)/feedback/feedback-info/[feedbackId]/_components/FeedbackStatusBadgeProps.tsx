import { cn } from "@/utils";

interface FeedbackStatusBadgeProps {
  status: "RECEIVED" | "COMPLETED";
}

export default function FeedbackStatusBadge({
  status,
}: FeedbackStatusBadgeProps) {
  const statusBoxClass = "w-[69px] h-[32px] rounded-[2px] px-2 py-[6px] flex";
  const baseClass = "font-bold text-[14px] leading-5";
  const statusMap = {
    RECEIVED: {
      bg: "bg-gray1",
      textColor: "text-gray7",
      label: "접수 완료",
    },
    COMPLETED: {
      bg: "bg-bg0",
      textColor: "text-gra",
      label: "개선 완료",
    },
  };

  const { bg, textColor, label } = statusMap[status];

  return (
    <div className={cn("rounded px-2 py-1", bg, statusBoxClass)}>
      <p className={cn(baseClass, textColor)}>{label}</p>
    </div>
  );
}
