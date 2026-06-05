import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, Calendar, MessageCircle, Mail, CheckCircle, Clock, Heart, Video, MapPin, X, Instagram } from "lucide-react"; // eslint-disable-line
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import consultationCover from "@/assets/consultation-cover.png";

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

const consultationBenefits = [
  "Indywidualne podejście do Twoich potrzeb",
  "Strategia dopasowana do Twojego celu",
  "Wsparcie mentora z 23-letnim doświadczeniem",
  "Holistyczne spojrzenie na ciało i umysł",
  "Konkretne, wdrażalne kroki do działania",
  "Możliwość kontynuacji współpracy",
];

const onlinePros = [
  "Wygoda — spotkanie z dowolnego miejsca",
  "Oszczędność czasu na dojazd",
  "Elastyczność terminów",
  "Nagranie spotkania do odsłuchania",
];
const onlineCons = ["Brak bezpośredniego kontaktu", "Wymaga stabilnego internetu"];

const livePros = [
  "Bezpośredni kontakt i energia",
  "Pełniejsza diagnostyka ciała",
  "Możliwość ćwiczeń na miejscu",
  "Głębsze połączenie mentorskie",
];
const liveCons = ["Konieczność dojazdu", "Mniej elastyczne terminy"];

const steps = [
  { icon: MessageCircle, title: "Skontaktuj się",    description: "Napisz do mnie przez WhatsApp, email lub social media. Opowiedz krótko o sobie i swoich celach." },
  { icon: Calendar,      title: "Umów termin",       description: "Wspólnie ustalimy dogodny termin konsultacji — online lub stacjonarnie." },
  { icon: Heart,         title: "Spotkanie 1:1",     description: "Podczas konsultacji skupimy się na Twoich potrzebach i wypracujemy plan działania." },
];

const contactLinks = [
  { icon: MessageCircle, label: "WhatsApp: +48 785 669 901",            href: "https://api.whatsapp.com/send?phone=48785669901", target: "_blank" },
  { icon: Mail,          label: "magda@me2me.pl",                       href: "mailto:magda@me2me.pl" },
  { icon: Instagram,     label: "Magdalena Zając Mentor holistyczny",   href: "https://www.instagram.com/magdalena.zajac.mentor", target: "_blank" },
];

const ConsultationOption = ({
  title, icon: Icon, pros, cons, delay = 0,
}: { title: string; icon: React.ElementType; pros: string[]; cons: string[]; delay?: number }) => (
  <FadeUp delay={delay}>
    <div
      className="rounded-[1.6rem] p-8 h-full"
      style={{ backgroundColor: C.cream, border: `1px solid ${C.espresso}0d` }}
    >
      <div className="flex items-center gap-3 mb-7">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${C.gold}18` }}>
          <Icon className="w-5 h-5" style={{ color: C.gold }} strokeWidth={1.5} />
        </div>
        <h3 className="font-serif font-semibold text-xl" style={{ color: C.espresso }}>{title}</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div className="rounded-xl p-4" style={{ backgroundColor: `${C.gold}0a` }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5" style={{ color: "#4a7c59" }}>
            <CheckCircle className="w-3.5 h-3.5" strokeWidth={2} /> Plusy
          </p>
          <ul className="space-y-1.5">
            {pros.map(p => (
              <li key={p} className="text-sm flex items-start gap-2" style={{ color: C.body }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "#6aaa7e" }} />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: `rgba(200,60,60,0.04)` }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-3 flex items-center gap-1.5" style={{ color: "#9a4040" }}>
            <X className="w-3.5 h-3.5" strokeWidth={2} /> Minusy
          </p>
          <ul className="space-y-1.5">
            {cons.map(c => (
              <li key={c} className="text-sm flex items-start gap-2" style={{ color: C.body }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "rgba(180,60,60,0.5)" }} />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${C.espresso}0d` }} className="pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: C.body }}>Kontakt</p>
        <div className="space-y-2">
          {contactLinks.map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.target}
              rel="noreferrer"
              className="flex items-center gap-2 text-sm"
              style={{ color: C.body, transition: `color 150ms ease` }}
              onMouseEnter={e => (e.currentTarget.style.color = C.espresso)}
              onMouseLeave={e => (e.currentTarget.style.color = C.body)}
            >
              <l.icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: C.gold }} strokeWidth={1.5} />
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </FadeUp>
);

