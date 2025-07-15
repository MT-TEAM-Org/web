import React from "react";

interface SearchGroupProps {
  label: string;
  name: string;
  placeholder: string;
}

const SearchGroup = ({ label, name, placeholder }: SearchGroupProps) => {
  return (
    <div className="flex h-[56px] border-b border-gray2">
      <div className="w-[100px] px-3 py-2 bg-gray1 flex items-center justify-center font-bold text-[14px] leading-5 text-gray8">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="flex-1 p-3 flex items-center justify-start">
        <input
          id={name}
          type="text"
          placeholder={placeholder}
          className="w-full h-[40px] rounded-[5px] p-3 border border-gray3"
        />
      </div>
    </div>
  );
};

export default SearchGroup;
