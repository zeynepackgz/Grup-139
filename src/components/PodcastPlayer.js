import React, { useState } from 'react';

const PodcastPlayer = ({ podcasts }) => {
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', ...new Set(podcasts.map(p => p.subject))];
  const filteredPodcasts = selectedSubject === 'all' 
    ? podcasts 
    : podcasts.filter(p => p.subject === selectedSubject);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Kolay': return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'Orta': return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'Zor': return { backgroundColor: '#fee2e2', color: '#991b1b' };
      default: return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const styles = {
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    cardHeader: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#1f2937'
    },
    podcastItem: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      margin: '12px 0',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    activePodcast: {
      backgroundColor: '#dcfce7',
      borderColor: '#059669'
    },
    player: {
      backgroundColor: '#064e3b',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '20px'
    },
    button: {
      backgroundColor: '#059669',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginRight: '12px' }}>🎧</span>
          Podcast Dinle
        </div>
        
        <select 
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '14px'
          }}
        >
          <option value="all">Tüm Dersler</option>
          {subjects.slice(1).map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredPodcasts.map(podcast => (
          <div 
            key={podcast.id} 
            style={{
              ...styles.podcastItem,
              ...(currentPodcast?.id === podcast.id ? styles.activePodcast : {})
            }}
            onClick={() => {
              setCurrentPodcast(podcast);
              setIsPlaying(true);
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 'bold' }}>
                  {podcast.title}
                </h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#6b7280' }}>
                  {podcast.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#6b7280' }}>
                  <span>📚 {podcast.subject}</span>
                  <span>⏱️ {podcast.duration}</span>
                  <span style={{
                    ...getDifficultyColor(podcast.difficulty),
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 'bold'
                  }}>
                    {podcast.difficulty}
                  </span>
                </div>
              </div>
              <div style={{ marginLeft: '16px' }}>
                {currentPodcast?.id === podcast.id && isPlaying ? (
                  <span style={{ fontSize: '20px' }}>⏸️</span>
                ) : (
                  <span style={{ fontSize: '20px' }}>▶️</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentPodcast && (
        <div style={styles.player}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{currentPodcast.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', opacity: 0.8 }}>{currentPodcast.subject}</p>
            </div>
            <span style={{ fontSize: '20px' }}>🔊</span>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
              <span>0:00</span>
              <span>{currentPodcast.duration}</span>
            </div>
            <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '4px', height: '8px' }}>
              <div style={{ backgroundColor: '#10b981', height: '8px', borderRadius: '4px', width: '0%' }}></div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <button style={{ ...styles.button, padding: '8px 16px' }}>⏮️</button>
            <button 
              style={{ ...styles.button, padding: '12px 20px', fontSize: '18px' }}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button style={{ ...styles.button, padding: '8px 16px' }}>⏭️</button>
          </div>
        </div>
      )}

      {!currentPodcast && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px', 
          color: '#6b7280' 
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎧</div>
          <p>Dinlemek istediğiniz podcast'i seçin</p>
        </div>
      )}
    </div>
  );
};

export default PodcastPlayer;