interface DocumentProps {
  size?: number;
}

const Document_icon = ({ size = 24 }: DocumentProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.72754 7.6958H15.273"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.72754 10.9685H15.273"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.72754 14.2412H15.273"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.9424 3.22922C19.7889 3.08245 19.5808 3 19.3638 3H4.63654C4.41955 3 4.21144 3.08245 4.058 3.22922C3.90456 3.37599 3.81836 3.57505 3.81836 3.78261V20.2174C3.81836 20.425 3.90456 20.624 4.058 20.7708C4.21144 20.9175 4.41955 21 4.63654 21H19.3638C19.5808 21 19.7889 20.9175 19.9424 20.7708C20.0958 20.624 20.182 20.425 20.182 20.2174V3.78261C20.182 3.57505 20.0958 3.37599 19.9424 3.22922Z"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Document_icon;
