import { cn } from "@/utils";

interface FeedbackStatusBadgeProps {
  status: "RECEIVED" | "COMPLETED" | "PENDING";
}

export default function FeedbackStatusBadge({
  status,
}: FeedbackStatusBadgeProps) {
  const statusBoxClass = "w-[69px] h-[32px] rounded-[2px] px-2 py-[6px] flex";
  const statusMap = {
    RECEIVED: {
      className: "bg-gray1 text-gray7",
      label: "접수 완료",
    },
    COMPLETED: {
      className: "bg-bg0 text-gra",
      label: "개선 완료",
    },
  };

  const statusInfo = statusMap[status];

  if (!statusInfo) {
    return null;
  }

  const { className, label } = statusInfo;

  return (
    <div className={cn("rounded px-2 py-1", className, statusBoxClass)}>
      <p className="font-bold text-[14px] leading-5">{label}</p>
    </div>
  );
}
