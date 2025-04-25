import login from "@/services/sign/login";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.headers.authorization);
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      router.replace("/");
    },
  });
};

export default useLogin;
