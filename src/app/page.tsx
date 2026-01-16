import {
  Header,
  HeroSection,
  AboutSection,
  MarqueeSection,
  WorkSection,
  ServicesSection,
  GallerySection,
  BigTextSection,
  ContactSection,
  Footer,
} from "@/components";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <AboutSection />
      <MarqueeSection />
      <WorkSection />
      <ServicesSection />
      <GallerySection />
      <BigTextSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
