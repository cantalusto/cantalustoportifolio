"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const letters = "CANTALUSTO".split("");

export default function HeroSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: {
      y: 200,
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden border-b border-border"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern" />

      {/* Animated corner elements */}
      <motion.div
        className="absolute top-24 left-8 text-xs font-mono uppercase tracking-widest text-muted"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {t("hero.role")}
      </motion.div>

      <motion.div
        className="absolute top-24 right-8 text-xs font-mono uppercase tracking-widest text-muted"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {t("hero.location")}
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 text-xs font-mono uppercase tracking-widest text-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {t("hero.copyright")}
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-xs font-mono uppercase tracking-widest text-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {t("hero.scroll")}
      </motion.div>

      {/* Main hero content */}
      <motion.div
        className="relative z-10 text-center px-4"
        style={{ y, opacity, scale }}
      >
        {/* Main title - CANTALUSTO */}
        <motion.div
          className="overflow-visible"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-center perspective-1000">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-display text-foreground inline-block"
                variants={letterVariants}
                style={{ transformStyle: "preserve-3d" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mt-8"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-lg md:text-xl text-muted font-light tracking-wide">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="mt-12 w-24 h-[1px] bg-foreground mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="w-[1px] h-16 bg-foreground/30"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
