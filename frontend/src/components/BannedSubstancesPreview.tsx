import { AlertTriangle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "S0 — Non-Approved Substances",
    examples: ["BPC-157", "GW1516", "DMAA"],
    risk: "Always Prohibited",
  },
  {
    name: "S1 — Anabolic Agents",
    examples: ["Testosterone", "Nandrolone", "Stanozolol", "Trenbolone"],
    risk: "Always Prohibited",
  },
  {
    name: "S2 — Peptide Hormones & Growth Factors",
    examples: ["EPO (Erythropoietin)", "HGH", "IGF-1"],
    risk: "Always Prohibited",
  },
  {
    name: "S3 — Beta-2 Agonists",
    examples: ["Salbutamol (above threshold)", "Formoterol", "Vilanterol"],
    risk: "Always Prohibited",
  },
  {
    name: "S5 — Diuretics & Masking Agents",
    examples: ["Furosemide", "Hydrochlorothiazide", "Probenecid"],
    risk: "Always Prohibited",
  },
  {
    name: "S6 — Stimulants",
    examples: ["Amphetamine", "Ephedrine", "Methylphenidate"],
    risk: "In-Competition Only",
  },
];

const BannedSubstancesPreview = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-banned/10 rounded-full px-4 py-1.5 mb-4">
            <AlertTriangle className="h-4 w-4 text-banned" />
            <span className="text-sm font-medium text-banned">Prohibited List</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Banned Substances & Chemicals
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Based on the WADA 2026 Prohibited List. These substances are banned for
            all athletes in and out of competition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display font-semibold text-foreground text-sm leading-tight">
                  {cat.name}
                </h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ml-2 ${
                    cat.risk === "Always Prohibited"
                      ? "bg-banned/10 text-banned"
                      : "bg-warning/10 text-warning"
                  }`}
                >
                  {cat.risk}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-xs bg-muted text-muted-foreground rounded-md px-2 py-1"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/banned-substances">
            <Button variant="outline" className="gap-2">
              View Complete Prohibited List
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BannedSubstancesPreview;
