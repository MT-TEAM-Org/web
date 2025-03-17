const ICONS = {
  CLOSE_X: {
    svgOptions: {
      viewBox: "0 0 24 24",
    },
    icon: (
      <path
        d="M3 3L21 21M21 3L3 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
};

export type IconList = keyof typeof ICONS;
export type IconType = {
  [key in IconList]: {
    svgOptions?: {
      viewBox?: string;
      style?: React.CSSProperties;
    };
    icon: React.ReactNode;
  };
};

export default ICONS as IconType;
