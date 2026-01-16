"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { key: "work", label: t("nav.work") },
    { key: "about", label: t("nav.about") },
    { key: "services", label: t("nav.services") },
    { key: "contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.key);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

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
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 mix-blend-difference"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <MagneticButton>
          <a
            href="#"
            className="text-white text-sm font-medium tracking-wider uppercase"
          >
            CantaLusto
            <span className="text-white/70 text-xs ml-2">Developer</span>
          </a>
        </MagneticButton>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item, index) => (
            <MagneticButton key={index}>
              <motion.a
                href={`#${item.key}`}
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
          {/* Language Toggle */}
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

          <MagneticButton>
            <button className="flex flex-col gap-[6px] p-2 md:hidden">
              <span className="w-6 h-[2px] bg-white"></span>
              <span className="w-6 h-[2px] bg-white"></span>
            </button>
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}
