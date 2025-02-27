"use client";

import { use } from "react";
import { Write } from "../../../_components/Write";
import { subCategories } from "@/app/_constants/categories";

type Params = {
  subcategory: keyof typeof subCategories;
};

type Props = {
  params: Promise<Params>;
};

export default function WritePage({ params }: Props) {
  const unwrappedParams = use(params);
  const { subcategory } = unwrappedParams;

  return (
    <div className="max-w-[720px] min-h-[835px] bg-[#FFFFFF] rounded-[5px]">
      <Write category="esports" subCategory={subcategory} />
    </div>
  );
}
