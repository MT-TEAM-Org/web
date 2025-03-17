import usePostCommunityContent from "@/_hooks/community";
import usePutPost from "@/_hooks/fetcher/board/usePutPost";
import getUpload from "@/_hooks/getUpload";
import { useToast } from "@/_hooks/useToast";
import Tiptap from "@/app/_components/_tiptap/Tiptap";
import TitleDag from "@/app/_components/_tiptap/TitleDag";
import { CommunityData } from "@/app/_constants/categories";
import { useEditStore } from "@/utils/Store";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
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
  const toast = useToast();
  const { isEditMode, boardId, boardData, resetEditState } = useEditStore();
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");

  const pathName = usePathname();
  const boardType = pathName?.split("/")[1];

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

  const link = watch("link");

  useEffect(() => {
    if (!editParam) {
      resetEditState();
    } else if (isEditMode && boardData) {
      setValue("categoryType", boardData.categoryType);
      setValue("title", boardData.title);
      setValue("content", boardData.content);
      if (boardData.link) setValue("link", boardData.link);
      if (boardData.thumbnail) setValue("thumbnail", boardData.thumbnail);
    }
    return () => {
      if (!editParam) {
        resetEditState();
      }
    };
  }, [editParam, isEditMode, boardData, setValue, resetEditState]);

  const { mutate: postContent } = usePostCommunityContent();
  const editPost = usePutPost();

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
    if (link) {
      const thumbnail = getYoutubeThumbnail(link);
      if (thumbnail) {
        setValue("thumbnail", thumbnail);
      }
    }
  }, [link]);

  const onSubmit = async (data: FormData) => {
    const thumbnail =
      data.thumbnail || (data.link ? getYoutubeThumbnail(data.link) : "");

    const currentCategory = watch("categoryType");

    const communityData: CommunityData = {
      boardType: boardType.toLocaleUpperCase(),
      categoryType: currentCategory,
      title: data.title,
      content: data.content,
      link: data.link,
      thumbnail,
    };
    if (isEditMode) {
      editPost.mutate({
        data: communityData,
        boardId,
      });
    } else {
      postContent(communityData);
    }
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
          initialContent={isEditMode && boardData ? boardData.content : ""}
          onImageUpload={handleImageUpload}
          setValue={setValue}
          onSubmit={handleSubmit(onSubmit)}
        />
      </form>
    </div>
  );
}
