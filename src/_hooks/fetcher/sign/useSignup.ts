import signup from "@/services/sign/signup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Signup {
  email: string;
  password?: string;
  tel: string;
  nickname: string;
}

const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Signup) => signup(data),
    onSuccess: () => {
      router.push("/sign?sign=login");
    },
  });
};

export default useSignup;
