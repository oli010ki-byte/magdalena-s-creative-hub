import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import magdaPhoto from "@/assets/magda-photo.jpg";

const EASE = [0.23, 1, 0.32, 1] as const;

const C = {
  ivory:    "#F7F1E8",
  cream:    "#FDFAF5",
  parchment:"#EDE6DA",
  espresso: "#1C1610",
  body:     "rgba(28,22,16,0.62)",
  gold:     "#9C7B59",
  goldHov:  "#B08B68",
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

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <Layout>
      {/* Hero */}
      <section style={{ backgroundColor: C.ivory }} className="pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div ref={heroRef} className="mb-14">
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-8"
              style={{ backgroundColor: `${C.gold}18`, color: C.gold }}
            >
              Poznaj mnie
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
                style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", color: C.espresso }}
              >
                O mnie
              </motion.h1>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            {/* Photo */}
            <FadeUp delay={0.15}>
              <div
                className="rounded-[2rem] p-1.5"
                style={{ backgroundColor: `${C.gold}14`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.5)` }}
              >
                <div
                  className="aspect-[4/5] rounded-[calc(2rem-6px)] overflow-hidden"
                  style={{ backgroundColor: C.parchment }}
                >
                  <img
                    src={magdaPhoto}
                    alt="Magdalena Zając"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </FadeUp>

            {/* Content */}
            <div className="space-y-7 lg:pt-4">
              <FadeUp delay={0.2}>
                <h2
                  className="font-serif font-semibold leading-tight tracking-[-0.015em]"
                  style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", color: C.espresso }}
                >
                  Magdalena Zając
                </h2>
                <p className="text-base font-medium mt-1" style={{ color: C.gold }}>
                  Mentor holistyczny i biznesowy
                </p>
              </FadeUp>

              <FadeUp delay={0.28}>
                <div className="space-y-4 leading-relaxed" style={{ color: C.body }}>
                  <p>
                    Od dziecka towarzyszyła mi wysoka energia, miłość do pasji, sportu, ludzi,
                    podróży i dotykania świata tam — gdzie czuję sercem.
                  </p>
                  <p>
                    Zawsze kiełkowały we mnie poszukiwania. Poszukiwania dobrych relacji i pytanie:
                    „jak?" — jak rozumieć, jak budować, jak działać, by móc żyć w zgodzie ze sobą
                    i tworzyć to, co czuję intuicją i sercem.
                  </p>
                  <p className="font-medium" style={{ color: C.espresso }}>
                    Mentor holistyczny i biznesowy, konsultant edukacyjny, trener, towarzysz —
                    to moja pasja, która stała się zawodem.
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Extended bio */}
      <section style={{ backgroundColor: C.cream }} className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="max-w-[72ch] space-y-6 leading-relaxed" style={{ color: C.body }}>
            <FadeUp>
              <p>
                Bazuję na nurcie TSR, przez co w swojej pracy koncentruję się na rozwiązaniach,
                możliwościach i tym, co już działa — zamiast analizować trudności. Stawiam na małe,
                codzienne, możliwe na już do wdrożenia kroki, które prowadzą do realnych i trwałych efektów.
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <p>
                Łączę psychologię, ekonomię, świadomy ruch, żywienie funkcjonalne i suplementację —
                by tworzyć procesy i narzędzia dające długofalową efektywność, stabilność i rozwój
                w zgodzie z własnym potencjałem.
              </p>
            </FadeUp>
            <FadeUp delay={0.12}>
              <p className="font-medium" style={{ color: C.espresso }}>
                Jestem Twórczynią aplikacji Me2Me — systemu wspierającego codzienny rytm ciała,
                emocji, umysłu, a przede wszystkim skuteczności w działaniu.
              </p>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p>
                W pracy kieruję się prostotą, wdrażalnością i efektem, który można poczuć w codzienności.
                Moje podejście jest wspierające i ukierunkowane na realną zmianę — krok po kroku,
                bez presji, w rytmie, który wzmacnia.
              </p>
            </FadeUp>
            <FadeUp delay={0.20}>
              <p>
                We wszystkim co robię kieruję się strategią win-win, wiedząc, że tylko wtedy,
                gdy dwie strony odczuwają swoje zasoby, powstają długofalowe, dobre, pożądane efekty
                i nietuzinkowe projekty.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: C.ivory }} className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <FadeUp>
            <div
              className="rounded-[2rem] p-10 lg:p-14 text-center"
              style={{ backgroundColor: C.parchment, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)` }}
            >
              <h3
                className="font-serif font-semibold mb-3"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: C.espresso }}
              >
                Zapraszam
              </h3>
              <p className="text-base mb-1" style={{ color: C.body }}>Magda</p>
              <p className="text-sm font-medium mb-10" style={{ color: C.gold }}>
                Mentor holistyczny i biznesowy
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/products/consultation"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: C.espresso,
                    color: "#F2E9DC",
                    transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
                >
                  <Calendar className="w-4 h-4" strokeWidth={2} />
                  Umów konsultację 1:1
                </Link>
                <a
                  href="https://api.whatsapp.com/send?phone=48785669901"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border"
                  style={{
                    borderColor: `${C.espresso}22`,
                    color: C.espresso,
                    transition: `border-color 160ms cubic-bezier(${EASE.join(",")})`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.espresso}44`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.espresso}22`)}
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2} />
                  Napisz na WhatsApp
                </a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </Layout>
  );
};

export default About;