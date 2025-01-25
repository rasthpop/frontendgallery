import React, { useState, useEffect, useRef } from "react";

export default function AudioPlayer({ tracks }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isOpen, setOpen] = useState(true);
  const audioRef = useRef(null);

  const currentTrack = tracks[currentTrackIndex];

  const playNext = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return; 

    if (isPlaying) {
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = currentTrack.url;
      if (isPlaying) {
        audio.play().catch((err) => console.error("Error playing audio:", err));
      }
    }
  }, [currentTrack]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime = (event.target.value / 100) * duration;
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  if (!tracks || tracks.length === 0) {
    return <div>No tracks available</div>;
  }

  return (
    <div className="relative mt-10">
      <audio ref={audioRef}></audio>

      {/* Кнопка відкриття/закриття */}
      <button
        onClick={() => setOpen(!isOpen)}
        className={`border-2 border-[#251607] absolute ${
          isOpen ? "right-3" : "right-[115px]"
        } top-[-20px] rounded-full flex items-center justify-center`}
        style={{ width: "50px", height: "50px" }}
      >
        {isOpen ? (
          <svg
            width="21"
            height="3"
            viewBox="0 0 21 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              y1="1.96988"
              x2="20.6024"
              y2="1.96988"
              stroke="#251607"
              strokeWidth="2.06024"
            />
          </svg>
        ) : (
          <img src="/assets/player/1.svg" alt="Play" />
        )}
      </button>

      {/* Контейнер аудіоплеєра */}
      <div
        className={`text-[#251607] bg-white ${
          isOpen ? "w-[90%]" : "w-[60%]"
        } h-24 rounded-2xl flex gap-2`}
      >
        <div className={`${isOpen ? "w-[30%]" : "w-[44%]"} h-full rounded-s-2xl`}>
          <img className="h-full w-full rounded-s-2xl" src="/assets/girl.png"/>
        </div>
        {isOpen ? (
          <div className="w-[70%] flex flex-col py-1">
            <span className="mt-1 text-lg font-bold">{currentTrack.name}</span>
            <span className="text-xs mb-2 text-[#D7DAD9]">
              {currentTrack.artist}
            </span>
            <div>
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="w-full cursor-pointer bg-[#D7DAD9] h-[4px] rounded-full appearance-none"
              />
              <div className="flex justify-between pr-6 text-xs mt-1">
                <span className="text-[#E69AA4]">{formatTime(currentTime)}</span>
                <div className="flex gap-2 mt-[-6px]">
                  <img
                    src="/assets/player/skip-previous.svg"
                    alt="Previous"
                    onClick={playPrevious}
                    className="cursor-pointer"
                  />
                  <img
                    src={`/assets/player/${isPlaying ? "1" : "1"}.svg`}
                    alt={isPlaying ? "Pause" : "Play"}
                    onClick={togglePlay}
                    className="cursor-pointer"
                  />
                  <img
                    src="/assets/player/skip-next.svg"
                    alt="Next"
                    onClick={playNext}
                    className="cursor-pointer"
                  />
                </div>
                <span className="text-[#D7DAD9]">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-2xl text-center w-[53%] flex justify-center items-center">
            ...
          </div>
        )}
      </div>
    </div>
  );
}
