import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
type TextColorPickerProps = {
  editor: any;
};

const TextColorPicker = ({ editor }: TextColorPickerProps) => {
  const [color, setColor] = useState("#000000");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const colors = [
    { text: "A", color: "#000000", label: "black" },
    { text: "A", color: "#FF0000", label: "Red" },
    { text: "A", color: "#00FF00", label: "Green" },
    { text: "A", color: "#0000FF", label: "Blue" },
    { text: "A", color: "#bdbdbd", label: "gray" },
  ];

  if (!editor) {
    return null;
  }

  const handleColorChange = (selectedColor: string) => {
    setColor(selectedColor);

    editor.chain().focus().setColor(selectedColor).run();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        type="button"
        onClick={toggleMenu}
        className="p-2 rounded-md hover:bg-gray-200"
        title="black color"
      >
        <div className="w-full h-auto flex  justify-center items-center">
          <div>
            <p>A</p>
            <span
              className="w-[22px] h-[3px]  rounded-md block"
              style={{ backgroundColor: color }}
            ></span>
          </div>
          <ChevronDown className="w-4 h-4 " />
        </div>
      </button>

      {isMenuOpen && (
        <div className="absolute top-10 left-0  bg-white border rounded-md  z-10">
          {colors.map(({ color, label }) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className=" rounded-md  flex items-center justify-between gap-2 w-full px-3 py-2 font-normal text-sm hover:bg-gray-200"
            >
              <div className="flex items-center gap-2 w-full">
                <div className="w-1/4 text-center ">
                  <p>A</p>
                  <span
                    className="w-[15px] h-[3px]  rounded-md block"
                    style={{ backgroundColor: color }}
                  ></span>
                </div>

                <span className="text-left flex-grow">{label}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextColorPicker;
