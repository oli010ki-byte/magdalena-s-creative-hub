import { motion } from "framer-motion";
import { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const PageTransition = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
    animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
    exit={{    opacity: 0, y: -8,  filter: "blur(2px)" }}
    transition={{ duration: 0.38, ease: EASE }}
  >
    {children}
  </motion.div>
);

export default PageTransition;