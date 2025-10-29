"use client";
import React, { useState, useCallback } from "react";
import ProgressBar from "../dashboard/revision/components/ProgressBar";
import Flashcard from "../dashboard/revision/components/Flashcard";
import RepeatGraph from "../dashboard/revision/components/Repeatgraph";
import ReviewCalendar from "../dashboard/revision/components/ReviewCalendar";
import DeckList from "../dashboard/revision/components/DeckList";
import { MOCK_FLASHCARD, MOCK_DECKS, MOCK_REPEAT_DATA } from "../dashboard/revision/data/mockData";
import { Repeat, Settings, Boxes } from "lucide-react";

import { useRouter } from "next/navigation";

const RepetitionPage: React.FC = () => {
  const [currentCard, setCurrentCard] = useState(MOCK_FLASHCARD);
  const [sessionCount, setSessionCount] = useState(21);
  const totalCount = 50;
  const timeElapsed = "12:45";

  const handleCardResponse = useCallback((response: string) => {
    setSessionCount(prev => prev < totalCount ? prev + 1 : prev);
    alert(`Tarjeta marcada como "${response}".`);
  }, []);

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <ProgressBar sessionCount={sessionCount} totalCount={totalCount} timeElapsed={timeElapsed} />

      <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
        <div className="flex items-center text-2xl font-bold text-green-600">
          <Repeat size={24} className="mr-2" />
          Spaced Review
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Botón de volver al Dashboard */}
          <button
            onClick={() => router.push("/register")} 
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            ← Dashboard
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition">
            <Boxes size={20} className="mr-1" /> Mazos
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-600 transition">
            <Settings size={20} className="mr-1" /> Configuración
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 max-w-7xl mx-auto">
        <div className="lg:col-span-1">
          <DeckList decks={MOCK_DECKS} />
        </div>
        <div className="lg:col-span-2 flex justify-center items-start">
          <Flashcard card={currentCard} onResponse={handleCardResponse} />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ReviewCalendar />
          <RepeatGraph data={MOCK_REPEAT_DATA} />
        </div>
      </div>
    </div>
  );
};

export default RepetitionPage;
