// components/Header.tsx
"use client";
import React from "react";

const Header = () => (
  <header className="flex justify-end items-center p-4 bg-white shadow-sm">
    <div className="flex items-center gap-4">
      <button className="relative">
        🔔
        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="flex items-center gap-2">
        <span>David</span>
        <img src="/avatar.png" alt="avatar" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  </header>
);

export default Header;
