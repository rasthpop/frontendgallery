import React, { useState } from "react";
import burger from "../assets/burger-menu-svgrepo-com.svg";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-end h-[66px] px-6 z-[9999] bg-[#251607] fixed top-0 left-0 w-full shadow-md">
      <div
        onClick={() => setOpen(!open)}
        className="z-[9999] cursor-pointer w-10 h-10 flex items-center justify-center"
      >
        <img clas src={burger} alt="Menu" />
      </div>
      {open && (
        <ul className="absolute z-[100] flex justify-center flex-col gap-4 top-0 items-center h-[100vh] left-0 w-full bg-[#251607] text-[#FFF0E1] text-3xl py-4 shadow-lg">
          <li className="hover:text-[#E69AA4] cursor-pointer">home</li>
          <li className="hover:text-[#E69AA4] cursor-pointer">shibuya capital</li>
          <li className="hover:text-[#E69AA4] cursor-pointer">incubator</li>
          <li className="hover:text-[#E69AA4] cursor-pointer">gallery</li>
          <li className="hover:text-[#E69AA4] cursor-pointer">giphy</li>
          <li className="hover:text-[#E69AA4] cursor-pointer">tenor</li>
        </ul>
      )}
    </header>
  );
}
