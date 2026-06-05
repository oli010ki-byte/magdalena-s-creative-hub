import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { Menu, X, LogIn, LogOut, Shield, Calendar } from "lucide-react";
import Logo from "./Logo";
import { useAuth } from "@/contexts/AuthContext";
import CartButton from "./CartButton";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const navItems = [
  { name: "Strona główna", path: "/" },
  { name: "O mnie",        path: "/about" },
  { name: "Me2Me",         path: "/me2me" },
  { name: "Produkty",      path: "/products" },
  { name: "Filmy",         path: "/videos" },
  { name: "Kontakt",       path: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  // Scroll-aware: bg opacity + border-shadow animate reactively via MotionTemplate
  const { scrollY } = useScroll();
  const bgOpacity     = useSpring(useTransform(scrollY, [0, 70], [0.72, 0.96]), { stiffness: 120, damping: 24 });
  const shadowOpacity = useSpring(useTransform(scrollY, [0, 70], [0, 0.07]),    { stiffness: 120, damping: 24 });
  const backgroundColor = useMotionTemplate`rgba(247,241,232,${bgOpacity})`;
  const boxShadow       = useMotionTemplate`0 1px 0 rgba(28,22,16,${shadowOpacity})`;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backgroundColor, boxShadow, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
    >
      <div className="max-w-[1380px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative text-[13px] font-medium"
                  style={{
                    color: active ? "#1C1610" : "rgba(28,22,16,0.5)",
                    transition: "color 180ms cubic-bezier(0.23,1,0.32,1)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.005em",
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = "rgba(28,22,16,0.8)"; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = "rgba(28,22,16,0.5)"; }}
                >
                  {item.name}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-[1px] left-0 right-0 h-[1.5px] rounded-full"
                      style={{ backgroundColor: "#9C7B59" }}
                    />
                  )}
                </Link>
              );
            })}

            <div
              className="flex items-center gap-3 ml-1 pl-6"
              style={{ borderLeft: "1px solid rgba(28,22,16,0.1)" }}
            >
              <CartButton />

              {/* Primary CTA — pill */}
              <Link
                to="/products/consultation"
                className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full"
                style={{
                  backgroundColor: "#1C1610",
                  color: "#F2E9DC",
                  letterSpacing: "0.01em",
                  transition: "background-color 160ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2e261c")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#1C1610")}
              >
                <Calendar className="w-[13px] h-[13px]" strokeWidth={2} />
                Umów konsultację
              </Link>

              {user ? (
                <div className="flex items-center gap-1">
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ color: "rgba(28,22,16,0.45)", transition: "color 160ms ease" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#9C7B59")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(28,22,16,0.45)")}
                    >
                      <Shield className="w-4 h-4" />
                    </Link>
                  )}
                  <button
                    onClick={async () => { await signOut(); }}
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ color: "rgba(28,22,16,0.4)", transition: "color 160ms ease" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#1C1610")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(28,22,16,0.4)")}
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ color: "rgba(28,22,16,0.4)", transition: "color 160ms ease" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#1C1610")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(28,22,16,0.4)")}
                >
                  <LogIn className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/products/consultation"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 rounded-full"
              style={{ backgroundColor: "#1C1610", color: "#F2E9DC" }}
            >
              <Calendar className="w-[11px] h-[11px]" strokeWidth={2} />
              Konsultacja
            </Link>
            <CartButton />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(28,22,16,0.06)",
                color: "#1C1610",
                transition: "background-color 160ms ease",
              }}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={isOpen ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: isOpen ? -45 : 45, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: isOpen ? 45 : -45, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="flex items-center justify-center"
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="md:hidden border-t overflow-hidden"
            style={{
              borderColor: "rgba(28,22,16,0.07)",
              backgroundColor: "rgba(247,241,232,0.96)",
            }}
          >
            <div className="max-w-[1380px] mx-auto px-6 py-5 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const active = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.04, ease: EASE }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: active ? "rgba(28,22,16,0.06)" : "transparent",
                        color: active ? "#1C1610" : "rgba(28,22,16,0.55)",
                        transition: "all 150ms ease",
                      }}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-2 pt-3 flex flex-col gap-1.5" style={{ borderTop: "1px solid rgba(28,22,16,0.07)" }}>
                {user ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                        style={{ color: "#9C7B59", backgroundColor: "rgba(156,123,89,0.07)" }}
                      >
                        <Shield className="w-4 h-4" />
                        Panel admina
                      </Link>
                    )}
                    <button
                      onClick={async () => { await signOut(); setIsOpen(false); }}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-left w-full"
                      style={{ color: "rgba(28,22,16,0.5)" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Wyloguj
                    </button>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium"
                    style={{ color: "rgba(28,22,16,0.5)" }}
                  >
                    <LogIn className="w-4 h-4" />
                    Zaloguj
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;