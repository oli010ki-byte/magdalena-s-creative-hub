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
                className="w-52 rounded-[2.8rem] p-1.5"
                style={{
                  backgroundColor: `${C.gold}18`,
                  border: `1px solid ${C.espresso}0d`,
                  boxShadow: `0 32px 64px -16px rgba(28,22,16,0.14)`,
                }}
              >
                <div
                  className="aspect-[9/19] rounded-[calc(2.8rem-6px)] overflow-hidden"
                  style={{ backgroundColor: C.cream }}
                >
                  <svg viewBox="0 0 200 430" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Background */}
                    <rect width="200" height="430" fill={C.cream}/>

                    {/* Status bar */}
                    <text x="16" y="21" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="7" fontWeight="600" fill={C.espresso} fillOpacity="0.38">9:41</text>
                    <rect x="150" y="13" width="21" height="8" rx="2.5" stroke={C.espresso} strokeOpacity="0.18" strokeWidth="1" fill="none"/>
                    <rect x="152" y="15" width="13" height="4" rx="1.5" fill={C.espresso} fillOpacity="0.18"/>
                    <rect x="171" y="15" width="2" height="4" rx="1" fill={C.espresso} fillOpacity="0.18"/>
                    <rect x="177" y="14" width="8" height="6" rx="2" stroke={C.espresso} strokeOpacity="0.18" strokeWidth="0.8" fill="none"/>
                    <rect x="178" y="15.5" width="5" height="3" rx="1" fill={C.espresso} fillOpacity="0.18"/>
                    <rect x="185" y="14" width="1.5" height="6" rx="0.75" fill={C.espresso} fillOpacity="0.18"/>

                    {/* Pill notch */}
                    <rect x="68" y="7" width="64" height="9" rx="4.5" fill={C.parchment}/>

                    {/* Header */}
                    <text x="16" y="51" fontFamily="'Playfair Display',serif" fontSize="18" fontWeight="700" fill={C.espresso} letterSpacing="-0.5">Me2Me</text>
                    <circle cx="178" cy="44" r="13" fill={`${C.gold}22`}/>
                    <text x="172" y="48" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="7" fontWeight="700" fill={C.gold}>MZ</text>

                    {/* Progress hero card */}
                    <rect x="12" y="61" width="176" height="90" rx="16" fill={C.parchment}/>
                    <circle cx="52" cy="106" r="25" stroke={`${C.espresso}12`} strokeWidth="4.5" fill="none"/>
                    <circle cx="52" cy="106" r="25" stroke={C.gold} strokeWidth="4.5" strokeDasharray="105 52" strokeDashoffset="26" strokeLinecap="round" fill="none"/>
                    <text x="52" y="103" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="13" fontWeight="700" fill={C.espresso} textAnchor="middle">14</text>
                    <text x="52" y="116" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="5.5" fontWeight="500" fill={C.espresso} fillOpacity="0.42" textAnchor="middle">z 21 dni</text>
                    <text x="90" y="80" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6" fontWeight="700" fill={C.gold} letterSpacing="0.12em">DZIEN PROGRAMU</text>
                    <text x="90" y="97" fontFamily="'Playfair Display',serif" fontSize="13" fontWeight="700" fill={C.espresso}>Aktywny tydzien</text>
                    <text x="90" y="111" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill={C.espresso} fillOpacity="0.42">Seria: 7 dni z rzedu</text>
                    <rect x="90" y="118" width="56" height="14" rx="7" fill={`${C.gold}1C`}/>
                    <text x="118" y="128" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6" fontWeight="600" fill={C.gold} textAnchor="middle">Kontynuuj streak</text>

                    {/* Section label */}
                    <text x="16" y="167" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="7" fontWeight="700" fill={C.espresso} fillOpacity="0.6" letterSpacing="0.1em">DZISIAJ</text>
                    <rect x="16" y="172" width="26" height="2" rx="1" fill={C.gold} fillOpacity="0.55"/>

                    {/* Task 1 — done */}
                    <rect x="12" y="179" width="176" height="42" rx="12" fill={C.ivory}/>
                    <circle cx="33" cy="200" r="12" fill={`${C.gold}22`}/>
                    <path d="M27.5 200 L31.5 204 L39.5 194" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <text x="52" y="195" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8.5" fontWeight="600" fill={C.espresso}>Stretching</text>
                    <text x="52" y="208" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill={C.espresso} fillOpacity="0.38">15 min · Ukonczone</text>
                    <rect x="151" y="193" width="26" height="14" rx="7" fill="#22C55E1A"/>
                    <text x="164" y="203" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8" fontWeight="700" fill="#22C55E" textAnchor="middle">✓</text>

                    {/* Task 2 */}
                    <rect x="12" y="226" width="176" height="42" rx="12" fill={C.ivory}/>
                    <circle cx="33" cy="247" r="12" stroke={`${C.gold}45`} strokeWidth="1.5" fill={`${C.gold}0D`}/>
                    <path d="M30 243 L30 251 M27 247 L36 243 L36 251 Z" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <text x="52" y="242" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8.5" fontWeight="600" fill={C.espresso}>PowerBody</text>
                    <text x="52" y="255" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill={C.espresso} fillOpacity="0.38">15 min · Do zrobienia</text>
                    <rect x="147" y="240" width="32" height="14" rx="7" fill={`${C.gold}20`}/>
                    <text x="163" y="250" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fontWeight="600" fill={C.gold} textAnchor="middle">Zacznij</text>

                    {/* Task 3 */}
                    <rect x="12" y="273" width="176" height="42" rx="12" fill={C.ivory}/>
                    <circle cx="33" cy="294" r="12" stroke={`${C.gold}45`} strokeWidth="1.5" fill={`${C.gold}0D`}/>
                    <rect x="26" y="289" width="14" height="10" rx="2.5" stroke={C.espresso} strokeOpacity="0.28" strokeWidth="1.2" fill="none"/>
                    <rect x="28" y="292" width="10" height="1.5" rx="0.75" fill={C.espresso} fillOpacity="0.28"/>
                    <rect x="28" y="295" width="7" height="1.5" rx="0.75" fill={C.espresso} fillOpacity="0.28"/>
                    <text x="52" y="289" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8.5" fontWeight="600" fill={C.espresso}>Plan zywienia</text>
                    <text x="52" y="302" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill={C.espresso} fillOpacity="0.38">Suplementacja · Do zrobienia</text>

                    {/* Task 4 */}
                    <rect x="12" y="320" width="176" height="42" rx="12" fill={C.ivory}/>
                    <circle cx="33" cy="341" r="12" stroke={`${C.gold}45`} strokeWidth="1.5" fill={`${C.gold}0D`}/>
                    <path d="M33 331 C27 331 25 336 25 340 C25 345 29 348 33 348 C37 348 41 345 41 340 C41 336 39 331 33 331 Z" stroke={C.espresso} strokeOpacity="0.25" strokeWidth="1.2" fill="none"/>
                    <circle cx="33" cy="338" r="2.5" fill={C.espresso} fillOpacity="0.25"/>
                    <text x="52" y="336" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="8.5" fontWeight="600" fill={C.espresso}>Mentalne</text>
                    <text x="52" y="349" fontFamily="'Plus Jakarta Sans',sans-serif" fontSize="6.5" fill={C.espresso} fillOpacity="0.38">Prowadzenie tematyczne</text>

                    {/* Bottom nav */}
                    <rect x="12" y="369" width="176" height="46" rx="14" fill={C.parchment}/>
                    <rect x="20" y="374" width="36" height="36" rx="10" fill={`${C.gold}20`}/>
                    <path d="M33 399 L33 392 L38 387 L43 392 L43 399 Z" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill={`${C.gold}28`}/>
                    <rect x="35" y="393" width="6" height="6" rx="1.5" fill={C.gold} fillOpacity="0.5"/>
                    <path d="M82 387 L82 405 M78 393 L86 393" stroke={C.espresso} strokeOpacity="0.18" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="120" cy="392" r="7" stroke={C.espresso} strokeOpacity="0.18" strokeWidth="1.5" fill="none"/>
                    <path d="M120 388 L120 396 M116 392 L124 392" stroke={C.espresso} strokeOpacity="0.18" strokeWidth="1.5" strokeLinecap="round"/>
                    <rect x="151" y="385" width="14" height="3.5" rx="1.75" fill={C.espresso} fillOpacity="0.15"/>
                    <rect x="151" y="391" width="10" height="3.5" rx="1.75" fill={C.espresso} fillOpacity="0.15"/>
                    <rect x="151" y="397" width="12" height="3.5" rx="1.75" fill={C.espresso} fillOpacity="0.15"/>

                    {/* Home indicator */}
                    <rect x="74" y="420" width="52" height="4" rx="2" fill={C.espresso} fillOpacity="0.12"/>
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