const Consultation = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <Layout>
      {/* Hero */}
      <section style={{ backgroundColor: C.ivory }} className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-10"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm mb-10"
              style={{ color: C.body, transition: "color 150ms ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = C.espresso)}
              onMouseLeave={e => (e.currentTarget.style.color = C.body)}
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Powrót do sklepu
            </Link>

            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full w-fit mb-8"
              style={{ backgroundColor: `${C.gold}18`, color: C.gold }}
            >
              <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
              Indywidualne wsparcie
            </motion.span>

            <div>
              <motion.h1
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                  show:   { clipPath: "inset(0 0 -40% 0)", opacity: 1, transition: { duration: 0.95, ease: EASE } },
                }}
                initial="hidden"
                animate={heroInView ? "show" : "hidden"}
                className="font-serif font-bold tracking-[-0.02em] leading-[1.05]"
                style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)", color: C.espresso }}
              >
                Konsultacja 1:1
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
              className="mt-3 text-xl font-medium"
              style={{ color: C.gold }}
            >
              od 160 zł
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.48, ease: EASE }}
              className="mt-2 text-base max-w-xl"
              style={{ color: C.body }}
            >
              Indywidualny mentoring — strategia dopasowana do Twoich potrzeb
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Photo + mentor info */}
            <div className="space-y-6">
              <FadeUp delay={0.2}>
                <div
                  className="rounded-[2rem] p-1.5 max-w-sm"
                  style={{ backgroundColor: `${C.gold}14`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5)` }}
                >
                  <div className="aspect-[4/5] rounded-[calc(2rem-6px)] overflow-hidden" style={{ backgroundColor: C.parchment }}>
                    <img src={consultationCover} alt="Magdalena Zając" className="w-full h-full object-cover" />
                  </div>
                </div>
              </FadeUp>
              <FadeUp delay={0.28}>
                <div
                  className="rounded-[1.6rem] p-7 max-w-sm"
                  style={{ backgroundColor: C.cream, border: `1px solid ${C.espresso}0d` }}
                >
                  <h3 className="font-serif font-semibold text-xl mb-1" style={{ color: C.espresso }}>Magdalena Zając</h3>
                  <p className="text-sm font-medium mb-4" style={{ color: C.gold }}>Mentor holistyczny i biznesowy</p>
                  <ul className="space-y-2">
                    {["23 lata doświadczenia pracy z człowiekiem", "Twórczyni aplikacji Me2Me", "Mentor w nurcie TSR"].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm" style={{ color: C.body }}>
                        <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.gold }} strokeWidth={1.5} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            </div>

            {/* Steps */}
            <FadeUp delay={0.25}>
              <div
                className="rounded-[1.6rem] p-8 h-fit"
                style={{ backgroundColor: `${C.gold}0c`, border: `1px solid ${C.gold}28` }}
              >
                <h2 className="font-serif font-semibold text-2xl mb-8" style={{ color: C.espresso }}>
                  Jak umówić się na konsultację?
                </h2>
                <div className="space-y-7">
                  {steps.map((step, i) => (
                    <div key={step.title} className="flex gap-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: C.cream, border: `1px solid ${C.espresso}0d` }}
                      >
                        <step.icon className="w-5 h-5" style={{ color: C.gold }} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-0.5" style={{ color: C.gold }}>
                          Krok {i + 1}
                        </p>
                        <h4 className="font-medium text-sm mb-1" style={{ color: C.espresso }}>{step.title}</h4>
                        <p className="text-sm leading-relaxed" style={{ color: C.body }}>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Online vs Live */}
      <section style={{ backgroundColor: C.cream }} className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <FadeUp className="mb-12">
            <h2
              className="font-serif font-bold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: C.espresso }}
            >
              Formy konsultacji
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-6">
            <ConsultationOption title="Konsultacja Online"  icon={Video}  pros={onlinePros} cons={onlineCons} delay={0} />
            <ConsultationOption title="Konsultacja na żywo" icon={MapPin} pros={livePros}   cons={liveCons}   delay={0.1} />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ backgroundColor: C.ivory }} className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <FadeUp>
            <div
              className="rounded-[2rem] p-1.5"
              style={{ backgroundColor: C.parchment, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)` }}
            >
              <div className="rounded-[calc(2rem-6px)] p-8 md:p-10" style={{ backgroundColor: C.cream }}>
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-5 h-5" style={{ color: C.gold }} strokeWidth={1.5} />
                  <h2 className="font-serif font-semibold text-2xl" style={{ color: C.espresso }}>
                    Co zyskasz podczas konsultacji?
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {consultationBenefits.map((b, i) => (
                    <motion.div
                      key={b}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, ease: EASE }}
                      className="flex items-start gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: `${C.gold}09` }}
                    >
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: C.gold }} strokeWidth={1.5} />
                      <span className="text-sm" style={{ color: C.espresso }}>{b}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="mt-12 text-center">
            <p className="text-sm mb-6" style={{ color: C.body }}>Masz pytania? Nie wahaj się napisać.</p>
            <a
              href="https://api.whatsapp.com/send?phone=48785669901"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
              style={{
                backgroundColor: C.espresso,
                color: "#F2E9DC",
                transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2} />
              Napisz na WhatsApp
            </a>
          </FadeUp>
        </div>
      </section>
    </Layout>
  );
};

export default Consultation;