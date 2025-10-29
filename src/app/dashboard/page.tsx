"use client";

import React, { useState, useCallback } from "react";
import Header from "@/app/components/HeaderDashboard";
import Sidebar from "@/app/components/SidebarDashboard";

// Importa aquí tu contenido principal (dashboard)
import AppContent from "@/app/components/AppContent";

const Page: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Contenido principal */}
        <main className="p-4 md:p-6 flex-1 overflow-y-auto">
          <AppContent />
        </main>
      </div>
    </div>
  );
};

export default Page;
