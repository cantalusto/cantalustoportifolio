"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LineReveal from "../LineReveal";
import RevealText from "../RevealText";
import { useLanguage } from "@/context/LanguageContext";

const galleryImages = [
  {
    src: "/falaquegasto.png",
    title: "Fala Que Gasto",
    categoryEn: "Finance App • React, TypeScript",
    categoryPt: "App de Finanças • React, TypeScript",
  },
  {
    src: "/escape.png",
    title: "Escape",
    categoryEn: "Awareness Game • JavaScript, HTML",
    categoryPt: "Jogo de Conscientização • JavaScript, HTML",
  },
  {
    src: "/escolamusica.png",
    title: "Escola de Música",
    categoryEn: "Music School System • React, PostgreSQL, Cloud",
    categoryPt: "Sistema Escola de Música • React, PostgreSQL, Nuvem",
  },
  {
    src: "/document.png",
    title: "Document",
    categoryEn: "Meeting Notes App • Angular",
    categoryPt: "App de Atas de Reunião • Angular",
  },
];

function GalleryItem({
  image,
  index,
  language,
}: {
  image: (typeof galleryImages)[0];
  index: number;
  language: "pt" | "en";
}) {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  const category = language === "pt" ? image.categoryPt : image.categoryEn;

  return (
    <motion.div
      ref={itemRef}
      className={`relative overflow-hidden hoverable ${
        index % 3 === 1 ? "md:mt-32" : ""
      }`}
      style={{ y: index % 2 === 0 ? y : undefined }}
    >
      <motion.div
        className="relative aspect-[4/5] overflow-hidden bg-foreground/5"
        whileHover={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <motion.img
          src={image.src}
          alt={image.title}
          className="w-full h-full object-cover"
          style={{ scale }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-foreground/80 flex flex-col items-center justify-center opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-xs font-mono uppercase tracking-widest text-background/50 mb-2">
            {category}
          </span>
          <h4 className="text-2xl text-background font-bold">{image.title}</h4>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function GallerySection() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);

  return (
    <section
      id="gallery"
      ref={containerRef}
      className="relative py-32 md:py-48 border-b border-border overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-24">
          <LineReveal>
            <span className="text-xs font-mono uppercase tracking-widest text-muted mb-8 block">
              {t("gallery.label")}
            </span>
          </LineReveal>

          <h2 className="text-headline max-w-4xl">
            <RevealText>{t("gallery.title")}</RevealText>
          </h2>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <GalleryItem key={index} image={image} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}
