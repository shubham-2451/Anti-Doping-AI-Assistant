import { Shield, Mail, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-secondary" />
              <span className="font-display text-lg font-bold">
                AntiDope<span className="text-secondary">AI</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              AI-powered anti-doping assistant helping athletes stay compliant
              with WADA regulations. Check your prescriptions, know your
              substances, compete clean.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-secondary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Banned Substances", path: "/banned-substances" },
                { label: "Banned Medicines", path: "/banned-medicines" },
                { label: "Check Prescription", path: "/check-prescription" },
                { label: "Register / Login", path: "/auth" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display font-semibold text-secondary mb-4">
              Official Resources
            </h3>
            <ul className="space-y-2">
              {[
                { label: "WADA Prohibited List 2026", url: "https://www.wada-ama.org/en/prohibited-list" },
                { label: "WADA Official Website", url: "https://www.wada-ama.org" },
                { label: "Global DRO (Drug Reference)", url: "https://www.globaldro.com" },
                { label: "ADAMS Anti-Doping System", url: "https://adams.wada-ama.org" },
              ].map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2026 AntiDopeAI. For informational purposes only. Always consult WADA
            and your sport's anti-doping authority.
          </p>
          <a
            href="mailto:support@antidopeai.com"
            className="text-xs text-primary-foreground/50 hover:text-secondary transition-colors inline-flex items-center gap-1"
          >
            <Mail className="h-3 w-3" />
            support@antidopeai.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
