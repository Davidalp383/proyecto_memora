"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Card from "./Card";

interface PieChartCardProps {
  title: string;
  value: string | number;
  data: { name: string; value: number }[];
  colors?: string[];
}

const PieChartCard: React.FC<PieChartCardProps> = ({ title, value, data, colors }) => {
  const defaultColors = colors || ["#6366F1", "#C7D2FE", "#A5B4FC"];

  return (
    <Card title={title} value={value}>
      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={30}
              outerRadius={50}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={defaultColors[index % defaultColors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PieChartCard;
