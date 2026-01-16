"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LineReveal from "../LineReveal";
import RevealText from "../RevealText";
import MagneticButton from "../MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative py-32 md:py-48 min-h-screen flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section header */}
        <LineReveal>
          <span className="text-xs font-mono uppercase tracking-widest text-muted mb-16 block">
            {t("contact.label")}
          </span>
        </LineReveal>

        {/* Main CTA */}
        <motion.div className="mb-24" style={{ y, opacity }}>
          <h2 className="text-display mb-8">
            <RevealText>{t("contact.title")}</RevealText>
          </h2>

          <LineReveal delay={0.3}>
            <p className="text-xl md:text-2xl text-muted max-w-2xl">
              {t("contact.description")}
            </p>
          </LineReveal>
        </motion.div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-border pt-16">
          {/* Email */}
          <LineReveal delay={0.4}>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-4">
                {t("contact.email")}
              </span>
              <MagneticButton>
                <a
                  href="mailto:cantalusto@gmail.com"
                  className="text-base md:text-2xl hover:text-accent transition-colors duration-300 hoverable break-all"
                >
                  cantalusto@gmail.com
                </a>
              </MagneticButton>
            </div>
          </LineReveal>

          {/* Phone */}
          <LineReveal delay={0.5}>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-4">
                {t("contact.phone")}
              </span>
              <MagneticButton>
                <a
                  href="tel:+5581986875695"
                  className="text-base md:text-2xl hover:text-accent transition-colors duration-300 hoverable"
                >
                  (81) 98687-5695
                </a>
              </MagneticButton>
            </div>
          </LineReveal>

          {/* Location */}
          <LineReveal delay={0.6}>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-muted block mb-4">
                {t("contact.location")}
              </span>
              <p className="text-base md:text-2xl">Recife, PE – Brasil</p>
            </div>
          </LineReveal>
        </div>

        {/* Social links */}
        <div className="mt-24 pt-16 border-t border-border">
          <div className="flex flex-wrap gap-8 md:gap-16">
            <LineReveal delay={0.7}>
              <MagneticButton>
                <a
                  href="https://github.com/cantalusto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300 hoverable"
                >
                  GitHub
                </a>
              </MagneticButton>
            </LineReveal>
            <LineReveal delay={0.8}>
              <MagneticButton>
                <a
                  href="https://www.linkedin.com/in/lucas-cantarelli-lustosa-aab5492ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300 hoverable"
                >
                  LinkedIn
                </a>
              </MagneticButton>
            </LineReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
