// components/Sidebar.tsx
"use client";
import React from "react";
import Link from "next/link";
import { Home, Clock, Book, Award } from "lucide-react";

const Sidebar = () => (
  <aside className="w-64 bg-white shadow-md flex flex-col p-4">
    <h1 className="text-xl font-bold mb-6">Mi Dashboard</h1>
    <nav className="flex flex-col gap-4">
      <Link href="/dashboard/mis-sesiones" className="flex items-center gap-2 hover:text-blue-600">
        <Clock /> Mis Sesiones
      </Link>
      <Link href="/dashboard/pomodoro" className="flex items-center gap-2 hover:text-blue-600">
        <Clock /> Pomodoro
      </Link>
      <Link href="/dashboard/revision" className="flex items-center gap-2 hover:text-blue-600">
        <Book /> Revisión
      </Link>
      <Link href="/dashboard/logros" className="flex items-center gap-2 hover:text-blue-600">
        <Award /> Logros
      </Link>
    </nav>
  </aside>
);

export default Sidebar;
