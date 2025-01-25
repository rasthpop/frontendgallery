import React from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export default function Modal({ character, onClose }) {
  const size = useWindowSize();
  const magicEdenUrl = character?.id_link
    ? `https://magiceden.io/ordinals/item-details/${character.id_link}`
    : null;

  return (
    <div
      className="fixed inset-0 text-[#251607] bg-black bg-opacity-40 flex justify-center items-center z-[9999]"
      onClick={onClose}
    >
      <div
      className={`bg-[#EFF4F2] p-6 rounded-lg ${size.width > 500 ? " w-[70%] h-[80%] max-w-[85%] max-h-[90%]" : "w-full h-full"}  relative z-[99999] flex justify-center flex-row shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="pb-5 border-2 border-[#251607] absolute top-4 right-4 rounded-full p-3 flex items-center justify-center"
          style={{ width: "50px", height: "50px" }}
        >
          <img src="src/assets/cancel-svgrepo-com 1.png" className="absolute top-[25%]"/>
        </button>

        <div className={`${size.width > 860 ? "items-center grid content-center grid-cols-[60%_40%] gap-2 h-full" : "flex flex-col w-full"} items-start `}>

          <div className={`flex justify-center w-full h-[${size.width > 860 ? "100%" : "40%"}]`}>
            <img
              src={character.image}
              alt={`Shibuyan #${character.name}`}
              className={` rounded-lg ${size.width > 860 ? "min-w-[40%] min-h-[40%] max-w-[90%] max-h-[90%]" : "max-w-[99%] max-h-[99%]"}  object-contain border border-gray-300`}
            />
          </div>

          <div className="flex flex-col gap-1 overflow-y-auto p-2 h-full w-full">
            <h4 className="text-md font-semibold text-left" style={{ color: "#898B8B", marginLeft: "8px" }}>
              Shibuyan
            </h4>
            <h2 className="text-3xl mb-2 font-bold text-left" style={{ marginLeft: "8px" }}>
              No {character.name}
            </h2>

            <div
              className="mt-1"
              style={{ height: "1px", backgroundColor: "#D7DAD9" }}
            ></div>

              <div className={`${size.width > 1024 ? "grid grid-cols-2" : "flex flex-col"} gap-3`}>

              {character.meta?.attributes.map((attr, index) => (
                <div
                  key={index}
                  className="bg-[#D7DAD9] p-4 rounded-lg flex items-center gap-2 shadow-sm hover:bg-gray-200 transition duration-300"
                >
                  <img
                    src={`/src/assets/accordion_assets/${attr.trait_type} black.svg`}
                    alt={attr.trait_type}
                    className="h-6 w-6"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold" style={{ color: "#898B8B" }}>
                      {attr.trait_type}
                    </span>
                    <span className="text-base" style={{ color: "#251607" }}>
                      {attr.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">
              {character.meta?.name}
            </h2>
            </div>

            <div
              className="my-2"
              style={{ height: "1px", backgroundColor: "#D7DAD9" }}
            ></div>

            <div className=" text-left flex items-center gap-2" style={{ marginLeft: "8px" }}>
              <img
                src={`/src/assets/accordion_assets/rarity black.svg`}
                alt="rarity"
                className="h-6 w-6"
              />
              <div className="flex flex-col pb-1 text-md">
                <span className="text-[#898B8B]">Rarity</span> 
                <span className="text-[#251607]">{character.rarity_rank}</span>
              </div>
            </div>

            <div
              style={{ height: "1px", backgroundColor: "#D7DAD9" }}
            ></div>

            <div className="mt-auto flex items-center gap-2">
              {magicEdenUrl ? (
                <a
                  href={magicEdenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#EFF4F2] border-gray-300 mr-6 py-4 rounded-lg hover:bg-gray-200 transition text-lg font-semibold flex items-center gap-2"
                >
                  <img
                    src={`/src/assets/accordion_assets/magiceden.png`}
                    alt="Magic Eden"
                    className="h-10 w-8 object-contain"
                  />
                  <span className="pb-1 text-xs xl:text-xl">Magic Eden</span>
                </a>
              ) : (
                <span className="text-red-500 font-bold">ID not available</span>
              )}
              <button
                onClick={async (e) => {
                  e.preventDefault();

                  try {
                    const response = await fetch(character.image, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/octet-stream",
                      },
                    });

                    if (!response.ok) {
                      throw new Error("Failed to fetch the image.");
                    }

                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `Shibuyan_#${character.name}.png`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error("Error downloading the image:", error);
                  }
                }}
                className="bg-[#EFF4F2] border-2 border-[#251607] px-6 xl:px-10 py-2 rounded-xl hover:bg-gray-200 transition text-lg font-semibold">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
