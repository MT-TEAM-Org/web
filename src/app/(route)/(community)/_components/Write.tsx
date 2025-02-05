import Tiptap from "@/app/_components/_tiptap/Tiptap";

interface WriteProps {
  category: string;
  subCategory: string;
  subCategoryName: string;
}

export function Write({ category, subCategory, subCategoryName }: WriteProps) {
  return (
    <div>
      <Tiptap onChange={(content) => console.log(content)} />
    </div>
  );
}
