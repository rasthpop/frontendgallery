import React, { useState, useEffect } from "react";
import Cell from "./cellcomponent";
import axios from "axios";
import Modal from "./modal";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Gallery({ filters }) {
  const size = useWindowSize()
  const [characters, setCharacters] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 40
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  function closeModal() {setSelectedCharacter(null)}

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get("http://localhost:3000/api/characters", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            filters: JSON.stringify(filters),
          },
        });
        console.log("Characters received:", response.data);
        setCharacters(response.data.characters);
        setTotalPages(Math.ceil(response.data.total / itemsPerPage));
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    }
    fetchCharacters();
  }, [currentPage, filters]);

  function getPaginationButtons() {
    const extra_button = size.width > 1023 ? 2 : 1
    const buttons = []
    if (currentPage > 3) buttons.push(1)
    if (currentPage > 4 && size.width > 1023) buttons.push("...")
    for (let i = Math.max(currentPage - extra_button, 1); i <= Math.min(currentPage + extra_button, totalPages); i++) {
      buttons.push(i)
    }
    if (currentPage < totalPages - 3 && size.width > 1023) buttons.push("...");
    if (currentPage < totalPages - 2) buttons.push(totalPages);
    return buttons
  };

  function NextPage(){
    if (currentPage != 50){
      setCurrentPage(currentPage + 1)
    }
  }

  function PrevPage(){
    if (currentPage != 1){
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="relative">
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

      

      <div className="flex justify-center mt-16">
        <button onClick={() => {PrevPage()}} className="px-4 py-1 pb-2 mx-1 text-2xl active:bg-[#FFF0E1] active:text-[#251607] border-2 bg-[#251607] text-[#FFF0E1] border-[#251607] rounded">
          &#x3c;
        </button>
        {getPaginationButtons().map((button, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 text-[#251607] border-2 border-[#251607] ${
              button === currentPage
                ? "bg-[#FFF0E1]"
                : button === "..."
                ? "text-[#FFF0E1] bg-[#251607]"
                : "text-[#FFF0E1] bg-[#251607]"
            } rounded ${
              button !== "..." ? "cursor-pointer" : ""
            } disabled:`}
            onClick={() => {
              if (button !== "..." && button !== currentPage) {
                setCurrentPage(button);
              }
            }}
            disabled={button === "..."}>
            {button}
          </button>
        ))}
        <button onClick={() => {NextPage()}} className="px-4 py-0.5 pb-2 mx-1 text-2xl active:bg-[#FFF0E1] active:text-[#251607] border-2 bg-[#251607] text-[#FFF0E1] border-[#251607] rounded">
          &#x3e;
        </button>
      </div>
      {selectedCharacter && (
        <Modal character={selectedCharacter} onClose={closeModal} />
      )}
    </div>

 
  );
}
