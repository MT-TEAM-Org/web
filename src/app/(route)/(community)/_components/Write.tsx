import usePostCommunityContent from "@/_hooks/community";
import Tiptap from "@/app/_components/_tiptap/Tiptap";
import TitleDag from "@/app/_components/_tiptap/TitleDag";
import { CommunityData } from "@/app/_constants/categories";
import { usePathname } from "next/navigation";
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
  thumnail: string;
}

export function Write({ category, subCategory }: WriteProps) {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      boardType: category,
      categoryType: subCategory === "ALL" ? "FREE" : subCategory,
      content: "",
      title: "",
      link: "",
      thumnail: "",
    },
  });

  const pathName = usePathname();
  const boardType = pathName?.split("/")[1];
  const categoryType = pathName?.split("/")[2];

  const { mutate: postContent } = usePostCommunityContent();

  const onSubmit = (data: FormData) => {
    const currentCategory = watch("categoryType");

    const communityData: CommunityData = {
      boardType: boardType,
      categoryType: currentCategory,
      title: data.title,
      content: data.content,
      link: data.link,
      thumnail: "",
    };
    console.log("제출되는 데이터:", communityData); // 디버깅용

    postContent(communityData);
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
        />
      </form>
    </div>
  );
}
