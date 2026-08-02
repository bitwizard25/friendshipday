import { Link } from "react-router";
import { Frown, ArrowLeft, ShieldX, Ghost } from "lucide-react";

export function meta() {
  return [
    { title: "Access Denied | Lost Your Place" },
    { name: "description", content: "Sry you lost your place!" },
  ];
}

export default function LostPlace() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-red-900/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-purple-900/30 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-md w-full glass-card p-8 md:p-10 rounded-3xl border-2 border-red-800/60 shadow-2xl relative z-10 animate-float">
        {/* Animated Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-red-950/80 rounded-full flex items-center justify-center border-4 border-red-600/80 shadow-lg text-red-500 animate-bounce">
          <Ghost className="w-12 h-12" />
        </div>

        {/* Comic Tag */}
        <div className="inline-block bg-red-900/50 text-red-400 font-comic text-lg px-4 py-1.5 rounded-full border border-red-700/50 mb-4">
          ACCESS STATUS: EXPIRATION EXCEEDED 🏃‍♀️💨
        </div>

        {/* Message requested by user */}
        <h1 className="text-4xl md:text-5xl font-comic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 mb-4 leading-tight">
          Sry you lost your place
        </h1>

        <p className="text-gray-300 font-outfit text-base mb-8">
          Looks like the secret friendship portal closed its doors... or maybe your spot got snatched! 💨
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-comic text-xl px-6 py-3.5 rounded-2xl border border-slate-600 transition-all hover:scale-105 active:scale-95 shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>TRY ANOTHER NAME</span>
        </Link>
      </div>
    </div>
  );
}
