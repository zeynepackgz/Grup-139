import React, { useState, useRef, useEffect } from "react";

function PodcastOynatici({ src, title = "Podcast Başlığı", cover }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1); // 0-1 arası
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const onLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const onEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

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

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const onSeek = (e) => {
    if (!audioRef.current) return;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  // Ses seviyesi değiştirildiğinde
  const onVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) audioRef.current.volume = vol;
  };

  // Hız ayarı değiştirildiğinde
  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  // 10 saniye ileri veya geri
  const skipTime = (amount) => {
    if (!audioRef.current) return;
    let newTime = audioRef.current.currentTime + amount;
    if (newTime < 0) newTime = 0;
    if (newTime > duration) newTime = duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 10,
        padding: 15,
        width: 350,
        backgroundColor: "#fdfdfd",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        userSelect: "none",
      }}
    >
      {cover && (
        <img
          src={cover}
          alt={`${title} kapak`}
          style={{ width: "100%", borderRadius: 8, marginBottom: 12 }}
        />
      )}
      <h4 style={{ marginBottom: 12, textAlign: "center" }}>{title}</h4>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        preload="metadata"
      />

      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
        <button
          onClick={() => skipTime(-10)}
          style={{
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #888",
            background: "#eee",
            fontWeight: "bold",
            userSelect: "none",
          }}
          aria-label="Geri 10 saniye"
          title="Geri 10 saniye"
        >
          ⏪ 10sn
        </button>

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
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "background-color 0.3s ease",
            userSelect: "none",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>

        <button
          onClick={() => skipTime(10)}
          style={{
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid #888",
            background: "#eee",
            fontWeight: "bold",
            userSelect: "none",
          }}
          aria-label="İleri 10 saniye"
          title="İleri 10 saniye"
        >
          10sn ⏩
        </button>
      </div>

      <div
        onClick={onSeek}
        style={{
          width: "100%",
          height: 12,
          backgroundColor: "#ddd",
          borderRadius: 6,
          cursor: "pointer",
          position: "relative",
          marginBottom: 8,
        }}
        title="İlerle"
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: 6,
            transition: "width 0.1s linear",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 12,
          color: "#555",
          marginBottom: 12,
        }}
      >
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <label htmlFor="volume" style={{ fontSize: 14 }}>
          Ses:
        </label>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={onVolumeChange}
          style={{ flex: 1, cursor: "pointer" }}
          aria-label="Ses seviyesi"
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button
          onClick={() => changePlaybackRate(1)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: playbackRate === 1 ? "2px solid #4caf50" : "1px solid #888",
            background: playbackRate === 1 ? "#e8f5e9" : "#eee",
            cursor: "pointer",
            userSelect: "none",
          }}
          aria-label="Normal hız 1x"
          title="Normal hız 1x"
        >
          1x
        </button>

        <button
          onClick={() => changePlaybackRate(1.5)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: playbackRate === 1.5 ? "2px solid #4caf50" : "1px solid #888",
            background: playbackRate === 1.5 ? "#e8f5e9" : "#eee",
            cursor: "pointer",
            userSelect: "none",
          }}
          aria-label="Hız 1.5x"
          title="Hız 1.5x"
        >
          1.5x
        </button>

        <button
          onClick={() => changePlaybackRate(2)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: playbackRate === 2 ? "2px solid #4caf50" : "1px solid #888",
            background: playbackRate === 2 ? "#e8f5e9" : "#eee",
            cursor: "pointer",
            userSelect: "none",
          }}
          aria-label="Hız 2x"
          title="Hız 2x"
        >
          2x
        </button>
      </div>
    </div>
  );
}

export default PodcastOynatici;
