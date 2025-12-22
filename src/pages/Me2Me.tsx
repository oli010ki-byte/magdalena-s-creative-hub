import { motion } from "framer-motion";
import { Smartphone, Heart, Target, Zap, CheckCircle, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Heart,
    title: "Dziennik emocji",
    description: "Śledź swoje uczucia i odkrywaj wzorce emocjonalne",
  },
  {
    icon: Target,
    title: "Cele i nawyki",
    description: "Wyznaczaj cele i buduj pozytywne nawyki krok po kroku",
  },
  {
    icon: Zap,
    title: "Codzienne ćwiczenia",
    description: "Praktyczne zadania wspierające Twój rozwój",
  },
];

const benefits = [
  "Lepsze zrozumienie własnych emocji",
  "Budowanie zdrowych nawyków",
  "Codzienna dawka motywacji",
  "Personalizowane ścieżki rozwoju",
  "Społeczność wspierających osób",
  "Dostęp do ekskluzywnych materiałów",
];

const Me2Me = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-soft-gold/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/10 rounded-full blur-2xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 mb-6 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/30"
              >
                <Sparkles className="w-4 h-4 text-soft-gold" />
                Autorska aplikacja
              </motion.span>
              
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground mb-8 tracking-tight">
                <span className="relative">
                  Me2Me
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-soft-gold to-accent/50 rounded-full" />
                </span>
              </h1>
              
              <div className="space-y-5 mb-10">
                <p className="text-xl md:text-2xl font-serif text-foreground/90 font-medium leading-relaxed">
                  21-31 dni holistycznego kształtowania nawyków
                </p>
                <p className="text-lg text-foreground/70 italic font-light tracking-wide">
                  Od Siebie — dla Siebie — z Sobą
                </p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                  Aktywne Ciało • Stabilne emocje • Prawdziwe Relacje
                  <br />
                  <span className="text-foreground/60">z żywieniem, wiedzą i świadomością</span>
                </p>
                
                <div className="bg-card/80 rounded-2xl p-5 border border-border/30 mt-4">
                  <p className="text-sm font-medium text-foreground mb-3">
                    Na każdy dzień masz rozpisane:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-soft-gold" />
                      Aktywność: Stretching (15 min) + PowerBody (15 min)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-soft-gold" />
                      Plan żywienia i suplementacji
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-soft-gold" />
                      Tematyczne prowadzenie mentalne
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-soft-gold" />
                      Dla chętnych: oczyszczenie
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="gold" size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                  <a href="https://www.me2me.pl/login" target="_blank" rel="noreferrer" className="gap-2">
                    <Smartphone className="w-5 h-5" />
                    Otwórz aplikację
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="backdrop-blur-sm bg-background/50">
                  Dowiedz się więcej
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-64 md:w-80">
                <div className="absolute -inset-4 bg-gradient-to-br from-soft-gold/40 to-accent/30 rounded-[3.5rem] blur-2xl animate-pulse" />
                <div className="relative bg-card rounded-[3rem] p-4 shadow-2xl border border-border/30">
                  <div className="aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-cream to-secondary">
                    <img
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400"
                      alt="Me2Me App"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Funkcje aplikacji
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Wszystko, czego potrzebujesz do codziennej pracy nad sobą
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-background rounded-3xl p-8 border border-border/30 hover:border-soft-gold/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-soft-gold/30 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-foreground/80" />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-10 tracking-tight">
                Co zyskasz z Me2Me?
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-card/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-soft-gold/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-foreground/70" />
                    </div>
                    <span className="text-foreground/80 font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-soft-gold/20 to-accent/10 rounded-[2.5rem] blur-xl" />
              <div className="relative bg-card rounded-3xl p-10 border border-border/30 shadow-lg">
                <h3 className="font-serif text-3xl font-semibold text-foreground mb-5">
                  Dołącz już dziś
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed text-lg">
                  Rozpocznij swoją podróż do lepszej wersji siebie. 
                  Me2Me jest dostępna na iOS i Android.
                </p>
                <Button variant="gold" size="lg" className="w-full shadow-lg hover:shadow-xl transition-shadow text-lg py-6">
                  Rozpocznij za darmo
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Me2Me;
