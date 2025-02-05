"use client";

import { useSearchParams } from "next/navigation";
import useReissue from "@/_hooks/useReissue";
import { useEffect } from "react";
import { setCookie } from "./useCookies";
import { getCookie } from "./useCookies";

interface ReissueFunction {
  (): void;
}

const useSocialReissue = () => {
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("refreshToken");
  const { mutate: reissue, isError, isSuccess } = useReissue();

  const reissueToken = async (reissue: ReissueFunction): Promise<void> => {
    if (!refreshToken) return;
    await setCookie("X-Refresh-Token", refreshToken).then(() => {
      reissue();
    });
  };

  useEffect(() => {
    if (!getCookie("X-Refresh-Token")) return;
    reissueToken(reissue);
  }, [refreshToken]);

  return { isError, isSuccess };
};

export default useSocialReissue;
