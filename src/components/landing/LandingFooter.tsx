import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { Heart, Send, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';

interface LandingFooterProps {
  onNavigate: (view: string) => void;
  onEmergencyClick: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onNavigate,
  onEmergencyClick,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-forest text-white border-t border-forest-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" light={true} showTagline={true} />
            <p className="text-xs text-white/70 max-w-sm leading-relaxed mt-3">
              PetCare AI is the next-generation veterinary intelligence SaaS platform, bridging proactive home monitoring with certified clinical excellence.
            </p>
            <div className="pt-2">
              <button
                onClick={onEmergencyClick}
                className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-rose-400" />
                <span>24/7 Veterinary Emergency Dispatch</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-light">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Dashboard Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pets')}
                  className="hover:text-white transition-colors"
                >
                  Pet Profiles & Vitals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chat')}
                  className="hover:text-white transition-colors"
                >
                  PawPal AI Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('appointments')}
                  className="hover:text-white transition-colors"
                >
                  Veterinary Scheduling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('records')}
                  className="hover:text-white transition-colors"
                >
                  Health Records Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Specialties */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-light">
              Clinical Specialties
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>Small Animal Internal Medicine</li>
              <li>Feline Oncology & Surgery</li>
              <li>Canine Dermatology & Allergy</li>
              <li>Orthopedic Gait Reconstruction</li>
              <li>Emergency Toxicology & Triage</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-light">
              Veterinary Digest
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Subscribe to weekly preventative medicine insights, toxic recall alerts, and seasonal breed care.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                ✓ You're subscribed to PetCare AI Clinical Digest!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-emerald-light"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-emerald-brand hover:bg-emerald-light text-forest font-bold text-xs transition-colors shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/50 gap-4">
          <p>
            © {new Date().getFullYear()} PetCare AI Inc. All rights reserved. Built with veterinary clinical ethics.
          </p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Clinical Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">HIPAA/Vet Records Security</span>
          </div>
        </div>

        <div className="mt-4 text-[10px] text-white/40 leading-relaxed border-t border-white/5 pt-4">
          <strong>Veterinary Disclaimer:</strong> PawPal AI provides algorithmic triage assessment and educational guidance based on verified veterinary guidelines. It is not a substitute for professional in-person diagnostic examination, clinical pathology, or emergency intervention. Always consult a licensed veterinarian for urgent conditions.
        </div>
      </div>
    </footer>
  );
};
