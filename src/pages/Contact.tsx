import { motion } from "framer-motion";
import { Mail, Phone, Facebook, Instagram, Linkedin, Youtube, ExternalLink, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import magdaPhoto from "@/assets/magda-photo.jpg";

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    url: "mailto:formafkkf@gmail.com",
    label: "formafkkf@gmail.com",
    color: "hover:bg-red-500/10 hover:border-red-500/30",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://api.whatsapp.com/send?phone=48785669901",
    label: "+48 785 669 901",
    color: "hover:bg-green-500/10 hover:border-green-500/30",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/magdalena.zajacpyrzewska",
    label: "magdalena.zajacpyrzewska",
    color: "hover:bg-blue-600/10 hover:border-blue-600/30",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/magdalena.zajac.mentor",
    label: "@magdalena.zajac.mentor",
    color: "hover:bg-pink-500/10 hover:border-pink-500/30",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/magda-zaj%C4%85c-pyrzewska-a131b3209",
    label: "Magda Zając-Pyrzewska",
    color: "hover:bg-blue-700/10 hover:border-blue-700/30",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://youtube.com/@magdalenazajac-pyrzewska3137",
    label: "Magdalena Zając",
    color: "hover:bg-red-600/10 hover:border-red-600/30",
  },
  {
    name: "TikTok",
    icon: ExternalLink,
    url: "https://www.tiktok.com/@magdalenazajac_mentor",
    label: "@magdalenazajac_mentor",
    color: "hover:bg-foreground/10 hover:border-foreground/30",
  },
];

const Contact = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-sm font-medium text-soft-gold mb-4">
              Skontaktuj się
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Kontakt
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Masz pytania? Chcesz umówić się na konsultację? Skontaktuj się ze mną!
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-3xl border border-border/50 p-8 md:p-10 mb-10"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-gradient-to-br from-soft-gold/30 to-accent/20 flex-shrink-0">
                  <img
                    src={magdaPhoto}
                    alt="Magdalena Zając"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h2 className="font-serif text-3xl font-semibold text-foreground mb-2">
                    Magdalena Zając
                  </h2>
                  <p className="text-soft-gold font-medium text-lg mb-4">
                    Mentor holistyczny i biznesowy
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Mentor ciała i umysłu: ustalamy strategię pod Twój cel. 
                    23 letnie doświadczenie w pracy z klientami.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button variant="gold" asChild>
                      <a href="mailto:formafkkf@gmail.com">
                        <Mail className="w-4 h-4" />
                        Napisz email
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="https://api.whatsapp.com/send?phone=48785669901" target="_blank" rel="noreferrer">
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Me2Me Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-soft-gold/10 to-accent/5 rounded-3xl border border-soft-gold/20 p-8 mb-10"
            >
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                    Aplikacja Me2Me
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    21-31 dni holistycznego kształtowania nawyków. Dostęp do aplikacji 
                    można zakupić kontaktując się bezpośrednio ze mną.
                  </p>
                </div>
                <Button variant="gold" size="lg" asChild>
                  <a href="https://www.me2me.pl/login" target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Otwórz Me2Me
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6 text-center">
                Znajdź mnie w sieci
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className={`flex items-center gap-4 p-5 bg-card rounded-2xl border border-border/50 transition-all group ${link.color}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <link.icon className="w-6 h-6 text-foreground/70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{link.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{link.label}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Linktree */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 text-center"
            >
              <p className="text-muted-foreground mb-4">
                Wszystkie linki w jednym miejscu
              </p>
              <Button variant="outline" size="lg" asChild>
                <a href="https://linktr.ee/magdapassionforever" target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Otwórz Linktree
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
