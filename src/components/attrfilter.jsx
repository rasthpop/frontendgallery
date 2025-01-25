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
    </div>
  );
}
