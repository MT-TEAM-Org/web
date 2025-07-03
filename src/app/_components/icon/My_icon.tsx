interface MYProps {
  size?: number;
}

const My_icon = ({ size = 24 }: MYProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12.0019"
        cy="8.33617"
        r="5.07519"
        stroke="white"
        stroke-width="2"
      />
      <path
        d="M3.00098 20.7387C3.00098 18.1673 5.57241 13.4111 12.001 13.4111C18.4295 13.4111 20.7047 18.1673 21.001 20.7387"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default My_icon;
