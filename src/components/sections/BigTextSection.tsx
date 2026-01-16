"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function BigTextSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const words = ["DESIGN", "DEVELOP", "DELIVER"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      y: 200,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-64 overflow-hidden bg-foreground"
    >
      <motion.div
        className="flex flex-col items-center gap-2 md:gap-4"
        style={{ x, opacity }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {words.map((word, index) => (
          <div key={index} className="overflow-hidden">
            <motion.span
              className={`block text-[12vw] md:text-[15vw] font-black leading-[0.85] tracking-tighter ${
                index === 1
                  ? "text-transparent [-webkit-text-stroke:1px_#f5f5f5] md:[-webkit-text-stroke:2px_#f5f5f5]"
                  : "text-background"
              }`}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
