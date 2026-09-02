import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import FairyCard from "./FairyCard";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  LogOut,
  X,
  Feather,
  Wand2,
  Coins
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "Pixie Dust ✨"
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const fairyCategories = [
    "Pixie Dust ✨",
    "Dewdrops 💧",
    "Acorns & Seeds 🌰",
    "Nectar & Honey 🍯",
    "Dragon Scales 🐉",
    "Moonlight Charms 🌙"
  ];

  const fetchTransactions = async () => {
    try {
      const response = await API.get("/payments");
      setTransactions(response.data);
    } catch (err) {
      console.error("Failed to load fairy vault", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSyncStarterData = async () => {
    setSyncing(true);
    const starterRecords = [
      {
        title: "Forest Foraging Stipend",
        amount: 185.0,
        type: "income",
        category: "Acorns & Seeds 🌰",
        date: new Date("2026-09-01T08:00:00Z"),
      },
      {
        title: "Cobweb Wi-Fi Network Fee",
        amount: 28.5,
        type: "expense",
        category: "Dewdrops 💧",
        date: new Date("2026-09-01T14:30:00Z"),
      },
      {
        title: "Royal Blossom Dividend",
        amount: 520.0,
        type: "income",
        category: "Nectar & Honey 🍯",
        date: new Date("2026-09-02T09:00:00Z"),
      },
      {
        title: "Glow-worm Lantern Utility",
        amount: 14.2,
        type: "expense",
        category: "Moonlight Charms 🌙",
        date: new Date("2026-09-02T16:00:00Z"),
      },
      {
        title: "Dragon Armor Polish & Scales",
        amount: 45.0,
        type: "expense",
        category: "Dragon Scales 🐉",
        date: new Date("2026-09-03T11:00:00Z"),
      },
      {
        title: "Wand Polish & Sparkle Refill",
        amount: 22.0,
        type: "expense",
        category: "Pixie Dust ✨",
        date: new Date("2026-09-04T10:15:00Z"),
      },
    ];

    try {
      for (const item of starterRecords) {
        await API.post("/payments", item);
      }
      await fetchTransactions();
    } catch {
      alert("Failed to sync fairy history. Check your backend!");
    } finally {
      setSyncing(false);
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const netGlow = totalIncome - totalExpense;

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      await API.post("/payments", {
        ...formData,
        amount: Number(formData.amount)
      });
      setShowModal(false);
      setFormData({ title: "", amount: "", type: "income", category: "Pixie Dust ✨" });
      fetchTransactions();
    } catch {
      alert("The spell sputtered! Check your backend connection ✨");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/payments/${id}`);
      setTransactions(transactions.filter((t) => t._id !== id));
    } catch {
      alert("Could not dissolve transaction");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const chartData = transactions.slice().reverse().map((t) => ({
    name: new Date(t.date || t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    glow: t.type === "income" ? Number(t.amount) : -Number(t.amount)
  }));

  return (
    <div className="min-h-screen bg-[#F0F9FF] p-4 sm:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Fairy Header */}
        <header className="flex items-center justify-between bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-sky-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-sky-100 text-sky-500 rounded-2xl flex items-center justify-center">
              <Wand2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                {user.name ? `${user.name}'s Fairy Vault` : "The Fairy Vault"} 🧚‍♀️
              </h1>
              <p className="text-xs text-slate-400">Enchanted Ledger & Treasury</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-500 hover:bg-rose-100 font-semibold rounded-2xl transition-all text-xs active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Leave Grove</span>
          </button>
        </header>

        {/* Treasury Pods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-sky-500 bg-sky-50 px-2.5 py-0.5 rounded-full">
                Vault Glow
              </span>
              <h2 className="text-2xl font-black text-slate-800">
                {netGlow.toLocaleString(undefined, { minimumFractionDigits: 2 })} ✨
              </h2>
            </div>
            <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center">
              <Coins className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Spells Cast In
              </span>
              <h2 className="text-2xl font-black text-emerald-600">
                +{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                Dewdrops Spent
              </span>
              <h2 className="text-2xl font-black text-amber-600">
                -{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Fairy Debit Card & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Mounted Fairy Card Component */}
          <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-sm flex flex-col justify-center">
            <h3 className="font-bold text-xs text-slate-400 mb-3 uppercase tracking-wider">
              Enchanted Debit Card
            </h3>
            <FairyCard userName={user.name || "Carol"} />
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white p-6 rounded-3xl border border-sky-100 shadow-sm flex flex-col justify-between h-full min-h-[220px]">
            <div>
              <h3 className="font-bold text-sm text-slate-800 mb-1">Weave New Transaction</h3>
              <p className="text-xs text-slate-400 mb-4">
                Record incoming gold, tribute berries, or wand repairs.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-3 bg-sky-400 hover:bg-sky-500 text-white font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Record Fairy Gold</span>
              </button>

              <button
                onClick={handleSyncStarterData}
                disabled={syncing}
                className="w-full py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 active:scale-95 border border-sky-100 disabled:opacity-50"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{syncing ? "Inscribing Grove..." : "Sync Fairy Bank History"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pixie Tide Flow Chart */}
        <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-sm">
          <h3 className="font-bold text-sm text-slate-700 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            Pixie Tide (Flow Pattern)
          </h3>

          {chartData.length > 0 ? (
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="fairyGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "16px", borderColor: "#E0F2FE" }} />
                  <Area type="monotone" dataKey="glow" stroke="#38BDF8" strokeWidth={2.5} fillOpacity={1} fill="url(#fairyGlow)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-56 flex flex-col items-center justify-center text-slate-400 gap-2">
              <Feather className="w-8 h-8 text-sky-200" />
              <p className="text-xs">No magical currents detected yet.</p>
            </div>
          )}
        </div>

        {/* Ledger Activity */}
        <div className="bg-white p-5 rounded-3xl border border-sky-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-700">Recent Grove Ledger</h3>
            <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
              {transactions.length} entries
            </span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-slate-400 text-xs">Consulting the scroll...</div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 space-y-1">
              <Sparkles className="w-6 h-6 text-sky-300 mx-auto" />
              <p className="text-xs">Your fairy purse is calm and empty.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {transactions.map((t) => (
                <div
                  key={t._id}
                  className="flex items-center justify-between p-3.5 bg-sky-50/40 hover:bg-sky-50/80 rounded-2xl border border-sky-50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                        t.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {t.type === "income" ? "✨" : "💧"}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">{t.title}</h4>
                      <p className="text-[10px] text-slate-400">
                        {t.category} • {new Date(t.date || t.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold text-xs ${
                        t.type === "income" ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}{Number(t.amount).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDelete(t._id)}
                      className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                      title="Erase Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-sky-100 shadow-xl space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800">Record Entry 🧚</h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. Acorn Cap Fee, Forest Bounty"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-sky-50/50 border border-sky-100 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-300"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 mb-1">AMOUNT</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 bg-sky-50/50 border border-sky-100 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">TYPE</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2.5 bg-sky-50/50 border border-sky-100 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    <option value="income">Harvest (+)</option>
                    <option value="expense">Offering (-)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-2 py-2.5 bg-sky-50/50 border border-sky-100 rounded-xl text-xs text-slate-800 focus:outline-none"
                  >
                    {fairyCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-400 hover:bg-sky-500 text-white font-bold rounded-xl shadow-sm text-xs mt-2 transition-all active:scale-95"
              >
                Inscribe into Grove ✨
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}