import snsAddInfo from "@/services/sign/snsAddInfo";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/utils/Store";

interface SnsAddInfoData {
  email: string;
  memberType: "LOCAL" | "KAKAO" | "NAVER" | "GOOGLE" | "DISCORD";
  tel: string;
  nickname: string;
}

const useSnsAddInfo = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: (data: SnsAddInfoData) => snsAddInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      login();
      router.replace("/");
    },
  });
};

export default useSnsAddInfo;
