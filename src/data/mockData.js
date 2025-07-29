import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Play, Pause, SkipBack, SkipForward, Volume2, BookOpen, Brain, Headphones, FileText, ChevronDown, ChevronRight } from 'lucide-react';

// Mock data for development
const mockLowGradeCourses = [
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
      },
      {
        id: 22,
        name: "Elektrik",
        subtopics: ["Akım", "Gerilim", "Direnç"],
        difficulty: "high"
      }
    ]
  }
];

const mockPodcasts = [
  {
    id: 1,
    title: "Matematik Temelleri",
    subject: "Matematik",
    duration: "15:30",
    description: "Cebir konularının temellerini öğrenin",
    audioUrl: "#", // This would be actual audio file
    topics: ["Cebir", "Denklemler"]
  },
  {
    id: 2,
    title: "Fizik Yasaları",
    subject: "Fizik",
    duration: "20:15",
    description: "Newton yasalarını hikaye ile öğrenin",
    audioUrl: "#",
    topics: ["Mekanik", "Kuvvet"]
  },
  {
    id: 3,
    title: "Geometri Hikayeleri",
    subject: "Matematik",
    duration: "12:45",
    description: "Geometrik şekillerin dünyasına yolculuk",
    audioUrl: "#",
    topics: ["Geometri", "Üçgenler"]
  }
];

const mockStories = [
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

Ve böylece hazinede 6 altın olduğunu keşfetti! Bu basit adımları takip ederek herhangi bir birinci dereceden denklemi çözebilirsin.`
  },
  {
    id: 2,
    title: "Newton'un Elması",
    subject: "Fizik",
    topic: "Mekanik",
    difficulty: "Zor",
    readTime: "7 dakika",
    content: `Sir Isaac Newton bahçesinde otururken, ünlü elma düştü ve fizik tarihini değiştirdi.

"Neden elma aşağı düşüyor da yukarı çıkmıyor?" diye merak etti Newton. Bu soru onu evrensel çekim yasasını keşfetmeye yöneltti.

F = G × (m1 × m2) / r²

Bu formül der ki: İki cisim arasındaki çekim kuvveti, kütlelerinin çarpımı ile doğru, aralarındaki mesafenin karesi ile ters orantılıdır.

Newton'un bu keşfi sadece düşen elmayı değil, gezegenlerin hareketini de açıklıyordu!`
  }
];
