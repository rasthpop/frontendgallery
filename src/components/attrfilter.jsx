import React, { useEffect, useState } from "react";
import Accordion from "./acccordion";
import attrs from "../data/all_attributes_filters";

export default function AttributeFilter({ onFilterChange, activeFilters, onResetSearch }) {
  const [currentFilters, setCurrentFilters] = useState(activeFilters || {});

  useEffect(() => {
    setCurrentFilters(activeFilters || {});
  }, [activeFilters]);

  const resetFilters = () => {
    setCurrentFilters({}); 
    onResetSearch(); 
    onFilterChange("reset", null); 
  };

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

  return (
    <div className="sticky">

      {Object.entries(attrs).map(([key, value]) => (
        <Accordion
          key={key}
          title={key}
          data={value}
          mobile={false}
          activeFilters={currentFilters[key] || []} 
          onFilterChange={handleFilterToggle} 
        />
      ))}
      <div className="flex lg:flex-row gap-2">
        <div className="mb-4 w-32 cursor-pointer rounded-full flex text-xl py-2 px-6 bg-[#251607] text-[#FFF0E1]">honoraries</div>
        <div className="w-20 mb-4 cursor-pointer rounded-full flex justify-center text-xl py-2 px-6 bg-[#251607] text-[#FFF0E1]"><span>1:1</span></div>
      </div>
    </div>
  );
}
