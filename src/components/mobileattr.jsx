import React, { useEffect, useRef, useState } from "react";
import Accordion from "./acccordion";
import attrs from "../data/all_attributes_filters";
import SearchBarMobile from "./search_bar_mobile";
import FunnyFilter from "./funnyfilter";

export default function MobileAttributeFilter({
  toggleMethod,
  toggle,
  activeFilters,
  onFilterChange,
  onSearch,
}) {
  const ref = useRef();
  const [currentFilters, setCurrentFilters] = useState(activeFilters || {});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleMethod(!toggle);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle, toggleMethod]);

  useEffect(() => {
    setCurrentFilters(activeFilters || {});
  }, [activeFilters]);

  const handleFilterToggle = (traitType, value) => {
    const updatedFilters = { ...currentFilters };

    if (updatedFilters[traitType]?.includes(value)) {
      updatedFilters[traitType] = updatedFilters[traitType].filter((item) => item !== value);
      if (updatedFilters[traitType].length === 0) delete updatedFilters[traitType];
    } else {
      updatedFilters[traitType] = [...(updatedFilters[traitType] || []), value];
    }

    setCurrentFilters(updatedFilters);
    onFilterChange(traitType, value); 
  };

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm); 
  };

  const resetFilters = () => {
    setCurrentFilters({});
    onFilterChange("reset", null); 
    onSearch(""); 
  };

  return (
    <div
      ref={ref}
      className="absolute z-[999] top-[66px] w-[90vw] px-4 py-4 bg-[#251607] overflow-y-auto max-h-[80vh] shadow-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-white text-3xl font-bold">Filters</h3>
          <button
            onClick={() => toggleMethod(!toggle)}
            className="text-white text-3xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>
        <SearchBarMobile onSearch={handleSearch} />
        <img
          className="h-4 cursor-pointer"
          src="/assets/refresh.png"
          alt="refresh"
          onClick={resetFilters}
        />
      </div>
      <div className="mb-4">
        <FunnyFilter/>
      </div>
      {Object.entries(attrs).map(([key, value]) => (
        <Accordion
          key={key}
          title={key}
          data={value}
          mobile={true}
          activeFilters={currentFilters[key] || []}
          onFilterChange={handleFilterToggle}
        />
      ))}

      <div className="flex lg:flex-row gap-2 justify-center mt-2">
        <div className=" active:bg-[#FFF0E1] active:text-[#251607] mb-4 border-2 border-[#FFF0E1] w-32 cursor-pointer rounded-lg flex text-xl py-2 px-6 bg-[#251607] text-[#FFF0E1]">honoraries</div>
        <div className=" active:bg-[#FFF0E1] active:text-[#251607] w-20 border-2 border-[#FFF0E1] mb-4 cursor-pointer rounded-lg flex justify-center text-xl py-2 px-6 bg-[#251607] text-[#FFF0E1]"><span>1:1</span></div>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={() => toggleMethod(false)}
          className="border-2 px-8 py-2 rounded-lg border-[#FFF0E1] text-[#FFF0E1]  active:bg-[#FFF0E1] active:text-[#251607]"
        >
          Close
        </button>
      </div>
    </div>
  );
}
