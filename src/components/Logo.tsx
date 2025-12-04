import { motion } from "framer-motion";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`font-serif text-3xl font-bold tracking-tight ${className}`}
    >
      <span className="text-primary">M</span>
      <span className="text-soft-gold">Z</span>
    </motion.div>
  );
};

export default Logo;
