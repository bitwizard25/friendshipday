import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import { ArrowLeft, Download, Heart } from "lucide-react";

export function meta() {
  return [
    { title: "Happy Friendship Day, Shobhana / Shunu (aka Moti)! 💖🕷️" },
    { name: "description", content: "Special Friendship Day Experience for Shobhana / Shunu (aka Moti)!" },
  ];
}

const LOAD_MSGS = [
  "Purani chats scan kar raha hoon…",
  "Blackmail folder decrypt ho raha hai…",
  "2023 wale jhagde delete kar raha hoon…",
  "'Moti' ka spelling verify kar raha hoon…",
  "Emotional damage load ho raha hai…",
  "Sorry counter reset kiya ja raha hai… (nope)",
  "Ready. Bhaag mat jaana.",
];

const TYPED_LINE = "Chhe saal, ek hi bandi, zero refunds. Ye poori website teri hai, Moti.";

const TIMELINE = [
  { year: "2020", title: "THE ORIGIN STORY", desc: "Poori duniya lockdown mein band thi, aur tu meri life mein khul gayi. May 2020. Internet down tha, hum online the." },
  { year: "2021", title: "3 AM CALL ERA", desc: "Tu boli “5 minute baat karni hai.” Do ghante baad sunrise ho gaya. Kisi ko kuch yaad nahi ki topic kya tha." },
  { year: "2022", title: "THE FIGURING-IT-OUT ERA", desc: "Kuch samajh nahi aa raha tha — na hume, na duniya ko. Bas ek alag hi duniya mein the hum dono. Plan koi nahi tha, phir bhi sab theek lag raha tha." },
  { year: "2023", title: "FIGHT. BLOCK. UNBLOCK. REPEAT.", desc: "Sach bolun? Hawa mein ud raha tha main tab. Zameen pe kaun tha? Tu. Aur maine hi tujhe hi ignore kiya. Mera saal, meri galti.", highlight: true },
  { year: "2024", title: "SORRY. SORRY. SORRY.", desc: "Hawa se neeche aaya aur seedha tere paas gaya. Bas sorry sorry bolta raha, jab tak tu maan nahi gayi. Tabhi asli value samajh aayi. Ye wali line mazaak nahi hai, Moti." },
  { year: "2025", title: "ABHI TAK BHAAGI NAHI", desc: "Paanch saal mujhe jhelne ke baad bhi tu yahin hai. Doctors isko “stockholm syndrome” bolte hain. Main “dosti” bolta hoon." },
  { year: "2026", title: "STATUS — ONGOING", desc: "Kahaani abhi baaki hai. Aur haan — is website ko banane mein jitna time laga, utne mein tu ek reel bhi nahi dekhti. Value samajh.", highlight: true },
];

const MEMORIES = [
  { id: 1, title: "Late Night Talks & Mad Laughs", desc: "Those random 2 AM conversations where we laugh at things that aren't even funny to anyone else!", tag: "CORE MEMORY", emoji: "😂" },
  { id: 2, title: "Unmatched Chaos & Moti Energy", desc: "Whenever we get together, chaos is guaranteed! Nobody can match our level of wildness.", tag: "PURE CHAOS", emoji: "🔥" },
  { id: 3, title: "Partner in Crime", desc: "Through thick and thin, bad decisions, and crazy plans — always got each other's back!", tag: "DUO FOR LIFE", emoji: "🛡️" },
  { id: 4, title: "Inside Jokes Only We Understand", desc: "One single look across the room and we both break down into un-controllable laughter!", tag: "SECRET CODE", emoji: "🤫" },
];

const GALLERY_PHOTOS = [
  { file: "memory-01.jpeg", width: 640, height: 1259 },
  { file: "memory-02.jpeg", width: 640, height: 1259 },
  { file: "memory-03.jpeg", width: 640, height: 1259 },
  { file: "memory-04.jpeg", width: 640, height: 1259 },
  { file: "memory-05.jpeg", width: 640, height: 1259 },
  { file: "memory-06.jpeg", width: 720, height: 1280 },
  { file: "memory-07.jpeg", width: 720, height: 1280 },
  { file: "memory-08.jpeg", width: 720, height: 1280 },
  { file: "memory-09.jpeg", width: 720, height: 1280 },
  { file: "memory-10.jpeg", width: 640, height: 1259 },
  { file: "memory-11.jpeg", width: 640, height: 640 },
  { file: "memory-12.jpeg", width: 640, height: 1259 },
  { file: "memory-13.jpeg", width: 669, height: 506 },
  { file: "memory-14.jpeg", width: 720, height: 1280 },
  { file: "memory-15.jpeg", width: 1600, height: 1600 },
];

const REASONS = [
  { n: "01", title: "TU MERE GHATIYA JOKES PE BHI HANSTI HAI", desc: "Pity hai ya pyaar, pata nahi. Main dono accept karta hoon." },
  { n: "02", title: "SCREENSHOT PEHLE, PERMISSION KABHI NAHI", desc: "Meri har embarrassing chat teri gallery mein archive hai. Respect." },
  { n: "03", title: "“MOTI” BOLNE PE AB TU “HAAN” BOL DETI HAI", desc: "Saalon ka resistance. Ek din mein surrender. Historic moment tha." },
  { n: "04", title: "BURI KHABAR SABSE PEHLE TU SUNTI HAI", desc: "Ghar walon ko baad mein pata chalta hai. Tujhe live update jaata hai." },
  { n: "05", title: "PEHLE DEFENCE, PHIR PROSECUTION", desc: "Sabke saamne mera saath. Akele mein poori class. Legal team ek hi bandi mein." },
  { n: "06", title: "2024 MEIN TUNE MERI SORRY MAAN LI", desc: "Main baar baar sorry bolta raha. Tu chaahti toh ignore kar sakti thi. Tune nahi kiya. Ye main kabhi nahi bhoolunga." },
  { n: "07", title: "KYUNKI TERE BINA YE SAB BORING HO JAATA", desc: "Ye wala mazaak nahi tha. Aage badh ja, awkward ho raha hai.", highlight: true },
];

const QUIZ = [
  { q: "Meri sabse badi weakness kya hai?", o: ["Tu", "Khana", "Ego", "Neend"], a: 0, ok: "Sahi. Aur tu iska full fayda uthati hai.", no: "Galat. Answer 'tu' tha. Emotional damage: mine." },
  { q: "Agar main jail chala jaun toh tu sabse pehle kya karegi?", o: ["Bail karaungi", "Photo kheech ke story lagaungi", "Ghar walon ko bataungi", "Saath aa jaungi"], a: 1, ok: "Bilkul sahi. Loyalty level: story-worthy.", no: "Jhooth. Story pehle lagti, bail baad mein." },
  { q: "Main tujhe 'Moti' kyun bulata hoon?", o: ["Kyunki tu hai", "Kyunki tujhe chidh hoti hai", "Pyaar se", "Aadat ho gayi"], a: 2, ok: "Correct. Aur tujhe pata bhi hai.", no: "Nahi yaar. Pyaar se. (Aur thodi chidhane ke liye.)" },
  { q: "2024 mein maine tujhse kitni baar sorry bola?", o: ["Ek baar", "Do-teen baar", "400+ baar", "Kabhi nahi"], a: 2, ok: "Haan. Aur har baar seriously bola tha.", no: "400+ baar, Moti. Count maine rakha tha." },
  { q: "Main tujhe kab chhodunga?", o: ["Agle saal", "Jab shaadi ho jayegi", "Kabhi nahi", "Kal"], a: 2, ok: "Sahi jawab. Isiliye tu best friend hai.", no: "Galat. Kabhi nahi. Sorry, tu phasi hui hai." },
];

