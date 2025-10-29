"use client";

import React from "react";
import { LucideIcon, HelpCircle,  Gauge, Clock, ListTodo, Star, Search, Menu, X, StarOff, Trophy  } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems: { name: string; icon: LucideIcon; active: boolean }[] = [
    { name: "Panel", icon: Gauge, active: true },
    { name: "Pomodoro", icon: Clock, active: false },
    { name: "Repeticion Espaciada", icon: ListTodo, active: false },
    { name: "Logros", icon: Trophy, active: false },
    { name: "Notificaciones", icon: Star, active: false },
    { name: "Ayuda y Soporte", icon: HelpCircle, active: false },
  ];

  const router = useRouter();

  return (
    <>
      {/* Botón de Menú (Solo móvil) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-blue-600 text-white shadow-lg"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out
        w-65 bg-white border-r border-gray-200 flex flex-col p-6 z-50 shadow-2xl lg:shadow-none
      `}
      >
        {/* Logo */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-blue-600">Estudio App</h1>
          <button className="lg:hidden text-gray-600 hover:text-gray-900" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <label htmlFor="search-nav" className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
            Buscar...
          </label>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              id="search-nav"
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Navegación</p>
          <ul>
            {navItems.map((item) => (
              <li key={item.name} className="mb-2">
                <button
                  onClick={() => {
                    if (item.name === "Repeticion Espaciada") router.push("/revision");
                    else if (item.name === "Pomodoro") router.push("/pomodoro");
                    else if (item.name === "Logros") router.push("/logros");
                    else if (item.name === "Notificaciones") router.push("/notificaciones");
                    else if (item.name === "Ayuda y Soporte") router.push("/ayudaConfiguracion");
                  }}
                  className={`flex items-center w-full p-3 rounded-xl transition duration-150
                    ${item.active ? "bg-blue-100 text-blue-700 font-semibold shadow-inner" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Perfil inferior */}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <div className="flex items-center">
            <img
              src="https://placehold.co/40x40/60a5fa/ffffff?text=AG"
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => { e.currentTarget.onerror = null; e.currentTarget.src="https://placehold.co/40x40/60a5fa/ffffff?text=AG"; }}
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-800 text-sm">Alex García</p>
              <p className="text-xs text-gray-500">Estudiante</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
