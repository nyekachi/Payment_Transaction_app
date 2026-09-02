import React, { useState } from "react";
import { Sparkles, Eye, EyeOff, Wifi, ShieldCheck, Lock } from "lucide-react";

export default function FairyCard({ userName = "Carol" }) {
  const [showNumber, setShowNumber] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);

  const fullCardNumber = "4921 •••• •••• 7731";
  const revealedCardNumber = "4921 8839 1204 7731";

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Physical Card Container - Enchanted Teal Gradient */}
      <div
        className={`w-full h-48 rounded-3xl p-5 relative overflow-hidden transition-all duration-500 select-none shadow-md border ${
          isFrozen
            ? "bg-slate-200/80 border-slate-300 grayscale"
            : "bg-gradient-to-tr from-teal-500 via-teal-400 to-emerald-200 border-white/50 shadow-teal-100"
        } backdrop-blur-lg flex flex-col justify-between text-white`}
      >
        {/* Iridescent shimmer overlays */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-emerald-300/40 rounded-full blur-2xl pointer-events-none" />

        {/* Brand & NFC */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span className="text-[11px] font-black tracking-widest text-teal-950/90 uppercase">
              Fairy Express
            </span>
          </div>
          <Wifi className="w-4 h-4 text-teal-900/80 rotate-90" />
        </div>

        {/* Gold Chip */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-9 h-7 rounded-md bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500 border border-amber-300/80 shadow-inner flex items-center justify-center">
            <div className="w-6 h-4 border border-amber-600/40 rounded-xs grid grid-cols-2 gap-0.5 opacity-60">
              <div className="border-r border-b border-amber-600/40" />
              <div className="border-b border-amber-600/40" />
              <div className="border-r border-amber-600/40" />
              <div />
            </div>
          </div>
          <span className="text-[9px] tracking-wider text-teal-950 font-bold uppercase drop-shadow-xs">
            Fairy Express
          </span>
        </div>

        {/* Card Number */}
        <div className="relative z-10">
          <p className="font-mono text-sm sm:text-base font-bold text-teal-950 tracking-widest drop-shadow-xs">
            {showNumber ? revealedCardNumber : fullCardNumber}
          </p>
        </div>

        {/* Footer: Name & Expiry */}
        <div className="flex items-end justify-between relative z-10">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-teal-900 font-bold block">
              Cardholder
            </span>
            <p className="text-[11px] font-black uppercase text-teal-950 tracking-wide">
              {userName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div>
              <span className="text-[8px] uppercase tracking-wider text-teal-900 font-bold block">
                Expires
              </span>
              <p className="font-mono text-[11px] font-bold text-teal-950">09/29</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/70 border border-white flex items-center justify-center text-xs shadow-xs">
              🧚
            </div>
          </div>
        </div>
      </div>

      {/* Card Controls */}
      <div className="flex items-center gap-2 w-full justify-center">
        <button
          type="button"
          onClick={() => setShowNumber(!showNumber)}
          className="px-2.5 py-1.5 bg-white rounded-xl border border-teal-100 text-[11px] font-bold text-slate-600 hover:text-teal-600 flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
        >
          {showNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showNumber ? "Hide" : "Show"}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsFrozen(!isFrozen)}
          className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 shadow-xs transition-all active:scale-95 ${
            isFrozen
              ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
              : "bg-white text-slate-600 border-teal-100 hover:text-teal-600"
          }`}
        >
          {isFrozen ? <Lock className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
          <span>{isFrozen ? "Unfreeze" : "Freeze"}</span>
        </button>
      </div>
    </div>
  );
}