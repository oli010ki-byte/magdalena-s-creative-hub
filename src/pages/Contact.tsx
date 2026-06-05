import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Facebook, Instagram, Linkedin, Youtube, ExternalLink, MessageCircle } from "lucide-react"; // eslint-disable-line
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

const socialLinks = [
  { name: "Email",     icon: Mail,         url: "mailto:formafkkf@gmail.com",                                        label: "formafkkf@gmail.com" },
  { name: "WhatsApp",  icon: MessageCircle, url: "https://api.whatsapp.com/send?phone=48785669901",                  label: "+48 785 669 901" },
  { name: "Facebook",  icon: Facebook,      url: "https://www.facebook.com/magdalena.zajacpyrzewska",                label: "magdalena.zajacpyrzewska" },
  { name: "Instagram", icon: Instagram,     url: "https://www.instagram.com/magdalena.zajac.mentor",                 label: "@magdalena.zajac.mentor" },
  { name: "LinkedIn",  icon: Linkedin,      url: "https://www.linkedin.com/in/magda-zaj%C4%85c-pyrzewska-a131b3209",label: "Magda Zając-Pyrzewska" },
  { name: "YouTube",   icon: Youtube,       url: "https://youtube.com/@magdalenazajac-pyrzewska3137",                label: "Magdalena Zając" },
  { name: "TikTok",    icon: ExternalLink,  url: "https://www.tiktok.com/@magdalenazajac_mentor",                   label: "@magdalenazajac_mentor" },
];

const Contact = () => {
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
              Skontaktuj się
            </motion.span>

            <div className="overflow-hidden">
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
                Kontakt
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              className="mt-6 text-base max-w-md"
              style={{ color: C.body }}
            >
              Masz pytania? Chcesz umówić się na konsultację? Skontaktuj się ze mną.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Profile Card */}
      <section style={{ backgroundColor: C.cream }} className="py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <FadeUp>
            <div
              className="rounded-[2rem] p-1.5 mb-10"
              style={{ backgroundColor: `${C.parchment}`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)`, border: `1px solid ${C.espresso}0d` }}
            >
              <div
                className="rounded-[calc(2rem-6px)] p-8 md:p-10"
                style={{ backgroundColor: C.cream }}
              >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  <div
                    className="w-28 h-28 md:w-36 md:h-36 rounded-[1.2rem] overflow-hidden flex-shrink-0"
                    style={{ backgroundColor: C.parchment }}
                  >
                    <img
                      src={magdaPhoto}
                      alt="Magdalena Zając"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h2
                      className="font-serif font-semibold tracking-[-0.01em] mb-1"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: C.espresso }}
                    >
                      Magdalena Zając
                    </h2>
                    <p className="text-sm font-medium mb-4" style={{ color: C.gold }}>
                      Mentor holistyczny i biznesowy
                    </p>
                    <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: C.body }}>
                      Mentor ciała i umysłu: ustalamy strategię pod Twój cel.
                      23-letnie doświadczenie w pracy z klientami.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <a
                        href="mailto:formafkkf@gmail.com"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: C.espresso,
                          color: "#F2E9DC",
                          transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
                      >
                        <Mail className="w-3.5 h-3.5" strokeWidth={2} />
                        Napisz email
                      </a>
                      <a
                        href="https://api.whatsapp.com/send?phone=48785669901"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border"
                        style={{
                          borderColor: `${C.espresso}22`,
                          color: C.espresso,
                          transition: `border-color 160ms cubic-bezier(${EASE.join(",")})`,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.espresso}44`)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.espresso}22`)}
                      >
                        <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Me2Me promo */}
          <FadeUp delay={0.1}>
            <div
              className="rounded-[1.6rem] p-8 md:p-10 mb-10 flex flex-col md:flex-row items-center gap-6"
              style={{ backgroundColor: `${C.gold}10`, border: `1px solid ${C.gold}28` }}
            >
              <div className="flex-1 text-center md:text-left">
                <h3
                  className="font-serif font-semibold mb-2"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", color: C.espresso }}
                >
                  Aplikacja Me2Me
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.body }}>
                  21–31 dni holistycznego kształtowania nawyków. Dostęp do aplikacji
                  można zakupić kontaktując się bezpośrednio ze mną.
                </p>
              </div>
              <a
                href="https://www.me2me.pl/login"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold flex-shrink-0"
                style={{
                  backgroundColor: C.espresso,
                  color: "#F2E9DC",
                  transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
              >
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
                Otwórz Me2Me
              </a>
            </div>
          </FadeUp>

          {/* Social Links */}
          <FadeUp delay={0.15}>
            <h3
              className="font-serif font-semibold mb-6"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: C.espresso }}
            >
              Znajdź mnie w sieci
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                  className="flex items-center gap-4 p-4 rounded-2xl group"
                  style={{
                    backgroundColor: C.cream,
                    border: `1px solid ${C.espresso}0d`,
                    transition: `border-color 200ms ease, background-color 200ms ease`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${C.gold}44`;
                    e.currentTarget.style.backgroundColor = `${C.gold}07`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${C.espresso}0d`;
                    e.currentTarget.style.backgroundColor = C.cream;
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${C.gold}14` }}
                  >
                    <link.icon className="w-5 h-5" style={{ color: C.gold }} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: C.espresso }}>{link.name}</p>
                    <p className="text-xs truncate" style={{ color: C.body }}>{link.label}</p>
                  </div>
                  <ExternalLink
                    className="w-4 h-4 flex-shrink-0 transition-opacity"
                    style={{ color: C.body, opacity: 0 }}
                    strokeWidth={1.5}
                  />
                </motion.a>
              ))}
            </div>
          </FadeUp>

          {/* Linktree */}
          <FadeUp delay={0.2} className="mt-10 text-center">
            <p className="text-sm mb-4" style={{ color: C.body }}>Wszystkie linki w jednym miejscu</p>
            <a
              href="https://linktr.ee/magdapassionforever"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold border"
              style={{
                borderColor: `${C.espresso}22`,
                color: C.espresso,
                transition: `border-color 160ms ease`,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.espresso}44`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.espresso}22`)}
            >
              <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              Otwórz Linktree
            </a>
          </FadeUp>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;