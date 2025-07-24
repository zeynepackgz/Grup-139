import React, { useState } from 'react';

const StoryReader = ({ stories }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['all', ...new Set(stories.map(s => s.subject))];
  const filteredStories = selectedSubject === 'all' 
    ? stories 
    : stories.filter(s => s.subject === selectedSubject);

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
    storyItem: {
      backgroundColor: '#f9fafb',
      padding: '16px',
      margin: '12px 0',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    storyContent: {
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      lineHeight: '1.8',
      fontSize: '16px',
      border: '1px solid #e5e7eb'
    }
  };

  if (selectedStory) {
    return (
      <div style={styles.card}>
        <button 
          onClick={() => setSelectedStory(null)}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '20px',
            fontSize: '14px'
          }}
        >
          ← Hikaye Listesine Dön
        </button>
        
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '12px' 
          }}>
            {selectedStory.title}
          </h1>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            fontSize: '14px', 
            color: '#6b7280',
            marginBottom: '16px'
          }}>
            <span>📚 {selectedStory.subject}</span>
            <span>•</span>
            <span>{selectedStory.topic}</span>
            <span>•</span>
            <span>⏱️ {selectedStory.readTime}</span>
            <span style={{
              ...getDifficultyColor(selectedStory.difficulty),
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {selectedStory.difficulty}
            </span>
          </div>
        </div>

        <div style={styles.storyContent}>
          {selectedStory.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '16px', color: '#374151' }}>
              {paragraph}
            </p>
          ))}
        </div>

        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          backgroundColor: '#eff6ff', 
          borderRadius: '8px',
          border: '1px solid #bfdbfe'
        }}>
          <h4 style={{ 
            fontWeight: 'bold', 
            color: '#1e40af', 
            marginBottom: '8px',
            fontSize: '16px'
          }}>
            💡 Öğrendiğin Konular:
          </h4>
          <p style={{ color: '#1e40af', margin: 0, fontSize: '14px' }}>
            Bu hikayede <strong>{selectedStory.topic}</strong> konusunun temellerini öğrendin. 
            Benzer hikayeleri okuyarak konuyu pekiştirebilirsin!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '24px', marginRight: '12px' }}>📚</span>
          Hikaye ile Öğren
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

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {filteredStories.map(story => (
          <div 
            key={story.id} 
            style={{
              ...styles.storyItem,
              ':hover': { backgroundColor: '#f3f4f6' }
            }}
            onClick={() => setSelectedStory(story)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '18px', 
                  fontWeight: 'bold',
                  color: '#1f2937'
                }}>
                  {story.title}
                </h3>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  fontSize: '14px', 
                  color: '#6b7280',
                  marginBottom: '8px'
                }}>
                  <span>📚 {story.subject}</span>
                  <span>{story.topic}</span>
                  <span>⏱️ {story.readTime}</span>
                </div>
                <div>
                  <span style={{
                    ...getDifficultyColor(story.difficulty),
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {story.difficulty}
                  </span>
                </div>
              </div>
              <div style={{ marginLeft: '16px', fontSize: '20px', color: '#9ca3af' }}>
                →
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 20px', 
          color: '#6b7280' 
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
          <p>Bu kategoride henüz hikaye bulunmuyor.</p>
        </div>
      )}
    </div>
  );
};

export default StoryReader;