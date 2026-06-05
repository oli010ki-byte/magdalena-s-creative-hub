import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Layout from "@/components/Layout";

const EASE = [0.23, 1, 0.32, 1] as const;

const C = {
  ivory:    "#F7F1E8",
  cream:    "#FDFAF5",
  parchment:"#EDE6DA",
  espresso: "#1C1610",
  body:     "rgba(28,22,16,0.72)",
  gold:     "#9C7B59",
} as const;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2
      className="font-serif font-semibold mb-4"
      style={{ fontSize: "1.25rem", color: C.espresso, letterSpacing: "-0.01em" }}
    >
      {title}
    </h2>
    <div className="space-y-3 text-sm leading-relaxed" style={{ color: C.body }}>
      {children}
    </div>
  </div>
);

const PrivacyPolicy = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <Layout>
      {/* Hero */}
      <section style={{ backgroundColor: C.ivory }} className="pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="max-w-[860px] mx-auto px-6 lg:px-12">
          <div ref={heroRef}>
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASE }}
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-8"
              style={{ backgroundColor: `${C.gold}18`, color: C.gold }}
            >
              Dokument prawny
            </motion.span>

            <div>
              <motion.h1
                variants={{
                  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                  show:   { clipPath: "inset(0 0 -40% 0)", opacity: 1, transition: { duration: 0.9, ease: EASE } },
                }}
                initial="hidden"
                animate={heroInView ? "show" : "hidden"}
                className="font-serif font-bold tracking-[-0.02em] leading-[1.05]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: C.espresso }}
              >
                Polityka prywatności
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              className="mt-5 text-sm"
              style={{ color: C.body }}
            >
              Ostatnia aktualizacja: czerwiec 2025
            </motion.p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ backgroundColor: C.cream }} className="py-16 lg:py-20">
        <div className="max-w-[860px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="rounded-[2rem] p-1.5"
            style={{ backgroundColor: C.parchment, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)` }}
          >
            <div
              className="rounded-[calc(2rem-6px)] p-8 md:p-12"
              style={{ backgroundColor: C.cream }}
            >

              <Section title="1. Administrator danych osobowych">
                <p>
                  Administratorem Twoich danych osobowych jest Magdalena Zając, prowadząca działalność
                  pod adresem: <strong style={{ color: C.espresso }}>[ADRES PROWADZENIA DZIAŁALNOŚCI]</strong>,
                  NIP: <strong style={{ color: C.espresso }}>[NIP]</strong>.
                </p>
                <p>
                  Kontakt z Administratorem: <a href="mailto:magda@me2me.pl" style={{ color: C.gold }}>magda@me2me.pl</a> lub
                  telefonicznie pod numerem +48 785 669 901.
                </p>
              </Section>

              <Section title="2. Podstawy prawne i cele przetwarzania">
                <p>Przetwarzamy Twoje dane osobowe na następujących podstawach prawnych:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong style={{ color: C.espresso }}>art. 6 ust. 1 lit. b RODO</strong> — wykonanie umowy lub podjęcie działań przed jej zawarciem (zakup produktów, rezerwacja konsultacji),</li>
                  <li><strong style={{ color: C.espresso }}>art. 6 ust. 1 lit. a RODO</strong> — zgoda, np. na wysyłkę newslettera lub kontakt marketingowy,</li>
                  <li><strong style={{ color: C.espresso }}>art. 6 ust. 1 lit. c RODO</strong> — wypełnienie obowiązku prawnego (wystawianie faktur, archiwizacja),</li>
                  <li><strong style={{ color: C.espresso }}>art. 6 ust. 1 lit. f RODO</strong> — prawnie uzasadniony interes Administratora (dochodzenie roszczeń, statystyki).</li>
                </ul>
              </Section>

              <Section title="3. Zakres zbieranych danych">
                <p>W zależności od charakteru kontaktu zbieramy:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>imię i nazwisko, adres e-mail, numer telefonu — przy zakupach i rezerwacjach,</li>
                  <li>adres dostawy / dane do faktury — przy zamówieniach wymagających wysyłki lub faktury,</li>
                  <li>dane logowania (e-mail, hasło hashowane) — przy rejestracji konta,</li>
                  <li>adresy IP, dane urządzenia, pliki cookies — automatycznie przy korzystaniu z serwisu.</li>
                </ul>
              </Section>

              <Section title="4. Odbiorcy danych">
                <p>
                  Twoje dane możemy przekazywać wyłącznie zaufanym podmiotom wspierającym działalność, tj.:
                  dostawcom płatności (Stripe / PayU), platformom e-mail (np. Mailchimp), firmom hostingowym
                  oraz organom publicznym, jeśli wymagają tego przepisy prawa.
                  Nie sprzedajemy danych osobowych osobom trzecim.
                </p>
              </Section>

              <Section title="5. Okres przechowywania danych">
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li>Dane z umów i transakcji — przez 5 lat od końca roku podatkowego, w którym transakcja miała miejsce.</li>
                  <li>Dane konta użytkownika — do czasu usunięcia konta lub cofnięcia zgody.</li>
                  <li>Dane w celach marketingowych — do czasu wycofania zgody.</li>
                </ul>
              </Section>

              <Section title="6. Twoje prawa">
                <p>Na podstawie RODO przysługują Ci następujące prawa:</p>
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong style={{ color: C.espresso }}>dostępu</strong> do swoich danych oraz ich kopii,</li>
                  <li><strong style={{ color: C.espresso }}>sprostowania</strong> nieprawidłowych lub niekompletnych danych,</li>
                  <li><strong style={{ color: C.espresso }}>usunięcia</strong> danych ("prawo do bycia zapomnianym"),</li>
                  <li><strong style={{ color: C.espresso }}>ograniczenia przetwarzania</strong>,</li>
                  <li><strong style={{ color: C.espresso }}>przenoszenia</strong> danych,</li>
                  <li><strong style={{ color: C.espresso }}>sprzeciwu</strong> wobec przetwarzania,</li>
                  <li><strong style={{ color: C.espresso }}>wniesienia skargi</strong> do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych (UODO).</li>
                </ul>
                <p className="mt-3">
                  Aby skorzystać ze swoich praw, skontaktuj się pod adresem:{" "}
                  <a href="mailto:magda@me2me.pl" style={{ color: C.gold }}>magda@me2me.pl</a>.
                </p>
              </Section>

              <Section title="7. Pliki cookies">
                <p>
                  Serwis korzysta z plików cookies — małych plików tekstowych zapisywanych w przeglądarce.
                  Używamy cookies niezbędnych do funkcjonowania serwisu (sesja, koszyk) oraz analitycznych
                  (statystyki oglądalności). Możesz zarządzać plikami cookies w ustawieniach przeglądarki.
                </p>
              </Section>

              <Section title="8. Zmiany Polityki prywatności">
                <p>
                  Administrator zastrzega sobie prawo do zmiany niniejszej Polityki prywatności.
                  Aktualna wersja jest zawsze dostępna pod adresem{" "}
                  <span style={{ color: C.gold }}>magdalenazajac.pl/polityka-prywatnosci</span>.
                  O istotnych zmianach poinformujemy e-mailem lub komunikatem na stronie.
                </p>
              </Section>

            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;