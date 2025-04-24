"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/Store";
import useAuthCheck from "@/_hooks/useAuthCheck";

const useRouteHome = (isLogin = false) => {
  const router = useRouter();
  const { isLoading } = useAuthCheck();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn === isLogin && !isLoading) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);
};

export default useRouteHome;
