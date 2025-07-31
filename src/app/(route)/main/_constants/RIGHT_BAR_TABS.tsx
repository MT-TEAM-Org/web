interface TabConfig {
  label: string;
  onClick: (setButtonActive: (value: boolean) => void) => void;
  isActive: boolean;
  ariaLabel: string;
}

export const getRightBarTabs = (
  setButtonActive: (value: boolean) => void,
  buttonActive: boolean
): TabConfig[] => [
  {
    label: "뉴스",
    onClick: () => setButtonActive(true),
    isActive: buttonActive,
    ariaLabel: "뉴스 탭",
  },
  {
    label: "게임 이벤트",
    onClick: () => setButtonActive(false),
    isActive: !buttonActive,
    ariaLabel: "게임 이벤트 탭",
  },
];
