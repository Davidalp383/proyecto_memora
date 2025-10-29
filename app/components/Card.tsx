import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode; // para gráficos o contenido extra
}

const Card: React.FC<CardProps> = ({ title, value, icon, className, children }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 flex flex-col space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
        {icon && <div className="text-indigo-600">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default Card;
