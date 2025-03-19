import { QueryClient } from "@tanstack/react-query";

export const getAdminRole = (queryClient: QueryClient): "USER" | "ADMIN" | undefined => {
  const authStatus = queryClient.getQueryData(["authCheck"]) as {
    data: { data: { role: string } };
  } | undefined;

  return authStatus?.data?.data?.role as "USER" | "ADMIN" | undefined;
};