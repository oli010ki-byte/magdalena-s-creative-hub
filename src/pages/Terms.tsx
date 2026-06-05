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

const Terms = () => {
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
                Regulamin
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

              <Section title="1. Postanowienia ogólne">
                <p>
                  Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem
                  <span style={{ color: C.gold }}> magdalenazajac.pl</span> oraz dokonywania zakupów oferowanych
                  produktów i usług.
                </p>
                <p>
                  Sprzedawcą jest Magdalena Zając, prowadząca działalność pod adresem:{" "}
                  <strong style={{ color: C.espresso }}>[ADRES PROWADZENIA DZIAŁALNOŚCI]</strong>,
                  NIP: <strong style={{ color: C.espresso }}>[NIP]</strong>,
                  e-mail: <a href="mailto:magda@me2me.pl" style={{ color: C.gold }}>magda@me2me.pl</a>,
                  tel. +48 785 669 901.
                </p>
              </Section>

              <Section title="2. Definicje">
                <ul className="list-disc pl-5 space-y-1.5 mt-2">
                  <li><strong style={{ color: C.espresso }}>Serwis</strong> — strona internetowa magdalenazajac.pl wraz z jej podstronami.</li>
                  <li><strong style={{ color: C.espresso }}>Kupujący / Klient</strong> — osoba fizyczna, prawna lub jednostka organizacyjna dokonująca zakupu.</li>
                  <li><strong style={{ color: C.espresso }}>Produkt cyfrowy</strong> — e-book, kurs online lub inny materiał dostępny wyłącznie w formie elektronicznej.</li>
                  <li><strong style={{ color: C.espresso }}>Konsultacja</strong> — spotkanie mentoringowe 1:1, online lub stacjonarnie.</li>
                  <li><strong style={{ color: C.espresso }}>Konto</strong> — indywidualne konto Kupującego utworzone po rejestracji w Serwisie.</li>
                </ul>
              </Section>

              <Section title="3. Zakupy i płatności">
                <p>
                  Zamówienie składa się przez Serwis, klikając przycisk "Kup" lub "Dodaj do koszyka" przy wybranym
                  produkcie. Do zawarcia umowy dochodzi z chwilą potwierdzenia zamówienia przez Sprzedawcę lub
                  automatycznej realizacji płatności.
                </p>
                <p>
                  Płatności obsługiwane są przez zewnętrzny procesor płatności. Sprzedawca nie przechowuje danych
                  kart płatniczych. Ceny podane w Serwisie są cenami brutto (zawierają VAT, jeśli ma zastosowanie).
                </p>
              </Section>

              <Section title="4. Produkty cyfrowe">
                <p>
                  Po zaksięgowaniu płatności Kupujący otrzymuje dostęp do zakupionego produktu cyfrowego
                  na adres e-mail podany przy zamówieniu lub w ramach konta w Serwisie.
                </p>
                <p>
                  Produkty cyfrowe nie są objęte prawem odstąpienia od umowy, jeśli Kupujący wyraził zgodę na
                  natychmiastowe wykonanie usługi i utratę prawa odstąpienia — zgodnie z art. 38 pkt 13
                  ustawy o prawach konsumenta.
                </p>
              </Section>

              <Section title="5. Konsultacje">
                <p>
                  Rezerwacja konsultacji możliwa jest poprzez Serwis, telefonicznie lub przez WhatsApp.
                  Potwierdzenie terminu następuje po zaksięgowaniu przedpłaty lub w drodze odrębnego ustalenia.
                </p>
                <p>
                  Odwołanie konsultacji przez Klienta możliwe jest bez opłat najpóźniej na <strong style={{ color: C.espresso }}>48 godzin</strong> przed
                  ustalonym terminem. Odwołanie w krótszym czasie lub niestawienie się bez uprzedzenia
                  nie uprawnia do zwrotu przedpłaty.
                </p>
                <p>
                  Sprzedawca zastrzega sobie prawo do odwołania lub zmiany terminu z przyczyn losowych,
                  informując Klienta możliwie najwcześniej i proponując nowy termin lub zwrot płatności.
                </p>
              </Section>

              <Section title="6. Prawo odstąpienia od umowy">
                <p>
                  Konsument ma prawo odstąpić od umowy zawartej na odległość bez podania przyczyny w ciągu
                  <strong style={{ color: C.espresso }}> 14 dni</strong> od dnia zawarcia umowy (usługi) lub
                  dostarczenia towaru (produkty fizyczne).
                </p>
                <p>
                  Aby skorzystać z prawa odstąpienia, należy poinformować Sprzedawcę pisemnie (e-mail:
                  <a href="mailto:magda@me2me.pl" style={{ color: C.gold }}> magda@me2me.pl</a>) przed upływem
                  14-dniowego terminu. Zwrot płatności nastąpi w ciągu 14 dni od otrzymania oświadczenia o
                  odstąpieniu, przy użyciu tej samej metody płatności.
                </p>
              </Section>

              <Section title="7. Reklamacje">
                <p>
                  Reklamacje należy zgłaszać na adres:{" "}
                  <a href="mailto:magda@me2me.pl" style={{ color: C.gold }}>magda@me2me.pl</a>.
                  Reklamacja powinna zawierać opis problemu oraz dane kontaktowe.
                  Sprzedawca rozpatruje reklamacje w terminie 14 dni roboczych od ich otrzymania.
                </p>
              </Section>

              <Section title="8. Własność intelektualna">
                <p>
                  Wszystkie materiały dostępne w Serwisie, w tym teksty, grafiki, nagrania wideo i e-booki,
                  są chronione prawem autorskim i stanowią własność Sprzedawcy lub podmiotów przez niego
                  upoważnionych. Zabronione jest kopiowanie, rozpowszechnianie i publiczne udostępnianie
                  materiałów bez pisemnej zgody Sprzedawcy.
                </p>
              </Section>

              <Section title="9. Pozasądowe rozwiązywanie sporów">
                <p>
                  Konsument może skorzystać z pozasądowych metod rozwiązywania sporów, w tym z platformy
                  ODR dostępnej pod adresem:{" "}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: C.gold }}
                  >
                    ec.europa.eu/consumers/odr
                  </a>
                  .
                </p>
              </Section>

              <Section title="10. Postanowienia końcowe">
                <p>
                  W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa
                  polskiego, w szczególności Kodeksu cywilnego oraz ustawy o prawach konsumenta.
                </p>
                <p>
                  Sprzedawca zastrzega sobie prawo do zmian Regulaminu. Aktualna wersja jest zawsze dostępna
                  na stronie <span style={{ color: C.gold }}>magdalenazajac.pl/regulamin</span>.
                  Zamówienia złożone przed zmianą Regulaminu realizowane są na zasadach obowiązujących w
                  chwili ich złożenia.
                </p>
              </Section>

            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;