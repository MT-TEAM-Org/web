import { cn } from "@/utils";
import ICONS, { IconList } from "./constants";

type IconProps = {
  icon: IconList;
  className?: string;
};

const CustomIcon = ({ icon, className }: IconProps) => {
  const iconData = ICONS[icon];
  const svgOptions = iconData.svgOptions || {};

  return (
    <svg
      className={cn("fill-current", className)}
      viewBox={svgOptions.viewBox || "0 0 20 20"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgOptions}
    >
      {iconData.icon}
    </svg>
  );
};

export default CustomIcon;
export type { IconProps };
