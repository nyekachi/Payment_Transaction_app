import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Sparkles, Cloud, Lock, Mail, User, ArrowRight } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const response = await API.post(endpoint, formData);
      // Save JWT Token to local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Oopsie! Something went wrong 🙈");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-whimsical-sky flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Cloud Elements */}
      <div className="absolute top-10 left-10 text-sky-200 animate-pulse">
        <Cloud size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-sky-200 animate-bounce">
        <Sparkles size={80} />
      </div>

      {/* Main Whimsical Card */}
      <div className="w-full max-w-md bg-whimsical-cloud rounded-4xl p-8 shadow-cloud border-4 border-sky-100 relative z-10 transition-all duration-300">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 text-sky-500 rounded-full mb-3 shadow-sm">
            <Sparkles className="w-8 h-8 animate-spin-slow" />
          </div>
          <h1 className="text-3xl font-bold text-whimsical-textDark tracking-tight">
            {isLogin ? "Welcome Back, Star! ✨" : "Join the Magic! 🪄"}
          </h1>
          <p className="text-whimsical-textMuted text-sm mt-1">
            {isLogin ? "Ready to manage your treasury?" : "Start tracking your financial fortune!"}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-2xl text-sm text-center border border-red-100 animate-shake">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-sky-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                placeholder="Your Fairytale Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-sky-50 border-2 border-transparent focus:border-sky-300 rounded-2xl text-whimsical-textDark focus:outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-sky-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Magic Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-sky-50 border-2 border-transparent focus:border-sky-300 rounded-2xl text-whimsical-textDark focus:outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-sky-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Secret Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-12 pr-4 py-3 bg-sky-50 border-2 border-transparent focus:border-sky-300 rounded-2xl text-whimsical-textDark focus:outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 bg-whimsical-accent hover:bg-sky-400 active:scale-95 text-white font-bold rounded-2xl shadow-lg shadow-sky-200 transition-all flex items-center justify-center gap-2 group mt-2"
          >
            {loading ? "Casting Spell..." : isLogin ? "Enter Treasury" : "Create Account"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Toggle Login/Register */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="text-sky-500 hover:text-sky-600 font-semibold text-sm underline decoration-wavy decoration-sky-300 underline-offset-4 transition-colors"
          >
            {isLogin ? "Need a new account? Register here " : "Already have an account? Sign in 🔑"}
          </button>
        </div>

      </div>
    </div>
  );
}