import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, AlertTriangle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const allSubstances = [
  { category: "S0 — Non-Approved Substances", substances: ["BPC-157", "GW1516 (Cardarine)", "DMAA (Methylhexanamine)", "AOD-9604", "SARMs (all types)", "Ibutamoren (MK-677)"], risk: "Always", sports: "All Sports" },
  { category: "S1 — Anabolic Agents", substances: ["Testosterone", "Nandrolone", "Stanozolol", "Trenbolone", "Boldenone", "Oxandrolone", "Methandienone", "Clenbuterol", "DHEA", "Androstenedione", "Tibolone", "Zeranol"], risk: "Always", sports: "All Sports" },
  { category: "S2 — Peptide Hormones & Growth Factors", substances: ["EPO (Erythropoietin)", "HGH (Human Growth Hormone)", "IGF-1", "Darbepoetin", "GHRP-6", "Mechano Growth Factor", "CJC-1295", "Ipamorelin", "Peginesatide"], risk: "Always", sports: "All Sports" },
  { category: "S3 — Beta-2 Agonists", substances: ["Salbutamol (above 1600mcg/24h)", "Formoterol (above 54mcg/24h)", "Vilanterol", "Terbutaline", "Salmeterol", "Fenoterol", "Higenamine"], risk: "Always", sports: "All Sports" },
  { category: "S4 — Hormone & Metabolic Modulators", substances: ["Tamoxifen", "Clomiphene", "Letrozole", "Anastrozole", "Insulin", "Meldonium", "Trimetazidine", "GW1516", "AICAR"], risk: "Always", sports: "All Sports" },
  { category: "S5 — Diuretics & Masking Agents", substances: ["Furosemide", "Hydrochlorothiazide", "Spironolactone", "Probenecid", "Desmopressin", "Plasma Expanders", "Mannitol (IV)", "Acetazolamide", "Triamterene"], risk: "Always", sports: "All Sports" },
  { category: "S6 — Stimulants", substances: ["Amphetamine", "Ephedrine (>10mcg/ml)", "Methylphenidate", "Modafinil", "Cocaine", "MDMA", "Mephentermine", "Strychnine", "Pseudoephedrine (>150mcg/ml)", "Cathine (>5mcg/ml)"], risk: "In-Competition", sports: "All Sports" },
  { category: "S7 — Narcotics", substances: ["Morphine", "Oxycodone", "Fentanyl", "Hydromorphone", "Methadone", "Buprenorphine", "Pentazocine"], risk: "In-Competition", sports: "All Sports" },
  { category: "S8 — Cannabinoids", substances: ["THC (Marijuana)", "Hashish", "Synthetic Cannabinoids (JWH-018, HU-210)"], risk: "In-Competition", sports: "All Sports" },
  { category: "S9 — Glucocorticoids", substances: ["Prednisolone (oral/IV/IM/rectal)", "Dexamethasone", "Betamethasone", "Triamcinolone", "Cortisone", "Hydrocortisone", "Methylprednisolone", "Budesonide (oral)"], risk: "In-Competition", sports: "All Sports" },
  { category: "P1 — Beta-Blockers", substances: ["Propranolol", "Atenolol", "Metoprolol", "Bisoprolol", "Nadolol", "Timolol"], risk: "Sport-Specific", sports: "Archery, Shooting, Golf, Automobile, Billiards" },
  { category: "M1 — Blood Manipulation", substances: ["Blood Transfusion", "Synthetic Oxygen Carriers (HBOCs)", "Efaproxiral"], risk: "Always", sports: "All Sports" },
  { category: "M2 — Chemical & Physical Manipulation", substances: ["IV Infusions (>100ml/12h)", "Catheterization", "Urine Substitution", "Sample Tampering"], risk: "Always", sports: "All Sports" },
  { category: "M3 — Gene & Cell Doping", substances: ["Gene Editing (CRISPR)", "Gene Transfer", "Gene Silencing", "Cell-Based Technologies"], risk: "Always", sports: "All Sports" },
];

const BannedSubstances = () => {
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState("All");

  const filtered = allSubstances
    .map((cat) => ({
      ...cat,
      substances: cat.substances.filter((s) =>
        s.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.substances.length > 0)
    .filter((cat) => filterRisk === "All" || cat.risk === filterRisk);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Banned Substances & Chemicals
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete WADA 2026 Prohibited List of all banned chemicals and ingredients
              for athletes across all sports.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search substances..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {["All", "Always", "In-Competition", "Sport-Specific"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterRisk(f)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                    filterRisk === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Substance list */}
          <div className="space-y-4">
            {filtered.map((cat, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-banned shrink-0" />
                    <h2 className="font-display font-semibold text-foreground">{cat.category}</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      cat.risk === "Always" ? "bg-banned/10 text-banned" :
                      cat.risk === "In-Competition" ? "bg-warning/10 text-warning" :
                      "bg-primary/10 text-primary"
                    }`}>
                      {cat.risk} Prohibited
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      {cat.sports}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.substances.map((s) => (
                    <span
                      key={s}
                      className="text-sm bg-banned/5 text-foreground border border-banned/20 rounded-lg px-3 py-1.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No substances found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BannedSubstances;
