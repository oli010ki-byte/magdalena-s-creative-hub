import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
const Index = () => {
  return <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-light-beige to-background" />
        <div className="absolute inset-0 opacity-30 bg-[#d9d2c9] text-[#d8d0c5]">
          <div className="absolute top-20 left-10 w-72 h-72 bg-soft-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }} className="text-center max-w-4xl mx-auto">
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="inline-flex items-center gap-2 bg-cream px-4 py-2 rounded-full text-sm text-muted-foreground mb-8">
              <Sparkles className="w-4 h-4 text-soft-gold bg-[#d8d1c5] text-[#563524]" />
              Witaj w mojej przestrzeni
            </motion.div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight">
              Magdalena
              <span className="block text-gradient">Zając</span>
            </h1>

            <p className="text-soft-gold font-medium mb-4 text-[sidebar-primary-foreground] bg-white text-[#f6f3ef]">
              Mentor holistyczny i biznesowy
            </p>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Tworzę przestrzeń holistycznego zadbania o siebie w obszarach: 
              <span className="block mt-2 font-medium text-foreground">
                Aktywność • Funkcjonalne żywienie • Suplementacja na bazie natury • Mental - rozwój osobisty
              </span>
              <span className="block mt-2 text-soft-gold bg-primary-foreground text-[#a09283]">Mentor w nurcie TSR</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="gold" size="xl">
                <Link to="/me2me">
                  Poznaj Me2Me
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/about">O mnie</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
              Co znajdziesz na tej stronie
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Wszystko, czego potrzebujesz do rozpoczęcia swojej podróży
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
            icon: Sparkles,
            title: "Aplikacja Me2Me",
            description: "Autorska aplikacja do rozwoju osobistego i samopoznania",
            link: "/me2me"
          }, {
            icon: Heart,
            title: "Produkty",
            description: "Kursy, e-booki i usługi wspierające Twoją transformację",
            link: "/products"
          }, {
            icon: Star,
            title: "Materiały wideo",
            description: "Filmy edukacyjne i inspirujące treści",
            link: "/videos"
          }].map((feature, index) => <motion.div key={feature.title} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: index * 0.1
          }}>
                <Link to={feature.link} className="block bg-background rounded-2xl p-8 hover-lift border border-border/50 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-soft-gold/20 to-accent/20 flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-[#774f2c]" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Link>
              </motion.div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-soft-gold/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="bg-card rounded-3xl p-10 md:p-16 text-center border border-border/50 shadow-card">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Gotowa na zmianę?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Dołącz do tysięcy osób, które już odkryły swoją wewnętrzną siłę dzięki Me2Me
            </p>
            <Button asChild variant="gold" size="lg">
              <Link to="/products">
                Zobacz produkty
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>;
};
export default Index;