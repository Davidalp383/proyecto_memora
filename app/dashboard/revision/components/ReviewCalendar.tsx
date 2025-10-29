"use client";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ReviewCalendar: React.FC = () => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const reviewDays = [3, 6, 9, 12, 15, 18, 21, 24, 27];

  const getDayClass = (day: number) => {
    if (day === 3) return 'bg-blue-600 text-white font-bold shadow-md'; // Hoy
    if (reviewDays.includes(day)) return 'bg-green-200 text-green-800 font-medium hover:bg-green-300';
    return 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Calendario de Repasos</h3>

      <div className="flex justify-between items-center text-sm mb-4 text-gray-500">
        <button className="flex items-center hover:text-blue-600 transition">
          <ChevronLeft size={16} /> Mes anterior
        </button>
        <span className="font-bold text-gray-800">Octubre 2025</span>
        <button className="flex items-center hover:text-blue-600 transition">
          Siguiente mes <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-2 text-gray-500">
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map(day => <span key={day} className="text-xs">{day}</span>)}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map(day => (
          <div key={day} className="flex items-center justify-center">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition ${getDayClass(day)}`}>
              {day}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-4">Azul: Hoy | Verde: Repaso Programado</p>
    </div>
  );
};

export default ReviewCalendar;
