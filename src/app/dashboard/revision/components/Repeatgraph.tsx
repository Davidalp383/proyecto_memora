"use client";
import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RepeatData } from "../data/mockData";
import { BarChart4 } from "lucide-react";

interface Props {
  data: RepeatData[];
}

const RepeatGraph: React.FC<Props> = ({ data }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
      <BarChart4 size={20} className="mr-2 text-blue-600" />
      Próximas revisiones
    </h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
        <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} formatter={(value: number) => [`${value} tarjetas`, ""]} />
        <Bar dataKey="count" fill="#4ade80" radius={[4, 4, 0, 0]} /> {/* Color verde suave */}
      </BarChart>
    </ResponsiveContainer>
    <p className="text-xs text-gray-500 mt-3 text-center">Tarjetas pendientes por día/intervalo.</p>
  </div>
);

export default RepeatGraph;
