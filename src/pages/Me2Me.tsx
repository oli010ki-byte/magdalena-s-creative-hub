import { motion } from "framer-motion";
import { Smartphone, Heart, Target, Zap, CheckCircle } from "lucide-react";
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-light-beige to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-soft-gold/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-sm font-medium text-soft-gold mb-4">
                Autorska aplikacja
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
                Me2Me
              </h1>
              <div className="text-lg text-muted-foreground mb-8 leading-relaxed space-y-3">
                <p>Me2Me</p>
                <p>
                  To Aplikacja - 21-31 dni : holistyczne kształtowanie nawyków-
                  krok po kroku
                </p>
                <p>Od Siebie- dla Siebie- z Sobą</p>
                <p>
                  Aktywne Ciało- Stabilne emocje- Prawdziwe Relacje: z żywieniem,
                  wiedzą i świadomością.
                </p>
                <p>
                  Link :
                  <br />
                  https://www.me2me.pl/login
                </p>
                <p>⬇️</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="gold" size="lg">
                  <a href="https://www.me2me.pl/login" target="_blank" rel="noreferrer">
                    <Smartphone className="w-5 h-5" />
                    Otwórz aplikację
                  </a>
                </Button>
                <Button variant="outline" size="lg">Dowiedz się więcej</Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative mx-auto w-64 md:w-80">
                <div className="absolute inset-0 bg-gradient-to-br from-soft-gold/30 to-accent/20 rounded-[3rem] blur-2xl" />
                <div className="relative bg-card rounded-[3rem] p-4 shadow-card border border-border/50">
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
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Funkcje aplikacji
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
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
                className="bg-background rounded-2xl p-8 border border-border/50 hover-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-soft-gold/20 to-accent/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
                Co zyskasz z Me2Me?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-soft-gold flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-10 border border-border/50"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Dołącz już dziś
              </h3>
              <p className="text-muted-foreground mb-6">
                Rozpocznij swoją podróż do lepszej wersji siebie. 
                Me2Me jest dostępna na iOS i Android.
              </p>
              <Button variant="gold" size="lg" className="w-full">
                Rozpocznij za darmo
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Me2Me;