const ROASTS: [number, string, string][] = [
  [0, "PURE LOVE MODE", "Kuch nahi bolunga. Tu perfect hai. Aaj ke din ke liye."],
  [20, "SOFT JAB", "Bas itna ki tu thoda late reply karti hai. Thoda matlab 6 ghante."],
  [40, "NORMAL DAY", "Tere 'main aa rahi hoon' ka matlab hota hai 'main abhi soyi hoon'."],
  [60, "MOTI MODE", "Tu photos 47 baar retake karti hai aur post pehli wali karti hai. Har baar."],
  [78, "SAVAGE", "Tera screen time meri poori life se zyada hai. Aur usme se aadha mere memes pe."],
  [92, "TOO FAR", "Okay ye zyada ho gaya. Main sorry bol deta hoon. Mujhe practice hai."],
];

const RAGE_LINES = ["Aur maar…", "Bhai chhod de…", "Ye Ned nahi hai…", "Web nahi niklegi…", "Okay bas…", "MOTI-SENSE TINGLING 🕷"];

export default function ShobhanaExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progRef = useRef<HTMLDivElement>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const vidBarRef = useRef<HTMLDivElement>(null);
  const vidKnobRef = useRef<HTMLDivElement>(null);
  const loadBarRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const rageCountRef = useRef(0);
  const spiderCardRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [loadMsg, setLoadMsg] = useState(LOAD_MSGS[0]);
  const [typed, setTyped] = useState("");
  const [days, setDays] = useState("—");
  const [muted, setMuted] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [vidMuted, setVidMuted] = useState(false);
  const [vidTime, setVidTime] = useState("00:00 / 00:00");
  const [videoAspect, setVideoAspect] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  const [activeMemory, setActiveMemory] = useState<number | null>(null);

  const [roast, setRoast] = useState(62);

  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [quizDone, setQuizDone] = useState(false);

  const [saidYes, setSaidYes] = useState(false);
  const [dodges, setDodges] = useState(0);

  const [credits, setCredits] = useState(false);

  /* ---------- sound beep ---------- */
  const beep = (freq: number, dur: number, type: OscillatorType = "sine") => {
    if (muted) return;
    try {
      audioCtxRef.current = audioCtxRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      const ac = audioCtxRef.current;
      if (ac.state === "suspended") ac.resume();
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = type;
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.09, ac.currentTime + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
      o.connect(g);
      g.connect(ac.destination);
      o.start();
      o.stop(ac.currentTime + dur + 0.02);
    } catch {
      // audio not available — non-essential
    }
  };

  const toast = (msg: string) => {
    const el = toastRef.current;
    if (!el) return;
    el.textContent = msg;
    el.style.transform = "translate(-50%,0)";
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      el.style.transform = "translate(-50%,140%)";
    }, 2200);
  };

  /* ---------- mount: loader sequence, typewriter, day counter, scroll bar, web trail ---------- */
  useEffect(() => {
    let i = 0;
    const loadTimer = setInterval(() => {
      i++;
      if (loadBarRef.current) {
        loadBarRef.current.style.width = Math.min(100, Math.round((i / (LOAD_MSGS.length - 1)) * 100)) + "%";
      }
      if (i >= LOAD_MSGS.length) {
        clearInterval(loadTimer);
        setLoading(false);
        return;
      }
      setLoadMsg(LOAD_MSGS[i]);
    }, 620);

    let t = 0;
    const typeTimer = setInterval(() => {
      t++;
      setTyped(TYPED_LINE.slice(0, t));
      if (t >= TYPED_LINE.length) clearInterval(typeTimer);
    }, 42);

    const tickDays = () => {
      const start = new Date(2020, 4, 1).getTime();
      const d = Math.floor((Date.now() - start) / 86400000);
      setDays(d.toLocaleString("en-IN"));
    };
    tickDays();
    const daysTimer = setInterval(tickDays, 30000);

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progRef.current) progRef.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // spider-web cursor trail
    const canvas = canvasRef.current;
    let raf = 0;
    let onMove: ((e: MouseEvent) => void) | undefined;
    let onResize: (() => void) | undefined;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const pts: { x: number; y: number; t: number }[] = [];
      const fit = () => {
        const r = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * r;
        canvas.height = window.innerHeight * r;
        ctx?.setTransform(r, 0, 0, r, 0, 0);
      };
      fit();
      onResize = fit;
      window.addEventListener("resize", onResize);

      onMove = (e: MouseEvent) => {
        pts.push({ x: e.clientX, y: e.clientY, t: performance.now() });
        if (pts.length > 26) pts.shift();
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      const draw = () => {
        if (ctx) {
          const now = performance.now();
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          while (pts.length && now - pts[0].t > 620) pts.shift();
          for (let idx = 1; idx < pts.length; idx++) {
            const a = (1 - (now - pts[idx].t) / 620) * 0.55;
            ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[idx - 1].x, pts[idx - 1].y);
            ctx.lineTo(pts[idx].x, pts[idx].y);
            ctx.stroke();
          }
          for (let idx = 3; idx < pts.length; idx += 3) {
            const a = (1 - (now - pts[idx].t) / 620) * 0.22;
            ctx.strokeStyle = `rgba(255,255,255,${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pts[idx].x, pts[idx].y);
            ctx.lineTo(pts[idx - 3].x, pts[idx - 3].y);
            ctx.stroke();
          }
          const last = pts[pts.length - 1];
          if (last) {
            ctx.fillStyle = "#e62429";
            ctx.beginPath();
            ctx.arc(last.x, last.y, 2.4, 0, 6.284);
            ctx.fill();
          }
        }
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
    }

    return () => {
      clearInterval(loadTimer);
      clearInterval(typeTimer);
      clearInterval(daysTimer);
      window.removeEventListener("scroll", onScroll);
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (onResize) window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- video wiring ---------- */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const fmt = (s: number) => {
      s = Math.max(0, Math.floor(s || 0));
      return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
    };
    const sync = () => {
      const p = v.duration ? (v.currentTime / v.duration) * 100 : 0;
      if (vidBarRef.current) vidBarRef.current.style.width = p + "%";
      if (vidKnobRef.current) vidKnobRef.current.style.left = p + "%";
      setVidTime(fmt(v.currentTime) + " / " + fmt(v.duration));
      if (v.videoWidth && v.videoHeight) setVideoAspect(v.videoWidth / v.videoHeight);
    };
    v.addEventListener("timeupdate", sync);
    v.addEventListener("loadedmetadata", sync);
    v.addEventListener("play", () => setPlaying(true));
    v.addEventListener("pause", () => setPlaying(false));
    v.addEventListener("ended", () => setPlaying(false));
    sync();
    return () => {
      v.removeEventListener("timeupdate", sync);
      v.removeEventListener("loadedmetadata", sync);
    };
  }, []);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: "smooth" });
  };

  const fireConfetti = (n = 70) => {
    confetti({ particleCount: n, spread: 80, origin: { y: 0.7 }, colors: ["#e62429", "#d8b25f", "#ffffff"] });
  };

  const rageClick = () => {
    rageCountRef.current += 1;
    beep(300 + rageCountRef.current * 60, 0.07, "square");
    const el = spiderCardRef.current;
    if (el) {
      el.classList.remove("shake-anim");
      void el.offsetWidth;
      el.classList.add("shake-anim");
    }
    toast(RAGE_LINES[Math.min(rageCountRef.current - 1, RAGE_LINES.length - 1)]);
    if (rageCountRef.current >= 6) {
      fireConfetti(50);
      rageCountRef.current = 0;
    }
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    beep(v.paused ? 620 : 380, 0.08);
    if (v.paused) {
      v.muted = vidMuted;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  const toggleVidMute = () => {
    const v = videoRef.current;
    const next = !vidMuted;
    if (v) v.muted = next;
    setVidMuted(next);
  };

  const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * v.duration;
  };

  const pickAnswer = (idx: number) => {
    const q = QUIZ[qi];
    const right = idx === q.a;
    beep(right ? 780 : 190, 0.13, right ? "sine" : "sawtooth");
    const newScore = score + (right ? 1 : 0);
    setFeedback(right ? q.ok : q.no);
    setTimeout(() => {
      if (qi + 1 >= QUIZ.length) {
        setQuizDone(true);
        setScore(newScore);
        setFeedback("");
        if (newScore >= 4) fireConfetti(60);
      } else {
        setQi(qi + 1);
        setScore(newScore);
        setFeedback("");
      }
    }, 1150);
  };

  const resetQuiz = () => {
    setQi(0);
    setScore(0);
    setFeedback("");
    setQuizDone(false);
  };

  const dodge = () => {
    const el = document.getElementById("fd-no");
    if (el) {
      const x = (Math.random() * 2 - 1) * Math.min(240, window.innerWidth * 0.3);
      const y = (Math.random() * 2 - 1) * 70;
      el.style.transform = `translate(${x}px,${y}px) rotate(${(Math.random() * 2 - 1) * 12}deg)`;
    }
    beep(240 + Math.random() * 120, 0.06, "triangle");
    setDodges((d) => d + 1);
  };

  const sayYes = () => {
    beep(880, 0.16);
    fireConfetti(120);
    setSaidYes(true);
  };

  const handleDownloadCertificate = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(certRef.current, { scale: 3, useCORS: true, backgroundColor: "#07080b" });
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "Best_Friend_Certificate_Shobhana_Moti.png";
      link.click();
    } catch (err) {
      console.error("Error downloading certificate image:", err);
    } finally {
      setDownloading(false);
    }
  };

  const roastEntry = ROASTS.filter((r) => roast >= r[0]).pop() || ROASTS[0];
  const dodgeHint =
    dodges === 0 ? "Dono buttons available hain. Theoretically." :
    dodges < 3 ? "Hmm. Button thoda shy hai." :
    dodges < 6 ? "Chhod de. Woh nahi rukega." :
    "Ye button 2023 se bhaag raha hai. Tu bhi bhaagi thi. Ab bas.";

  return (
    <div id="fd-root" className="relative spidey-web-bg text-[#f2f3f5] overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[60]" />
      <div id="fd-confetti" className="fixed inset-0 pointer-events-none z-[61] overflow-hidden" />
      <div ref={progRef} className="fixed top-0 left-0 h-[3px] w-0 bg-[#e62429] z-[70]" style={{ boxShadow: "0 0 14px #e62429" }} />

      {/* Fixed floating controls */}
      <div className="fixed top-[18px] right-[18px] z-[65] flex gap-2">
        <Link
          to="/"
          className="w-[42px] h-[42px] rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(10,12,17,0.72)] backdrop-blur-md text-[#f2f3f5] flex items-center justify-center hover:border-[#e62429] hover:text-[#e62429] transition-colors"
          title="Back to Gatekeeper"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <button
          onClick={() => {
            setMuted((m) => !m);
            if (muted) beep(660, 0.1);
          }}
          className="w-[42px] h-[42px] rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(10,12,17,0.72)] backdrop-blur-md text-[#f2f3f5] text-[15px] hover:border-[#e62429] hover:text-[#e62429] transition-colors"
        >
          {muted ? "🔇" : "🔊"}
        </button>
      </div>

      <div
        ref={toastRef}
        className="fixed left-1/2 bottom-[34px] z-[80] px-6 py-3.5 rounded-full border border-[rgba(230,36,41,0.5)] bg-[rgba(12,14,20,0.94)] backdrop-blur-md font-label text-base text-[#ff7377] pointer-events-none whitespace-nowrap"
        style={{ transform: "translate(-50%,140%)", transition: "transform .35s cubic-bezier(.2,.9,.3,1.3)" }}
      >
        MOTI-SENSE TINGLING
      </div>

      {/* Loading splash */}
      {loading && (
        <div className="fixed inset-0 z-[90] bg-[#050609] flex flex-col items-center justify-center gap-6 px-6 text-center">
          <div className="font-comic text-[clamp(38px,9vw,86px)] leading-[0.95] text-[#f2f3f5]">
            FRIENDSHIP<span className="text-[#e62429]">.EXE</span>
          </div>
          <div className="w-[min(460px,84vw)] h-1.5 rounded-full bg-[rgba(255,255,255,0.09)] overflow-hidden">
            <div ref={loadBarRef} className="h-full w-0 bg-[#e62429] rounded-full transition-[width] duration-300" />
          </div>
          <div className="font-outfit text-sm tracking-[0.16em] uppercase text-[#8d93a1] min-h-[20px]">{loadMsg}</div>
        </div>
      )}

      {/* ============================================================ */}
      {/* HERO */}
      {/* ============================================================ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 42%, rgba(230,36,41,.20), transparent 70%), #07080b" }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse at 50% 45%, #000 20%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, #000 20%, transparent 72%)",
          }}
        />

        <div className="relative z-[2] flex flex-col items-center gap-5">
          <div className="font-label text-xs md:text-sm text-[#8d93a1]">TERA BEST FRIEND PRESENTS</div>
          <div className="font-comic text-[clamp(56px,17vw,220px)] leading-[0.82] text-[#f2f3f5]" style={{ textShadow: "0 0 90px rgba(230,36,41,.45)" }}>
            SHUNU
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="h-px w-12 bg-[rgba(255,255,255,0.22)]" />
            <div className="font-label text-base md:text-2xl text-[#e62429]">A.K.A. MOTI</div>
            <div className="h-px w-12 bg-[rgba(255,255,255,0.22)]" />
          </div>
          <div className="font-outfit font-light text-[clamp(15px,2.2vw,22px)] text-[#c8ccd4] max-w-xl min-h-[34px]">
            {typed}
            <span className="inline-block w-[9px] bg-[#e62429] blink-cursor ml-0.5">&nbsp;</span>
          </div>
          <div className="flex gap-3 flex-wrap justify-center mt-3">
            <button
              onClick={() => {
                beep(520, 0.08);
                scrollToId("fd-timeline");
              }}
              className="px-8 py-4 rounded-full bg-[#e62429] hover:brightness-110 text-white font-outfit font-extrabold text-sm uppercase tracking-wider"
            >
              Chal shuru karte hain
            </button>
            <button
              onClick={() => {
                beep(760, 0.08);
                scrollToId("fd-cert");
              }}
              className="px-8 py-4 rounded-full border border-[rgba(255,255,255,0.18)] hover:border-[#f2f3f5] hover:bg-[rgba(255,255,255,0.05)] text-[#f2f3f5] font-outfit font-semibold text-sm uppercase tracking-wider"
            >
              Seedha certificate dikha
            </button>
          </div>
        </div>

        <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 z-[4] font-label text-xs text-[#5b6070] scroll-hint-float">
          SCROLL
        </div>
      </section>

      {/* ============================================================ */}
      {/* MARQUEE */}
      {/* ============================================================ */}
      <div className="border-y border-[rgba(255,255,255,0.08)] bg-[#0b0d13] overflow-hidden py-4">
        <div className="marquee-track flex w-max font-comic text-[clamp(20px,3.4vw,38px)] text-[rgba(255,255,255,0.14)]">
          {Array.from({ length: 2 }).map((_, rep) => (
            <span key={rep} className="flex">
              <span className="px-6">HAPPY FRIENDSHIP DAY</span>
              <span className="px-6 text-[#e62429]">MOTI</span>
              <span className="px-6">2020 — 2026</span>
              <span className="px-6 text-[#e62429]">NO REFUNDS</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TIMELINE — CHAPTER 01 */}
      {/* ============================================================ */}
      <section id="fd-timeline" className="px-5 md:px-16 py-[clamp(70px,10vw,140px)] bg-[#07080b]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-baseline gap-4 flex-wrap mb-3.5">
            <div className="font-label text-sm text-[#e62429]">CHAPTER 01</div>
            <div className="h-px flex-1 min-w-[40px] bg-[rgba(255,255,255,0.1)]" />
          </div>
          <h2 className="font-comic text-[clamp(36px,7vw,84px)] leading-[0.95] mb-4">
            CHHE SAAL.<br /><span className="text-[#e62429]">EK HI BANDI.</span>
          </h2>
          <p className="font-outfit font-light text-[clamp(15px,1.7vw,19px)] text-[#8d93a1] max-w-[560px] mb-10">
            May 2020 se aaj tak. Neeche poora record hai — court mein use ho sakta hai.
          </p>

          <div className="grid gap-0">
            {TIMELINE.map((row) => (
              <div
                key={row.year}
                className={`timeline-row grid grid-cols-[minmax(88px,140px)_1fr] gap-6 md:gap-10 py-8 md:py-10 border-t border-[rgba(255,255,255,0.09)] last:border-b ${row.highlight ? "bg-gradient-to-r from-[rgba(230,36,41,0.09)] to-transparent" : ""}`}
              >
                <div className={`font-comic text-[clamp(26px,4vw,48px)] leading-none ${row.highlight ? "text-[#e62429]" : "text-[rgba(255,255,255,0.16)]"}`}>
                  {row.year}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="font-label text-[clamp(20px,2.6vw,30px)] tracking-wide text-[#f2f3f5]">{row.title}</div>
                  <div className="font-outfit font-light text-[clamp(14px,1.6vw,17px)] text-[#9aa0ad] max-w-[640px]">{row.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SPIDER-MAN EXHIBIT — CHAPTER 02 */}
      {/* ============================================================ */}
      <section className="relative px-5 md:px-16 py-[clamp(70px,10vw,150px)] overflow-hidden" style={{ background: "linear-gradient(180deg,#07080b 0%, #0c0e15 40%, #07080b 100%)" }}>
        <div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[min(900px,90vw)] h-[min(900px,90vw)] rounded-full pointer-events-none animate-pulse-glow"
          style={{ background: "radial-gradient(circle, rgba(230,36,41,.16), transparent 62%)" }}
        />

        <div className="relative max-w-[1180px] mx-auto grid gap-10 md:gap-16 items-center" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
          <div className="flex justify-center">
            <div
              ref={spiderCardRef}
              onClick={rageClick}
              className="relative w-[min(320px,78vw)] rounded-3xl overflow-hidden border border-[rgba(255,255,255,0.1)] cursor-pointer select-none glow-pulse"
            >
              <img src="/assets/spiderman-mask.png" alt="Spider-Man mask logo" className="block w-full h-auto" />
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(5,6,9,.85))" }} />
              <div className="absolute left-0 right-0 bottom-4 text-center font-label text-[13px] text-[rgba(255,255,255,0.6)] pointer-events-none">
                TAP KARKE DEKH
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="font-label text-sm text-[#e62429]">CHAPTER 02 — THE SIDEKICK THEORY</div>
            <div className="font-comic text-[clamp(28px,4.6vw,58px)] leading-[1.04] text-[#f2f3f5]">
              SPIDER-MAN KE PAAS <span className="text-[#e62429]">NED</span> HAI.<br />
              SAMAY KE PAAS <span className="text-[#e62429]">BALRAJ</span> HAI.<br />
              MERE PAAS <span className="text-[#e62429]">TU</span> HAI, BRO.
            </div>
            <div className="h-0.5 w-20 bg-[#e62429]" />
            <p className="font-outfit font-light text-[clamp(15px,1.8vw,19px)] leading-relaxed text-[#9aa0ad] max-w-[520px]">
              Har hero ke paas ek banda hota hai jo chair pe baith ke bolta hai "bhai ye mat kar" — aur phir bhi help karta hai.
              Woh tu hai. Powers mere paas nahi hain, par tu hai. Kaafi hai.
            </p>
            <div className="flex gap-2.5 flex-wrap">
              <div className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.12)] font-outfit text-xs uppercase tracking-wide text-[#8d93a1]">Loyalty: 100%</div>
              <div className="px-4 py-2 rounded-full border border-[rgba(255,255,255,0.12)] font-outfit text-xs uppercase tracking-wide text-[#8d93a1]">Gyaan: unrequested</div>
              <div className="px-4 py-2 rounded-full border border-[rgba(230,36,41,0.4)] bg-[rgba(230,36,41,0.1)] font-outfit text-xs uppercase tracking-wide text-[#ff7377]">Replaceable: nope</div>
            </div>
          </div>
        </div>

        {/* Exhibit A — real video, custom window chrome */}
        <div className="relative max-w-[1000px] mx-auto mt-14 md:mt-20">
          <div className="flex items-baseline justify-between gap-4 flex-wrap mb-3.5">
            <div className="font-label text-[clamp(16px,2.2vw,24px)] tracking-wide text-[#f2f3f5]">EXHIBIT A — PETER &amp; NED</div>
            <div className="font-outfit text-xs uppercase tracking-wide text-[#5b6070]">Proof ke liye, court mein pesh hai</div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0a0c11]" style={{ boxShadow: "0 40px 90px -40px rgba(0,0,0,.9)" }}>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0e1017] border-b border-[rgba(255,255,255,0.07)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <div className="flex-1" />
              <span className="font-outfit text-[11px] text-[#5b6070]">peter_aur_ned_wala_scene.mp4</span>
            </div>

            <div
              className={`relative bg-[#06070a] ${videoAspect === null ? "aspect-video" : ""}`}
              style={videoAspect !== null ? { aspectRatio: videoAspect, maxHeight: "80vh", margin: "0 auto" } : undefined}
            >
              <video
                ref={videoRef}
                id="fd-video"
                src="/assets/spiderman_video.mp4"
                playsInline
                preload="metadata"
                onClick={togglePlay}
                className="absolute inset-0 w-full h-full object-cover bg-[#06070a] cursor-pointer"
              />
              {!playing && (
                <button
                  onClick={togglePlay}
                  className="absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[clamp(64px,9vw,92px)] h-[clamp(64px,9vw,92px)] rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(230,36,41,0.92)] text-white text-[clamp(20px,2.6vw,28px)] flex items-center justify-center"
                  style={{ boxShadow: "0 0 50px -6px rgba(230,36,41,.7)" }}
                >
                  ▶
                </button>
              )}
              <div className="absolute top-4 left-[18px] z-[2] flex items-center gap-2 font-outfit text-[11px] uppercase tracking-[0.2em] text-[#ff7377] pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-[#e62429] blink-cursor" />
                EXHIBIT A
              </div>
            </div>

            <div className="px-4 pt-3.5 pb-4.5 bg-[#0e1017] flex flex-col gap-3">
              <div onClick={seekVideo} className="relative h-1.5 rounded-full bg-[rgba(255,255,255,0.1)] cursor-pointer">
                <div ref={vidBarRef} className="absolute left-0 top-0 bottom-0 w-0 rounded-full bg-[#e62429] pointer-events-none" />
                <div
                  ref={vidKnobRef}
                  className="absolute top-1/2 left-0 w-[13px] h-[13px] -ml-1.5 rounded-full bg-white pointer-events-none"
                  style={{ transform: "translateY(-50%)", boxShadow: "0 0 12px rgba(230,36,41,.9)" }}
                />
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <button onClick={togglePlay} className="text-[#f2f3f5] text-sm">{playing ? "❚❚" : "▶"}</button>
                <div className="font-outfit text-xs text-[#8d93a1]">{vidTime}</div>
                <div className="flex-1" />
                <div className="flex gap-3.5 font-outfit text-[11px] uppercase tracking-wide text-[#5b6070]">
                  <button onClick={toggleVidMute}>{vidMuted ? "Sound: off" : "Sound: on"}</button>
                  <button
                    onClick={() => {
                      const v = videoRef.current;
                      if (v?.requestFullscreen) v.requestFullscreen().catch(() => {});
                    }}
                  >
                    ⛶
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 font-outfit text-xs text-[#5b6070] text-center">
            * Peter ke paas Ned. Mere paas tu. Case closed, Your Honour.
          </div>
        </div>

        {/* Required literal quote, preserved verbatim */}
        <div className="max-w-[820px] mx-auto mt-14 bg-[#0a0c11] border border-[rgba(230,36,41,0.4)] p-8 md:p-10 rounded-2xl text-center relative glow-pulse">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e62429] text-white font-label text-xs px-6 py-1.5 rounded-full">
            THE ULTIMATE TRUTH 🕷️
          </div>
          <p className="font-outfit font-light text-sm text-[#8d93a1] mb-5">
            Every hero needs someone who picks up at 3 AM without asking why first. Six years in, I still haven't figured out what I'd do without that.
          </p>
          <p className="font-quote italic text-2xl md:text-4xl text-[#f2f3f5] leading-relaxed pt-3">
            "<span className="text-[#e62429]">Samay Raina</span> has <span className="text-[#e62429]">Balraj</span>,<br />
            <span className="text-[#e62429]">Spider-Man</span> has his <span className="text-[#e62429]">Ned</span>,<br />
            I have my <span className="text-[#e62429]">Moti</span>..."
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 font-outfit text-sm text-[#9aa0ad]">
            <Heart className="w-3.5 h-3.5 fill-[#e62429] text-[#e62429]" />
            <span>Not because I have to. Because I never learned how not to.</span>
            <Heart className="w-3.5 h-3.5 fill-[#e62429] text-[#e62429]" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STATS + ROAST-O-METER + MOTI METER — CHAPTER 03 */}
      {/* ============================================================ */}
      <section className="px-5 md:px-16 py-[clamp(70px,10vw,140px)] bg-[#0b0d13] border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="font-label text-sm text-[#e62429] mb-3">CHAPTER 03 — THE DATA</div>
          <h2 className="font-comic text-[clamp(32px,6vw,72px)] leading-[0.98] mb-10">
            NUMBERS JHOOTH<br />NAHI BOLTE, <span className="text-[#e62429]">MOTI.</span>
          </h2>

          <div className="grid gap-px bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
            <div className="bg-[#0e1017] p-6 md:p-8 flex flex-col gap-2">
              <div className="font-comic text-[clamp(30px,4.5vw,52px)] leading-none text-[#f2f3f5]">{days}</div>
              <div className="font-outfit text-xs uppercase tracking-wide text-[#8d93a1]">Din saath (live count)</div>
            </div>
            <div className="bg-[#0e1017] p-6 md:p-8 flex flex-col gap-2">
              <div className="font-comic text-[clamp(30px,4.5vw,52px)] leading-none text-[#f2f3f5]">1.4 Lakh+</div>
              <div className="font-outfit text-xs uppercase tracking-wide text-[#8d93a1]">Messages exchange kiye</div>
            </div>
            <div className="bg-[#0e1017] p-6 md:p-8 flex flex-col gap-2">
              <div className="font-comic text-[clamp(30px,4.5vw,52px)] leading-none text-[#e62429]">∞</div>
              <div className="font-outfit text-xs uppercase tracking-wide text-[#8d93a1]">Baar "Moti" bulaya</div>
            </div>
            <div className="bg-[#0e1017] p-6 md:p-8 flex flex-col gap-2">
              <div className="font-comic text-[clamp(30px,4.5vw,52px)] leading-none text-[#f2f3f5]">400+</div>
              <div className="font-outfit text-xs uppercase tracking-wide text-[#8d93a1]">Baar maine sorry bola (sirf 2024 mein)</div>
            </div>
          </div>

          {/* Roast-o-meter */}
          <div className="mt-10 border border-[rgba(255,255,255,0.08)] rounded-2xl bg-[#0e1017] p-6 md:p-10 flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div className="font-label text-[clamp(20px,2.8vw,30px)]">ROAST-O-METER</div>
              <div className="font-outfit text-xs uppercase tracking-wide text-[#5b6070]">Slider ghuma. Apni risk pe.</div>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={roast}
              onChange={(e) => setRoast(parseInt(e.target.value, 10))}
              className="w-full h-6 cursor-pointer accent-[#e62429]"
            />
            <div className="flex items-start gap-5 flex-wrap">
              <div className="font-comic text-[clamp(34px,6vw,64px)] leading-[0.9] text-[#e62429] min-w-[110px]">{roast}%</div>
              <div className="flex-1 min-w-[240px] flex flex-col gap-1.5">
                <div className="font-label text-[clamp(18px,2.4vw,26px)] text-[#f2f3f5]">{roastEntry[1]}</div>
                <div className="font-outfit font-light text-[clamp(14px,1.6vw,17px)] text-[#9aa0ad]">{roastEntry[2]}</div>
              </div>
            </div>
          </div>

          {/* Moti Meter — preserved interactive tile */}
          <div className="mt-6 border border-[rgba(216,178,95,0.35)] rounded-2xl bg-[#0e1017] p-6 md:p-10 flex flex-col gap-4">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <div className="font-label text-[clamp(20px,2.8vw,30px)] text-[#d8b25f]">MOTI METER</div>
              <div className="font-outfit text-xs uppercase tracking-wide text-[#5b6070]">Craziness &amp; energy level, boosted on demand</div>
            </div>
            <MotiMeter beep={beep} fireConfetti={fireConfetti} />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* QUIZ — CHAPTER 04 */}
      {/* ============================================================ */}
      <section className="px-5 md:px-16 py-[clamp(70px,10vw,140px)] bg-[#07080b]">
        <div className="max-w-[820px] mx-auto">
          <div className="font-label text-sm text-[#e62429] mb-3 text-center">CHAPTER 04 — THE TEST</div>
          <h2 className="font-comic text-[clamp(32px,6vw,72px)] leading-[0.98] mb-2.5 text-center">
            TU MUJHE KITNA<br />JAANTI HAI?
          </h2>
          <p className="font-outfit font-light text-sm text-[#8d93a1] text-center mb-10">
            Paanch sawaal. Cheating allowed hai, main dekh nahi raha. (Main dekh raha hoon.)
          </p>

          <div className="border border-[rgba(255,255,255,0.09)] rounded-[20px] bg-[#0e1017] p-6 md:p-10 min-h-[360px] flex flex-col">
            {!quizDone ? (
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3.5">
                  <div className="font-outfit text-xs uppercase tracking-wide text-[#5b6070] whitespace-nowrap">
                    Sawaal {qi + 1} / {QUIZ.length}
                  </div>
                  <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.08)] overflow-hidden">
                    <div className="h-full bg-[#e62429] transition-[width] duration-300" style={{ width: `${(qi / QUIZ.length) * 100}%` }} />
                  </div>
                </div>
                <div className="font-label text-[clamp(24px,3.6vw,38px)] leading-[1.15] text-[#f2f3f5]">{QUIZ[qi].q}</div>
                <div className="grid gap-2.5">
                  {QUIZ[qi].o.map((label, idx) => (
                    <button
                      key={label}
                      onClick={() => pickAnswer(idx)}
                      disabled={!!feedback}
                      className="text-left px-5 py-4 rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] text-[#e6e8ec] font-outfit hover:border-[#e62429] hover:bg-[rgba(230,36,41,0.09)] transition-colors disabled:opacity-60"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="font-outfit font-light text-sm text-[#e62429] min-h-[24px]">{feedback}</div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 items-center text-center justify-center flex-1">
                <div className="font-label text-sm text-[#5b6070]">RESULT DECLARED</div>
                <div className="font-comic text-[clamp(52px,11vw,110px)] leading-[0.85] text-[#e62429]">{score}/{QUIZ.length}</div>
                <div className="font-label text-[clamp(22px,3.4vw,34px)] text-[#f2f3f5]">
                  {score >= 5 ? "CERTIFIED SOULMATE" : score >= 3 ? "THEEK HAI, PASS" : score >= 1 ? "TU KAUN HAI?" : "BLOCKED."}
                </div>
                <div className="font-outfit font-light text-base text-[#9aa0ad] max-w-[460px]">
                  {score >= 5
                    ? "Tu mujhe mujhse zyada jaanti hai. Thoda darr lag raha hai."
                    : score >= 3
                    ? "Passing marks. Best friend title bacha liya. Bas."
                    : score >= 1
                    ? "Chhe saal, aur itna hi? Main letter wapas le raha hoon."
                    : "Zero. Poore zero. Certificate cancel. (Mazaak, wapas aaja.)"}
                </div>
                <button
                  onClick={resetQuiz}
                  className="mt-2 px-6 py-3 rounded-full border border-[rgba(255,255,255,0.18)] text-[#f2f3f5] font-outfit font-semibold text-xs uppercase tracking-wide hover:border-[#e62429] hover:text-[#e62429]"
                >
                  Dobara try kar
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PHOTO WALL — CHAPTER 05 (memories vault + real gallery) */}
      {/* ============================================================ */}
      <section className="px-5 md:px-16 py-[clamp(70px,10vw,140px)] bg-[#0b0d13] border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex items-end justify-between gap-5 flex-wrap mb-10">
            <div>
              <div className="font-label text-sm text-[#e62429] mb-2.5">CHAPTER 05 — EVIDENCE</div>
              <h2 className="font-comic text-[clamp(32px,6vw,72px)] leading-[0.98]">
                THE WALL OF<br /><span className="text-[#e62429]">BAD ANGLES.</span>
              </h2>
            </div>
            <div className="font-outfit font-light text-sm text-[#8d93a1] max-w-[300px]">
              Click any polaroid memory card to reveal secret details. Real evidence is below.
            </div>
          </div>

          {/* Polaroid memory cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {MEMORIES.map((m) => (
              <div
                key={m.id}
                onClick={() => setActiveMemory(activeMemory === m.id ? null : m.id)}
                className="bg-[#0e1017] p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] cursor-pointer transform hover:-translate-y-1.5 hover:border-[rgba(230,36,41,0.5)] transition-all duration-300 shadow-xl relative overflow-hidden group"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{m.emoji}</div>
                <span className="font-label text-[10px] px-2.5 py-1 rounded-md bg-black/40 text-[#d8b25f] border border-[rgba(216,178,95,0.3)]">
                  {m.tag}
                </span>
                <h3 className="font-comic text-xl text-[#f2f3f5] mt-4 mb-2 leading-tight">{m.title}</h3>
                <p className="font-outfit font-light text-[#9aa0ad] text-sm leading-relaxed">{m.desc}</p>
                {activeMemory === m.id && (
                  <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.1)] text-[#e6e8ec] font-handwriting text-lg animate-reveal">
                    "Unlocked: Best memory with Moti forever!"
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Real photo wall — masonry, sized to each photo's own aspect ratio */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
            {GALLERY_PHOTOS.map((photo) => (
              <div key={photo.file} className="mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0e1017]">
                <img
                  src={`/gallery/${photo.file}`}
                  width={photo.width}
                  height={photo.height}
                  alt="Memory with Moti"
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* REASONS — CHAPTER 06 */}
      {/* ============================================================ */}
      <section className="px-5 md:px-16 py-[clamp(70px,10vw,140px)] bg-[#07080b]">
        <div className="max-w-[1000px] mx-auto">
          <div className="font-label text-sm text-[#e62429] mb-3">CHAPTER 06 — THE FINE PRINT</div>
          <h2 className="font-comic text-[clamp(32px,6vw,72px)] leading-[0.98] mb-10">
            7 REASONS TU MUJHSE<br /><span className="text-[#e62429]">STUCK</span> HAI.
          </h2>

          <div className="grid gap-3">
            {REASONS.map((r) => (
              <div
                key={r.n}
                className={`grid grid-cols-[auto_1fr] gap-4 md:gap-7 items-start p-5 md:p-7 rounded-2xl border transition-transform hover:translate-x-1.5 ${
                  r.highlight
                    ? "border-[rgba(230,36,41,0.45)]"
                    : "border-[rgba(255,255,255,0.08)] hover:border-[rgba(230,36,41,0.5)]"
                }`}
                style={{ background: r.highlight ? "linear-gradient(90deg, rgba(230,36,41,.13), #0e1017 65%)" : "#0e1017" }}
              >
                <div className={`font-comic text-[clamp(24px,3.4vw,40px)] leading-none ${r.highlight ? "text-[#e62429]" : "text-[rgba(255,255,255,0.13)]"}`}>{r.n}</div>
                <div className="flex flex-col gap-1.5">
                  <div className={`font-label ${r.highlight ? "text-white" : ""} text-[clamp(19px,2.4vw,26px)]`}>{r.title}</div>
                  <div className="font-outfit font-light text-sm text-[#8d93a1]">{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CERTIFICATE (downloadable) */}
      {/* ============================================================ */}
      <section id="fd-cert" className="px-5 md:px-16 py-[clamp(70px,10vw,140px)] bg-[#0b0d13] border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-[900px] mx-auto">
          <div ref={certRef} className="gold-frame p-2 md:p-3.5">
            <div className="gold-frame-inner px-6 py-8 md:px-14 md:py-16 text-center flex flex-col items-center gap-4 md:gap-5 bg-[#07080b]">
              <div className="font-label text-[11px] md:text-sm text-[#d8b25f]">OFFICIAL &amp; LEGALLY QUESTIONABLE</div>
              <div className="font-quote font-semibold text-[clamp(28px,5.6vw,58px)] leading-[1.05] text-[#f2f3f5]">
                Certificate of<br />Best Friendship
              </div>
              <div className="w-20 h-px bg-[rgba(216,178,95,0.55)]" />
              <div className="font-outfit font-light text-[clamp(13px,1.6vw,16px)] text-[#9aa0ad]">Ye certificate proudly diya jaata hai</div>
              <div className="font-comic text-[clamp(34px,8vw,80px)] leading-[0.95] text-[#d8b25f]">SHOBHANA</div>
              <div className="font-quote italic text-[clamp(15px,2vw,22px)] text-[#c8ccd4]">"Moti" — she has accepted her fate</div>
              <p className="font-outfit font-light text-[clamp(13px,1.6vw,16px)] leading-relaxed text-[#8d93a1] max-w-[520px] mt-2">
                …for surviving 6 continuous years of unsolicited voice notes, 3 AM existential crises, being called Moti in
                public — and for accepting roughly 400 sorries in 2024 without making it weird. This title is permanent,
                non-transferable, and comes with absolutely no benefits.
              </p>
              <p className="font-quote italic text-[clamp(14px,1.8vw,18px)] text-[#e6e8ec] max-w-[480px]">
                Jokes ke peeche chhupa hua sach: koi aur itni der tak nahi ruka hota. Tu ruki. Har baar.
              </p>

              <div className="grid gap-4 md:gap-12 w-full mt-6 items-end" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))" }}>
                <div className="flex flex-col gap-2 items-center">
                  <div className="font-quote italic text-xl text-[#f2f3f5]">Tera Bestie</div>
                  <div className="w-full h-px bg-[rgba(255,255,255,0.16)]" />
                  <div className="font-outfit text-[11px] uppercase tracking-wide text-[#5b6070]">Signature</div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div
                    className="w-[clamp(58px,9vw,80px)] h-[clamp(58px,9vw,80px)] rounded-full border-2 border-[rgba(216,178,95,0.6)] flex items-center justify-center font-label text-[11px] text-[#d8b25f] text-center leading-tight"
                    style={{ transform: "rotate(-8deg)" }}
                  >
                    SEALED<br />4EVER
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="font-quote italic text-xl text-[#f2f3f5]">02.08.2026</div>
                  <div className="w-full h-px bg-[rgba(255,255,255,0.16)]" />
                  <div className="font-outfit text-[11px] uppercase tracking-wide text-[#5b6070]">Friendship Day</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDownloadCertificate}
              disabled={downloading}
              className="bg-gradient-to-r from-[#d8b25f] to-[#e62429] hover:brightness-110 text-[#07080b] font-comic text-lg px-8 py-3.5 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 disabled:opacity-50"
            >
              {downloading ? <span>GENERATING PNG...</span> : (<><Download className="w-5 h-5" /><span>DOWNLOAD CERTIFICATE (PNG)</span></>)}
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* THE QUESTION — CHAPTER 07 */}
      {/* ============================================================ */}
      <section className="relative px-5 md:px-16 py-[clamp(70px,10vw,150px)] overflow-hidden" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(230,36,41,.16), transparent 70%), #07080b" }}>
        <div className="max-w-[760px] mx-auto text-center flex flex-col items-center gap-6">
          <div className="font-label text-sm text-[#e62429]">CHAPTER 07 — THE CONTRACT</div>
          <h2 className="font-comic text-[clamp(30px,6.5vw,76px)] leading-none">
            AGLE 60 SAAL BHI<br />MERI BEST FRIEND<br /><span className="text-[#e62429]">RAHEGI?</span>
          </h2>

          {!saidYes ? (
            <div className="w-full flex flex-col items-center gap-4.5">
              <div className="relative w-full min-h-[120px] flex items-center justify-center gap-4 flex-wrap">
                <button
                  onClick={sayYes}
                  className="px-11 py-4.5 rounded-full bg-[#e62429] hover:brightness-110 text-white font-comic text-[clamp(18px,2.6vw,26px)]"
                  style={{ boxShadow: "0 0 50px -8px rgba(230,36,41,.8)" }}
                >
                  HAAN, OBVIOUSLY
                </button>
                <button
                  id="fd-no"
                  onMouseEnter={dodge}
                  onClick={dodge}
                  className="px-11 py-4.5 rounded-full border border-[rgba(255,255,255,0.2)] text-[#8d93a1] font-comic text-[clamp(18px,2.6vw,26px)]"
                  style={{ transition: "transform .18s cubic-bezier(.2,.9,.3,1.4)" }}
                >
                  NAHI
                </button>
              </div>
              <div className="font-outfit text-sm text-[#5b6070] min-h-[20px]">{dodgeHint}</div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-6 md:p-10 border border-[rgba(230,36,41,0.4)] rounded-[20px] bg-[rgba(230,36,41,0.07)] w-full">
              <div className="font-comic text-[clamp(26px,5vw,54px)] leading-none text-white">CONTRACT SIGNED</div>
              <div className="font-outfit font-light text-[clamp(15px,2vw,19px)] text-[#c8ccd4] max-w-[480px]">
                Ab peeche hatne ka option nahi hai. Legally binding hai. Maine screenshot le liya.
              </div>
              <div className="font-quote italic text-[clamp(15px,2vw,19px)] text-[#d8b25f] max-w-[480px]">
                Joke side pe — 60 saal kam lagenge. Tu na hoti, toh main jo bhi hoon, woh nahi hota.
              </div>
              <button
                onClick={() => {
                  beep(980, 0.12);
                  fireConfetti(150);
                }}
                className="px-7 py-3.5 rounded-full border border-[rgba(255,255,255,0.2)] text-[#f2f3f5] font-outfit font-semibold text-xs uppercase tracking-wide hover:border-white"
              >
                Aur confetti do
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* LETTER */}
      {/* ============================================================ */}
      <section className="px-5 md:px-16 pt-[clamp(70px,10vw,150px)] pb-[clamp(60px,8vw,110px)] bg-[#050609] border-t border-[rgba(255,255,255,0.07)]">
        <div className="max-w-[720px] mx-auto flex flex-col gap-6">
          <div className="font-label text-sm text-[#e62429]">POST-CREDITS SCENE</div>
          <h2 className="font-quote font-semibold text-[clamp(30px,5vw,54px)] leading-tight text-[#f2f3f5]">Shunu,</h2>
          <p className="font-outfit font-light text-[clamp(16px,2vw,20px)] leading-[1.9] text-[#c8ccd4]">
            Poori website tujhe roast karne mein nikal gayi, toh ye chhota sa hissa sach ke liye rakh raha hoon.
          </p>
          <p className="font-outfit font-light text-[clamp(16px,2vw,20px)] leading-[1.9] text-[#c8ccd4]">
            2020 mein duniya band thi aur tu mil gayi. Aur uske baad 2021 se 2024 tak — maine bohot kuch galat kiya. Ek
            nahi, bohot. Main hawa mein tha, apne hi nashe mein, aur tu neeche khadi sab jhel rahi thi.
          </p>
          <p className="font-outfit font-light text-[clamp(16px,2vw,20px)] leading-[1.9] text-[#c8ccd4]">
            2023 ke end mein realize hona shuru hua. Maine theek hone ki koshish bhi ki — par honestly, bohot time lag
            gaya. Aur us poore time mein tu meri wajah se suffer karti rahi. Ye main light nahi le raha. Ye mera hissa
            hai, meri galti hai.
          </p>
          <p className="font-outfit font-light text-[clamp(16px,2vw,20px)] leading-[1.9] text-[#c8ccd4]">
            I might be the worst best friend you could ever get. Sach mein. Phir bhi tu hamesha meri side pe rahi,
            hamesha mera support system bani rahi. Tu na hoti toh kya hota — ye sochne pe hi mera system hang ho jaata
            hai.
          </p>
          <p className="font-outfit font-light text-[clamp(16px,2vw,20px)] leading-[1.9] text-[#c8ccd4]">
            Toh haan — Spider-Man ke paas Ned hai, Samay ke paas Balraj hai, aur mere paas tu hai. Main deserve karta
            hoon ya nahi, pata nahi. Bas itna pata hai ki main is deal se kabhi bahar nahi nikalna chahta. Thank you,
            Moti. For everything.
          </p>
          <p className="font-quote italic text-[clamp(18px,2.4vw,26px)] leading-[1.6] text-[#f2f3f5] mt-2">
            Agar kal ye sab — chhe saal, jhagde, sorry, sab kuch — khatam ho jaye, toh bas itna jaan lena: tune mujhe
            waqt se pehle hi complete kar diya tha. Happy Friendship Day, Moti. Ab upar wala Peter–Ned wala clip dobara
            dekh le — samajh aa jayega.
          </p>
          <div className="flex flex-col gap-1 mt-1.5">
            <div className="font-quote italic text-xl text-[#d8b25f]">— Tera bestie</div>
            <div className="font-outfit text-xs uppercase tracking-wide text-[#5b6070]">Jo abhi bhi sorry bol raha hai, thoda thoda</div>
          </div>
          <button
            onClick={() => {
              beep(520, 0.1);
              setCredits(true);
            }}
            className="self-start mt-3.5 px-8 py-4 rounded-full border border-[rgba(216,178,95,0.5)] text-[#d8b25f] font-outfit font-semibold text-xs uppercase tracking-wide hover:bg-[rgba(216,178,95,0.1)]"
          >
            Roll the credits
          </button>
        </div>
      </section>

      <div className="px-6 pt-6 pb-10 bg-[#050609] text-center font-outfit text-[11px] tracking-[0.24em] uppercase text-[#3d4150]">
        2020 — ∞ · Made with zero budget and full dhang
      </div>

      {/* ============================================================ */}
      {/* CREDITS ROLL */}
      {/* ============================================================ */}
      {credits && (
        <div className="fixed inset-0 z-[95] bg-black overflow-hidden">
          <div className="absolute inset-0 flex justify-center credits-scroll">
            <div className="w-[min(560px,88vw)] text-center flex flex-col gap-8 py-10">
              <div className="font-comic text-[clamp(30px,6vw,60px)] text-[#e62429] leading-none">SHUNU &amp; ME</div>
              <div className="font-outfit text-xs uppercase tracking-[0.4em] text-[#5b6070]">A six year production</div>
              {[
                ["Directed by", "Nobody, honestly"],
                ["Lead role", "Shobhana \"Moti\""],
                ["Comic relief", "Me, unintentionally"],
                ["Best supporting apology", "2024, all of it"],
                ["Soundtrack", "Voice notes, 4x speed"],
                ["Filmed on location", "Chat box, 3 AM"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1.5">
                  <div className="font-outfit text-[11px] uppercase tracking-[0.3em] text-[#5b6070]">{label}</div>
                  <div className="font-label text-2xl text-[#f2f3f5]">{value}</div>
                </div>
              ))}
              <div className="font-quote italic text-xl text-[#d8b25f] mt-5 leading-relaxed">
                No friendships were harmed in the making of this film.<br />One was almost lost in 2023. It came back.
              </div>
              <div className="font-comic text-[clamp(24px,5vw,44px)] text-[#e62429] mt-5">TO BE CONTINUED</div>
            </div>
          </div>
          <button
            onClick={() => setCredits(false)}
            className="absolute top-5 right-5 px-5 py-2.5 rounded-full border border-[rgba(255,255,255,0.2)] bg-black/60 text-[#f2f3f5] font-outfit text-xs uppercase tracking-wide"
          >
            Skip
          </button>
        </div>
      )}
    </div>
  );
}

function MotiMeter({ beep, fireConfetti }: { beep: (f: number, d: number, t?: OscillatorType) => void; fireConfetti: (n?: number) => void }) {
  const [motiLevel, setMotiLevel] = useState(100);
  return (
    <>
      <div className="w-full bg-[#07080b] rounded-full h-6 border border-[rgba(255,255,255,0.08)] p-1">
        <div
          className="bg-gradient-to-r from-[#d8b25f] to-[#e62429] h-full rounded-full transition-all duration-300 flex items-center justify-end pr-2 text-xs font-bold text-white"
          style={{ width: `${Math.min(100, (motiLevel / 9999) * 100)}%` }}
        >
          {motiLevel}%
        </div>
      </div>
      <button
        onClick={() => {
          setMotiLevel((prev) => prev + 500);
          beep(700, 0.1);
          fireConfetti(30);
        }}
        className="w-full bg-gradient-to-r from-[#d8b25f] to-[#e62429] hover:brightness-110 text-[#07080b] font-comic text-lg py-3 rounded-xl shadow-lg transform active:scale-95 transition-transform"
      >
        BOOST MOTI LEVEL (+500%)
      </button>
    </>
  );
}
