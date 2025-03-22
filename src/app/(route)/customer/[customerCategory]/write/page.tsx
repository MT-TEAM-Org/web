"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import usePostFeedback from "@/_hooks/fetcher/customer/usePostFeedback";
import usePostNotice from "@/_hooks/fetcher/customer/usePostNotice";
import { useEditStore } from "@/utils/Store";
import axios from "axios";
import getUpload from "@/_hooks/getUpload";
import usePutPost from "@/_hooks/fetcher/board/usePutPost";
import CustomerTiptap from "../../_components/CustomerTiptap";

interface CustomerFormData {
  boardType: string;
  title: string;
  content: string;
  link: string;
  imgUrl: string;
}

const CustomerWrite = () => {
  const { isEditMode, boardId, boardData, resetEditState } = useEditStore();
  const router = useRouter();
  const pathName = usePathname();
  const writeType = pathName.split("/")[2];
  const editPost = usePutPost();
  const searchParams = useSearchParams();
  const editParam = searchParams.get("edit");

  useEffect(() => {
    const validTypes = ["notice", "feedback"];
    if (!validTypes.includes(writeType)) {
      router.push("/404");
    }
  }, [writeType, router]);

  const { mutate: postNotice } = usePostNotice();
  const { mutate: postFeedback } = usePostFeedback();

  const { register, handleSubmit, setValue, watch } = useForm<CustomerFormData>(
    {
      defaultValues: {
        boardType: writeType,
        content: "",
        title: "",
        link: "",
        imgUrl: "",
      },
    }
  );

  const link = watch("link");
  const imgUrl = watch("imgUrl");

  const [categoryType, setCategoryType] = React.useState(writeType);

  useEffect(() => {
    if (!editParam) {
      resetEditState();
    } else if (isEditMode && boardData) {
      setCategoryType(boardData.categoryType);
      setValue("title", boardData.title);
      setValue("content", boardData.content);
      if (boardData.link) setValue("link", boardData.link);
      if (boardData.thumbnail) setValue("imgUrl", boardData.thumbnail);
    }
    return () => {
      if (!editParam) {
        resetEditState();
      }
    };
  }, [editParam, isEditMode, boardData, setValue, resetEditState]);

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

      const uploadedUrl = response.data.downloadUrl;
      setValue("imgUrl", uploadedUrl);
      return uploadedUrl;
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
      const youtubeThumbnail = getYoutubeThumbnail(link);
      setValue("imgUrl", youtubeThumbnail);
    }
  }, [link, setValue]);

  const onSubmit = async (data: CustomerFormData) => {
    let finalImgUrl = data.imgUrl;

    if (data.link) {
      finalImgUrl = getYoutubeThumbnail(data.link);
    }

    const communityData = {
      boardType: writeType.toUpperCase(),
      categoryType: categoryType,
      title: data.title,
      content: data.content,
      link: data.link || "",
      imgUrl: finalImgUrl,
    };

    if (isEditMode) {
      editPost.mutate({ data: communityData, boardId });
    } else {
      if (writeType === "notice") {
        postNotice(communityData);
      } else if (writeType === "feedback") {
        postFeedback(communityData);
      }
    }
  };

  return (
    <div className="w-[720px] min-h-[648px] h-auto flex flex-col justify-center items-center bg-white shadow-sm rounded-[5px] border px-3 pt-3 pb-6 gap-3 mb-10">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="w-[95px] min-h-[28px] flex gap-3 font-bold text-[18px] leading-7 tracking-[-0.72px] items-center text-gray8">
          개선요청 작성
        </h2>
        <div className="w-full h-[40px] flex items-center justify-center gap-5 border border-gray3 rounded-[5px]">
          <input
            {...register("title")}
            type="text"
            placeholder="제목을 입력해주세요."
            className="px-4 py-2 w-full h-full rounded-md placeholder:text-gray5"
          />
        </div>
        <CustomerTiptap
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
};

export default CustomerWrite;
