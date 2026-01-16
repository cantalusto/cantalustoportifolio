"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LineRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export default function LineReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: LineRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionVariants = {
    up: { y: 100, opacity: 0 },
    down: { y: -100, opacity: 0 },
    left: { x: 100, opacity: 0 },
    right: { x: -100, opacity: 0 },
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={directionVariants[direction]}
        animate={
          isInView
            ? { y: 0, x: 0, opacity: 1 }
            : directionVariants[direction]
        }
        transition={{
          duration: 0.8,
          delay: delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
