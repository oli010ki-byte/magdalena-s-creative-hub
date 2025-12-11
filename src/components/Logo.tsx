import { motion } from "framer-motion";
import logoImage from "@/assets/logo.png";

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <img 
        src={logoImage} 
        alt="MZ Logo" 
        className="h-12 w-auto"
      />
    </motion.div>
  );
};

export default Logo;
