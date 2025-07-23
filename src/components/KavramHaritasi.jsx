import React from "react";
import PodcastOynatici from "./PodcastOynatici";

function KavramHaritasi({ data }) {
  const { notlar, kavramlar } = data;

  const dusukNotluDersler = Object.keys(notlar).filter(
    (ders) => notlar[ders] < 60
  );

  return (
    <div>
      <h2>Düşük Notlu Dersler İçin Kavramlar</h2>

      {dusukNotluDersler.length === 0 ? (
        <p>Tüm dersler 60'ın üzerinde 🎉</p>
      ) : (
        dusukNotluDersler.map((ders) => (
          <div
            key={ders}
            style={{
              marginBottom: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{ders}</h3>
            <ul>
              {Object.keys(kavramlar[ders] || {}).map((kavram) => (
                <li key={kavram}>
                  <strong>{kavram}</strong>
                  <br />
                  <PodcastOynatici src={kavramlar[ders][kavram].podcast} />
                  <p>{kavramlar[ders][kavram].hikaye}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default KavramHaritasi;
