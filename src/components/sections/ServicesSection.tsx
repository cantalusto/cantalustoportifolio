"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LineReveal from "../LineReveal";
import RevealText from "../RevealText";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const services = [
    {
      number: "01",
      title: t("services.web.title"),
      description: t("services.web.description"),
    },
    {
      number: "02",
      title: t("services.backend.title"),
      description: t("services.backend.description"),
    },
    {
      number: "03",
      title: t("services.creative.title"),
      description: t("services.creative.description"),
    },
    {
      number: "04",
      title: t("services.motion.title"),
      description: t("services.motion.description"),
    },
  ];

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative py-32 md:py-48 bg-foreground text-background overflow-hidden"
    >
      {/* Background animated text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        <span className="text-[20vw] font-black text-background/[0.02] uppercase whitespace-nowrap">
          SERVICES
        </span>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-24 md:mb-32">
          <LineReveal>
            <span className="text-xs font-mono uppercase tracking-widest text-background/50 mb-8 block">
              {t("services.label")}
            </span>
          </LineReveal>

          <h2 className="text-headline max-w-4xl">
            <RevealText>{t("services.title")}</RevealText>
          </h2>
        </div>

        {/* Services grid */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group border-t border-background/10 py-12 md:py-16 hoverable"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="grid grid-cols-12 gap-4 items-start">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="text-xs font-mono text-background/50">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-4">
                  <motion.h3
                    className="text-title"
                    whileHover={{ x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.title}
                  </motion.h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-6 md:col-start-6 mt-4 md:mt-0">
                  <p className="text-background/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:block col-span-1 text-right">
                  <motion.span
                    className="inline-block text-xl text-background/30"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
