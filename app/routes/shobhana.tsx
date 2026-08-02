import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";
import {
  Heart,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Flame,
  Award,
  ArrowLeft,
  Camera,
  MessageCircleHeart,
  ShieldCheck,
  Star,
  Download,
  X,
} from "lucide-react";

export function meta() {
  return [
    { title: "Happy Friendship Day, Shobhana / Shunu (aka Moti)! 💖🕷️" },
    { name: "description", content: "Special Friendship Day Experience for Shobhana / Shunu (aka Moti)!" },
  ];
}

export default function ShobhanaExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const certRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [motiLevel, setMotiLevel] = useState(100);
  const [activeMemory, setActiveMemory] = useState<number | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ["#e62429", "#d8b25f"] });
    fire(0.2, { spread: 60, colors: ["#e62429", "#f2f3f5"] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, colors: ["#d8b25f", "#e62429"] });

    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay paused by browser:", err);
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleDownloadCertificate = async () => {
    if (!certRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#07080b",
      });
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

  const memories = [
    {
      id: 1,
      title: "Late Night Talks & Mad Laughs",
      desc: "Those random 2 AM conversations where we laugh at things that aren't even funny to anyone else!",
      tag: "CORE MEMORY",
      emoji: "😂",
    },
    {
      id: 2,
      title: "Unmatched Chaos & Moti Energy",
      desc: "Whenever we get together, chaos is guaranteed! Nobody can match our level of wildness.",
      tag: "PURE CHAOS",
      emoji: "🔥",
    },
    {
      id: 3,
      title: "Partner in Crime",
      desc: "Through thick and thin, bad decisions, and crazy plans — always got each other's back!",
      tag: "DUO FOR LIFE",
      emoji: "🛡️",
    },
    {
      id: 4,
      title: "Inside Jokes Only We Understand",
      desc: "One single look across the room and we both break down into un-controllable laughter!",
      tag: "SECRET CODE",
      emoji: "🤫",
    },
  ];

  const galleryPhotos = [
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

  return (
    <div className="min-h-screen spidey-web-bg text-[#f2f3f5] pb-20 relative">
      {/* Fixed Header Navigation */}
      <nav className="sticky top-0 z-50 glass-card px-6 py-4 border-b border-[rgba(230,36,41,0.2)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 rounded-full bg-[#0e1017] hover:bg-[#181b24] text-[#9aa0ad] transition-colors border border-[rgba(255,255,255,0.08)]"
            title="Back to Gatekeeper"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-comic text-xl tracking-wider text-[#e62429]">
            FRIENDSHIP FILE 🕸️
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block font-label text-[10px] px-3 py-1.5 rounded-full bg-[#0e1017] text-[#d8b25f] border border-[rgba(216,178,95,0.35)]">
            VIP Access · Shobhana / Shunu (aka Moti)
          </span>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* SECTION 1: WISHES & DEDICATION */}
      {/* ============================================================ */}
      <section className="relative px-4 pt-16 pb-20 max-w-4xl mx-auto text-center overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(230,36,41,0.18), transparent 70%)",
          }}
        />

        <div className="font-label text-[13px] text-[#e62429] mb-6 animate-reveal">
          CHAPTER 01 — DEDICATION
        </div>

        <h1 className="font-comic text-5xl md:text-7xl text-[#f2f3f5] mb-3 leading-[0.95] animate-reveal">
          HAPPY FRIENDSHIP DAY
        </h1>
        <div className="flex items-center justify-center gap-4 mb-8 animate-reveal">
          <div className="h-px w-10 bg-[rgba(255,255,255,0.2)]" />
          <h2 className="font-label text-lg md:text-2xl text-[#f2f3f5] tracking-[0.3em]">
            SHOBHANA / SHUNU <span className="text-[#e62429]">(A.K.A. MOTI)</span>
          </h2>
          <div className="h-px w-10 bg-[rgba(255,255,255,0.2)]" />
        </div>

        <div className="max-w-2xl mx-auto glass-card p-8 md:p-10 rounded-3xl border border-[rgba(255,255,255,0.1)] shadow-2xl relative animate-reveal">
          <MessageCircleHeart className="w-10 h-10 text-[#e62429] mx-auto mb-5" />
          <p className="font-handwriting text-xl md:text-2xl text-[#e6e8ec] leading-relaxed mb-5">
            "To the most incredible, chaotic, and downright awesome best friend!
            Thank you for being the person I can always count on, laugh with till my stomach hurts,
            and share the madness of life with!"
          </p>
          <p className="font-outfit font-light text-sm text-[#9aa0ad] mb-6">
            Chhe saal, ek hi bandi, zero refunds. Ye poori website teri hai, Moti.
          </p>
          <div className="flex items-center justify-center gap-2 font-label text-sm text-[#d8b25f] tracking-[0.2em]">
            <Star className="w-4 h-4 fill-[#d8b25f]" />
            <span>BEST FRIEND EVER AWARD 2026</span>
            <Star className="w-4 h-4 fill-[#d8b25f]" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: MEMORIES VAULT (POLAROID CARDS) */}
      {/* ============================================================ */}
      <section className="px-4 py-16 max-w-6xl mx-auto border-t border-[rgba(255,255,255,0.07)]">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 font-label text-[12px] text-[#e62429] mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>CHAPTER 02 — TREASURED MOMENTS</span>
          </div>
          <h2 className="font-comic text-4xl md:text-6xl text-[#f2f3f5] leading-[0.95]">
            THE MEMORIES VAULT
          </h2>
          <p className="font-outfit font-light text-[#8d93a1] mt-3">
            Click any polaroid memory card below to reveal secret details!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {memories.map((m) => (
            <div
              key={m.id}
              onClick={() => setActiveMemory(activeMemory === m.id ? null : m.id)}
              className="bg-[#0e1017] p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] cursor-pointer transform hover:-translate-y-1.5 hover:border-[rgba(230,36,41,0.5)] transition-all duration-300 shadow-xl relative overflow-hidden group"
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                {m.emoji}
              </div>
              <span className="font-label text-[10px] px-2.5 py-1 rounded-md bg-black/40 text-[#d8b25f] border border-[rgba(216,178,95,0.3)]">
                {m.tag}
              </span>
              <h3 className="font-comic text-xl text-[#f2f3f5] mt-4 mb-2 leading-tight">
                {m.title}
              </h3>
              <p className="font-outfit font-light text-[#9aa0ad] text-sm leading-relaxed">
                {m.desc}
              </p>

              {activeMemory === m.id && (
                <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.1)] text-[#e6e8ec] font-handwriting text-lg animate-reveal">
                  "Unlocked: Best memory with Moti forever!"
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Photo Wall — real gallery, each tile sized to its photo's own aspect ratio */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <div className="font-label text-[12px] text-[#e62429] mb-2">EVIDENCE LOCKER</div>
            <h3 className="font-comic text-3xl text-[#f2f3f5]">THE PHOTO WALL</h3>
          </div>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.file}
                className="mb-4 break-inside-avoid rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0e1017]"
              >
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
      {/* SECTION 3: SPIDER-MAN THEME (VIDEO + QUOTE) */}
      {/* ============================================================ */}
      <section className="px-4 py-16 max-w-5xl mx-auto border-t border-[rgba(255,255,255,0.07)]">
        <div className="glass-card p-6 md:p-12 rounded-3xl comic-border-red relative overflow-hidden bg-[#0b0d13]">

          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🕸️</span>
              <div>
                <span className="font-label text-[11px] text-[#e62429] block mb-1">
                  CHAPTER 03 — THE SIDEKICK THEORY
                </span>
                <h2 className="font-comic text-3xl md:text-5xl text-[#f2f3f5] tracking-wide">
                  SPIDER-MAN DUO SECTION
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#0e1017] px-4 py-2 rounded-full border border-[rgba(230,36,41,0.4)] text-[#e62429] font-label text-[11px]">
              <Flame className="w-3.5 h-3.5" />
              <span>MOTI CERTIFIED DUO</span>
            </div>
          </div>

          {/* Video Container styled like an exhibit window */}
          <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[#0a0c11] mb-8 shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0e1017] border-b border-[rgba(255,255,255,0.07)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <div className="flex-1" />
              <span className="font-outfit text-[11px] text-[#5b6070] tracking-wide">
                exhibit_a_peter_and_ned.mp4
              </span>
            </div>

            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src="/assets/spiderman_video.mp4"
                controls
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div className="absolute bottom-4 right-4 flex items-center gap-3 z-20 bg-[rgba(7,8,11,0.85)] backdrop-blur-md p-2 rounded-xl border border-[rgba(230,36,41,0.4)]">
                <button
                  onClick={togglePlay}
                  className="p-2.5 rounded-lg bg-[#e62429] hover:brightness-110 text-white font-label transition-all flex items-center gap-1 text-[11px]"
                  title={isPlaying ? "Pause Video" : "Play Video"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isPlaying ? "PAUSE" : "PLAY"}</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-lg bg-[#0e1017] hover:bg-[#181b24] text-white transition-all text-[11px] font-label flex items-center gap-1 border border-[rgba(255,255,255,0.1)]"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#e62429]" /> : <Volume2 className="w-3.5 h-3.5 text-[#28c840]" />}
                  <span>{isMuted ? "MUTED" : "SOUND ON"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Exact Quote Box */}
          <div className="bg-[#0a0c11] border border-[rgba(230,36,41,0.4)] p-6 md:p-10 rounded-2xl text-center relative shadow-2xl spidey-glow">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e62429] text-white font-label text-xs px-6 py-1.5 rounded-full tracking-[0.2em] shadow-md">
              THE ULTIMATE TRUTH 🕷️
            </div>

            <p className="font-handwriting text-2xl md:text-4xl text-[#f2f3f5] leading-relaxed pt-3">
              "<span className="text-[#e62429]">Samay Raina</span> has <span className="text-[#e62429]">Balraj</span>,<br />
              <span className="text-[#e62429]">Spider-Man</span> has his <span className="text-[#e62429]">Ned</span>,<br />
              I have my <span className="text-[#e62429]">Moti</span>..."
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-[#9aa0ad] font-outfit text-sm">
              <Heart className="w-3.5 h-3.5 fill-[#e62429] text-[#e62429]" />
              <span>Unbreakable Bond · Forever Moti Duo</span>
              <Heart className="w-3.5 h-3.5 fill-[#e62429] text-[#e62429]" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: MOTI METER + DESIGNER CERTIFICATE */}
      {/* ============================================================ */}
      <section className="px-4 py-16 max-w-5xl mx-auto border-t border-[rgba(255,255,255,0.07)]">
        <div className="text-center mb-12">
          <div className="font-label text-[12px] text-[#e62429] mb-3">
            CHAPTER 04 — THE DATA
          </div>
          <h2 className="font-comic text-4xl md:text-5xl text-[#f2f3f5]">
            NUMBERS DON'T LIE, MOTI.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Interactive Moti Meter */}
          <div className="bg-[#0e1017] p-8 rounded-2xl border border-[rgba(216,178,95,0.35)] text-center relative overflow-hidden">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#07080b] rounded-full flex items-center justify-center border border-[rgba(216,178,95,0.5)] text-[#d8b25f]">
              <Flame className="w-7 h-7" />
            </div>
            <h3 className="font-comic text-2xl text-[#d8b25f] mb-2">
              MOTI METER
            </h3>
            <p className="font-outfit font-light text-[#9aa0ad] text-sm mb-6">
              Measure the craziness &amp; energy level of our friendship!
            </p>

            <div className="w-full bg-[#07080b] rounded-full h-6 border border-[rgba(255,255,255,0.08)] p-1 mb-4">
              <div
                className="bg-gradient-to-r from-[#d8b25f] to-[#e62429] h-full rounded-full transition-all duration-300 flex items-center justify-end pr-2 text-xs font-bold text-white shadow-lg"
                style={{ width: `${Math.min(100, (motiLevel / 9999) * 100)}%` }}
              >
                {motiLevel}%
              </div>
            </div>

            <button
              onClick={() => {
                setMotiLevel((prev) => prev + 500);
                confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 }, colors: ["#e62429", "#d8b25f"] });
              }}
              className="w-full bg-gradient-to-r from-[#d8b25f] to-[#e62429] hover:brightness-110 text-[#07080b] font-comic text-lg py-3 rounded-xl shadow-lg transform active:scale-95 transition-transform"
            >
              BOOST MOTI LEVEL (+500%)
            </button>
          </div>

          {/* Designer Certificate Card Trigger */}
          <div className="bg-[#0e1017] p-8 rounded-2xl border border-[rgba(230,36,41,0.4)] text-center relative">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#07080b] rounded-full flex items-center justify-center border border-[rgba(230,36,41,0.5)] text-[#e62429]">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="font-comic text-2xl text-[#f2f3f5] mb-2">
              PREMIUM CERTIFICATE
            </h3>
            <p className="font-outfit font-light text-[#9aa0ad] text-sm mb-4">
              Designer premium template, certified by the Multiverse.
            </p>

            <div className="bg-[#07080b] p-4 rounded-xl border border-[rgba(255,255,255,0.08)] text-left space-y-2 text-xs font-outfit mb-4">
              <div className="flex justify-between">
                <span className="text-[#5b6070]">Recipient:</span>
                <span className="text-[#f2f3f5] font-semibold">Shobhana / Shunu (aka Moti)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b6070]">Title:</span>
                <span className="text-[#d8b25f] font-semibold">Moti Partner in Crime</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5b6070]">Template:</span>
                <span className="text-[#28c840] font-semibold">Designer Gold Edition</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowCertificateModal(true);
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ["#e62429", "#d8b25f"] });
              }}
              className="w-full bg-[#e62429] hover:brightness-110 text-white font-comic text-lg py-3 rounded-xl shadow-lg transform active:scale-95 transition-transform flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>VIEW &amp; DOWNLOAD CERTIFICATE</span>
            </button>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* DESIGNER PREMIUM CERTIFICATE MODAL */}
      {/* ============================================================ */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-reveal">
          <div className="relative max-w-2xl w-full my-8">

            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2 text-[#d8b25f] font-label text-sm">
                <Sparkles className="w-4 h-4" />
                <span>DESIGNER PREMIUM CERTIFICATE</span>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="p-2 rounded-full bg-[#0e1017] hover:bg-[#181b24] text-white transition-colors cursor-pointer border border-[rgba(255,255,255,0.1)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Template to Capture */}
            <div ref={certRef} className="gold-frame p-2 md:p-3 shadow-2xl">
              <div className="gold-frame-inner px-6 py-10 md:px-12 md:py-16 text-center flex flex-col items-center gap-4 bg-[#07080b]">
                <div className="font-label text-[11px] text-[#d8b25f] tracking-[0.5em]">
                  OFFICIAL &amp; LEGALLY VERIFIED
                </div>
                <h2 className="font-quote font-semibold text-3xl md:text-5xl leading-tight text-[#f2f3f5]">
                  Certificate of<br />Best Friendship
                </h2>
                <div className="w-20 h-px bg-[rgba(216,178,95,0.55)]" />
                <p className="font-outfit font-light text-sm text-[#9aa0ad]">
                  This certificate is proudly awarded to
                </p>
                <div className="font-comic text-4xl md:text-6xl text-[#d8b25f] leading-none">
                  SHOBHANA / SHUNU
                </div>
                <div className="font-handwriting text-lg md:text-2xl text-[#c8ccd4]">
                  "Moti" — she has accepted her fate
                </div>
                <p className="font-outfit font-light text-sm leading-relaxed text-[#8d93a1] max-w-md mt-2">
                  For being the ultimate partner in crime, holder of infinite Moti energy, and the most
                  irreplaceable best friend in the multiverse. This title is permanent, non-transferable,
                  and comes with absolutely no benefits.
                </p>

                <div className="grid grid-cols-3 gap-6 w-full mt-6 items-end">
                  <div className="flex flex-col gap-2 items-center">
                    <div className="font-handwriting text-lg text-[#f2f3f5]">Tera Bestie</div>
                    <div className="w-full h-px bg-[rgba(255,255,255,0.16)]" />
                    <div className="font-label text-[9px] text-[#5b6070]">SIGNATURE</div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div
                      className="w-16 h-16 rounded-full border-2 border-[rgba(216,178,95,0.6)] flex items-center justify-center font-label text-[9px] text-[#d8b25f] text-center leading-tight"
                      style={{ transform: "rotate(-8deg)" }}
                    >
                      SEALED<br />4EVER
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <div className="font-handwriting text-lg text-[#f2f3f5]">02.08.2026</div>
                    <div className="w-full h-px bg-[rgba(255,255,255,0.16)]" />
                    <div className="font-label text-[9px] text-[#5b6070]">FRIENDSHIP DAY</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleDownloadCertificate}
                disabled={downloading}
                className="bg-gradient-to-r from-[#d8b25f] to-[#e62429] hover:brightness-110 text-[#07080b] font-comic text-lg px-8 py-3.5 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer disabled:opacity-50"
              >
                {downloading ? (
                  <span>GENERATING PNG...</span>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>DOWNLOAD CERTIFICATE (PNG)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowCertificateModal(false)}
                className="bg-[#0e1017] hover:bg-[#181b24] text-white font-comic text-base px-6 py-3.5 rounded-xl transition-all border border-[rgba(255,255,255,0.1)] cursor-pointer"
              >
                CLOSE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center pt-10 text-[#5b6070] text-xs font-outfit tracking-[0.2em] uppercase border-t border-[rgba(255,255,255,0.07)] max-w-5xl mx-auto px-4">
        Made with ❤️ for Friendship Day 2026 · 2020 — ∞
      </footer>
    </div>
  );
}
