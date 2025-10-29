"use client";
import React from "react";
import { Clock, Repeat } from "lucide-react";

interface Props {
  sessionCount: number;
  totalCount: number;
  timeElapsed: string;
}

const ProgressBar: React.FC<Props> = ({ sessionCount, totalCount, timeElapsed }) => {
  const progress = Math.min(100, (sessionCount / totalCount) * 100);

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center space-x-2 text-gray-700">
        <Repeat size={18} className="text-blue-600" />
        <span className="font-semibold text-sm">Sesión: {sessionCount}/{totalCount}</span>
      </div>
      <div className="flex-1 mx-6 h-2 bg-gray-200 rounded-full">
        <div className="h-2 bg-blue-600 rounded-full transition-all duration-500 ease-out"
             style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center space-x-1 text-gray-600">
        <Clock size={16} />
        <span className="text-sm">{timeElapsed}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
