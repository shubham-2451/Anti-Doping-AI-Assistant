import { ArrowRight, Shield, Search, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with light overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-1.5 mb-6">
          <Shield className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-primary-foreground/90">
            WADA 2026 Compliant
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
          Your AI-Powered
          <br />
          <span className="text-secondary">Anti-Doping</span> Assistant
        </h1>

        <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
          Instantly check if your medications contain banned substances. Upload
          prescriptions via text, image, or voice — stay compliant, compete clean.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link to="/check-prescription">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2 text-base px-8 py-6">
              <Search className="h-5 w-5" />
              Check Prescription
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/auth">
            <Button size="lg" variant="outline" className="border-primary-foreground/50 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 gap-2 text-base px-8 py-6">
              Register as Athlete
            </Button>
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { icon: Shield, title: "Banned Substances", desc: "Complete WADA 2026 prohibited list" },
            { icon: FileCheck, title: "Prescription Check", desc: "Upload & analyze medications instantly" },
            { icon: Search, title: "Medicine Search", desc: "Search any medicine for banned ingredients" },
          ].map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-5 text-left hover:scale-105 transition-transform"
            >
              <f.icon className="h-8 w-8 text-secondary mb-3" />
              <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
