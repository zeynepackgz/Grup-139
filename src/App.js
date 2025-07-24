import React, { useState } from 'react';
import ConceptMap from './components/ConceptMap';
import PodcastPlayer from './components/PodcastPlayer';
import StoryReader from './components/StoryReader';

// Mock data
const mockData = {
  courses: [
    {
      id: 1,
      name: "Matematik",
      grade: 45,
      topics: [
        {
          id: 11,
          name: "Cebir",
          subtopics: ["Denklemler", "Eşitsizlikler", "Fonksiyonlar"],
          difficulty: "high"
        },
        {
          id: 12,
          name: "Geometri", 
          subtopics: ["Üçgenler", "Dörtgenler", "Çember"],
          difficulty: "medium"
        }
      ]
    },
    {
      id: 2,
      name: "Fizik",
      grade: 38,
      topics: [
        {
          id: 21,
          name: "Mekanik",
          subtopics: ["Hareket", "Kuvvet", "Enerji"],
          difficulty: "high"
        }
      ]
    },
  ],
  podcasts: [
    {
      id: 1,
      title: "Matematik Temelleri",
      subject: "Matematik",
      duration: "15:30",
      description: "Cebir konularının temellerini öğrenin",
      difficulty: "Orta"
    },
    {
      id: 2,
      title: "Fizik Yasaları",
      subject: "Fizik", 
      duration: "20:15",
      description: "Newton yasalarını hikaye ile öğrenin",
      difficulty: "Zor"
    }
  ],
  stories: [
    {
      id: 1,
      title: "Denklemlerin Gizemi",
      subject: "Matematik",
      topic: "Cebir",
      difficulty: "Orta",
      readTime: "5 dakika",
      content: `Bir zamanlar Sayılar Krallığı'nda, genç matematikçi Ahmet büyük bir problemle karşılaştı.

Krallığın hazinesinde saklı olan altınların sayısını bulmak için bir denklem çözmesi gerekiyordu: 2x + 5 = 17

Ahmet düşünmeye başladı: "Eğer 2x + 5 = 17 ise, önce her iki taraftan 5 çıkarmalıyım."
2x + 5 - 5 = 17 - 5
2x = 12

"Şimdi de her iki tarafı 2'ye bölmeliyim."
x = 12 ÷ 2 = 6

Ve böylece hazinede 6 altın olduğunu keşfetti!`
    }
  ]
};

function App() {
  const [activeTab, setActiveTab] = useState('conceptMap');

  const tabs = [
    { id: 'conceptMap', name: 'Kavram Haritası' },
    { id: 'podcasts', name: 'Podcast' },
    { id: 'stories', name: 'Hikayeler' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        padding: '20px',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1f2937',
          margin: 0
        }}>
          🧠 SınavLab - Kişiselleştirilmiş Öğrenme
        </h1>
      </header>

      {/* Navigation */}
      <nav style={{ 
        backgroundColor: 'white',
        padding: '0 20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 0',
                border: 'none',
                backgroundColor: 'transparent',
                borderBottom: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
                color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main style={{ padding: '30px 20px' }}>
        {activeTab === 'conceptMap' && <ConceptMap courses={mockData.courses} />}
        {activeTab === 'podcasts' && <PodcastPlayer podcasts={mockData.podcasts} />}
        {activeTab === 'stories' && <StoryReader stories={mockData.stories} />}
      </main>
    </div>
  );
}

export default App;