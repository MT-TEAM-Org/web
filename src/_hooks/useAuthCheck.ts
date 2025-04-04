"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const fetchAuthCheck = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  return response;
};

const useAuthCheck = () => {
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  const query = useQuery({
    queryKey: ["authCheck"],
    queryFn: fetchAuthCheck,
    enabled: !!getToken(),
    retry: false,
    staleTime: 3600000, // 1 hour in milliseconds
    gcTime: 3600000, // 1 hour in milliseconds
  });

  useEffect(() => {
    if (query.isError && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  }, [query.isError]);

  return query;
};

export default useAuthCheck;
