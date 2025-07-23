import React, { useState, useRef, useEffect } from "react";

function PodcastOynatici({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Play / Pause toggle
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Zaman güncellemesi
  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  // Süre yüklendiğinde
  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  // Ses bittiğinde
  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  // Playing state güncelle
  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const playHandler = () => setIsPlaying(true);
    const pauseHandler = () => setIsPlaying(false);

    audio.addEventListener("play", playHandler);
    audio.addEventListener("pause", pauseHandler);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("play", playHandler);
      audio.removeEventListener("pause", pauseHandler);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Zaman formatlayıcı (mm:ss)
  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
  };

  // İlerleme barına tıklayınca atlama
  const onSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: 10,
      padding: 15,
      width: 320,
      backgroundColor: "#fdfdfd",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      userSelect: "none"
    }}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        preload="metadata"
      />

      <button
        onClick={togglePlay}
        style={{
          backgroundColor: isPlaying ? "#f44336" : "#4caf50",
          border: "none",
          borderRadius: "50%",
          width: 44,
          height: 44,
          color: "white",
          fontSize: 22,
          cursor: "pointer",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          transition: "background-color 0.3s ease"
        }}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? "⏸" : "▶️"}
      </button>

      <div
        onClick={onSeek}
        style={{
          width: "100%",
          height: 12,
          backgroundColor: "#ddd",
          borderRadius: 6,
          cursor: "pointer",
          position: "relative",
          marginBottom: 8
        }}
        title="İlerle"
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: 6,
            transition: "width 0.1s linear"
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555" }}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

export default PodcastOynatici;
