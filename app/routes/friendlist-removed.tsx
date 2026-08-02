import { Link } from "react-router";
import { Disc, ArrowLeft, Radio, AlertOctagon } from "lucide-react";

export function meta() {
  return [
    { title: "Friendlist Status | Not Found" },
    { name: "description", content: "You might have been removed from friendlist or never existed..." },
  ];
}

export default function FriendlistRemoved() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-center relative overflow-hidden">
      {/* Background Neon Web Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <div className="max-w-md w-full glass-card p-8 md:p-10 rounded-3xl border-2 border-yellow-500/40 shadow-2xl relative z-10 animate-float">
        {/* Cassette Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-yellow-950/80 rounded-full flex items-center justify-center border-4 border-yellow-500/80 shadow-lg text-yellow-400 animate-spin-slow">
          <Radio className="w-12 h-12" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-950/60 text-yellow-400 font-comic text-base px-4 py-1 rounded-full border border-yellow-700/50 mb-4">
          <AlertOctagon className="w-4 h-4" />
          <span>FRIENDLIST TRACKER 🎵</span>
        </div>

        {/* Message requested by user */}
        <h1 className="text-3xl md:text-4xl font-comic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-500 mb-4 leading-snug">
          You might have been removed from friendlist or never existed...
        </h1>

        <p className="text-gray-400 font-outfit text-sm md:text-base mb-8">
          The records are blank! Either you're an undercover secret agent or your ticket expired... 🕵️‍♂️
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-slate-950 font-comic text-xl px-6 py-3.5 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>TRY ANOTHER NAME</span>
        </Link>
      </div>
    </div>
  );
}
