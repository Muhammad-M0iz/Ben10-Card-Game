import React, { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import background from "../assets/background.mp4";
import '../videobackground.css';
import music from "../assets/music.mp3";

function BackgroundVideo() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = (e) => {
    e.stopPropagation(); // Prevent the container click
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
        setIsAudioPlaying(false);
      } else {
        audioRef.current.play().then(() => {
            setIsAudioPlaying(true);
        }).catch(error => {
            console.error("Audio playback failed:", error);
        });
      }
    }
  };

  const handleContainerClick = () => {
     if (audioRef.current && !isAudioPlaying) {
         audioRef.current.play().then(() => {
             setIsAudioPlaying(true);
         }).catch(error => {
             console.error("Audio playback failed:", error);
         });
     }
  }


  return (
    <div className="video-background-container" onClick={handleContainerClick}>
      <button
        className="audio-control-button"
        onClick={toggleAudio}
        aria-label={isAudioPlaying ? "Mute music" : "Play music"}
      >
        {isAudioPlaying ? (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        )}
      </button>
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
