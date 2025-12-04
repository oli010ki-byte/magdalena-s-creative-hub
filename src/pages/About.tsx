import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-medium text-soft-gold mb-4">
                Poznaj mnie
              </span>
              <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
                O mnie
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-secondary">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
                    alt="Magdalena Zając"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-soft-gold/20 rounded-full blur-2xl" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-6"
              >
                <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground">
                  Cześć, jestem Magdalena
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Od lat pomagam ludziom odkrywać ich wewnętrzny potencjał i budować 
                    autentyczne relacje z samym sobą. Wierzę, że każdy z nas ma w sobie 
                    niesamowitą moc do zmiany.
                  </p>
                  <p>
                    Moja droga do rozwoju osobistego była pełna wyzwań, ale to właśnie 
                    one nauczyły mnie najwięcej. Dziś dzielę się tą wiedzą przez aplikację 
                    Me2Me, kursy i indywidualne sesje coachingowe.
                  </p>
                  <p>
                    Jestem certyfikowanym coachem, autorką e-booków i twórczynią 
                    innowacyjnej aplikacji do samorozwoju. Moją misją jest wspieranie 
                    innych w drodze do lepszej wersji siebie.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card rounded-3xl p-10 border border-border/50"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-8 text-center">
                Moje wartości
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Autentyczność",
                    description: "Bycie sobą to pierwszy krok do prawdziwej zmiany",
                  },
                  {
                    title: "Empatia",
                    description: "Rozumienie siebie i innych buduje głębsze relacje",
                  },
                  {
                    title: "Rozwój",
                    description: "Każdy dzień to szansa na stanie się lepszą wersją siebie",
                  },
                ].map((value, index) => (
                  <div key={value.title} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-soft-gold/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                      <span className="font-serif text-xl font-bold text-accent">
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-semibold text-foreground mb-2">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
