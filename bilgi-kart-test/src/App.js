import React, { useState } from 'react';
import './App.css';
import data from './data/data.json';
import Flashcard from './components/Flashcard';
import KeywordTest from './components/KeywordTest';
import Quiz from './components/Quiz';

function App() {
  const [activeTab, setActiveTab] = useState('flashcard');
  const [selectedSubject, setSelectedSubject] = useState('matematik');
  const subjects = Object.keys(data);

  return (
    <div className="App">
      {/* Üst Navbar */}
      <div className="navbar">
        <div>🧠 SınavLab</div>
        <select
          className="course-selector"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {subjects.map((subj) => (
            <option key={subj} value={subj}>
              {subj.charAt(0).toUpperCase() + subj.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sekmeler */}
      <div className="tab-bar">
        <button
          className={activeTab === 'flashcard' ? 'active' : ''}
          onClick={() => setActiveTab('flashcard')}
        >
          Bilgi Kartları
        </button>
        <button
          className={activeTab === 'keyword' ? 'active' : ''}
          onClick={() => setActiveTab('keyword')}
        >
          Anahtar Kelime Testi
        </button>
        <button
          className={activeTab === 'quiz' ? 'active' : ''}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz
        </button>
      </div>

      {/* İçerik Alanı */}
      <div className="content-area">
        {activeTab === 'flashcard' && <Flashcard flashcards={data[selectedSubject].flashcards} />}
        {activeTab === 'keyword' && <KeywordTest keywords={data[selectedSubject].keywords} />}
        {activeTab === 'quiz' && <Quiz quiz={data[selectedSubject].quiz} />}
      </div>
    </div>
  );
}

export default App;
