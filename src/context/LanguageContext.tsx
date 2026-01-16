"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    "nav.work": "Work",
    "nav.gallery": "Gallery",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.contact": "Contact",

    // Hero
    "hero.role": "Fullstack Developer",
    "hero.location": "Made in Recife, Brazil",
    "hero.copyright": "Portfolio © 2026",
    "hero.scroll": "Scroll to Explore",
    "hero.subtitle": "Fullstack Developer & Creative Technologist",

    // About
    "about.label": "( About )",
    "about.title": "Creating digital experiences that matter",
    "about.description1":
      "I'm a creative fullstack developer passionate about building immersive digital experiences. With expertise in modern web technologies, both frontend and backend, I transform ideas into engaging, interactive realities.",
    "about.description2":
      "My approach combines technical precision with artistic vision, creating complete solutions from database to user interface that are not just functional, but memorable.",
    "about.years": "Years Experience",
    "about.projects": "Projects Completed",
    "about.clients": "Happy Clients",
    "about.image_caption": "Building the future, one line of code at a time",

    // Services
    "services.label": "( Services )",
    "services.title": "What I can do for you and your business",
    "services.web.title": "Fullstack Development",
    "services.web.description":
      "Building high-performance, scalable web applications with cutting-edge technologies like Next.js, React, Node.js, and TypeScript. From database design to beautiful interfaces.",
    "services.backend.title": "Backend Development",
    "services.backend.description":
      "Creating robust APIs, microservices, and server-side solutions using Node.js, Python, PostgreSQL, MongoDB, and cloud services like AWS and Vercel.",
    "services.creative.title": "Creative Coding",
    "services.creative.description":
      "Crafting unique digital experiences with WebGL, Three.js, and custom animations that push creative boundaries.",
    "services.motion.title": "Motion Design",
    "services.motion.description":
      "Creating fluid animations and micro-interactions that bring interfaces to life and enhance user engagement.",

    // Work
    "work.label": "( Selected Work )",
    "work.title": "Featured projects that showcase my expertise and creativity",
    "work.view_all": "View All Projects",

    // Gallery
    "gallery.label": "( Gallery )",
    "gallery.title": "Other projects and creative explorations",

    // Contact
    "contact.label": "( Get in Touch )",
    "contact.title": "Let's create something amazing together",
    "contact.description":
      "Have a project in mind? I'd love to hear about it. Let's talk about how we can work together.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.location": "Location",

    // Footer
    "footer.rights": "All Rights Reserved",
    "footer.back_to_top": "Back to Top",

    // Marquee
    "marquee.available": "Available for Projects",
  },
  pt: {
    // Header
    "nav.work": "Trabalhos",
    "nav.gallery": "Galeria",
    "nav.about": "Sobre",
    "nav.services": "Serviços",
    "nav.contact": "Contato",

    // Hero
    "hero.role": "Desenvolvedor Fullstack",
    "hero.location": "Made in Recife, PE",
    "hero.copyright": "Portfólio © 2026",
    "hero.scroll": "Role para Explorar",
    "hero.subtitle": "Desenvolvedor Fullstack & Tecnologista Criativo",

    // About
    "about.label": "( Sobre )",
    "about.title": "Criando experiências digitais que importam",
    "about.description1":
      "Sou um desenvolvedor fullstack criativo apaixonado por construir experiências digitais imersivas. Com expertise em tecnologias web modernas, tanto frontend quanto backend, transformo ideias em realidades interativas e envolventes.",
    "about.description2":
      "Minha abordagem combina precisão técnica com visão artística, criando soluções completas do banco de dados à interface do usuário que não são apenas funcionais, mas memoráveis.",
    "about.years": "Anos de Experiência",
    "about.projects": "Projetos Concluídos",
    "about.clients": "Clientes Satisfeitos",
    "about.image_caption":
      "Construindo o futuro, uma linha de código por vez",

    // Services
    "services.label": "( Serviços )",
    "services.title": "O que posso fazer por você e seu negócio",
    "services.web.title": "Desenvolvimento Fullstack",
    "services.web.description":
      "Construindo aplicações web de alta performance e escaláveis com tecnologias de ponta como Next.js, React, Node.js e TypeScript. Do design de banco de dados a interfaces bonitas.",
    "services.backend.title": "Desenvolvimento Backend",
    "services.backend.description":
      "Criando APIs robustas, microsserviços e soluções server-side usando Node.js, Python, PostgreSQL, MongoDB e serviços de nuvem como AWS e Vercel.",
    "services.creative.title": "Código Criativo",
    "services.creative.description":
      "Criando experiências digitais únicas com WebGL, Three.js e animações customizadas que desafiam os limites criativos.",
    "services.motion.title": "Design de Movimento",
    "services.motion.description":
      "Criando animações fluidas e micro-interações que dão vida às interfaces e aumentam o engajamento do usuário.",

    // Work
    "work.label": "( Trabalhos Selecionados )",
    "work.title": "Projetos em destaque que demonstram minha expertise e criatividade",
    "work.view_all": "Ver Todos os Projetos",

    // Gallery
    "gallery.label": "( Galeria )",
    "gallery.title": "Outros projetos e explorações criativas",

    // Contact
    "contact.label": "( Entre em Contato )",
    "contact.title": "Vamos criar algo incrível juntos",
    "contact.description":
      "Tem um projeto em mente? Adoraria ouvir sobre ele. Vamos conversar sobre como podemos trabalhar juntos.",
    "contact.email": "E-mail",
    "contact.phone": "Telefone",
    "contact.location": "Localização",

    // Footer
    "footer.rights": "Todos os Direitos Reservados",
    "footer.back_to_top": "Voltar ao Topo",

    // Marquee
    "marquee.available": "Disponível para Projetos",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
