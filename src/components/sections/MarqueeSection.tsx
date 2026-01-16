"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Python",
  "AWS",
  "Docker",
  "Framer Motion",
  "Three.js",
  "Tailwind CSS",
];

export default function MarqueeSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden border-b border-border"
    >
      {/* First row */}
      <motion.div className="flex whitespace-nowrap mb-8" style={{ x: x1 }}>
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
          (item, index) => (
            <span
              key={index}
              className="text-headline mx-8 text-foreground/10 hover:text-foreground transition-colors duration-300"
            >
              {item}
            </span>
          )
        )}
      </motion.div>

      {/* Second row - reverse */}
      <motion.div className="flex whitespace-nowrap" style={{ x: x2 }}>
        {[...marqueeItems, ...marqueeItems, ...marqueeItems]
          .reverse()
          .map((item, index) => (
            <span
              key={index}
              className="text-headline mx-8 text-foreground/10 hover:text-foreground transition-colors duration-300"
            >
              {item}
            </span>
          ))}
      </motion.div>
    </section>
  );
}
