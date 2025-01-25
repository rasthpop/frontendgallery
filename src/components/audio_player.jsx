import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function AudioPlayer() {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://https://backendgallery.vercel.app/api/tracks")
      .then((response) => {
        setTracks(response.data.tracks);
      })
      .catch((error) => {
        console.error("Error fetching tracks:", error);
      });
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", playRandomTrack);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", playRandomTrack);
      }
    };
  }, [tracks]);

  const playTrack = () => {
    if (audioRef.current && tracks.length > 0) {
      audioRef.current.src = `http://localhost:3000/audio/${tracks[currentTrackIndex]}`;
      audioRef.current.play();
    }
  };

  const nextTrack = () => {
    if (tracks.length > 0) {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      setCurrentTrackIndex(nextIndex);

      if (audioRef.current) {
        audioRef.current.src = `http://localhost:3000/audio/${tracks[nextIndex]}`;
        audioRef.current.play();
      }
    }
  };

  const playRandomTrack = () => {
    if (tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      setCurrentTrackIndex(randomIndex);

      if (audioRef.current) {
        audioRef.current.src = `http://localhost:3000/audio/${tracks[randomIndex]}`;
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#251607] p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-[#FFF0E1] mb-4">Audio Player</h2>

      <div className="flex gap-4 mb-4">
        <button
          onClick={playTrack}
          className="bg-[#FFF0E1] text-[#251607] px-6 py-2 rounded-lg hover:bg-[#EFE6D9] transition"
        >
          Play
        </button>
        <button
          onClick={nextTrack}
          className="bg-[#FFF0E1] text-[#251607] px-6 py-2 rounded-lg hover:bg-[#EFE6D9] transition"
        >
          Next
        </button>
        <button
          onClick={playRandomTrack}
          className="bg-[#FFF0E1] text-[#251607] px-6 py-2 rounded-lg hover:bg-[#EFE6D9] transition"
        >
          Random
        </button>
      </div>

      <audio ref={audioRef} controls className="w-full mt-4">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
