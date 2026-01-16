"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LineReveal from "../LineReveal";
import RevealText from "../RevealText";
import { useLanguage } from "@/context/LanguageContext";

const projects = [
  {
    id: 1,
    title: "InvestNest",
    categoryEn: "Landing Page • Next.js",
    categoryPt: "Landing Page • Next.js",
    descriptionEn: "Landing page with various animations",
    descriptionPt: "Landing page com várias animações",
    year: "2026",
    image: "/investlanding.png",
  },
  {
    id: 2,
    title: "DigitalNest",
    categoryEn: "Institutional Website • Next.js",
    categoryPt: "Site Institucional • Next.js",
    descriptionEn: "Institutional website with various animations",
    descriptionPt: "Site institucional com várias animações",
    year: "",
    image: "/digital.png",
  },
  {
    id: 3,
    title: "Amigo Fiel",
    categoryEn: "Pet Platform • React, Node.js",
    categoryPt: "Plataforma Pet • React, Node.js",
    descriptionEn: "Platform for pet lovers",
    descriptionPt: "Plataforma para amantes de pets",
    year: "",
    image: "/amigofiel.png",
  },
  {
    id: 4,
    title: "Esperança",
    categoryEn: "Social Project • Web Application",
    categoryPt: "Projeto Social • Aplicação Web",
    descriptionEn: "Social impact project",
    descriptionPt: "Projeto de impacto social",
    year: "",
    image: "/esperanca.png",
  },
];

function ProjectCard({
  project,
  index,
  language,
}: {
  project: (typeof projects)[0];
  index: number;
  language: "pt" | "en";
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const category = language === "pt" ? project.categoryPt : project.categoryEn;

  return (
    <motion.div
      ref={cardRef}
      className="group relative border-b border-border py-8 md:py-12 hoverable"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Number */}
        <div className="col-span-1 hidden md:block">
          <span className="text-xs font-mono text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <div className="col-span-12 md:col-span-5">
          <motion.h3
            className="text-title md:text-headline"
            animate={{ x: isHovered ? 20 : 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {project.title}
          </motion.h3>
        </div>

        {/* Category */}
        <div className="col-span-6 md:col-span-3">
          <span className="text-sm text-muted">{category}</span>
        </div>

        {/* Year */}
        <div className="col-span-3 md:col-span-2">
          <span className="text-sm font-mono text-muted">{project.year}</span>
        </div>

        {/* Arrow */}
        <div className="col-span-3 md:col-span-1 text-right">
          <motion.span
            className="inline-block text-xl"
            animate={{ x: isHovered ? 10 : 0, rotate: isHovered ? -45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            →
          </motion.span>
        </div>
      </div>

      {/* Hover image preview - aparece inline abaixo */}
      <motion.div
        className="overflow-hidden mt-4"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isHovered ? "auto" : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-10 md:col-start-2">
            <motion.div
              className="relative aspect-[16/9] overflow-hidden rounded-lg"
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WorkSection() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-32 md:py-48 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-24">
          <LineReveal>
            <span className="text-xs font-mono uppercase tracking-widest text-muted mb-8 block">
              {t("work.label")}
            </span>
          </LineReveal>

          <h2 className="text-headline max-w-4xl">
            <RevealText>{t("work.title")}</RevealText>
          </h2>
        </div>

        {/* Projects list */}
        <div className="relative">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-4 pb-6 border-b border-border mb-4">
            <div className="col-span-1">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                No.
              </span>
            </div>
            <div className="col-span-5">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                {language === "pt" ? "Projeto" : "Project"}
              </span>
            </div>
            <div className="col-span-3">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                {language === "pt" ? "Tecnologias" : "Technologies"}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-xs font-mono uppercase tracking-widest text-muted">
                {language === "pt" ? "Ano" : "Year"}
              </span>
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Project cards */}
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} language={language} />
          ))}
        </div>

        {/* View all button */}
        <LineReveal delay={0.5}>
          <div className="mt-16 text-center">
            <motion.a
              href="https://github.com/cantalusto"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 text-sm font-mono uppercase tracking-widest border border-foreground px-8 py-4 hoverable"
              whileHover={{ backgroundColor: "#0a0a0a", color: "#f5f5f5" }}
              transition={{ duration: 0.3 }}
            >
              {t("work.view_all")}
              <span>→</span>
            </motion.a>
          </div>
        </LineReveal>
      </div>
    </section>
  );
}
