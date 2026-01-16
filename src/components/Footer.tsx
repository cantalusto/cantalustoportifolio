"use client";

import { motion } from "framer-motion";
import LineReveal from "./LineReveal";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo / Name */}
          <LineReveal>
            <MagneticButton>
              <a href="#" className="text-2xl font-bold tracking-tighter hoverable">
                CANTALUSTO
              </a>
            </MagneticButton>
          </LineReveal>

          {/* Copyright */}
          <LineReveal delay={0.1}>
            <p className="text-xs font-mono text-muted uppercase tracking-widest">
              © {currentYear} {t("footer.rights")}
            </p>
          </LineReveal>

          {/* Back to top */}
          <LineReveal delay={0.2}>
            <MagneticButton>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300 hoverable"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {t("footer.back_to_top")}
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↑
                </motion.span>
              </motion.button>
            </MagneticButton>
          </LineReveal>
        </div>
      </div>
    </footer>
  );
}
