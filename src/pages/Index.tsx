
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FurnitureCatalog from "@/components/FurnitureCatalog";
import FeaturesSection from "@/components/FeaturesSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FurnitureCatalog />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
