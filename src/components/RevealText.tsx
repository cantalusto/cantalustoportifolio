"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function RevealText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
}: RevealTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = children.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden mr-[0.25em]">
          <motion.span className="inline-block" variants={child}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
