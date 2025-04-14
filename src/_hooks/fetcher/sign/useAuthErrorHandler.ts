import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useAuthErrorHandler = () => {
  const queryClient = useQueryClient();

  const handleAuthError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
    }
  };

  return handleAuthError;
};

export default useAuthErrorHandler;
