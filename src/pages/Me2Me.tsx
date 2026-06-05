import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Heart, Target, Zap, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import me2me2 from "@/assets/me2me/me2me-2.png";
import me2me1 from "@/assets/me2me/me2me-1.png";

const EASE = [0.23, 1, 0.32, 1] as const;

const C = {
  ivory:    "#F7F1E8",
  cream:    "#FDFAF5",
  parchment:"#EDE6DA",
  espresso: "#1C1610",
  body:     "rgba(28,22,16,0.62)",
  gold:     "#9C7B59",
} as const;

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22, filter: "blur(3px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.72, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const features = [
  { icon: Heart,  title: "Dziennik emocji",     description: "Śledź swoje uczucia i odkrywaj wzorce emocjonalne" },
  { icon: Target, title: "Cele i nawyki",        description: "Wyznaczaj cele i buduj pozytywne nawyki krok po kroku" },
  { icon: Zap,    title: "Codzienne ćwiczenia",  description: "Praktyczne zadania wspierające Twój rozwój każdego dnia" },
];

const benefits = [
  "Lepsze zrozumienie własnych emocji",
  "Budowanie zdrowych nawyków",
  "Codzienna dawka motywacji",
  "Personalizowane ścieżki rozwoju",
  "Społeczność wspierających osób",
  "Dostęp do ekskluzywnych materiałów",
];

const dailyItems = [
  "Aktywność: Stretching (15 min) + PowerBody (15 min)",
  "Plan żywienia i suplementacji",
  "Tematyczne prowadzenie mentalne",
  "Dla chętnych: oczyszczenie",
];

