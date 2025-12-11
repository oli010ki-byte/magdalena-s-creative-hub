import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Button asChild variant="outline" size="sm" className="mb-6">
              <Link to="/products">
                <ArrowLeft className="w-4 h-4" />
                Powrót do sklepu
              </Link>
            </Button>
            
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-6">
              Suplementacja FOREVER
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              Odkryj pełną gamę produktów Forever Living - naturalne suplementy diety, 
              napoje aloesowe i kosmetyki najwyższej jakości. Wszystkie produkty oparte 
              są na certyfikowanym aloe vera i składnikach naturalnych.
            </p>
            
            <div className="bg-card/50 rounded-2xl p-6 border border-border/50 mb-12">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-3">
                Chcesz zamówić?
              </h2>
              <p className="text-muted-foreground mb-4">
                Skontaktuj się ze mną, aby dowiedzieć się więcej o produktach Forever 
                i dobrać odpowiednią suplementację do Twoich potrzeb.
              </p>
              <Button variant="gold" asChild>
                <a href="mailto:kontakt@example.com">Skontaktuj się</a>
              </Button>
            </div>
          </motion.div>

          {/* Image Gallery */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foreverImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative overflow-hidden bg-secondary/30">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground text-center">
                    {image.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForeverProducts;
