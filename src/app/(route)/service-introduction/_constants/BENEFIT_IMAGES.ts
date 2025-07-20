import { cn } from "@/utils";

export const benefitImages = [
    {
      src: "/Service_benefit2_3.png",
      width: 193,
      height: 193,
      className: cn(
        "absolute top-[215px] left-[76px] rounded-[25px] opacity-50",
        "tablet:w-[243px] tablet:h-[223px] tablet:top-[300px] tablet:left-[60px]",
        "mobile:w-[150px] mobile:h-[150px] mobile:top-[200px] mobile:left-[20px]"
      ),
      shadowClass: "shadow-sm",
      zIndex: "z-0",
    },
    {
      src: "/Service_benefit2_1.png",
      width: 316,
      height: 316,
      className: cn(
        "absolute top-[10px] left-[5px] rounded-[25px]",
        "tablet:w-[436px] tablet:h-[436px] tablet:top-[0px] tablet:left-[-100px]",
        "mobile:w-[280px] mobile:h-[280px] mobile:top-[10px] mobile:left-[-60px]"
      ),
      shadowClass: "shadow-lg",
      zIndex: "z-10",
    },
    {
      src: "/Service_benefit2_2.png",
      width: 293,
      height: 274,
      className: cn(
        "absolute top-[55px] left-[180px] rounded-[25px] opacity-95",
        "tablet:w-[400px] tablet:h-[400px] tablet:top-[120px] tablet:left-[170px]",
        "mobile:w-[240px] mobile:h-[240px] mobile:top-[90px] mobile:left-[90px]"
      ),
      shadowClass: "shadow-md",
      zIndex: "z-20",
    },
  ];