import React from "react";
import mockData from "./data/mockData.json";
import KavramHaritasi from "./components/KavramHaritasi";

function App() {
  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>SınavLab – Kavram Haritası</h1>
      <KavramHaritasi data={mockData} />
    </div>
  );
}

export default App;
