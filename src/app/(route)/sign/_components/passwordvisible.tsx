import { FC } from "react";

interface PasswordIsVisibleProps {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const PasswordIsVisible: FC<PasswordIsVisibleProps> = ({
  isPasswordVisible,
  togglePasswordVisibility,
}) => {
  return (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="absolute right-[10px] top-[50%] transform -translate-y-[50%]"
    >
      {isPasswordVisible ? (
        <svg
          width="20"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3C5.58 3 2 6.58 2 10s3.58 7 8 7 8-3.58 8-7-3.58-7-8-7zm0 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5zm-1-7h2v4h-2zm-2 0h2v4H7z"
            fill="#000"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 3C5.58 3 2 6.58 2 10s3.58 7 8 7 8-3.58 8-7-3.58-7-8-7zm0 12c-2.71 0-5-2.29-5-5s2.29-5 5-5 5 2.29 5 5-2.29 5-5 5zm-1-7h2v4h-2zm-2 0h2v4H7z"
            fill="#000"
          />
        </svg>
      )}
    </button>
  );
};

export default PasswordIsVisible;
