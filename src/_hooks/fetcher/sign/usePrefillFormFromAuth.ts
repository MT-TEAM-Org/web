"use client";

import useAuthCheck from "@/_hooks/useAuthCheck";
import { SignupFormData } from "@/app/(route)/sign/types/signup";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

const usePrefillFormFromAuth = (setValue: UseFormSetValue<SignupFormData>) => {
  const { data: authCheck } = useAuthCheck();

  useEffect(() => {
    if (!authCheck) return;
    const { email, nickname, tel } = authCheck.data.data;
    setValue("email", email);
    setValue("nickname", nickname);
    if (tel) setValue("tel", tel);
  }, [authCheck]);

  return authCheck?.data?.data?.type;
};

export default usePrefillFormFromAuth;
