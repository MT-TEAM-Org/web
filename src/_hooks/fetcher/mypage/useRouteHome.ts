"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/utils/Store";

const useRouteHome = (isLogin = false) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn === isLogin) {
      router.replace("/");
    }
  }, [isLoggedIn, router]);
};

export default useRouteHome;
