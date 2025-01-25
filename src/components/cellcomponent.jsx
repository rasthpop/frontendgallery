import React from "react";
import Heart from "../assets/Heart.png";

export default function Cell({ number, rank, image, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <div className="h-[120px] w-[120px] sm:h-[150px] sm:w-[150px] md:h-[180px] md:w-[180px] 2xl:h-[200px] 2xl:w-[200px] rounded-2xl overflow-hidden">
        <img src={image} alt={`Shibuyan ${number}`} className="w-full h-full object-cover" />
      </div>
      <div className="flex justify-between mt-2 w-[120px] sm:w-[150px] md:w-[180px] 2xl:w-[200px]">
        <div className="p-1 w-24 sm:w-20 md:p-2 rounded-sm flex bg-[#E69AA4] h-6 items-center">
          <img className=" object-contain h-2 mr-2" src={Heart} alt="Heart" />
          <span className="pb-1 text-center tracking-tight md:tracking-normal text-xs md:text-sm text-[#FFF0E1] ">Rank {rank}</span>
        </div>
        <div className="flex flex-col">
          <span className="leading-6 text-right text-sm md:text-md">Shibuyan</span>
          <span className="text-right leading-3 text-xs sm:text-sm md:text-md">NO {number}</span>
        </div>
      </div>
    </div>
  );
}
