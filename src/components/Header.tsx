"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");
  const [showName, setShowName] = useState(false);

  const navItems = [
    { key: "hero", label: language === "pt" ? "Início" : "Home" },
    { key: "about", label: t("nav.about") },
    { key: "services", label: t("nav.services") },
    { key: "contact", label: t("nav.contact") },
  ];

  const sectionLabels: { [key: string]: string } = {
    work: language === "pt" ? "trabalhos/" : "work/",
    about: language === "pt" ? "sobre/" : "about/",
    services: language === "pt" ? "serviços/" : "services/",
    contact: language === "pt" ? "contato/" : "contact/",
    gallery: language === "pt" ? "galeria/" : "gallery/",
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "work", "gallery", "about", "services", "contact"];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      const heroHeight = window.innerHeight;

      // Show name after leaving hero
      setShowName(window.scrollY > heroHeight * 0.5);

      // If at top, set hero as active
      if (window.scrollY < heroHeight * 0.5) {
        setActiveSection("hero");
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("hero");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {/* Mobile Header */}
      <nav className="md:hidden flex items-center justify-between px-4 py-4">
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {showName ? (
              <motion.a
                key="name"
                href="#"
                className="text-white text-sm font-bold tracking-wider uppercase"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                CANTALUSTO
              </motion.a>
            ) : (
              <motion.span
                key="section"
                className="text-white text-sm font-medium italic"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {activeSection ? sectionLabels[activeSection] : ""}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Section indicator when name is showing */}
        <AnimatePresence>
          {showName && activeSection && (
            <motion.span
              className="text-white/70 text-xs font-medium italic mr-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {sectionLabels[activeSection]}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Language Toggle Mobile */}
        <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider">
          <button
            onClick={() => setLanguage("pt")}
            className={`px-1.5 py-1 rounded transition-colors duration-300 ${
              language === "pt"
                ? "bg-white text-black"
                : "text-white/70"
            }`}
          >
            PT
          </button>
          <span className="text-white/50">/</span>
          <button
            onClick={() => setLanguage("en")}
            className={`px-1.5 py-1 rounded transition-colors duration-300 ${
              language === "en"
                ? "bg-white text-black"
                : "text-white/70"
            }`}
          >
            EN
          </button>
        </div>
      </nav>

      {/* Desktop Header */}
      <nav className="hidden md:flex items-center justify-between px-12 py-6">
        <div className="min-w-[200px] h-6 flex items-center">
          <AnimatePresence mode="wait">
            {showName && (
              <MagneticButton>
                <motion.a
                  key="name-desktop"
                  href="#"
                  className="text-white text-sm font-medium tracking-wider uppercase"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  CantaLusto
                  <span className="text-white/70 text-xs ml-2">Developer</span>
                </motion.a>
              </MagneticButton>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-12">
          {navItems.map((item, index) => (
            <MagneticButton key={index}>
              <motion.a
                href={`#${item.key}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = item.key === "hero" 
                    ? document.body 
                    : document.getElementById(item.key);
                  if (target) {
                    const targetPosition = item.key === "hero" 
                      ? 0 
                      : target.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`text-sm font-medium tracking-wider uppercase relative overflow-hidden group ${
                  activeSection === item.key ? "text-white" : "text-white/60"
                }`}
                whileHover="hover"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left"
                  initial={{ scaleX: activeSection === item.key ? 1 : 0 }}
                  animate={{ scaleX: activeSection === item.key ? 1 : 0 }}
                  variants={{
                    hover: { scaleX: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </MagneticButton>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Language Toggle Desktop */}
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => setLanguage("pt")}
              className={`px-2 py-1 rounded transition-colors duration-300 ${
                language === "pt"
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              PT
            </button>
            <span className="text-white/50">/</span>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 rounded transition-colors duration-300 ${
                language === "en"
                  ? "bg-white text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
