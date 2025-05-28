
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import FurnitureCatalog from "@/components/FurnitureCatalog";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <FurnitureCatalog />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
