import React from 'react';

const ConceptMap = ({ courses }) => {
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
      color: '#1f2937'
    },
    courseItem: {
      padding: '16px',
      margin: '12px 0',
      borderRadius: '8px',
      border: '2px solid'
    },
    lowGrade: {
      backgroundColor: '#fee2e2',
      borderColor: '#ef4444',
      color: '#991b1b'
    },
    mediumGrade: {
      backgroundColor: '#fef3c7',
      borderColor: '#f59e0b',
      color: '#92400e'
    },
    topicItem: {
      backgroundColor: '#e0e7ff',
      padding: '12px',
      margin: '8px 0',
      borderRadius: '6px',
      marginLeft: '20px'
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={{ fontSize: '24px', marginRight: '12px' }}>🧠</span>
        Kavram Haritası - Düşük Notlu Konularınız
      </div>
      
      <div style={{ 
        marginBottom: '20px', 
        padding: '12px', 
        backgroundColor: '#f3f4f6', 
        borderRadius: '8px' 
      }}>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '16px', 
          fontSize: '14px' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              backgroundColor: '#ef4444', 
              borderRadius: '50%', 
              marginRight: '8px' 
            }}></div>
            <span>Düşük Not (&lt;50)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              backgroundColor: '#f59e0b', 
              borderRadius: '50%', 
              marginRight: '8px' 
            }}></div>
            <span>Orta Not (50-70)</span>
          </div>
        </div>
      </div>

      {courses.map(course => (
        <div key={course.id} style={{
          ...styles.courseItem,
          ...(course.grade < 50 ? styles.lowGrade : styles.mediumGrade)
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '18px' }}>
            {course.name} - Not: {course.grade}/100
          </h3>
          <div>
            {course.topics.map(topic => (
              <div key={topic.id} style={styles.topicItem}>
                <strong style={{ color: '#4338ca' }}>{topic.name}</strong>
                <div style={{ 
                  marginLeft: '16px', 
                  marginTop: '6px', 
                  fontSize: '14px', 
                  color: '#6b7280' 
                }}>
                  {topic.subtopics.join(' • ')}
                </div>
                <div style={{ 
                  marginTop: '6px', 
                  fontSize: '12px',
                  color: topic.difficulty === 'high' ? '#dc2626' : '#059669',
                  fontWeight: 'bold'
                }}>
                  Zorluk: {topic.difficulty === 'high' ? 'Yüksek' : 'Orta'}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div style={{ 
        marginTop: '16px', 
        fontSize: '14px', 
        color: '#6b7280',
        padding: '12px',
        backgroundColor: '#f0f9ff',
        borderRadius: '6px',
        border: '1px solid #bae6fd'
      }}>
        💡 İpucu: Bu konulara odaklanarak notlarınızı yükseltebilirsiniz!
      </div>
    </div>
  );
};

export default ConceptMap;