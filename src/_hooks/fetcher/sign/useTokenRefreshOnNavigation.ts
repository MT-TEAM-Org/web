"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useReissue from "@/_hooks/useReissue";

const useTokenRefreshOnNavigation = () => {
  const pathname = usePathname();
  const prevPathname = useRef<string | null>(null);
  const { mutate: reissue } = useReissue();
  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      const payload = parseJwt(accessToken);
      console.log(payload.exp * 1000);
      if (!payload.exp) return;
      const isExpired = payload.exp * 1000 - Date.now() < 5 * 60 * 1000; // 5 minutes before expiration
      if (isExpired) {
        reissue();
      }
    }
  }, [pathname]);
};

export default useTokenRefreshOnNavigation;
