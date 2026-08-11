import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";

// Placeholder Dashboard component (we will build the real one next!)
const DashboardPlaceholder = () => (
  <div className="min-h-screen bg-whimsical-sky p-10 text-center">
    <h1 className="text-4xl font-bold text-whimsical-textDark mb-4">
      🎉 Welcome to Your Whimsical Dashboard!
    </h1>
    <p className="text-whimsical-textMuted text-lg mb-6">
      Your authentication worked flawlessly! Next up: Building your transaction cards & balance charts!
    </p>
    <button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/";
      }}
      className="px-6 py-3 bg-red-400 text-white font-bold rounded-2xl hover:bg-red-500 shadow-lg shadow-red-100 transition-all"
    >
      Log Out
    </button>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}