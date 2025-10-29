"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bell, CheckCircle, Search, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-30 shadow-sm">
      <div className="flex justify-end items-center md:justify-between max-w-7xl mx-auto relative">
        
        {/* Búsqueda Central (Desktop) */}
        <div className="hidden md:block flex-grow max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Buscar temas, sesiones..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
            />
          </div>
        </div>

        {/* Íconos de Perfil y Notificaciones */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
            <CheckCircle size={20} />
          </button>

          {/* Imagen de perfil con menú */}
          <div className="relative" ref={menuRef}>
            <img
              src="https://placehold.co/36x36/60a5fa/ffffff?text=AG"
              alt="Perfil"
              className="w-9 h-9 rounded-full cursor-pointer border-2 border-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/36x36/60a5fa/ffffff?text=AG";
              }}
            />

            {/* Menú desplegable */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push("/configuracionUsuario");
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 flex items-center space-x-2"
                >
                  <Settings size={18} className="text-blue-600" />
                  <span>Configuración</span>
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    alert("Sesión cerrada (ejemplo)");
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut size={18} className="text-red-600" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
