import React from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export default function ResetFiltersButton({ onReset }) {
  const size = useWindowSize();
  return (
    <button
      onClick={onReset}
      className={`flex items-center  ${size.width > 990 ? " h-10 w-10 mt-[1px] bg-[#251607] ml-2" : "h-5 w-5"} justify-center rounded-lg`}
      title="Reset Filters"
    >
      <img
        src={size.width > 990 ? "/src/assets/refresh_white.svg" : "src/assets/refresh.png"}
        alt="Reset"
        className={`${size.width > 990 ? "h-5 w-5" : "h-4 w-4"} `}
      />
    </button>
  );
}
