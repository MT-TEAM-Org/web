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
  ISPHOTO_ICON: {
    svgOptions: {
      viewBox: "0 0 12 12",
    },
    icon: (
      <>
        <path
          d="M6.45106 8.26323L4.02532 5.83716C3.61722 5.429 2.95438 5.43263 2.55078 5.84523L1.33325 7.08988"
          stroke="#A6A6A6"
          strokeWidth="1.03694"
          strokeLinejoin="round"
        />
        <rect
          x="1.33325"
          y="1.33398"
          width="9.33161"
          height="9.3329"
          rx="1.03694"
          stroke="#A6A6A6"
          strokeWidth="0.777706"
        />
        <path
          d="M5.97096 8.5196L7.50401 6.98632C7.91875 6.57152 8.59471 6.58302 8.9951 7.01169L10.6667 8.80138"
          stroke="#A6A6A6"
          strokeWidth="1.03694"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.40991 1.50391V7.18903L3.25241 5.34626L6.11418 8.16921L8.1919 6.5617L10.4656 8.56129V1.50391H1.40991ZM7.81069 4.64254C8.31044 4.64254 8.71557 4.23735 8.71557 3.73753C8.71557 3.23771 8.31044 2.83252 7.81069 2.83252C7.31093 2.83252 6.9058 3.23771 6.9058 3.73753C6.9058 4.23735 7.31093 4.64254 7.81069 4.64254Z"
          fill="#A6A6A6"
        />
      </>
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
