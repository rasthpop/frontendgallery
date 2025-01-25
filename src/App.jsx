import React, { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Header from "./components/header";
import MobileHeader from "./components/mobileheader";
import MobileAttributeFilter from "./components/mobileattr";
import Footer from "./components/footer";
import filter from "./assets/filter.png";
import AttributeFilter from "./components/attrfilter";
import Cell from "./components/cellcomponent";
import axios from "axios";
import Modal from "./components/modal";
import SearchBar from "./components/search_bar";
import SearchBarMobile from "./components/search_bar_mobile";
import ResetFiltersButton from "./components/reset_filters_button";
import AudioPlayer from "./components/player";

function App() {
  const [mobilefilter, setOpenMFilter] = useState(false);
  const size = useWindowSize();
  const [filters, setFilters] = useState({});
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [tracks, setTracks] = useState([]); 
  const itemsPerPage = 30;
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const mobile_breakpoint = 990;

  useEffect(() => {
    fetchTracks(); 
  }, []);

  function handleFilterChange(traitType, value) {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (newFilters[traitType]?.includes(value)) {
        newFilters[traitType] = newFilters[traitType].filter((item) => item !== value);
        if (newFilters[traitType].length === 0) delete newFilters[traitType];
      } else {
        newFilters[traitType] = [...(newFilters[traitType] || []), value];
      }
      return newFilters;
    });
  }

  function handleSearch(searchTerm) {
    setSearchTerm(searchTerm);
    const extractedNumber = searchTerm.match(/\d+/)?.[0];

    if (!extractedNumber) {
      fetchCharacters();
      return;
    }

    axios
      .get("http://localhost:3000/api/characters", {
        params: {
          search: extractedNumber,
        },
      })
      .then((response) => {
        const matchingCharacters = response.data.characters;

        if (matchingCharacters.length > 0) {
          setCharacters(matchingCharacters);
          setTotalPages(1);
        } else {
          setCharacters([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching search results:", error);
        setCharacters([]);
      });
  }

  const resetFilters = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
    fetchCharacters(1, {});
  };

  function closeModal() {
    setSelectedCharacter(null);
  }

  async function fetchCharacters(page = currentPage, appliedFilters = filters) {
    try {
      const response = await axios.get("http://localhost:3000/api/characters", {
        params: {
          page,
          limit: itemsPerPage,
          filters: JSON.stringify(appliedFilters),
        },
      });
      console.log("Characters received:", response.data);
      setCharacters(response.data.characters);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
    }
  }

  async function fetchTracks() {
    try {
      const response = await axios.get("http://localhost:3000/api/tracks");
      setTracks(response.data.tracks || []);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  }

  useEffect(() => {
    if (size.width >= mobile_breakpoint) {
      setFilters({});
    }
  }, [size.width]);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, filters]);

  function getPaginationButtons() {
    const extra_button = size.width > mobile_breakpoint ? 2 : 1;
    const buttons = [];
    if (currentPage > 3) buttons.push(1);
    if (currentPage > 4 && size.width > mobile_breakpoint) buttons.push("...");
    for (let i = Math.max(currentPage - extra_button, 1); i <= Math.min(currentPage + extra_button, totalPages); i++) {
      buttons.push(i);
    }
    if (currentPage < totalPages - 3 && size.width > mobile_breakpoint) buttons.push("...");
    if (currentPage < totalPages - 2) buttons.push(totalPages);
    return buttons;
  }

  function NextPage() {
    if (currentPage !== 50) {
      setCurrentPage(currentPage + 1);
    }
  }

  function PrevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <main className="flex flex-col align-center mx-12 mt-8">
      {size.width < mobile_breakpoint && mobilefilter ? (
        <MobileAttributeFilter
          toggleMethod={() => setOpenMFilter(!mobilefilter)}
          toggle={mobilefilter}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
      ) : null}

      {size.width > mobile_breakpoint ? <Header /> : <MobileHeader />}

      <div
        className="border-b-2 border-[#251607] 
        text-xl mt-20 mb-4 pb-1 flex justify-between
        2xl:text-4xl 2xl:mt-24 2xl:mb-6 xl:pb-4"
      >
        <span>FILTER</span>
        {size.width < mobile_breakpoint ? (
          <div className="flex items-center gap-2">
            <ResetFiltersButton onReset={resetFilters} />
            <img
              onClick={() => setOpenMFilter(!mobilefilter)}
              className="h-4 cursor-pointer"
              src={filter}
              alt="filter"
            />
          </div>
        ) : null}
      </div>

      <div className="flex">
        {size.width > mobile_breakpoint && (
          <div className="w-1/4 pr-8">
            <div className="flex justify-between mb-4">
              <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
              <ResetFiltersButton onReset={resetFilters} />
            </div>
            <AttributeFilter onFilterChange={handleFilterChange} activeFilters={filters} />
            <div className="mt-10">
              <AudioPlayer tracks={tracks} />
            </div>
          </div>
        )}
        <div className="flex-grow">
          <div className="relative flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
              {characters.length > 0 ? (
                characters.map((character) => (
                  <Cell
                    key={character._id}
                    number={character.name}
                    rank={character.rarity_rank}
                    image={character.image}
                    onClick={() => setSelectedCharacter(character)}
                  />
                ))
              ) : (
                <p className="text-center col-span-full">No characters found.</p>
              )}
            </div>
            {selectedCharacter && (
              <Modal character={selectedCharacter} onClose={closeModal} />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        <button onClick={() => PrevPage()} className="px-4 py-1 pb-2 mx-1 text-2xl active:bg-[#FFF0E1] active:text-[#251607] border-2 bg-[#251607] text-[#FFF0E1] border-[#251607] rounded">
          &#x3c;
        </button>
        {getPaginationButtons().map((button, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(button !== "..." ? button : currentPage)}
            className={`px-4 py-2 mx-1 text-[#251607] border-2 border-[#251607] ${
              button === currentPage
                ? "bg-[#FFF0E1]"
                : button === "..."
                ? "text-[#FFF0E1] bg-[#251607]"
                : "text-[#FFF0E1] bg-[#251607]"
            } rounded`}
          >
            {button}
          </button>
        ))}
        <button onClick={() => NextPage()} className="px-4 py-0.5 pb-2 mx-1 text-2xl active:bg-[#FFF0E1] active:text-[#251607] border-2 bg-[#251607] text-[#FFF0E1] border-[#251607] rounded">
          &#x3e;
        </button>
      </div>


      <Footer />
    </main>
  );
}

export default App;
