import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ExternalLink, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

import forever1  from "@/assets/forever/forever-1.png";
import forever2  from "@/assets/forever/forever-2.png";
import forever3  from "@/assets/forever/forever-3.png";
import forever4  from "@/assets/forever/forever-4.png";
import forever5  from "@/assets/forever/forever-5.png";
import forever6  from "@/assets/forever/forever-6.png";
import forever7  from "@/assets/forever/forever-7.png";
import forever8  from "@/assets/forever/forever-8.png";
import forever9  from "@/assets/forever/forever-9.png";
import forever10 from "@/assets/forever/forever-10.png";

const EASE = [0.23, 1, 0.32, 1] as const;

const C = {
  ivory:    "#F7F1E8",
  cream:    "#FDFAF5",
  parchment:"#EDE6DA",
  espresso: "#1C1610",
  body:     "rgba(28,22,16,0.62)",
  gold:     "#9C7B59",
} as const;

const SHOP_URL = "https://thealoeveraco.shop/zm1HDvyX";

const foreverImages = [
  { src: forever1,  alt: "Forever Aloe Berry Nectar" },
  { src: forever2,  alt: "Produkty Forever Aloe" },
  { src: forever3,  alt: "Forever Arctic-Sea i Aloe Berry Nectar" },
  { src: forever4,  alt: "Forever Lite Ultra" },
  { src: forever5,  alt: "Forever kosmetyki" },
  { src: forever6,  alt: "Forever Aloe Liquid Soap" },
  { src: forever7,  alt: "Forever suplementy" },
  { src: forever8,  alt: "Forever Aloe Mango" },
  { src: forever9,  alt: "Forever Aloe Vera Gel" },
  { src: forever10, alt: "Forever Aloe Berry Nectar" },
];

const ForeverProducts = () => {
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
              <Leaf className="w-3.5 h-3.5" strokeWidth={2} />
              Naturalna suplementacja
            </motion.span>

            <div className="overflow-hidden mb-8">
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
                Suplementacja FOREVER
              </motion.h1>
            </div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
              className="rounded-[2rem] p-1.5 max-w-2xl"
              style={{ backgroundColor: C.parchment, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.6)` }}
            >
              <div
                className="rounded-[calc(2rem-6px)] p-8 md:p-10"
                style={{ backgroundColor: C.cream }}
              >
                <p className="text-base leading-relaxed mb-4" style={{ color: C.body }}>
                  Jeśli chcesz zaopatrzyć się w produkty bez zakładania numeru klienta —
                  wejdź w link gościa do mojego sklepu internetowego. Zapraszam serdecznie!
                </p>
                <p className="text-sm mb-8" style={{ color: C.body }}>
                  Wszystkie produkty dostępne ze zniżką wspierając Magdalenę.
                </p>
                <a
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: C.espresso,
                    color: "#F2E9DC",
                    transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
                >
                  <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  Przejdź do sklepu FOREVER
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section style={{ backgroundColor: C.cream }} className="py-20 lg:py-28">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mb-12"
          >
            <h2
              className="font-serif font-bold tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: C.espresso }}
            >
              Przykładowe produkty
            </h2>
            <p className="mt-2 text-sm" style={{ color: C.body }}>
              Naturalne suplementy, napoje aloesowe i kosmetyki Forever Living
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {foreverImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.04, ease: EASE }}
                className="group rounded-[1.4rem] overflow-hidden"
                style={{
                  backgroundColor: C.ivory,
                  border: `1px solid ${C.espresso}0d`,
                  transition: `border-color 240ms ease, box-shadow 240ms ease`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${C.gold}40`;
                  e.currentTarget.style.boxShadow = `0 8px 24px -8px rgba(28,22,16,0.08)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = `${C.espresso}0d`;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: C.parchment }}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-xs text-center font-medium" style={{ color: C.body }}>
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="mt-16 text-center"
          >
            <p className="text-sm mb-6" style={{ color: C.body }}>
              Pełna oferta produktów dostępna w sklepie online
            </p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold border"
              style={{
                borderColor: `${C.espresso}22`,
                color: C.espresso,
                transition: `border-color 160ms ease`,
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${C.espresso}44`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = `${C.espresso}22`)}
            >
              <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
              Odwiedź sklep FOREVER
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ForeverProducts;