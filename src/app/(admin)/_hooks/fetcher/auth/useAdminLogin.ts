import adminLogin from "@/app/(admin)/_service/auth/adminLogin";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useAdminLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      adminLogin(data),
    onSuccess: (data) => {
      localStorage.setItem("adminAccessToken", data.headers.authorization);
      queryClient.invalidateQueries({ queryKey: ["AdminAuthCheck"] });
      router.replace("/dashBoard");
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};

export default useAdminLogin;
