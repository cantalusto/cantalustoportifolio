"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MaskTextProps {
  children: string;
  className?: string;
}

export default function MaskText({ children, className = "" }: MaskTextProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  });

  const lines = children.split("\n");

  return (
    <div ref={ref} className={className}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="overflow-hidden">
          <motion.p
            style={{
              y: useTransform(
                scrollYProgress,
                [0, 1],
                [50 + lineIndex * 10, 0]
              ),
              opacity: useTransform(scrollYProgress, [0, 1], [0, 1]),
            }}
          >
            {line}
          </motion.p>
        </div>
      ))}
    </div>
  );
}
