import React, {useState} from "react";
import footer1 from '../assets/footer/footer1.svg'
import footer2 from '../assets/footer/footer2.png'
import { useWindowSize } from "@uidotdev/usehooks"
export default function Footer(){
  const [moreopen, setOpen] = useState(false)
  const size = useWindowSize()
  return(

  <footer className="mt-32 mx-8 flex flex-col text-[#251607] justify-center">
  <div className="gap-0 z-10
    flex flex-col justify-center
    2xl:grid 2xl:grid-cols-2 "
    >
    <div className="
    flex
    flex-col items-center
    2xl:flex-row
    ">
      <div className="w-auto 
      flex flex-col-reverse items-center
      2xl:grid 2xl:flex-col 2xl:items-start
      ">
        <img className="w-[200px] 2xl:w-[622px] my-4 flex" src={footer1} />
        <header className="lg:w-[622px] flex flex-col items-center gap-8 2xl:justify-between 2xl:flex-row 2xl:h-[64px] text-2xl z-[9999]"> 
            <a>Home</a>
            <a>Shibuya Capital</a>
            <a>Incubator</a>
            <div onMouseLeave={() => {setOpen(false)}}>
              <div onMouseEnter={() => {setOpen(true)}} className="flex justify-center more hover:opacity-100">
                  <span className="mr-8 flex">More </span>
                  <svg className={`mt-2 opacity-50 transition-transform ${moreopen ? "rotate-180" : ""}`} width="32" height="32" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.94849 2.19232L9.29319 9.53703L16.6379 2.19232" stroke-width="2.44824"  stroke-linecap="square"/>
                  </svg>
              </div>
              {moreopen ? 
                <div className={`${size.width > 1570 ? "absolute" : ""}  flex flex-col items-center`}>
                  <a>gallery</a>
                  <a>giphy</a>
                  <a>tenor</a>
                </div> : null}
            </div>
        </header>
      </div>
      <div className="flex 2xl:flex-col ml-8 justify-between gap-2">
          <a href="https://x.com/StationShibuya" className="linkobj h-12 w-12 p-1 bg-[#251607]"><img src="/X.png"/></a>
          <a href='https://t.co/tXtBu62Jj9' className="linkobj h-12 w-12 p-1 bg-[#251607]"><img src="/Discord.png"/></a>
          <a href="https://magiceden.io/ru/ordinals/marketplace/shibuya" className="linkobj flex h-12 w-12 p-1 bg-[#251607]"><img className="object-contain" src="src/assets/accordion_assets/magiceden.png"/></a>
      </div>
    </div>
    <div className="flex justify-center">
      <img className="border-2 border-[#251607] mt-10 min-w-80 2xl:mt-0 w" src={footer2}/>
    </div>
  </div>
  <span className="text-[#251607] text-[100px] lg:text-[150px] lg:leading-[150px] xl:text-[180px] xl:leading-[180px] text-center
    2xl:text-[220px] 2xl:leading-[200px] "
    >SHIBUYA {size.width > 1000 ? <label>STATION</label> : null}</span>
  </footer>
  )
}