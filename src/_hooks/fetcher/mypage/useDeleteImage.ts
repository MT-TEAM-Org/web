import deleteImage from "@/services/mypage/deleteImage";
import { useMutation } from "@tanstack/react-query";

const useDeleteImage = () => {
  return useMutation({
    mutationFn: (imageUrl: string) => deleteImage(imageUrl),
  });
};

export default useDeleteImage;
