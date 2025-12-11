import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    url: "mailto:formafkkf@gmail.com",
    label: "formafkkf@gmail.com",
  },
  {
    name: "WhatsApp",
    icon: Phone,
    url: "https://api.whatsapp.com/send?phone=48785669901",
    label: "+48 785 669 901",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/magdalena.zajacpyrzewska",
    label: "magdalena.zajacpyrzewska",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/magdalena.zajac.mentor",
    label: "@magdalena.zajac.mentor",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/magda-zaj%C4%85c-pyrzewska-a131b3209",
    label: "Magda Zając-Pyrzewska",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@magdalenazajac-pyrzewska3137",
    label: "Magdalena Zając",
  },
  {
    name: "TikTok",
    icon: ExternalLink,
    url: "https://www.tiktok.com/@magdalenazajac_mentor",
    label: "@magdalenazajac_mentor",
  },
];

const AdminProfile = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl font-semibold text-foreground mb-2">
          Profil & Kontakt
        </h2>
        <p className="text-sm text-muted-foreground">
          Dane kontaktowe i linki do mediów społecznościowych Magdaleny
        </p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border/50 p-6"
      >
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-soft-gold/30 to-accent/20 flex items-center justify-center text-2xl font-serif font-bold text-foreground">
            MZ
          </div>
          <div className="flex-1">
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-1">
              Magdalena Zając
            </h3>
            <p className="text-soft-gold font-medium mb-3">
              Mentor holistyczny i biznesowy
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Mentor ciała i umysłu: ustalamy strategię pod Twój cel. 23 letnie doświadczenie.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Me2Me Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-soft-gold/10 to-accent/5 rounded-2xl border border-soft-gold/20 p-6"
      >
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
          Aplikacja Me2Me
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Me2Me to płatna aplikacja dostępna dla klientów Magdaleny. 
          Dostęp można zakupić kontaktując się bezpośrednio.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="gold" size="sm" asChild>
            <a href="https://www.me2me.pl/login" target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4" />
              Otwórz Me2Me
            </a>
          </Button>
        </div>
      </motion.div>

      {/* Contact Links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Linki kontaktowe
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50 hover:border-soft-gold/50 hover:bg-soft-gold/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-soft-gold/20 transition-colors">
                <link.icon className="w-5 h-5 text-foreground/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{link.name}</p>
                <p className="text-xs text-muted-foreground truncate">{link.label}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Linktree */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-2xl border border-border/50 p-6"
      >
        <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
          Linktree
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Wszystkie linki w jednym miejscu
        </p>
        <Button variant="outline" asChild>
          <a href="https://linktr.ee/magdapassionforever" target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4" />
            Otwórz Linktree
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
