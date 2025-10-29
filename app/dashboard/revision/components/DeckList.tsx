"use client";
import React from "react";
import { DeckSummary } from "../data/mockData";

interface Props {
  decks: DeckSummary[];
}

const DeckList: React.FC<Props> = ({ decks }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg h-full">
    <h3 className="text-lg font-bold text-gray-800 mb-4 flex justify-between items-center">
      <span>Mazos (Decks)</span>
      <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition">Ver todos</button>
    </h3>
    <ul className="space-y-4">
      {decks.map(deck => (
        <li key={deck.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
          <div>
            <p className="font-semibold text-gray-800">{deck.name}</p>
            <p className="text-sm text-blue-600 font-medium">{deck.dueToday} pendientes hoy</p>
          </div>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${deck.tagColor}`}>
            {deck.tag}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default DeckList;
