import React, { useState, useEffect } from "react";
import Arrow from "../assets/accordion_assets/arrow.svg";
import tick from "../assets/accordion_assets/tick.svg";
import "./accordion.css";
import axios from "axios";

export default function Accordion({
  title,
  data,
  mobile,
  activeFilters,
  onFilterChange,
}) {
  const [open, setOpen] = useState(false);
  const [searchArr, setSearchArr] = useState(data);
  const [checkedState, setCheckedState] = useState({});
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const initialState = {};
    activeFilters?.forEach((filter) => {
      initialState[filter] = true;
    });
    setCheckedState(initialState);
  }, [activeFilters]);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const response = await axios.get("https://backendgallery.vercel.app/attributes-count");
        if (response.data[title]) {
          setCounts(response.data[title]);
        }
      } catch (error) {
        console.error("Error fetching attribute counts:", error);
      }
    }
    fetchCounts();
  }, [title]);

  function handleCheckboxChange(attr) {
    const updatedState = {
      ...checkedState,
      [attr]: !checkedState[attr],
    };
    setCheckedState(updatedState);

    onFilterChange(title, attr);
  }

  function handleInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredItems = data.filter((attr) =>
      attr.toLowerCase().includes(searchTerm)
    );
    setSearchArr(filteredItems);
  }

  return (
    <div id={title}>
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer ${mobile ? "" : "mb-4"} rounded-full flex text-xl py-2 px-6 bg-[#251607] text-[#FFF0E1]`}
        key={title}
      >
        <img src={`src/assets/accordion_assets/${title}.svg`} alt="icon" />
        <span className="mr-auto ml-2">{title}</span>
        <img
          className={`opacity-50 transition-transform ${open ? "rotate-180" : ""}`}
          src={Arrow}
          alt="arrow"
        />
      </div>

      {!mobile && open && (
        <input
          onChange={handleInput}
          id="search"
          type="text"
          className="w-full h-14 rounded-lg py-2 px-10 mb-4 placeholder:text-[#E1E1E1]"
          placeholder="Find by cereal..."
        />
      )}

      <div
        className={`overflow-y-auto bg-[#251607] text-[#FFF0E1] max-h-80 ${
          open ? "p-4 mb-6" : ""
        }`}
      >
        {searchArr.map((attr) => (
          <div
            key={attr}
            className={`grid overflow-hidden ${
              open
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0 max-h-0"
            }`}
          >
            <div
              className={`flex items-center ${mobile ? "mb-4" : "mb-8"}`}
            >
              <label
                className={`relative ${mobile ? "w-5 h-5" : "w-5 h-5"}`}
              >
                {checkedState[attr] && (
                  <img
                    src={tick}
                    alt="tick"
                    className={`cursor-pointer absolute ${
                      mobile ? "w-10" : "w-5 h-5"
                    }`}
                  />
                )}
                <input
                  checked={checkedState[attr] || false}
                  onChange={() => handleCheckboxChange(attr)}
                  id={attr}
                  type="checkbox"
                  className="cursor-pointer appearance-none overflow-hidden w-6 h-6 focus:outline-none active:bg-[#FFF0E1]"
                />
              </label>
              <span
                className={`overflow-hidden ${
                  mobile ? "text-[14px] pt-2" : "text-xl"
                } ml-4 mr-auto pb-1`}
              >
                {attr}
              </span>
              <span>({counts[attr] || 0})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
