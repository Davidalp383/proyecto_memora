"use client";

import React from "react";
import AuthTabs from "../components/AuthTabs";
import WelcomeSection from "../components/WelcomeSection";
import { useAuth } from "../context/AuthContext";
import DashboardPage from "../dashboard/page";

const RegisterPage: React.FC = () => {
  const { isLoggedIn } = useAuth();

  // Si el usuario está loggeado, mostramos el dashboard
  if (isLoggedIn) return <DashboardPage />;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl flex max-w-4xl w-full overflow-hidden">
        {/* Columna izquierda */}
        <WelcomeSection />

        {/* Columna derecha */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-12">
          <AuthTabs />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
