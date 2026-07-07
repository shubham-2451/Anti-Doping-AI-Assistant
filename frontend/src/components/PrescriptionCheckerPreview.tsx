import { FileText, Camera, Mic, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrescriptionCheckerPreview = () => {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5 mb-4">
              <CheckCircle2 className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">Core Feature</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              AI Prescription Checker
            </h2>
            <p className="text-muted-foreground mb-8">
              Upload your doctor's prescription and our AI will instantly analyze
              every medication for banned substances. Get detailed reports with
              safe alternatives when needed.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Identifies all banned chemicals in your medicines",
                "Sport-specific compliance checking",
                "Suggests safe alternative medications",
                "Keeps history of all your checks",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-safe mt-0.5 shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Link to="/check-prescription">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 gap-2">
                Try Prescription Checker
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Right — upload options */}
          <div className="space-y-4">
            {[
              {
                icon: FileText,
                title: "Text Input",
                desc: "Type or paste your prescription details",
                color: "text-primary",
                bg: "bg-primary/10",
              },
              {
                icon: Camera,
                title: "Image Upload",
                desc: "Take a photo or upload an image of your prescription",
                color: "text-secondary",
                bg: "bg-secondary/10",
              },
              {
                icon: Mic,
                title: "Voice Input",
                desc: "Dictate your prescription details via voice",
                color: "text-warning",
                bg: "bg-warning/10",
              },
            ].map((option, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 flex items-start gap-5 hover:shadow-lg transition-shadow"
              >
                <div className={`${option.bg} rounded-lg p-3`}>
                  <option.icon className={`h-6 w-6 ${option.color}`} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{option.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionCheckerPreview;
