import usePostCommunityContent from "@/_hooks/community";
import getUpload from "@/_hooks/getUpload";
import Tiptap from "@/app/_components/_tiptap/Tiptap";
import TitleDag from "@/app/_components/_tiptap/TitleDag";
import { CommunityData } from "@/app/_constants/categories";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteProps {
  category: string;
  subCategory: string;
}

interface FormData {
  boardType: string;
  categoryType: string;
  title: string;
  content: string;
  link: string;
  thumbnail: string;
}

export function Write({ category, subCategory }: WriteProps) {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      boardType: category,
      categoryType: subCategory === "ALL" ? "FREE" : subCategory,
      content: "",
      title: "",
      link: "",
      thumbnail: "",
    },
  });

  const pathName = usePathname();
  const boardType = pathName?.split("/")[1];

  const { mutate: postContent } = usePostCommunityContent();

  const handleImageUpload = async (blob: Blob) => {
    try {
      // presigned URL 받아오기
      const response = await getUpload({
        contentType: blob.type,
        fileName: `image-${Date.now()}.${blob.type.split("/")[1]}`,
      });

      // presigned URL로 실제 파일 업로드
      await axios.put(response.data.presignedUrl, blob, {
        headers: {
          "Content-Type": blob.type,
        },
      });

      // 다운로드 URL 반환
      return response.data.downloadUrl;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    }
  };

  const getYoutubeThumbnail = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|embed\/|v\/))([^?&]+)/
    );
    return match
      ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
      : "";
  };

  useEffect(() => {
    const link = watch("link");
    if (link) {
      const thumbnail = getYoutubeThumbnail(link);
      if (thumbnail) {
        setValue("thumbnail", thumbnail);
      }
    }
  }, [watch("link")]);

  const onSubmit = async (data: FormData) => {
    const currentCategory = watch("categoryType");

    const communityData: CommunityData = {
      boardType: boardType.toLocaleUpperCase(),
      categoryType: currentCategory,
      title: data.title,
      content: data.content,
      link: data.link,
      thumbnail: data.thumbnail,
    };
    postContent(communityData);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TitleDag
          register={register}
          watch={watch}
          selectedCategory={subCategory === "ALL" ? "FREE" : subCategory}
        />
        <Tiptap
          onChange={(content) => setValue("content", content)}
          register={register}
          watch={watch}
          initialContent=""
          onImageUpload={handleImageUpload}
          setValue={setValue}
        />
      </form>
    </div>
  );
}
