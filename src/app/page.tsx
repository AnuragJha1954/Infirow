import HeroSection from "@/components/HeroSection";
import VisionSection from "@/components/VisionSection";
import ProductsSection from "@/components/ProductsSection";
import FeaturesSection from "@/components/FeaturesSection";
import SocialProofSection from "@/components/SocialProofSection";
import HowWeThinkSection from "@/components/HowWeThinkSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <VisionSection />
      <ProductsSection />
      <FeaturesSection />
      <SocialProofSection />
      <HowWeThinkSection />
      <Footer />
    </main>
  );
}
