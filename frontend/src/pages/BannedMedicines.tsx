import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Pill, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

const bannedMedicines = [
  { name: "Deca-Durabolin", generic: "Nandrolone Decanoate", category: "S1 — Anabolic Agents", bannedChemical: "Nandrolone", status: "banned" },
  { name: "Winstrol", generic: "Stanozolol", category: "S1 — Anabolic Agents", bannedChemical: "Stanozolol", status: "banned" },
  { name: "Dianabol", generic: "Methandienone", category: "S1 — Anabolic Agents", bannedChemical: "Methandienone", status: "banned" },
  { name: "Anadrol", generic: "Oxymetholone", category: "S1 — Anabolic Agents", bannedChemical: "Oxymetholone", status: "banned" },
  { name: "Genotropin", generic: "Somatropin (rHGH)", category: "S2 — Peptide Hormones", bannedChemical: "Human Growth Hormone", status: "banned" },
  { name: "NeoRecormon", generic: "Epoetin Beta", category: "S2 — Peptide Hormones", bannedChemical: "Erythropoietin (EPO)", status: "banned" },
  { name: "Aranesp", generic: "Darbepoetin Alfa", category: "S2 — Peptide Hormones", bannedChemical: "Darbepoetin", status: "banned" },
  { name: "Lasix", generic: "Furosemide", category: "S5 — Diuretics", bannedChemical: "Furosemide", status: "banned" },
  { name: "HydroDiuril", generic: "Hydrochlorothiazide", category: "S5 — Diuretics", bannedChemical: "Hydrochlorothiazide", status: "banned" },
  { name: "Aldactone", generic: "Spironolactone", category: "S5 — Diuretics", bannedChemical: "Spironolactone", status: "banned" },
  { name: "Adderall", generic: "Mixed Amphetamine Salts", category: "S6 — Stimulants", bannedChemical: "Amphetamine", status: "banned" },
  { name: "Ritalin", generic: "Methylphenidate", category: "S6 — Stimulants", bannedChemical: "Methylphenidate", status: "banned" },
  { name: "Provigil", generic: "Modafinil", category: "S6 — Stimulants", bannedChemical: "Modafinil", status: "banned" },
  { name: "Sudafed", generic: "Pseudoephedrine", category: "S6 — Stimulants", bannedChemical: "Pseudoephedrine (>150mcg/ml)", status: "caution" },
  { name: "OxyContin", generic: "Oxycodone", category: "S7 — Narcotics", bannedChemical: "Oxycodone", status: "banned" },
  { name: "MS Contin", generic: "Morphine Sulfate", category: "S7 — Narcotics", bannedChemical: "Morphine", status: "banned" },
  { name: "Duragesic", generic: "Fentanyl Transdermal", category: "S7 — Narcotics", bannedChemical: "Fentanyl", status: "banned" },
  { name: "Prednisolone", generic: "Prednisolone (Oral)", category: "S9 — Glucocorticoids", bannedChemical: "Prednisolone", status: "banned" },
  { name: "Dexamethasone", generic: "Dexamethasone (Oral/IV)", category: "S9 — Glucocorticoids", bannedChemical: "Dexamethasone", status: "banned" },
  { name: "Nolvadex", generic: "Tamoxifen", category: "S4 — Hormone Modulators", bannedChemical: "Tamoxifen", status: "banned" },
  { name: "Clomid", generic: "Clomiphene Citrate", category: "S4 — Hormone Modulators", bannedChemical: "Clomiphene", status: "banned" },
  { name: "Mildronate", generic: "Meldonium", category: "S4 — Hormone Modulators", bannedChemical: "Meldonium", status: "banned" },
  { name: "Ventolin", generic: "Salbutamol Inhaler", category: "S3 — Beta-2 Agonists", bannedChemical: "Salbutamol (above 1600mcg/24h)", status: "caution" },
  { name: "Inderal", generic: "Propranolol", category: "P1 — Beta-Blockers", bannedChemical: "Propranolol", status: "sport-specific" },
];

const BannedMedicines = () => {
  const [search, setSearch] = useState("");

  const filtered = bannedMedicines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.generic.toLowerCase().includes(search.toLowerCase()) ||
      m.bannedChemical.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Banned Medicines List
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Common branded medicines that contain WADA-prohibited substances. Search
              by brand name, generic name, or banned chemical.
            </p>
          </div>

          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search medicines (e.g., Ventolin, Furosemide)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-banned" />
              <span className="text-muted-foreground">Banned</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Caution (Threshold)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Sport-Specific</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Medicine</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Generic Name</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Banned Chemical</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m, i) => (
                    <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="font-medium text-foreground text-sm">{m.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{m.generic}</td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-banned font-medium">{m.bannedChemical}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{m.category}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          m.status === "banned" ? "bg-banned/10 text-banned" :
                          m.status === "caution" ? "bg-warning/10 text-warning" :
                          "bg-primary/10 text-primary"
                        }`}>
                          {m.status === "banned" ? "Banned" : m.status === "caution" ? "Caution" : "Sport-Specific"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No medicines found matching your search.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BannedMedicines;
