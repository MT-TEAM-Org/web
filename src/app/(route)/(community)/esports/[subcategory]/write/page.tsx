"use client";

import { use, Usable } from "react";
import { Write } from "../../../_components/Write";
import { subCategories } from "@/app/_constants/categories";

type Params = {
  subcategory: keyof typeof subCategories;
};

export default function WritePage({ params }: { params: Usable<Params> }) {
  const unwrappedParams = use(params);
  const { subcategory } = unwrappedParams;

  console.log(subcategory);

  return (
    <div className="max-w-[720px] min-h-[835px] bg-[#FFFFFF] rounded-[5px] mt-3.5">
      <Write category="esports" subCategory={subcategory} />
    </div>
  );
}
