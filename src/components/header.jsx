import React, { useState } from "react";


export default function Header(){
    const [moreopen, setOpen] = useState(false)
    return(
        <header className="text-[#251607] z-[9999] flex items-center justify-between w-full h-[85px] 
            md:pt-8 md:text-2xl md:px-4
            lg:pt-14 lg:text-3xl lg:px-10 
            "> 
            <a href="https://shibuya.gg">Home</a>
            <a href="https://shibuya.gg/capital">Shibuya Capital</a>
            <a href="https://shibuya.gg/incubator">Incubator</a>
            <div onMouseLeave={() => {setOpen(false)}}>
                <div onMouseEnter={() => {setOpen(true)}} className="flex justify-center more hover:opacity-100">
                    <span className="mt-1 lg:mt-0 mr-4 lg:mr-8 flex">More </span>
                    <svg className={`mt-2 opacity-50 transition-transform ${moreopen ? "rotate-180" : ""}`} width="32" height="32" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.94849 2.19232L9.29319 9.53703L16.6379 2.19232" stroke-width="2.44824" stroke-linecap="square"/>
                    </svg>
                </div>
                <ul className={`text-xl lg:text-2xl grid overflow-hidden ${
                        moreopen
                          ? "absolute grid-rows-[1fr] opacity-100 "
                          : "grid-rows-[0fr] opacity-0 max-h-0"
                      }`}>
                    <li>gallery</li>
                    <li><a href="https://giphy.com/shibuyastation">giphy</a></li>
                    <li><a href="https://tenor.com/official/shibuyastation">tenor</a></li>
                </ul>
            </div>
            <div className="flex gap-2">
            <a href="https://magiceden.io/ru/ordinals/marketplace/shibuya" className="linkobj flex h-14 w-14 p-1 bg-[#251607]"><img className="object-contain" src="src/assets/accordion_assets/magiceden.png"/></a>
            <a href='https://t.co/tXtBu62Jj9' className="linkobj h-14 w-14 p-1 bg-[#251607]"><img src="/Discord.png"/></a>
            <a href="https://x.com/StationShibuya" className="linkobj h-14 w-14 p-1 bg-[#251607]"><img src="/X.png"/></a>
            </div>
        </header>
    )
}