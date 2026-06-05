import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  // Spring smoothing — feels natural, not jumpy
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] pointer-events-none origin-left"
      style={{
        height: "2px",
        scaleX,
        backgroundColor: "#9C7B59",
        opacity: 0.7,
      }}
    />
  );
};

export default ScrollProgress;