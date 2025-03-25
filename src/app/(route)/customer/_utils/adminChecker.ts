import useAuthCheck from "@/_hooks/useAuthCheck";

export const useAdminRole = (): "USER" | "ADMIN" | null => {
  const { data, isLoading, isError } = useAuthCheck();

  if (isLoading) {
    return undefined;
  }

  if (isError || !data) {
    return undefined;
  }

  return data?.data?.data?.role as "USER" | "ADMIN";
};