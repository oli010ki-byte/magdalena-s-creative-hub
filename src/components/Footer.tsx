import { Link } from "react-router-dom";
import { Mail, MessageCircle, Instagram, Facebook, Youtube } from "lucide-react";
import Logo from "./Logo";

const C = {
  bg:      "#F7F1E8",
  espresso: "#1C1610",
  body:    "rgba(28,22,16,0.5)",
  gold:    "#9C7B59",
  border:  "rgba(28,22,16,0.08)",
};

const Footer = () => (
  <footer style={{ backgroundColor: C.bg, borderTop: `1px solid ${C.border}` }}>
    <div className="max-w-[1380px] mx-auto px-6 lg:px-12 py-14 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

        {/* Brand */}
        <div className="space-y-4">
          <Logo />
          <p className="font-light text-sm leading-relaxed max-w-[28ch]" style={{ color: C.body }}>
            Mentor holistyczny i biznesowy.<br />23 lata doświadczenia w pracy z człowiekiem.
          </p>
          <div className="flex gap-2.5 pt-1">
            {[
              { href: "https://www.instagram.com/magdalena.zajac.mentor", Icon: Instagram },
              { href: "https://www.facebook.com/magdalena.zajacpyrzewska", Icon: Facebook },
              { href: "https://youtube.com/@magdalenazajac-pyrzewska3137", Icon: Youtube },
            ].map(({ href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "rgba(28,22,16,0.05)",
                  color: C.body,
                  transition: "all 160ms cubic-bezier(0.23,1,0.32,1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = "rgba(28,22,16,0.09)";
                  (e.currentTarget.style as any).color = C.espresso;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = "rgba(28,22,16,0.05)";
                  (e.currentTarget.style as any).color = C.body;
                }}
              >
                <Icon className="w-[14px] h-[14px]" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <p
            className="font-semibold uppercase mb-4"
            style={{ fontSize: "9px", letterSpacing: "0.28em", color: C.gold }}
          >
            Nawigacja
          </p>
          <div className="flex flex-col gap-2">
            {[
              { label: "O mnie",           to: "/about" },
              { label: "Aplikacja Me2Me",  to: "/me2me" },
              { label: "Produkty i kursy", to: "/products" },
              { label: "Konsultacja 1:1",  to: "/products/consultation" },
              { label: "Filmy",            to: "/videos" },
              { label: "Kontakt",          to: "/contact" },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-light w-fit"
                style={{ color: C.body, transition: "color 150ms ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.espresso)}
                onMouseLeave={e => (e.currentTarget.style.color = C.body)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p
            className="font-semibold uppercase mb-4"
            style={{ fontSize: "9px", letterSpacing: "0.28em", color: C.gold }}
          >
            Kontakt
          </p>
          <div className="flex flex-col gap-3">
            {[
              { href: "https://api.whatsapp.com/send?phone=48785669901", Icon: MessageCircle, label: "+48 785 669 901" },
              { href: "mailto:magda@me2me.pl", Icon: Mail, label: "magda@me2me.pl" },
              { href: "https://www.instagram.com/magdalena.zajac.mentor", Icon: Instagram, label: "@magdalena.zajac.mentor" },
            ].map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-light w-fit"
                style={{ color: C.body, transition: "color 150ms ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.espresso)}
                onMouseLeave={e => (e.currentTarget.style.color = C.body)}
              >
                <Icon className="w-[14px] h-[14px] flex-shrink-0" strokeWidth={1.5} style={{ color: C.gold }} />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        <p
          className="font-light"
          style={{ fontSize: "12px", color: "rgba(28,22,16,0.35)" }}
        >
          © {new Date().getFullYear()} Magdalena Zając. Wszelkie prawa zastrzeżone.
        </p>
        <a
          href="https://www.me2me.pl/login"
          target="_blank"
          rel="noreferrer"
          className="font-medium"
          style={{ fontSize: "11px", color: "rgba(28,22,16,0.35)", transition: "color 150ms ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = C.espresso)}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(28,22,16,0.35)")}
        >
          Aplikacja Me2Me →
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;