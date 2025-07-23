import React from "react";
import KavramHaritasi from "./components/KavramHaritasi";

const mockData = {
  notlar: {
    Matematik: 50,
    Fizik: 75,
    Kimya: 40,
  },
  kavramlar: {
    Matematik: {
      Türev: {
        podcast: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        hikaye: "Türev konusu detaylı anlatımı...",
      },
    },
    Kimya: {
      AsitBaz: {
        podcast: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        hikaye: "Asit-baz dengesi hakkında hikaye...",
      },
    },
  },
};

function App() {
  return (
    <div>
      <h1>SınavLab Kavram Haritası Modülü</h1>
      <KavramHaritasi data={mockData} />
    </div>
  );
}

export default App;
