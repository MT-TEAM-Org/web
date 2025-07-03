interface LinkOutProps {
  size?: number;
}

const LinkOut_icon = ({ size = 24 }: LinkOutProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 5H13L19 11V5ZM19 5L10 14"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M19 5H13L19 11V5Z" fill="white" />
      <path
        d="M19 14.7778V17.4444C19 17.857 18.8361 18.2527 18.5444 18.5444C18.2527 18.8361 17.857 19 17.4444 19H6.55556C6.143 19 5.74733 18.8361 5.45561 18.5444C5.16389 18.2527 5 17.857 5 17.4444V6.55556C5 6.143 5.16389 5.74733 5.45561 5.45561C5.74733 5.16389 6.143 5 6.55556 5H9.22222"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default LinkOut_icon;
