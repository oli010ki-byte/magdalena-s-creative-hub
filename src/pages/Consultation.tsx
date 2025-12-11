import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MessageCircle, Mail, Phone, CheckCircle, Clock, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import consultationCover from "@/assets/consultation-cover.png";
import magdaPhoto from "@/assets/magda-photo.jpg";

const consultationBenefits = [
  "Indywidualne podejście do Twoich potrzeb",
  "Strategia dopasowana do Twojego celu",
  "Wsparcie mentora z 23-letnim doświadczeniem",
  "Holistyczne spojrzenie na ciało i umysł",
  "Konkretne, wdrażalne kroki do działania",
  "Możliwość kontynuacji współpracy",
];

const steps = [
  {
    icon: MessageCircle,
    title: "Skontaktuj się",
    description: "Napisz do mnie przez WhatsApp, email lub social media. Opowiedz krótko o sobie i swoich celach.",
  },
  {
    icon: Calendar,
    title: "Umów termin",
    description: "Wspólnie ustalimy dogodny termin konsultacji - online lub stacjonarnie.",
  },
  {
    icon: Heart,
    title: "Spotkanie 1:1",
    description: "Podczas konsultacji skupimy się na Twoich potrzebach i wypracujemy plan działania.",
  },
];

const Consultation = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Button asChild variant="ghost" size="sm" className="mb-8 text-muted-foreground hover:text-foreground">
              <Link to="/products">
                <ArrowLeft className="w-4 h-4" />
                Powrót do sklepu
              </Link>
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <Calendar className="w-6 h-6 text-foreground/70" />
              </div>
              <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">
                Indywidualne wsparcie
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Konsultacja 1:1 z Magdą
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Indywidualne spotkanie, podczas którego skupimy się na Twoich celach 
              i wypracujemy strategię działania dopasowaną do Ciebie.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left - Photo & Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-cream to-secondary max-w-md">
                <img
                  src={consultationCover}
                  alt="Magdalena Zając - Mentor"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Magdalena Zając
                </h3>
                <p className="text-soft-gold font-medium mb-2">
                  Mentor holistyczny i biznesowy
                </p>
                <p className="text-muted-foreground text-sm">
                  23 lata doświadczenia w pracy z klientami. 
                  Twórczynią aplikacji Me2Me.
                </p>
              </div>
            </motion.div>

            {/* Right - How to book */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-br from-soft-gold/10 to-accent/5 rounded-3xl p-8 border border-soft-gold/20">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                  Jak umówić się na konsultację?
                </h2>
                
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center flex-shrink-0 border border-border/50">
                        <step.icon className="w-6 h-6 text-soft-gold" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-soft-gold">Krok {index + 1}</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact buttons */}
              <div className="bg-card rounded-2xl p-6 border border-border/50">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
                  Skontaktuj się ze mną
                </h3>
                <div className="grid gap-3">
                  <Button variant="gold" size="lg" asChild className="w-full justify-start">
                    <a href="https://api.whatsapp.com/send?phone=48785669901" target="_blank" rel="noreferrer">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp: +48 785 669 901
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full justify-start">
                    <a href="mailto:formafkkf@gmail.com">
                      <Mail className="w-5 h-5" />
                      Email: formafkkf@gmail.com
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full justify-start">
                    <a href="https://www.instagram.com/magdalena.zajac.mentor" target="_blank" rel="noreferrer">
                      <Phone className="w-5 h-5" />
                      Instagram: @magdalena.zajac.mentor
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card rounded-3xl p-8 md:p-10 border border-border/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-soft-gold" />
              <h2 className="font-serif text-2xl font-semibold text-foreground">
                Co zyskasz podczas konsultacji?
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {consultationBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl"
                >
                  <CheckCircle className="w-5 h-5 text-soft-gold flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/80 text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Masz pytania? Nie wahaj się napisać!
            </p>
            <Button variant="gold" size="lg" asChild>
              <a href="https://api.whatsapp.com/send?phone=48785669901" target="_blank" rel="noreferrer">
                <MessageCircle className="w-5 h-5" />
                Napisz na WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Consultation;
