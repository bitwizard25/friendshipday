import { useState } from "react";
import { useNavigate } from "react-router";
import { Sparkles, Heart, ShieldAlert, ArrowRight, UserCheck } from "lucide-react";

export function meta() {
  return [
    { title: "Friendship Day Verification 💖 | Enter Your Name" },
    { name: "description", content: "Enter your name to unlock your personalized Friendship Day portal!" },
  ];
}

export default function Home() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim().toLowerCase();

    if (!cleanName) {
      setError("Please enter your name first!");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      if (cleanName === "shobhana" || cleanName === "shunu") {
        navigate("/shobhana");
      } else if (cleanName === "krishika") {
        navigate("/lost-place");
      } else {
        navigate("/friendlist-removed");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen spidey-web-bg flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Main Card */}
      <div className="w-full max-w-lg glass-card rounded-3xl p-8 md:p-10 border-2 border-red-500/30 shadow-2xl relative z-10 text-center animate-float">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          <span>Friendship Day Security Portal</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-comic tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-400 to-yellow-400 mb-3 drop-shadow-md">
          Who Are You, Superhero?
        </h1>
        <p className="text-gray-300 text-sm md:text-base font-outfit mb-8">
          Enter your name below to verify your identity and unlock your exclusive Friendship Day portal!
        </p>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter your name here..."
              className="w-full bg-slate-900/90 border-2 border-slate-700 focus:border-red-500 rounded-2xl px-5 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-red-500/20 transition-all font-outfit shadow-inner"
              autoFocus
            />
            <UserCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500" />
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm font-medium bg-red-950/50 py-2 px-4 rounded-xl border border-red-800/50 animate-bounce">
              <ShieldAlert className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-comic text-2xl tracking-wider py-4 px-6 rounded-2xl shadow-lg spidey-glow transform hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span className="animate-pulse">VERIFYING IDENTITY...</span>
            ) : (
              <>
                <span>VERIFY & ENTER</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Footnote */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-gray-400 font-outfit">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Happy Friendship Day
          </span>
          <span className="text-gray-500">Spider-Man Approved 🕸️</span>
        </div>
      </div>
    </div>
  );
}
