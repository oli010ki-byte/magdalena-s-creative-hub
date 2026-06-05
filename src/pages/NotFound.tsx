import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EASE = [0.23, 1, 0.32, 1] as const;

const C = {
  ivory:    "#F7F1E8",
  cream:    "#FDFAF5",
  espresso: "#1C1610",
  body:     "rgba(28,22,16,0.62)",
  gold:     "#9C7B59",
} as const;

const NotFound = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      className="flex items-center justify-center px-6"
      style={{ backgroundColor: C.ivory, minHeight: "100dvh" }}
    >
      <div ref={ref} className="text-center max-w-lg">
        {/* Ghost 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="select-none pointer-events-none mb-2"
          aria-hidden
        >
          <span
            className="font-serif font-bold leading-none"
            style={{
              fontSize: "clamp(7rem, 22vw, 14rem)",
              color: `${C.espresso}08`,
              letterSpacing: "-0.04em",
            }}
          >
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="space-y-3 mb-10 -mt-6"
        >
          <div>
            <motion.h1
              variants={{
                hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
                show:   { clipPath: "inset(0 0 -40% 0)", opacity: 1, transition: { duration: 0.9, ease: EASE } },
              }}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              className="font-serif font-bold tracking-[-0.02em] leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: C.espresso }}
            >
              Strona nie istnieje
            </motion.h1>
          </div>
          <p className="text-base" style={{ color: C.body }}>
            Podany adres jest nieprawidłowy lub strona została przeniesiona.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.32, ease: EASE }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: C.espresso,
              color: "#F2E9DC",
              transition: `background-color 160ms cubic-bezier(${EASE.join(",")})`,
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.espresso)}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            Wróć na stronę główną
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;