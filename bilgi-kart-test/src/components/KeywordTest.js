import React, { useState } from 'react';

const containerStyle = {
  maxWidth: '600px',
  margin: '30px auto',
  padding: '20px',
  backgroundColor: '#1e1e2f',
  color: '#eee',
  borderRadius: '12px',
  boxShadow: '0 0 15px rgba(0,0,0,0.3)',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const questionStyle = {
  fontSize: '1.4rem',
  marginBottom: '20px',
  textAlign: 'center',
};

const buttonsContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '15px',
};

const optionButton = (selected, correct, option, answer) => ({
  padding: '12px 20px',
  minWidth: '120px',
  fontSize: '1rem',
  borderRadius: '8px',
  border: 'none',
  cursor: selected ? 'default' : 'pointer',
  backgroundColor:
    selected === option ? (option === answer ? '#4CAF50' : '#f44336') : '#44475a',
  color: '#fff',
  transition: 'background-color 0.3s',
  opacity: selected && option !== answer && selected === option ? 0.7 : 1,
});

const nextButtonStyle = {
  marginTop: '30px',
  padding: '12px 30px',
  fontSize: '1.1rem',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: '#6272a4',
  color: '#fff',
  cursor: 'pointer',
  alignSelf: 'center',
  boxShadow: '0 0 10px #6272a4',
};

function KeywordTest({ keywords }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const question = keywords[index];

  const handleOptionClick = (option) => {
    if (selected === null) setSelected(option);
  };

  const nextQuestion = () => {
    setSelected(null);
    setIndex((index + 1) % keywords.length);
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center' }}>🔑 Anahtar Kelime Testi</h2>

      <p style={questionStyle}>{question.question}</p>

      <div style={buttonsContainer}>
        {question.options.map((option, idx) => (
          <button
            key={idx}
            style={optionButton(selected, question.answer, option, question.answer)}
            onClick={() => handleOptionClick(option)}
            disabled={selected !== null}
          >
            {option}
          </button>
        ))}
      </div>

      {selected && (
        <button onClick={nextQuestion} style={nextButtonStyle}>
          Sonraki
        </button>
      )}
    </div>
  );
}

export default KeywordTest;
