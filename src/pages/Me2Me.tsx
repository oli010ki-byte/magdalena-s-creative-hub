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
                    {/* Screen background */}
                    <rect width="200" height="430" fill={C.cream}/>
                    {/* Pill notch */}
                    <rect x="70" y="12" width="60" height="8" rx="4" fill={C.parchment}/>
                    {/* App header */}
                    <rect x="20" y="40" width="72" height="7" rx="3.5" fill={C.espresso} opacity="0.75"/>
                    <rect x="20" y="55" width="46" height="5" rx="2.5" fill={C.gold} opacity="0.65"/>
                    {/* Progress ring placeholder */}
                    <circle cx="162" cy="50" r="20" stroke={C.parchment} strokeWidth="3.5" fill="none"/>
                    <circle cx="162" cy="50" r="20" stroke={C.gold} strokeWidth="3.5" strokeDasharray="80 46" strokeDashoffset="20" strokeLinecap="round" fill="none"/>
                    <rect x="154" y="45" width="16" height="9" rx="4.5" fill={C.espresso} opacity="0.45"/>
                    {/* Day progress track */}
                    <rect x="20" y="86" width="160" height="6" rx="3" fill={C.parchment}/>
                    <rect x="20" y="86" width="112" height="6" rx="3" fill={C.gold} opacity="0.5"/>
                    <rect x="20" y="99" width="38" height="4" rx="2" fill={C.espresso} opacity="0.18"/>
                    <rect x="152" y="99" width="28" height="4" rx="2" fill={C.espresso} opacity="0.18"/>
                    {/* Card 1 */}
                    <rect x="16" y="116" width="168" height="66" rx="14" fill={C.ivory}/>
                    <rect x="30" y="130" width="56" height="5" rx="2.5" fill={C.espresso} opacity="0.6"/>
                    <rect x="30" y="142" width="96" height="5" rx="2.5" fill={C.espresso} opacity="0.24"/>
                    <rect x="30" y="153" width="72" height="5" rx="2.5" fill={C.espresso} opacity="0.17"/>
                    <circle cx="160" cy="143" r="13" fill={`${C.gold}22`}/>
                    <rect x="154" y="138" width="12" height="10" rx="5" fill={C.gold} opacity="0.5"/>
                    {/* List item 1 */}
                    <rect x="16" y="194" width="168" height="48" rx="12" fill={C.ivory}/>
                    <circle cx="38" cy="218" r="11" fill={`${C.gold}22`}/>
                    <rect x="58" y="212" width="78" height="5" rx="2.5" fill={C.espresso} opacity="0.55"/>
                    <rect x="58" y="223" width="54" height="4" rx="2" fill={C.espresso} opacity="0.22"/>
                    <rect x="155" y="213" width="20" height="10" rx="5" fill={`${C.gold}30`}/>
                    {/* List item 2 */}
                    <rect x="16" y="248" width="168" height="48" rx="12" fill={C.ivory}/>
                    <circle cx="38" cy="272" r="11" fill={`${C.gold}22`}/>
                    <rect x="58" y="266" width="66" height="5" rx="2.5" fill={C.espresso} opacity="0.55"/>
                    <rect x="58" y="277" width="44" height="4" rx="2" fill={C.espresso} opacity="0.22"/>
                    <rect x="155" y="267" width="20" height="10" rx="5" fill={`${C.gold}30`}/>
                    {/* List item 3 */}
                    <rect x="16" y="302" width="168" height="48" rx="12" fill={C.ivory}/>
                    <circle cx="38" cy="326" r="11" fill={`${C.gold}22`}/>
                    <rect x="58" y="320" width="82" height="5" rx="2.5" fill={C.espresso} opacity="0.55"/>
                    <rect x="58" y="331" width="58" height="4" rx="2" fill={C.espresso} opacity="0.22"/>
                    <rect x="155" y="321" width="20" height="10" rx="5" fill={`${C.gold}30`}/>
                    {/* Bottom nav bar */}
                    <rect x="16" y="362" width="168" height="42" rx="14" fill={C.parchment}/>
                    <circle cx="54" cy="383" r="8" fill={C.gold} opacity="0.3"/>
                    <rect x="95" y="377" width="10" height="12" rx="3" fill={C.espresso} opacity="0.2"/>
                    <circle cx="146" cy="383" r="8" fill={C.espresso} opacity="0.08"/>
                    {/* Home indicator */}
                    <rect x="74" y="418" width="52" height="4" rx="2" fill={C.espresso} opacity="0.14"/>
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