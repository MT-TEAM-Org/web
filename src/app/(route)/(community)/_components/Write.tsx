import usePostCommunityContent from "@/_hooks/community";
import usePutPost from "@/_hooks/fetcher/board/usePutPost";
import getUpload from "@/_hooks/getUpload";
import Tiptap from "@/app/_components/_tiptap/Tiptap";
import TitleDag from "@/app/_components/_tiptap/TitleDag";
import WriteModal from "@/app/_components/WriteModal";
import { CommunityData } from "@/app/_constants/categories";
import { useEditStore } from "@/utils/Store";
import axios from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface WriteProps {
  category: string;
  subCategory: string;
  modalId?: string;
}

interface FormData {
  boardType: string;
  categoryType: string;
  title: string;
  content: string;
  link: string;
  thumbnail: string;
}

export function Write({ category, subCategory, modalId }: WriteProps) {
  const { isEditMode, boardId, boardData, resetEditState } = useEditStore();

  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");

  const pathName = usePathname();
  const rootPath = pathName?.split("/")[1];
  const boardType = pathName?.split("/")[2];

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
      const response = await getUpload({
        contentType: blob.type,
        fileName: `image-${Date.now()}.${blob.type.split("/")[1]}`,
      });

      await axios.put(response.data.presignedUrl, blob, {
        headers: {
          "Content-Type": blob.type,
        },
      });

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

  const base64ToBlob = (base64: string) => {
    const parts = base64.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const onSubmit = async (data: FormData) => {
    let content = data.content;

    const matches = content.match(/data:image\/[a-z]+;base64,[^\"]+/g);

    if (matches) {
      for (let base64String of matches) {
        try {
          const blob = base64ToBlob(base64String);
          if (!blob) continue;

          const imageUrl = await handleImageUpload(blob);

          content = content.replace(base64String, imageUrl);
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
        }
      }
    }

    const thumbnail =
      data.thumbnail || (data.link ? getYoutubeThumbnail(data.link) : "");

    const currentCategory = watch("categoryType");

    const communityData: CommunityData = {
      boardType: boardType.toLocaleUpperCase(),
      categoryType: currentCategory,
      title: data.title,
      content,
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
      <WriteModal modalId={modalId} />
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
