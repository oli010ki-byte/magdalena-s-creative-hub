import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import magdaPhoto from "@/assets/magda-photo.jpg";

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

            <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-cream to-secondary">
                  <img
                    src={magdaPhoto}
                    alt="Magdalena Zając"
                    className="w-full h-full object-cover object-top"
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
                  Magdalena Zając
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Od dziecka towarzyszyła mi wysoka energia, miłość do pasji, sportu, ludzi, 
                    podróży i dotykania świata tam — gdzie — czuję sercem.
                  </p>
                  <p>
                    Zawsze kiełkowały we mnie poszukiwania. Poszukiwania dobrych relacji i pytanie: 
                    „jak?" — jak rozumieć, jak budować, jak działać, by móc żyć w zgodzie ze sobą 
                    i tworzyć to, co czuję intuicją i sercem. Tworzyć to — co prawdziwie wspiera 
                    i rozpala własny potencjał.
                  </p>
                  <p className="font-medium text-foreground">
                    Mentor holistyczny i biznesowy, konsultant edukacyjny, trener, towarzysz — 
                    to moja pasja, która stała się zawodem.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Extended content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 text-muted-foreground leading-relaxed mb-16 -mt-2"
            >
              <p>
                Bazuję na nurcie TSR, przez co w swojej pracy koncentruję się na rozwiązaniach, 
                możliwościach i tym, co już działa — zamiast analizować trudności. Stawiam na małe, 
                codzienne możliwe na już do wdrożenia kroki, które prowadzą do realnych i trwałych efektów.
              </p>
              <p>
                Łączę psychologię, ekonomię, świadomy ruch, żywienie funkcjonalne i suplementację — 
                by tworzyć procesy i narzędzia dające długofalową efektywność, stabilność i rozwój 
                w zgodzie z własnym potencjałem.
              </p>
              <p className="font-medium text-foreground">
                Jestem Twórczynią aplikacji Me2Me — systemu wspierającego codzienny rytm ciała, 
                emocji, umysłu, a przede wszystkim skuteczności w działaniu.
              </p>
              <p>
                W pracy kieruję się prostotą, wdrażalnością i efektem, który można poczuć w codzienności. 
                Moje podejście jest wspierające i ukierunkowane na realną zmianę — krok po kroku, 
                bez presji, w rytmie, który wzmacnia i czuciu, który jest dla mnie priorytetem.
              </p>
              <p>
                We wszystkim co robię kieruję się strategią win-win, wygrany — wygrany, wiedząc, 
                że tylko wtedy, kiedy dwie strony odczuwają swoje zasoby — powstają długofalowe, 
                dobre, pożądane efekty, sukcesy i nietuzinkowe projekty.
              </p>
            </motion.div>

            {/* Invitation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-card rounded-3xl p-10 border border-border/50 text-center"
            >
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Zapraszam
              </h3>
              <p className="text-lg text-muted-foreground mb-2">
                Magda
              </p>
              <p className="text-soft-gold font-medium">
                Mentor holistyczny i biznesowy
              </p>
              <p className="text-accent font-semibold mt-2">
                Me2Me
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
