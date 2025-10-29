"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Card from "./Card";

interface BarChartCardProps {
  title: string;
  value: string | number;
  data: { name: string; value: number }[];
  barColor?: string;
}

const BarChartCard: React.FC<BarChartCardProps> = ({ title, value, data, barColor }) => {
  return (
    <Card title={title} value={value}>
      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={barColor || "#6366F1"} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BarChartCard;
