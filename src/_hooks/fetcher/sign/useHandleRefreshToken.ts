"use client";

import useReissue from "@/_hooks/useReissue";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const useHandleRefreshToken = () => {
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("refreshToken") || null;
  const { mutate: reissue } = useReissue();

  useEffect(() => {
    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; samesite=strict;`;
      reissue();
    }
  }, [refreshToken]);

  return refreshToken;
};

export default useHandleRefreshToken;
