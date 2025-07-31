import React, { useState, useEffect, useRef } from 'react';

function Quiz({ quiz, duration = 180 }) {
  // duration saniye cinsinden (default 180 sn = 3 dk)
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);

  useEffect(() => {
    if (submitted) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [submitted]);

  const handleChange = (questionId, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setTimeLeft(duration);
  };

  const score = Object.keys(answers).reduce((total, key) => {
    const question = quiz.find((q) => q.id === parseInt(key));
    if (!question) return total;
    return total + (answers[key] === question.answer ? 1 : 0);
  }, 0);

  // Zamanı mm:ss formatına çevir
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (submitted) {
    return (
      <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", padding: '20px', backgroundColor: '#282c34', color: '#eee', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.5)' }}>
        <h2>Quiz Sonucu</h2>
        <p>
          Skorunuz: <strong>{score}</strong> / <strong>{quiz.length}</strong>
        </p>
        <button
          onClick={handleRetry}
          style={{
            padding: '12px 25px',
            fontSize: '1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#61dafb',
            color: '#282c34',
            cursor: 'pointer',
            boxShadow: '0 0 10px #61dafb',
          }}
        >
          Yeniden Dene
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '700px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#282c34',
        color: '#eee',
        borderRadius: '10px',
        boxShadow: '0 0 15px rgba(0,0,0,0.5)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: 'left',
      }}
    >
      <div style={{ marginBottom: '15px', fontSize: '1.1rem', fontWeight: '600', display: 'flex', justifyContent: 'space-between' }}>
        <span>Soru {Object.keys(answers).length + 1} / {quiz.length}</span>
        <span>Süre: {formatTime(timeLeft)}</span>
      </div>

      {quiz.map((q) => (
        <div key={q.id} style={{ marginBottom: '25px' }}>
          <p style={{ fontWeight: '600', marginBottom: '8px' }}>{q.question}</p>
          <div>
            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: 'block', marginBottom: '6px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => handleChange(q.id, option)}
                  required
                  style={{ marginRight: '10px' }}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        style={{
          padding: '14px 30px',
          fontSize: '1.1rem',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#61dafb',
          color: '#282c34',
          cursor: 'pointer',
          boxShadow: '0 0 12px #61dafb',
          transition: 'background-color 0.3s',
        }}
      >
        Gönder
      </button>
    </form>
  );
}

export default Quiz;
