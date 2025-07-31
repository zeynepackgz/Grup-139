import React, { useState, useEffect } from 'react';
import './Flashcard.css';
import mathPattern from '../assets/math-pattern.png';

function Flashcard({ flashcards }) {
  const [index, setIndex] = useState(0);
  const [stack, setStack] = useState([]);

  const currentCard = flashcards[index];

  // Ders değiştiğinde reset yap
  useEffect(() => {
    setIndex(0);
    setStack([]);
  }, [flashcards]);

  const handleNext = () => {
    if (index < flashcards.length - 1) {
      setStack([...stack, index]);
      setIndex(index + 1);
    }
  };

  const handleRetry = () => {
    setIndex(0);
    setStack([]);
  };

  return (
    <div className="flashcard-wrapper">
      {/* Sol yığılmış kartlar */}
      <div className="card-stack">
        {stack.map((i) => (
          <div
            key={i}
            className="card-back"
            style={{
              backgroundImage: `url(${mathPattern})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              top: `${stack.length - i}px`, // her kartı çok az kaydır
            }}
          ></div>
        ))}
      </div>

      {/* Şu anki aktif kart */}
      <div className="flashcard">
        <div className="flashcard-front">
          <h3>{currentCard.question}</h3>
          <p>{currentCard.answer}</p>
        </div>
        <button className="next-btn" onClick={handleNext}>
          Sonraki
        </button>

        <button className="next-btn" onClick={handleRetry} style={{ marginLeft: '10px' }}>
          Baştan Başla
        </button>
      </div>
    </div>
  );
}

export default Flashcard;
