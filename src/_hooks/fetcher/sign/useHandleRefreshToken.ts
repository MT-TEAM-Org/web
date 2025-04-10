"use client";

import useReissue from "@/_hooks/useReissue";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useHandleRefreshToken = () => {
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("refreshToken") || null;
  const { mutate: reissue } = useReissue();
  console.log(refreshToken);
  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
      setTimeout(() => {
        reissue();
      }, 100);
    }
  }, [refreshToken]);

  return refreshToken;
};

export default useHandleRefreshToken;
