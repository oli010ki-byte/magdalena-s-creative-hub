import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

import forever1 from "@/assets/forever/forever-1.png";
import forever2 from "@/assets/forever/forever-2.png";
import forever3 from "@/assets/forever/forever-3.png";
import forever4 from "@/assets/forever/forever-4.png";
import forever5 from "@/assets/forever/forever-5.png";
import forever6 from "@/assets/forever/forever-6.png";
import forever7 from "@/assets/forever/forever-7.png";
import forever8 from "@/assets/forever/forever-8.png";
import forever9 from "@/assets/forever/forever-9.png";
import forever10 from "@/assets/forever/forever-10.png";

const foreverImages = [
  { src: forever1, alt: "Forever Aloe Berry Nectar" },
  { src: forever2, alt: "Produkty Forever Aloe" },
  { src: forever3, alt: "Forever Arctic-Sea i Aloe Berry Nectar" },
  { src: forever4, alt: "Forever Lite Ultra" },
  { src: forever5, alt: "Forever kosmetyki - pasta, mydło, szampon" },
  { src: forever6, alt: "Forever Aloe Liquid Soap" },
  { src: forever7, alt: "Forever suplementy - Arctic-Sea, Nature-Min, Daily" },
  { src: forever8, alt: "Forever Aloe Mango" },
  { src: forever9, alt: "Forever Aloe Vera Gel" },
  { src: forever10, alt: "Forever Aloe Berry Nectar" },
];

const ForeverProducts = () => {
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
                <Leaf className="w-6 h-6 text-foreground/70" />
              </div>
              <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">
                Naturalna suplementacja
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-8">
              Suplementacja FOREVER
            </h1>
            
            {/* CTA Card */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-secondary/50 rounded-3xl p-8 md:p-10 border border-border/30 mb-16 max-w-3xl"
            >
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">
                Jeśli chcesz zaopatrzyć się w produkty bez zakładania numeru klienta — 
                wejdź w link gościa do mojego sklepu internetowego, zapraszam serdecznie!
              </p>
              <p className="text-muted-foreground mb-8">
                Wszystkie produkty dostępne ze zniżką wspierając Magdalenę.
              </p>
              <Button variant="gold" size="lg" asChild className="shadow-md hover:shadow-lg transition-shadow">
                <a 
                  href="https://thealoeveraco.shop/zm1HDvyX" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <ExternalLink className="w-5 h-5" />
                  Przejdź do sklepu FOREVER
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
              Przykładowe produkty
            </h2>
            <p className="text-muted-foreground">
              Naturalne suplementy, napoje aloesowe i kosmetyki Forever Living
            </p>
          </motion.div>

          {/* Image Gallery */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {foreverImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group bg-secondary/30 rounded-2xl overflow-hidden border border-border/20 hover:border-border/50 hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 bg-card/50">
                  <p className="text-sm text-foreground/70 text-center font-medium">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Pełna oferta produktów dostępna w sklepie online
            </p>
            <Button variant="outline" size="lg" asChild>
              <a 
                href="https://thealoeveraco.shop/zm1HDvyX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Odwiedź sklep FOREVER
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ForeverProducts;
