import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Heart, Target, Zap, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import me2meMobile from "@/assets/me2me/me2me-mobile.png";

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
                  <img
                    src={me2meMobile}
                    alt="Me2Me app"
                    className="w-full h-full"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
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