"use client";

import { useSearchParams } from "next/navigation";
import useReissue from "@/_hooks/useReissue";
import { useEffect } from "react";
import { setCookie } from "./useCookies";
import { getCookie } from "./useCookies";

const useSocialReissue = () => {
  const searchParams = useSearchParams();
  const refreshToken = searchParams.get("refreshToken");
  const { mutate: reissue, isError, isSuccess } = useReissue();

  const reissueToken = async (): Promise<void> => {
    if (!refreshToken) return;
    await setCookie("X-Refresh-Token", refreshToken).then(() => {
      reissue(undefined, {
        onSuccess: (data) => {
          localStorage.setItem("accessToken", data.headers.authorization);
        },
      });
    });
  };

  useEffect(() => {
    if (!getCookie("X-Refresh-Token")) return;
    reissueToken();
  }, [refreshToken]);

  return { isError, isSuccess };
};

export default useSocialReissue;