const Me2Me = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <Layout>
      {/* Hero */}
      <section style={{ backgroundColor: C.ivory }} className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div ref={heroRef} className="grid lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-start">
            <div>
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE }}
                className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-8"
                style={{ backgroundColor: `${C.gold}18`, color: C.gold }}
              >
                Autorska aplikacja
              </motion.span>

              <div className="mb-4">
                <motion.h1
                  variants={{
                    hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                    show:   { clipPath: "inset(0 0 -40% 0)", opacity: 1, transition: { duration: 0.95, ease: EASE } },
                  }}
                  initial="hidden"
                  animate={heroInView ? "show" : "hidden"}
                  className="font-serif font-bold tracking-[-0.02em] leading-[1.05]"
                  style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)", color: C.espresso }}
                >
                  Me2Me
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
                className="space-y-3 mb-10"
              >
                <p className="font-serif text-xl font-medium" style={{ color: C.espresso }}>
                  21–31 dni holistycznego kształtowania nawyków
                </p>
                <p className="text-base font-light italic tracking-wide" style={{ color: C.body }}>
                  Od Siebie — dla Siebie — z Sobą
                </p>
                <p className="text-sm" style={{ color: C.body }}>
                  Aktywne Ciało · Stabilne emocje · Prawdziwe Relacje
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.42, ease: EASE }}
                className="rounded-[1.6rem] p-6 mb-10"
                style={{ backgroundColor: C.parchment, border: `1px solid ${C.espresso}0d` }}
              >
                <p className="text-sm font-medium mb-3" style={{ color: C.espresso }}>
                  Na każdy dzień masz rozpisane:
                </p>
                <ul className="space-y-2">
                  {dailyItems.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: C.body }}>
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: C.gold }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.52, ease: EASE }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <a
                  href="https://www.me2me.pl/login"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: C.espresso,
                    color: "#F2E9DC",
                    transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
                >
                  <Smartphone className="w-4 h-4" strokeWidth={2} />
                  Otwórz aplikację
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=48785669901"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border"
                  style={{
                    borderColor: `${C.espresso}22`,
                    color: C.espresso,
                    transition: `border-color 160ms ease`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.espresso}44`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.espresso}22`)}
                >
                  Zapytaj o dostęp
                </a>
              </motion.div>
            </div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
              className="hidden lg:flex justify-center"
            >
              <div
                className="w-[278px] rounded-[3.2rem] p-2"
                style={{
                  backgroundColor: "rgba(28,22,16,0.85)",
                  border: `1px solid rgba(156,123,89,0.18)`,
                  boxShadow: `0 48px 96px -24px rgba(28,22,16,0.32), 0 0 0 1px rgba(156,123,89,0.08), inset 0 1px 0 rgba(247,241,232,0.06)`,
                }}
              >
                <div
                  className="aspect-[9/19.5] rounded-[calc(3.2rem-8px)] overflow-hidden flex flex-col relative"
                  style={{ backgroundColor: "#1A1108", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-b-lg"
                    style={{ width: 68, height: 10, backgroundColor: "#0E0B05" }} />

                  {/* Status bar */}
                  <div className="flex-shrink-0 flex justify-between items-center px-4 pt-3 pb-1">
                    <span style={{ fontSize: 8, fontWeight: 600, color: "rgba(247,241,232,0.5)" }}>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-end gap-[2px]">
                        {[4, 6, 8].map((h, i) => (
                          <div key={i} style={{ width: 3, height: h, borderRadius: 1, backgroundColor: "rgba(247,241,232,0.38)" }} />
                        ))}
                      </div>
                      <div className="relative" style={{ width: 22, height: 11 }}>
                        <div className="absolute inset-0 rounded" style={{ border: "1px solid rgba(247,241,232,0.28)" }} />
                        <div className="absolute" style={{ top: 2, left: 2, right: 5, bottom: 2, borderRadius: 1, backgroundColor: "rgba(156,123,89,0.7)" }} />
                        <div className="absolute" style={{ top: 3, right: -3, width: 2.5, height: 5, borderRadius: 1, backgroundColor: "rgba(247,241,232,0.28)" }} />
                      </div>
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex-shrink-0 flex justify-between items-center px-4 pb-2">
                    <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: "#F7F1E8", letterSpacing: "-0.5px" }}>
                      Me2Me
                    </span>
                    <div className="rounded-full flex items-center justify-center"
                      style={{ width: 32, height: 32, backgroundColor: "rgba(156,123,89,0.18)", border: "1px solid rgba(156,123,89,0.3)" }}>
                      <span style={{ fontSize: 8, fontWeight: 700, color: "#9C7B59" }}>MZ</span>
                    </div>
                  </div>

                  {/* Progress card */}
                  <div className="flex-shrink-0 mx-3 rounded-2xl p-3 flex items-center gap-3"
                    style={{ backgroundColor: "rgba(247,241,232,0.05)", border: "1px solid rgba(247,241,232,0.07)" }}>
                    <svg width="60" height="60" viewBox="0 0 60 60" style={{ flexShrink: 0 }}>
                      <circle cx="30" cy="30" r="24" stroke="rgba(247,241,232,0.08)" strokeWidth="4.5" fill="none"/>
                      <circle cx="30" cy="30" r="24" stroke="#9C7B59" strokeWidth="4.5"
                        strokeDasharray="101 50" strokeDashoffset="-25" strokeLinecap="round" fill="none"/>
                      <text x="30" y="27" textAnchor="middle" fontSize="14" fontWeight="700" fill="#F7F1E8"
                        fontFamily="'Plus Jakarta Sans',sans-serif">14</text>
                      <text x="30" y="38" textAnchor="middle" fontSize="5.5" fill="rgba(247,241,232,0.38)"
                        fontFamily="'Plus Jakarta Sans',sans-serif">z 21 dni</text>
                    </svg>
                    <div>
                      <div style={{ fontSize: 6, fontWeight: 700, color: "#9C7B59", letterSpacing: "0.13em", marginBottom: 3 }}>DZIEN PROGRAMU</div>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 13, fontWeight: 700, color: "#F7F1E8", lineHeight: 1.2, marginBottom: 3 }}>Tydzien 2 · War. A</div>
                      <div style={{ fontSize: 6.5, color: "rgba(247,241,232,0.36)", marginBottom: 5 }}>Seria: 7 dni z rzedu</div>
                      <div className="inline-flex items-center px-2 py-1 rounded-full"
                        style={{ backgroundColor: "rgba(156,123,89,0.18)", border: "1px solid rgba(156,123,89,0.28)" }}>
                        <span style={{ fontSize: 6, fontWeight: 600, color: "#9C7B59" }}>Kontynuuj streak</span>
                      </div>
                    </div>
                  </div>

                  {/* Section label */}
                  <div className="flex-shrink-0 flex items-center gap-2 px-4 pt-3 pb-2">
                    <span style={{ fontSize: 7, fontWeight: 700, color: "rgba(156,123,89,0.75)", letterSpacing: "0.16em", whiteSpace: "nowrap" }}>TWOJ PROGRAM</span>
                    <div className="flex-1" style={{ height: 1, backgroundColor: "rgba(156,123,89,0.2)" }} />
                  </div>

                  {/* Module list */}
                  <div className="flex-1 overflow-hidden px-3 flex flex-col gap-1.5">

                    {/* WSTEP — ukonczone */}
                    <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 flex-shrink-0"
                      style={{ backgroundColor: "rgba(74,222,128,0.04)", border: "1px solid rgba(74,222,128,0.08)" }}>
                      <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 42, height: 42 }}>
                        <img src={me2me2} alt="" className="w-full h-full" style={{ objectFit: "cover", objectPosition: "13% 35%" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 8, fontWeight: 600, color: "rgba(247,241,232,0.55)", marginBottom: 2 }}>Wstep do programu</div>
                        <div style={{ fontSize: 6.5, color: "rgba(247,241,232,0.25)" }}>O mnie · Nawyki · Suplementy</div>
                      </div>
                      <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ width: 38, height: 16, backgroundColor: "rgba(74,222,128,0.1)" }}>
                        <span style={{ fontSize: 6, fontWeight: 600, color: "#4ADE80" }}>Gotowe</span>
                      </div>
                    </div>

                    {/* DZIEN 14 — aktywny */}
                    <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 flex-shrink-0"
                      style={{ backgroundColor: "rgba(156,123,89,0.1)", border: "1px solid rgba(156,123,89,0.4)" }}>
                      <div className="rounded-xl overflow-hidden flex-shrink-0 relative" style={{ width: 42, height: 42 }}>
                        <img src={me2me2} alt="" className="w-full h-full" style={{ objectFit: "cover", objectPosition: "36% 35%" }} />
                        <div className="absolute inset-0 flex items-center justify-center"
                          style={{ backgroundColor: "rgba(28,22,16,0.38)" }}>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <circle cx="9" cy="9" r="9" fill="rgba(156,123,89,0.85)"/>
                            <path d="M7 6 L7 12 L13 9 Z" fill="#F7F1E8"/>
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="inline-flex mb-1 rounded-full px-1.5 py-0.5"
                          style={{ backgroundColor: "rgba(156,123,89,0.25)" }}>
                          <span style={{ fontSize: 5.5, fontWeight: 700, color: "#9C7B59", letterSpacing: "0.1em" }}>DZISIAJ</span>
                        </div>
                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 9.5, fontWeight: 700, color: "#F7F1E8", marginBottom: 1 }}>Dzien 14</div>
                        <div style={{ fontSize: 6.5, color: "rgba(247,241,232,0.42)" }}>Tydzien 2 · Wariant A</div>
                      </div>
                      <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ width: 38, height: 16, backgroundColor: "rgba(156,123,89,0.32)" }}>
                        <span style={{ fontSize: 6.5, fontWeight: 700, color: "#9C7B59" }}>Zacznij</span>
                      </div>
                    </div>

                    {/* DZIEN 15 — jutro */}
                    <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 flex-shrink-0"
                      style={{ backgroundColor: "rgba(247,241,232,0.03)", border: "1px solid rgba(247,241,232,0.05)" }}>
                      <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 42, height: 42, opacity: 0.45 }}>
                        <img src={me2me2} alt="" className="w-full h-full" style={{ objectFit: "cover", objectPosition: "57% 35%" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 8, fontWeight: 600, color: "rgba(247,241,232,0.3)", marginBottom: 2 }}>Dzien 15</div>
                        <div style={{ fontSize: 6.5, color: "rgba(247,241,232,0.18)" }}>Ksztaltowanie nawykow</div>
                      </div>
                      <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ width: 38, height: 16, backgroundColor: "rgba(247,241,232,0.05)" }}>
                        <span style={{ fontSize: 6, fontWeight: 600, color: "rgba(247,241,232,0.28)" }}>Jutro</span>
                      </div>
                    </div>

                    {/* TYDZIEN 3 — zablokowany */}
                    <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 flex-shrink-0"
                      style={{ backgroundColor: "rgba(247,241,232,0.02)", border: "1px solid rgba(247,241,232,0.04)" }}>
                      <div className="rounded-xl overflow-hidden flex-shrink-0" style={{ width: 42, height: 42, opacity: 0.25 }}>
                        <img src={me2me1} alt="" className="w-full h-full" style={{ objectFit: "cover", objectPosition: "40% 75%" }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 9, fontWeight: 700, color: "rgba(247,241,232,0.2)", marginBottom: 2 }}>Tydzien 3</div>
                        <div style={{ fontSize: 6.5, color: "rgba(247,241,232,0.14)" }}>Stabilnosc i trwale efekty</div>
                      </div>
                      <div className="flex-shrink-0 rounded-full flex items-center justify-center"
                        style={{ width: 44, height: 16, backgroundColor: "rgba(247,241,232,0.04)" }}>
                        <span style={{ fontSize: 6, fontWeight: 600, color: "rgba(247,241,232,0.2)" }}>Odblokuj</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="flex-shrink-0 mx-3 my-2 rounded-2xl flex items-center justify-around"
                    style={{ height: 46, backgroundColor: "rgba(247,241,232,0.055)", border: "1px solid rgba(247,241,232,0.08)" }}>
                    <div className="rounded-xl flex items-center justify-center"
                      style={{ width: 40, height: 34, backgroundColor: "rgba(156,123,89,0.2)" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 7 L8 2 L14 7 L14 14 L10 14 L10 10 L6 10 L6 14 L2 14 Z"
                          stroke="#9C7B59" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="rgba(156,123,89,0.2)"/>
                      </svg>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="5.5" stroke="rgba(247,241,232,0.2)" strokeWidth="1.3"/>
                      <path d="M8 5.5 L8 10.5 M5.5 8 L10.5 8" stroke="rgba(247,241,232,0.2)" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="4" width="12" height="1.5" rx="0.75" fill="rgba(247,241,232,0.18)"/>
                      <rect x="2" y="7.25" width="9" height="1.5" rx="0.75" fill="rgba(247,241,232,0.18)"/>
                      <rect x="2" y="10.5" width="11" height="1.5" rx="0.75" fill="rgba(247,241,232,0.18)"/>
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="5.5" r="2.8" stroke="rgba(247,241,232,0.2)" strokeWidth="1.3"/>
                      <path d="M2 14 C2 11 4.5 9.5 8 9.5 C11.5 9.5 14 11 14 14" stroke="rgba(247,241,232,0.2)" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>

                  {/* Home indicator */}
                  <div className="flex-shrink-0 flex justify-center mb-2">
                    <div className="rounded-full" style={{ width: 52, height: 4, backgroundColor: "rgba(247,241,232,0.1)" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ backgroundColor: C.cream }} className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <FadeUp className="mb-14">
            <h2
              className="font-serif font-bold tracking-[-0.02em]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: C.espresso }}
            >
              Funkcje aplikacji
            </h2>
            <p className="mt-3 text-base max-w-md" style={{ color: C.body }}>
              Wszystko, czego potrzebujesz do codziennej pracy nad sobą
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <div
                  className="rounded-[1.6rem] p-8 h-full group"
                  style={{
                    backgroundColor: C.ivory,
                    border: `1px solid ${C.espresso}0d`,
                    transition: `border-color 240ms ease`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.gold}44`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.espresso}0d`)}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${C.gold}18` }}
                  >
                    <f.icon className="w-6 h-6" style={{ color: C.gold }} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="font-serif font-semibold mb-3"
                    style={{ fontSize: "1.2rem", color: C.espresso }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: C.body }}>{f.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + CTA */}
      <section style={{ backgroundColor: C.ivory }} className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <FadeUp>
              <h2
                className="font-serif font-bold tracking-[-0.02em] mb-10"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3rem)", color: C.espresso }}
              >
                Co zyskasz z Me2Me?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <motion.div
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, ease: EASE }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ transition: "background-color 160ms ease" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${C.gold}0d`)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${C.gold}18` }}
                    >
                      <CheckCircle className="w-4 h-4" style={{ color: C.gold }} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: C.espresso }}>{b}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div
                className="rounded-[2rem] p-1.5"
                style={{ backgroundColor: C.parchment, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)` }}
              >
                <div
                  className="rounded-[calc(2rem-6px)] p-10"
                  style={{ backgroundColor: C.cream }}
                >
                  <h3
                    className="font-serif font-semibold mb-4"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: C.espresso }}
                  >
                    Dołącz już dziś
                  </h3>
                  <p className="text-sm leading-relaxed mb-8" style={{ color: C.body }}>
                    Rozpocznij swoją podróż do lepszej wersji siebie.
                    Me2Me jest dostępna na iOS i Android.
                  </p>
                  <a
                    href="https://www.me2me.pl/login"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: C.espresso,
                      color: "#F2E9DC",
                      transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
                  >
                    <Smartphone className="w-4 h-4" strokeWidth={2} />
                    Otwórz aplikację
                  </a>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Me2Me;