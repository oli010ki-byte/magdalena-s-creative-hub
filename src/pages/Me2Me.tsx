import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Heart, Target, Zap, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

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
                  className="aspect-[9/19.5] rounded-[calc(3.2rem-8px)] overflow-hidden"
                  style={{ backgroundColor: "#1A1108" }}
                >
                  <svg viewBox="0 0 220 478" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <defs>
                      <radialGradient id="g1" cx="50%" cy="0%" r="70%">
                        <stop offset="0%" stopColor="#9C7B59" stopOpacity="0.14"/>
                        <stop offset="100%" stopColor="#9C7B59" stopOpacity="0"/>
                      </radialGradient>
                      <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C4A47A"/>
                        <stop offset="100%" stopColor="#9C7B59"/>
                      </linearGradient>
                    </defs>

                    {/* Background + warm glow */}
                    <rect width="220" height="478" fill="#1A1108"/>
                    <rect width="220" height="220" fill="url(#g1)"/>

                    {/* Status bar */}
                    <text x="18" y="22" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="7.5" fontWeight="600" fill="#F7F1E8" fillOpacity="0.5">9:41</text>
                    <rect x="168" y="14" width="24" height="9.5" rx="2.8" stroke="#F7F1E8" strokeOpacity="0.22" strokeWidth="1" fill="none"/>
                    <rect x="192.5" y="17" width="2" height="4" rx="1" fill="#F7F1E8" fillOpacity="0.22"/>
                    <rect x="169.5" y="15.5" width="17" height="6.5" rx="2" fill="#9C7B59" fillOpacity="0.65"/>
                    <rect x="157" y="17" width="3" height="5.5" rx="1.5" fill="#F7F1E8" fillOpacity="0.22"/>
                    <rect x="162" y="15.5" width="3" height="7" rx="1.5" fill="#F7F1E8" fillOpacity="0.22"/>

                    {/* Pill notch */}
                    <rect x="76" y="7" width="68" height="10" rx="5" fill="#0E0B05"/>

                    {/* Header */}
                    <text x="18" y="56" fontFamily="'Playfair Display',Georgia,serif" fontSize="22" fontWeight="700" fill="#F7F1E8" letterSpacing="-0.6">Me2Me</text>
                    <circle cx="88" cy="50" r="3.5" fill="#9C7B59"/>
                    <circle cx="200" cy="49" r="16" fill="rgba(156,123,89,0.15)" stroke="rgba(156,123,89,0.3)" strokeWidth="1"/>
                    <text x="193.5" y="53.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8" fontWeight="700" fill="#9C7B59">MZ</text>

                    {/* Progress hero card */}
                    <rect x="12" y="67" width="196" height="112" rx="20" fill="rgba(247,241,232,0.05)" stroke="rgba(247,241,232,0.07)" strokeWidth="1"/>

                    {/* Progress ring */}
                    <circle cx="58" cy="123" r="30" stroke="rgba(247,241,232,0.07)" strokeWidth="5" fill="none"/>
                    <circle cx="58" cy="123" r="30" stroke="url(#ring)" strokeWidth="5" strokeDasharray="126 62" strokeDashoffset="31" strokeLinecap="round" fill="none"/>
                    <text x="58" y="120" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="14" fontWeight="700" fill="#F7F1E8" textAnchor="middle">14</text>
                    <text x="58" y="133" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6" fontWeight="500" fill="#F7F1E8" fillOpacity="0.35" textAnchor="middle">z 21 dni</text>

                    {/* Card text */}
                    <text x="103" y="88" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6" fontWeight="700" fill="#9C7B59" letterSpacing="0.13em">DZIEN PROGRAMU</text>
                    <text x="103" y="105" fontFamily="'Playfair Display',Georgia,serif" fontSize="12" fontWeight="700" fill="#F7F1E8">Aktywny tydzien</text>
                    <text x="103" y="119" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill="#F7F1E8" fillOpacity="0.36">Seria: 7 dni z rzedu</text>
                    <rect x="103" y="128" width="64" height="16" rx="8" fill="rgba(156,123,89,0.18)" stroke="rgba(156,123,89,0.28)" strokeWidth="1"/>
                    <text x="135" y="139" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6" fontWeight="600" fill="#9C7B59" textAnchor="middle">Kontynuuj streak</text>

                    {/* Section label */}
                    <text x="18" y="196" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="7" fontWeight="700" fill="#9C7B59" fillOpacity="0.75" letterSpacing="0.16em">DZISIAJ</text>
                    <rect x="18" y="200" width="30" height="2" rx="1" fill="#9C7B59" fillOpacity="0.45"/>

                    {/* Task 1 — done */}
                    <rect x="12" y="208" width="196" height="44" rx="14" fill="rgba(247,241,232,0.04)" stroke="rgba(74,222,128,0.12)" strokeWidth="1"/>
                    <circle cx="35" cy="230" r="13" fill="rgba(74,222,128,0.1)"/>
                    <path d="M29.5 230 L33.5 234.5 L41.5 224" stroke="#4ADE80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <text x="56" y="225" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="9" fontWeight="600" fill="#F7F1E8">Stretching</text>
                    <text x="56" y="238" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill="#F7F1E8" fillOpacity="0.3">15 min · Ukonczone</text>
                    <rect x="162" y="222" width="38" height="16" rx="8" fill="rgba(74,222,128,0.12)"/>
                    <text x="181" y="233" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fontWeight="600" fill="#4ADE80" textAnchor="middle">Gotowe</text>

                    {/* Task 2 */}
                    <rect x="12" y="258" width="196" height="44" rx="14" fill="rgba(247,241,232,0.04)" stroke="rgba(247,241,232,0.06)" strokeWidth="1"/>
                    <circle cx="35" cy="280" r="13" fill="rgba(156,123,89,0.12)" stroke="rgba(156,123,89,0.22)" strokeWidth="1"/>
                    <path d="M30 275.5 L30 284.5 L40 280 Z" fill="#9C7B59" fillOpacity="0.75"/>
                    <text x="56" y="275" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="9" fontWeight="600" fill="#F7F1E8">PowerBody</text>
                    <text x="56" y="288" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill="#F7F1E8" fillOpacity="0.3">15 min · Do zrobienia</text>
                    <rect x="162" y="272" width="38" height="16" rx="8" fill="rgba(156,123,89,0.22)"/>
                    <text x="181" y="283" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fontWeight="600" fill="#9C7B59" textAnchor="middle">Zacznij</text>

                    {/* Task 3 */}
                    <rect x="12" y="308" width="196" height="44" rx="14" fill="rgba(247,241,232,0.04)" stroke="rgba(247,241,232,0.06)" strokeWidth="1"/>
                    <circle cx="35" cy="330" r="13" fill="rgba(156,123,89,0.08)" stroke="rgba(156,123,89,0.18)" strokeWidth="1"/>
                    <rect x="28.5" y="323.5" width="13" height="13" rx="3" stroke="#9C7B59" strokeOpacity="0.45" strokeWidth="1.2" fill="none"/>
                    <rect x="31" y="327" width="8" height="1.8" rx="0.9" fill="#9C7B59" fillOpacity="0.4"/>
                    <rect x="31" y="330.5" width="6" height="1.8" rx="0.9" fill="#9C7B59" fillOpacity="0.4"/>
                    <rect x="31" y="334" width="7" height="1.8" rx="0.9" fill="#9C7B59" fillOpacity="0.4"/>
                    <text x="56" y="325" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="9" fontWeight="600" fill="#F7F1E8">Plan zywienia</text>
                    <text x="56" y="338" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill="#F7F1E8" fillOpacity="0.3">Suplementacja · Planowane</text>

                    {/* Task 4 */}
                    <rect x="12" y="358" width="196" height="44" rx="14" fill="rgba(247,241,232,0.04)" stroke="rgba(247,241,232,0.06)" strokeWidth="1"/>
                    <circle cx="35" cy="380" r="13" fill="rgba(156,123,89,0.08)" stroke="rgba(156,123,89,0.18)" strokeWidth="1"/>
                    <path d="M35 369 C29.5 369 27 373 27 377 C27 381.5 30 384 33.5 385 L33.5 387 L36.5 387 L36.5 385 C40 384 43 381.5 43 377 C43 373 40.5 369 35 369Z" stroke="#9C7B59" strokeOpacity="0.42" strokeWidth="1.2" fill="none"/>
                    <circle cx="35" cy="376.5" r="2.2" fill="#9C7B59" fillOpacity="0.38"/>
                    <text x="56" y="375" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="9" fontWeight="600" fill="#F7F1E8">Mentalne</text>
                    <text x="56" y="388" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill="#F7F1E8" fillOpacity="0.3">Prowadzenie tematyczne</text>

                    {/* Bottom nav */}
                    <rect x="12" y="414" width="196" height="46" rx="16" fill="rgba(247,241,232,0.055)" stroke="rgba(247,241,232,0.08)" strokeWidth="1"/>
                    <rect x="20" y="420" width="40" height="34" rx="12" fill="rgba(156,123,89,0.2)"/>
                    <path d="M35 449 L35 443 L40 438 L45 443 L45 449" stroke="#9C7B59" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="rgba(156,123,89,0.18)"/>
                    <rect x="38" y="444" width="4" height="5" rx="1.5" fill="#9C7B59" fillOpacity="0.55"/>
                    <circle cx="96" cy="437" r="7" stroke="#F7F1E8" strokeOpacity="0.18" strokeWidth="1.4" fill="none"/>
                    <path d="M96 433 L96 441 M92 437 L100 437" stroke="#F7F1E8" strokeOpacity="0.18" strokeWidth="1.4" strokeLinecap="round"/>
                    <rect x="130" y="433" width="15" height="3.5" rx="1.75" fill="#F7F1E8" fillOpacity="0.13"/>
                    <rect x="130" y="439" width="11" height="3.5" rx="1.75" fill="#F7F1E8" fillOpacity="0.13"/>
                    <rect x="130" y="445" width="13" height="3.5" rx="1.75" fill="#F7F1E8" fillOpacity="0.13"/>
                    <circle cx="184" cy="437" r="7" stroke="#F7F1E8" strokeOpacity="0.18" strokeWidth="1.4" fill="none"/>
                    <circle cx="184" cy="435" r="2.5" fill="#F7F1E8" fillOpacity="0.18"/>

                    {/* Home indicator */}
                    <rect x="84" y="470" width="52" height="4" rx="2" fill="#F7F1E8" fillOpacity="0.1"/>
                  </svg>
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