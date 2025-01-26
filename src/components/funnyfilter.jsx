import React, { useState, useRef, useEffect } from "react";

export default function FunnyFilter(){
    const [open, setOpen] = useState(false)
      const ref = useRef();
    const [curSort, setSort] = useState("rarity low to high")
    const sort = [
        "rarity low to high",
        "rarity high to low",
        "shibuyan # low to high",
        "shibuyan # high to low",
        "honoraries",
        "1:1"
        ]

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            setOpen(!open);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [open, setOpen]);
    
    function changeSort(event){
        const val = event.target.id
        setOpen(!open)
        setSort(val)
    }

    return(
        <div className="relative" ref={ref}>
            <div onClick={() => (setOpen(!open))} className={`cursor-pointer text-md xl:text-xl flex items-center bg-[#251607] text-[#FFF0E1] p-2 xl:p-3 px-4 xl:px-5 ${open ? "rounded-t-lg" : "rounded-lg"}`}>
                <span>sorting by:</span><span className="ml-2 text-sm xl:text-lg leading-tight">{curSort}</span>
            </div>
            {open ? <div className="absolute z-[200] bg-[#251607] text-[#FFF0E1] w-full flex flex-col gap-2 pb-4 rounded-b-lg items-center">
            {sort.map(category => (
                <div onClick={changeSort} id={category} key={category} className="text-lg object">{category}</div>
            ))}
            </div> : null}
        </div>
    )
}