"use client";
import React, { useState } from "react";
import { Check, Calendar, Clock, Boxes, Target } from "lucide-react";
import { FlashcardData } from "../data/mockData";
import { BUTTON_RESPONSES } from "../data/mockData";

interface Props {
  card: FlashcardData;
  onResponse: (response: string) => void;
}

const Flashcard: React.FC<Props> = ({ card, onResponse }) => {
  const [isAnswerShown, setIsAnswerShown] = useState(false);

  const handleShowAnswer = () => setIsAnswerShown(true);

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center min-h-[400px] w-full max-w-xl transition-all duration-300">
      <div className="flex justify-between w-full mb-6 text-sm text-gray-500">
        <div className="flex items-center space-x-1 font-semibold text-blue-700">
          <Boxes size={16} />
          <span>{card.deck} &bull; {card.topic}</span>
        </div>
        <span className="text-red-500 font-medium">Restantes: 29</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center w-full">
        <div className="mb-8 text-2xl font-semibold text-gray-900 leading-relaxed max-w-lg">
          {card.question}
        </div>
        {isAnswerShown && (
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 text-base text-gray-700 mt-4">
            <p className="font-bold mb-2 text-blue-800">Respuesta:</p>
            <p>{card.answer}</p>
          </div>
        )}
      </div>

      <div className="w-full mt-8 pt-6 border-t border-gray-100">
        {!isAnswerShown ? (
          <button 
            onClick={handleShowAnswer}
            className="w-full py-4 bg-blue-500 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-blue-600 flex items-center justify-center"
          >
            <Check size={20} className="mr-2" />
            Mostrar respuesta
          </button>
        ) : (
          <div className="flex space-x-3">
            {BUTTON_RESPONSES.map(btn => (
              <button 
                key={btn.label}
                onClick={() => onResponse(btn.label)}
                className={`flex-1 py-4 text-white font-bold text-lg rounded-xl shadow-md transform hover:scale-[1.02] ${btn.color}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
