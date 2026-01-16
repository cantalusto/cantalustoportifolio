"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "../RevealText";
import LineReveal from "../LineReveal";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 md:py-48 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <LineReveal>
          <span className="text-xs font-mono uppercase tracking-widest text-muted mb-16 block">
            {t("about.label")}
          </span>
        </LineReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left column - Text */}
          <div className="space-y-8">
            <motion.h2
              className="text-headline"
              style={{ y: textY }}
            >
              <RevealText>{t("about.title")}</RevealText>
            </motion.h2>

            <LineReveal delay={0.2}>
              <p className="text-lg text-muted leading-relaxed">
                {t("about.description1")}
              </p>
            </LineReveal>

            <LineReveal delay={0.3}>
              <p className="text-lg text-muted leading-relaxed">
                {t("about.description2")}
              </p>
            </LineReveal>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
              {[
                { number: "5+", label: t("about.years") },
                { number: "50+", label: t("about.projects") },
                { number: "20+", label: t("about.clients") },
              ].map((stat, index) => (
                <LineReveal key={index} delay={0.4 + index * 0.1}>
                  <div>
                    <span className="text-title block">{stat.number}</span>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted">
                      {stat.label}
                    </span>
                  </div>
                </LineReveal>
              ))}
            </div>
          </div>

          {/* Right column - Image */}
          <motion.div
            className="relative aspect-[3/4] overflow-hidden bg-foreground/5"
            style={{ y: imageY }}
          >
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img
                src="/minhafoto.png"
                alt="Lucas Cantarelli Lustosa"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* Overlay text */}
            <div className="absolute bottom-6 left-6 right-6">
              <LineReveal delay={0.6}>
                <p className="text-xs font-mono uppercase tracking-widest text-white mix-blend-difference">
                  {t("about.image_caption")}
                </p>
              </LineReveal>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
