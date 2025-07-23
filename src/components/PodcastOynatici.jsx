import React from "react";

function PodcastOynatici({ src }) {
  if (!src) return <p>Podcast mevcut değil.</p>;

  return (
    <audio controls style={{ width: "100%" }}>
      <source src={src} type="audio/mpeg" />
      Tarayıcınız podcast oynatmayı desteklemiyor.
    </audio>
  );
}

export default PodcastOynatici;
