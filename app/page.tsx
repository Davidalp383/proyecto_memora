"use client";
import React, { useState } from "react";
import { useAuth } from "./context/AuthContext";
import DashboardPage from "./dashboard/page";
import MemoraLandingPage from "./pages/index"; // tu landing page
import AuthTabs from "./components/AuthTabs";

export default function Home() {
  const { isLoggedIn } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  // Si el usuario está logueado, mostramos dashboard
  if (isLoggedIn) return <DashboardPage />;

  // Landing page siempre visible
  return (
    <div className="relative min-h-screen">
      <MemoraLandingPage onAuthClick={() => setShowAuth(true)} />

      {/* Overlay / panel del formulario */}
      {showAuth && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <button
              onClick={() => setShowAuth(false)}
              className="text-gray-500 hover:text-gray-700 mb-4"
            >
              Cerrar
            </button>
            <AuthTabs />
          </div>
        </div>
      )}
    </div>
  );
}
