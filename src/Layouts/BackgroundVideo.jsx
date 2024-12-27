import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import background from "../assets/background.mp4";
import '../videobackground.css';
import music from "../assets/music.mp3";

function BackgroundVideo() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClick = async () => {
    if (audioRef.current && !isAudioPlaying) {
      try {
        await audioRef.current.play();
        setIsAudioPlaying(true);
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };

  return (
    <div className="video-background-container" onClick={handleClick}>
      <audio
        ref={audioRef}
        src={music}
        preload="auto"
        loop
        onError={() => console.log("Audio failed to load")}
      />
      <video autoPlay muted loop className="background-video">
        <source src={background} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Outlet />
    </div>
  );
}

export default BackgroundVideo;
