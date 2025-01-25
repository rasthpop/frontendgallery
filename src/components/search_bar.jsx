import React, { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import './accordion.css'

export default function SearchBar({ onSearch, searchTerm, onReset, resetFilters }) {
  const size = useWindowSize()
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    onSearch(localSearchTerm);
  };

  return (
    <div className="flex items-center gap-1 mb-4">
      <input
        id="search"
        type="text"
        placeholder={size.width > 1180 ? "Search for ID" : "ID.."}
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="border border-[#251607] rounded-lg pl-10 py-2 w-[100%] focus:outline-none focus:ring-2 focus:ring-[#251607]"
      />
      <button
        onClick={handleSearch}
        className="bg-[#251607] text-[#FFF0E1] px-4 py-2 rounded-lg transition"
      >
        Search
      </button>
    </div>
  );
}
