import React, { useState } from "react";

export default function SearchBarMobile({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm); 
  };

  return (
    <div className="flex items-center mb-4 px-4">
      <input
        type="text"
        placeholder="Search for ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-2 border-[#FFF0E1] rounded-s-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#251607]"
      />
      <button
        onClick={handleSearch}
        className="bg-[#251607] text-[#FFF0E1] px-4 py-2 rounded-e-lg border-[#FFF0E1] border-2 active:bg-[#FFF0E1] active:text-[#251607]"
      >
        Search
      </button>
    </div>
  );
}
