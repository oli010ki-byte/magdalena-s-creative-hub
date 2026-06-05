import { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
  animate,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Calendar, MessageCircle, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import magdaPhoto from "@/assets/magda-photo.jpg";

// ─── Easing ──────────────────────────────────────────────────────────────────
const EASE = [0.23, 1, 0.32, 1] as const;

// ─── Palette (light editorial) ────────────────────────────────────────────────
const C = {
  ivory:    "#F7F1E8",   // hero & CTA background
  cream:    "#FDFAF5",   // card / section background
  parchment:"#EDE6DA",   // alternate section bg
  espresso: "#1C1610",   // headings & body
  body:     "rgba(28,22,16,0.62)",  // paragraph text
  gold:     "#9C7B59",   // accent (original brand tone)
  goldHov:  "#B08B68",   // hover
  dark:     "#1C1610",   // testimonials dark bg
  darkText: "#F2E9DC",   // text on dark
  darkMid:  "rgba(242,233,220,0.55)",
} as const;

// ─── Magnetic Button ──────────────────────────────────────────────────────────
const MagneticButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 20, mass: 0.4 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  }, [x, y]);

  const onLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.97, transition: { duration: 0.08 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Spotlight Card (testimonials) ───────────────────────────────────────────
const SpotlightCard = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseEnter={() => setOn(true)}
      onMouseLeave={() => setOn(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: on ? 1 : 0,
          background: `radial-gradient(360px circle at ${pos.x}px ${pos.y}px, rgba(156,123,89,0.14), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
};

// ─── Counter stat (23+ counts up on enter) ────────────────────────────────────
const CounterStat = ({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const ctrl = animate(count, to, {
      duration: 1.6,
      ease: [0.23, 1, 0.32, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return ctrl.stop;
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref}>
      <p className="font-sans font-semibold leading-none" style={{ fontSize: "1.35rem", color: C.espresso, letterSpacing: "-0.01em" }}>
        {display}{suffix}
      </p>
      <p className="mt-1.5 font-sans font-medium" style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold }}>
        {label}
      </p>
    </div>
  );
};

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.11, delayChildren: 0.04 } },
};

// ─── Static data ──────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "23 lata doświadczenia",
  "Mentor holistyczny",
  "Nurt TSR",
  "Aplikacja Me2Me",
  "Mentoring indywidualny 1:1",
  "Żywienie funkcjonalne",
  "Suplementacja na bazie natury",
  "Rozwój osobisty",
];

const SERVICES = [
  {
    tag: "Mentoring 1:1",
    title: "Konsultacja indywidualna",
    desc: "Pracujemy nad tym, co dla Ciebie ważne — ciałem, emocjami i skutecznością w działaniu. Strategia dopasowana do Twojego celu.",
    detail: "od 160 zł · online lub stacjonarnie",
    link: "/products/consultation",
    cta: "Umów termin",
    benefits: ["Indywidualne podejście", "Konkretny plan działania", "23-letnie doświadczenie mentora"],
    large: true,
  },
  {
    tag: "Aplikacja",
    title: "Me2Me",
    desc: "21–31 dni holistycznego kształtowania nawyków — ciało, emocje, relacje. System wspierający codzienny rytm.",
    detail: "Autorski program",
    link: "/me2me",
    cta: "Poznaj Me2Me",
    large: false,
  },
  {
    tag: "Produkty",
    title: "Kursy i e-booki",
    desc: "Narzędzia do pracy we własnym tempie. Kursy i przewodniki oparte na wieloletniej praktyce.",
    detail: "Dostępne online",
    link: "/products",
    cta: "Zobacz produkty",
    large: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "Magda łączy wiedzę o ciele, emocjach i biznesie w sposób, który naprawdę działa. Po pierwszej konsultacji miałam gotowy plan i energię do działania.",
    name: "Karolina M.",
    role: "Klientka konsultacji 1:1",
  },
  {
    quote: "Aplikacja Me2Me zmieniła moje poranki. W 21 dni wyrobiłam nawyki, których próbowałam się trzymać od lat.",
    name: "Agnieszka W.",
    role: "Uczestniczka programu Me2Me",
  },
  {
    quote: "Podejście win-win i 23-letnie doświadczenie — to czuć w każdej rozmowie. Współpraca z Magdą zwraca się wielokrotnie.",
    name: "Tomasz K.",
    role: "Klient mentoringu biznesowego",
  },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY     = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      style={{ backgroundColor: C.ivory }}
    >
      {/* Soft ambient light */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-[10%] w-[600px] h-[400px] rounded-full blur-[140px]"
          style={{ background: "rgba(156,123,89,0.08)" }} />
        <div className="absolute top-[20%] right-[5%] w-[300px] h-[300px] rounded-full blur-[100px]"
          style={{ background: "rgba(156,123,89,0.05)" }} />
      </div>

      <div className="w-full max-w-[1380px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-8 lg:gap-16 xl:gap-20 items-center pt-28 pb-16 lg:min-h-[100dvh] lg:pt-32 lg:pb-28">

          {/* ── Left: Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-2 lg:order-1 max-w-[620px]"
          >
            {/* Eyebrow — clean pill, no dot animation */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
              className="mb-9"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-[7px] rounded-full text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{
                  border: `1px solid ${C.gold}40`,
                  color: C.gold,
                  letterSpacing: "0.28em",
                }}
              >
                <span
                  className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: C.gold }}
                />
                Mentor holistyczny & biznesowy
              </span>
            </motion.div>

            {/* Name reveal — clip-path zamiast overflow:hidden.
                inset(0 0 -40% 0) w show = negatywna wartość dolna → descendersy nigdy nie obcięte. */}
            <motion.h1
              variants={{
                hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                show:   { clipPath: "inset(0 0 -40% 0)", opacity: 1, transition: { duration: 0.95, ease: EASE } },
              }}
              className="font-serif font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(3.4rem, 9.5vw, 7.8rem)", color: C.espresso }}
            >
              Magdalena
            </motion.h1>
            <motion.h1
              variants={{
                hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                show:   { clipPath: "inset(0 0 -40% 0)", opacity: 1, transition: { duration: 0.95, delay: 0.1, ease: EASE } },
              }}
              className="font-serif font-bold leading-[1.05] tracking-[-0.02em] mb-9"
              style={{ fontSize: "clamp(3.4rem, 9.5vw, 7.8rem)", color: C.gold }}
            >
              Zając
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } }}
              className="text-lg leading-[1.75] mb-10 max-w-[45ch] font-light"
              style={{ color: C.body }}
            >
              Łączę psychologię, ruch, żywienie funkcjonalne i suplementację,
              by tworzyć narzędzia dające długofalową efektywność w zgodzie z własnym potencjałem.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } } }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <MagneticButton>
                <Link
                  to="/products/consultation"
                  className="group inline-flex items-center gap-2.5 font-semibold text-sm px-6 py-[13px] rounded-full"
                  style={{
                    backgroundColor: C.espresso,
                    color: C.darkText,
                    transition: `background-color 180ms cubic-bezier(0.23,1,0.32,1)`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
                >
                  <Calendar className="w-[15px] h-[15px] flex-shrink-0" strokeWidth={1.8} />
                  Umów konsultację
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200"
                    style={{ backgroundColor: "rgba(242,233,220,0.14)" }}
                  >
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                  </span>
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="https://api.whatsapp.com/send?phone=48785669901"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-sm px-6 py-[13px] rounded-full"
                  style={{
                    border: `1px solid ${C.espresso}22`,
                    color: C.body,
                    transition: `all 180ms cubic-bezier(0.23,1,0.32,1)`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${C.espresso}40`;
                    (e.currentTarget.style as any).color = C.espresso;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${C.espresso}22`;
                    (e.currentTarget.style as any).color = C.body;
                  }}
                >
                  <MessageCircle className="w-[15px] h-[15px]" strokeWidth={1.8} />
                  WhatsApp
                </a>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}
              className="flex items-center gap-8 pt-8"
              style={{ borderTop: `1px solid ${C.espresso}10` }}
            >
              {/* 23+ — animated counter */}
              <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } } }}>
                <CounterStat to={23} suffix="+" label="lat doświadczenia" />
              </motion.div>
              {/* Static stats */}
              {[
                { value: "1:1", label: "mentoring" },
                { value: "TSR", label: "nurt pracy" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, delay: (i + 1) * 0.08, ease: EASE } } }}
                >
                  <p className="font-sans font-semibold leading-none" style={{ fontSize: "1.35rem", color: C.espresso, letterSpacing: "-0.01em" }}>
                    {s.value}
                  </p>
                  <p className="mt-1.5 font-sans font-medium" style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold }}>
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(14px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.18, ease: EASE }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Double-bezel — light variant */}
            <div
              style={{
                padding: "6px",
                borderRadius: "2.25rem",
                background: "rgba(28,22,16,0.04)",
                boxShadow: `0 0 0 1px rgba(28,22,16,0.07), 0 32px 64px -16px rgba(28,22,16,0.16)`,
              }}
            >
              <motion.div
                style={{
                  y: photoY,
                  scale: photoScale,
                  borderRadius: "calc(2.25rem - 6px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.55)",
                }}
                className="relative overflow-hidden aspect-[4/5] w-[72vw] max-w-[300px] lg:w-[33vw] lg:max-w-[450px]"
              >
                <img
                  src={magdaPhoto}
                  alt="Magdalena Zając"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                />
                {/* Fade bottom to match section bg */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${C.ivory}55, transparent 40%)` }}
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
      >
        <span style={{ fontSize: "8px", letterSpacing: "0.32em", textTransform: "uppercase", color: `${C.espresso}35`, fontWeight: 600 }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: `linear-gradient(to bottom, ${C.espresso}30, transparent)` }}
        />
      </motion.div>
    </section>
  );
};

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────
const MarqueeStrip = () => (
  <div className="overflow-hidden py-3" style={{ backgroundColor: C.espresso }}>
    <div className="flex animate-marquee whitespace-nowrap" style={{ willChange: "transform" }}>
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-4 mx-5 font-semibold uppercase"
          style={{ fontSize: "9.5px", letterSpacing: "0.24em", color: `${C.darkText}70` }}
        >
          {item}
          <span className="w-[3px] h-[3px] rounded-full flex-shrink-0" style={{ backgroundColor: `${C.gold}60` }} />
        </span>
      ))}
    </div>
  </div>
);

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });

  return (
    <div ref={ref}>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: "blur(5px)" }}
        animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-12"
      >
        <p
          className="font-sans font-semibold uppercase mb-4"
          style={{ fontSize: "9.5px", letterSpacing: "0.28em", color: C.gold }}
        >
          Oferta
        </p>
        <h2
          className="font-serif font-bold leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: C.espresso }}
        >
          Jak mogę Ci pomóc
        </h2>
      </motion.div>

      {/* Asymmetric bento */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-4">

        {/* Large card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1, ease: EASE }}
        >
          <div
            className="h-full rounded-[1.75rem] p-[5px]"
            style={{ background: "rgba(28,22,16,0.04)", boxShadow: "0 0 0 1px rgba(28,22,16,0.06), 0 16px 40px -12px rgba(28,22,16,0.08)" }}
          >
            <div
              className="h-full rounded-[calc(1.75rem-5px)] p-9 flex flex-col min-h-[400px]"
              style={{ backgroundColor: C.cream, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}
            >
              <div className="flex items-start justify-between mb-7">
                <span
                  className="inline-block px-3 py-[5px] rounded-full font-semibold uppercase"
                  style={{ fontSize: "9px", letterSpacing: "0.2em", background: `${C.gold}14`, color: C.gold }}
                >
                  {SERVICES[0].tag}
                </span>
                <span className="font-sans text-xs font-light" style={{ color: C.body }}>
                  {SERVICES[0].detail}
                </span>
              </div>

              <h3
                className="font-serif font-bold leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2rem)", color: C.espresso }}
              >
                {SERVICES[0].title}
              </h3>
              <p className="font-light leading-relaxed mb-7 flex-1" style={{ fontSize: "0.9375rem", color: C.body }}>
                {SERVICES[0].desc}
              </p>

              <ul className="space-y-2.5 mb-8">
                {SERVICES[0].benefits!.map((b) => (
                  <li key={b} className="flex items-center gap-2.5" style={{ fontSize: "0.875rem", color: C.body }}>
                    <CheckCircle className="w-[15px] h-[15px] flex-shrink-0" strokeWidth={2} style={{ color: C.gold }} />
                    {b}
                  </li>
                ))}
              </ul>

              <MagneticButton className="w-fit">
                <Link
                  to={SERVICES[0].link}
                  className="group inline-flex items-center gap-2.5 font-semibold text-sm px-6 py-3 rounded-full"
                  style={{
                    backgroundColor: C.espresso,
                    color: C.darkText,
                    transition: "background-color 160ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
                >
                  {SERVICES[0].cta}
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200"
                    style={{ backgroundColor: "rgba(242,233,220,0.12)" }}
                  >
                    <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
                  </span>
                </Link>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {SERVICES.slice(1).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.18 + i * 0.1, ease: EASE }}
              className="flex-1"
            >
              <div
                className="h-full rounded-[1.75rem] p-[5px]"
                style={{ background: "rgba(28,22,16,0.04)", boxShadow: "0 0 0 1px rgba(28,22,16,0.06), 0 12px 32px -10px rgba(28,22,16,0.07)" }}
              >
                <div
                  className="h-full rounded-[calc(1.75rem-5px)] p-7 flex flex-col min-h-[175px]"
                  style={{ backgroundColor: C.cream, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span
                      className="inline-block px-3 py-[5px] rounded-full font-semibold uppercase"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", background: `${C.gold}10`, color: C.gold }}
                    >
                      {s.tag}
                    </span>
                    <span className="font-sans text-xs font-light" style={{ color: C.body }}>
                      {s.detail}
                    </span>
                  </div>

                  <h3
                    className="font-serif font-bold leading-tight mb-2.5"
                    style={{ fontSize: "1.375rem", color: C.espresso }}
                  >
                    {s.title}
                  </h3>
                  <p className="font-light leading-relaxed mb-5 flex-1 text-sm" style={{ color: C.body }}>
                    {s.desc}
                  </p>

                  <Link
                    to={s.link}
                    className="inline-flex items-center gap-1 font-semibold text-xs w-fit"
                    style={{ color: C.body, transition: "color 150ms ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = C.espresso)}
                    onMouseLeave={e => (e.currentTarget.style.color = C.body)}
                  >
                    {s.cta}
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── ABOUT ────────────────────────────────────────────────────────────────────
const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="max-w-[1380px] mx-auto">
      <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, x: -32, filter: "blur(10px)" }}
          animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.95, ease: EASE }}
          className="relative"
        >
          <div
            style={{
              padding: "5px",
              borderRadius: "2rem",
              background: "rgba(28,22,16,0.04)",
              boxShadow: "0 0 0 1px rgba(28,22,16,0.06), 0 24px 48px -16px rgba(28,22,16,0.12)",
            }}
          >
            <div style={{ borderRadius: "calc(2rem - 5px)", overflow: "hidden", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)" }}>
              <img
                src={magdaPhoto}
                alt="Magdalena Zając"
                className="w-full"
                style={{ aspectRatio: "4/5", objectFit: "cover", objectPosition: "top", display: "block" }}
              />
            </div>
          </div>
          {/* Decorative corner accents */}
          <div className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl pointer-events-none" style={{ border: `1px solid ${C.gold}20` }} />
          <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-2xl pointer-events-none" style={{ border: `1px solid ${C.gold}20` }} />
        </motion.div>

        {/* Text */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className="space-y-7">
          <motion.div variants={fadeUp}>
            <p className="font-sans font-semibold uppercase mb-3" style={{ fontSize: "9.5px", letterSpacing: "0.28em", color: C.gold }}>
              O mnie
            </p>
            <h2 className="font-serif font-bold leading-tight tracking-[-0.02em]" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", color: C.espresso }}>
              Magdalena Zając
            </h2>
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            className="py-1"
            style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: "1.25rem" }}
          >
            <p className="font-sans font-light leading-relaxed" style={{ fontSize: "1.0625rem", color: `${C.espresso}75` }}>
              "Bazuję na nurcie TSR — skupiam się na rozwiązaniach i tym, co już działa,
              nie na trudnościach."
            </p>
          </motion.blockquote>

          <motion.div variants={fadeUp} className="space-y-3.5">
            <p className="font-light leading-[1.8] text-[0.9375rem]" style={{ color: C.body }}>
              Łączę psychologię, ekonomię, świadomy ruch, żywienie funkcjonalne i suplementację
              na bazie natury — tworząc procesy dające długofalową efektywność i stabilność
              w zgodzie z własnym potencjałem.
            </p>
            <p className="font-light leading-[1.8] text-[0.9375rem]" style={{ color: C.body }}>
              Jestem twórczynią aplikacji Me2Me — systemu wspierającego codzienny rytm ciała,
              emocji i umysłu.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <MagneticButton className="w-fit">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-medium text-sm px-6 py-3 rounded-full"
                style={{
                  border: `1px solid ${C.espresso}18`,
                  color: C.body,
                  transition: "all 160ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${C.espresso}35`;
                  e.currentTarget.style.color = C.espresso;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${C.espresso}18`;
                  e.currentTarget.style.color = C.body;
                }}
              >
                Poznaj mnie bliżej
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ─── TESTIMONIALS (one dark section for contrast) ─────────────────────────────
const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE }}
        className="text-center mb-12"
      >
        <p
          className="font-sans font-semibold uppercase mb-3"
          style={{ fontSize: "9.5px", letterSpacing: "0.28em", color: `${C.darkText}50` }}
        >
          Opinie
        </p>
        <h2
          className="font-serif font-bold leading-tight tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: C.darkText }}
        >
          Co mówią klientki i klienci
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.85, delay: i * 0.1, ease: EASE }}
          >
            <SpotlightCard
              className="h-full rounded-[1.5rem] p-7 flex flex-col"
              style={{
                border: "1px solid rgba(242,233,220,0.08)",
                backgroundColor: "rgba(242,233,220,0.04)",
              } as React.CSSProperties}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 10 10" className="w-3 h-3" style={{ fill: C.gold }}>
                    <path d="M5 0l1.2 3.6H10L7 5.8l1.2 3.6L5 7.2l-3.2 2.2L3 5.8 0 3.6h3.8z" />
                  </svg>
                ))}
              </div>

              <blockquote
                className="font-serif italic leading-[1.75] flex-1 mb-6"
                style={{ fontSize: "0.9375rem", color: C.darkMid }}
              >
                "{t.quote}"
              </blockquote>

              <div style={{ borderTop: "1px solid rgba(242,233,220,0.08)", paddingTop: "1.1rem" }}>
                <p className="font-semibold text-sm" style={{ color: C.darkText }}>{t.name}</p>
                <p className="font-sans mt-0.5" style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase", color: `${C.darkText}45` }}>
                  {t.role}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── CTA ─────────────────────────────────────────────────────────────────────
const CTASection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="max-w-[760px] mx-auto text-center"
    >
      <motion.div variants={fadeUp}>
        <p className="font-sans font-semibold uppercase mb-5" style={{ fontSize: "9.5px", letterSpacing: "0.28em", color: C.gold }}>
          Zacznijmy razem
        </p>
        <h2
          className="font-serif font-bold leading-[1.08] tracking-[-0.02em] mb-5"
          style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", color: C.espresso }}
        >
          Pierwsza konsultacja
          <br />
          <span style={{ color: C.gold }}>już od 160 zł</span>
        </h2>
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="font-light leading-[1.8] mb-8 max-w-[48ch] mx-auto"
        style={{ fontSize: "1.0625rem", color: C.body }}
      >
        Indywidualny mentoring dopasowany do Twojego celu.
        Online lub stacjonarnie — jak Ci wygodnie.
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-10">
        {["od 160 zł", "online lub stacjonarnie", "23 lata doświadczenia"].map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 font-medium text-xs px-4 py-2 rounded-full"
            style={{ backgroundColor: `${C.espresso}06`, color: C.body, border: `1px solid ${C.espresso}0D` }}
          >
            <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} style={{ color: C.gold }} />
            {item}
          </span>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
        <MagneticButton>
          <Link
            to="/products/consultation"
            className="group inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-[14px] rounded-full"
            style={{ backgroundColor: C.espresso, color: C.darkText, transition: "background-color 160ms cubic-bezier(0.23,1,0.32,1)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
          >
            <Calendar className="w-[15px] h-[15px]" strokeWidth={1.8} />
            Umów konsultację
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-200"
              style={{ backgroundColor: "rgba(242,233,220,0.12)" }}
            >
              <ArrowUpRight className="w-3 h-3" strokeWidth={2} />
            </span>
          </Link>
        </MagneticButton>

        <MagneticButton>
          <a
            href="https://api.whatsapp.com/send?phone=48785669901"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-medium text-sm px-7 py-[14px] rounded-full"
            style={{ border: `1px solid ${C.espresso}20`, color: C.body, transition: "all 160ms cubic-bezier(0.23,1,0.32,1)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${C.espresso}40`; e.currentTarget.style.color = C.espresso; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.espresso}20`; e.currentTarget.style.color = C.body; }}
          >
            <MessageCircle className="w-[15px] h-[15px]" strokeWidth={1.8} />
            Napisz na WhatsApp
          </a>
        </MagneticButton>
      </motion.div>
    </motion.div>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const Index = () => (
  <Layout>
    <HeroSection />
    <MarqueeStrip />

    <section className="py-28 md:py-36" style={{ backgroundColor: C.cream }}>
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <ServicesSection />
      </div>
    </section>

    <section className="py-28 md:py-36" style={{ backgroundColor: C.parchment }}>
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <AboutSection />
      </div>
    </section>

    <section className="py-28 md:py-36" style={{ backgroundColor: C.dark }}>
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <TestimonialsSection />
      </div>
    </section>

    <section className="py-32 md:py-44" style={{ backgroundColor: C.ivory }}>
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <CTASection />
      </div>
    </section>
  </Layout>
);

export default Index;