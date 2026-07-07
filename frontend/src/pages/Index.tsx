import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BannedSubstancesPreview from "@/components/BannedSubstancesPreview";
import PrescriptionCheckerPreview from "@/components/PrescriptionCheckerPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="section-divider" />
      <BannedSubstancesPreview />
      <div className="section-divider" />
      <PrescriptionCheckerPreview />
      <Footer />
    </div>
  );
};

export default Index;
