import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Activity, CheckCircle, Play, Stethoscope } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onTryChat: () => void;
  onBookVet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onGetStarted,
  onTryChat,
  onBookVet,
}) => {
  return (
    <section className="relative pt-6 pb-20 overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-coral-soft/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Storytelling & Action */}
          <div className="lg:col-span-7 space-y-7">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forest-50 border border-forest-200/60 text-forest text-xs font-bold shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-brand"></span>
              </span>
              <span>Next-Gen Veterinary AI SaaS</span>
              <span className="text-forest/30">•</span>
              <span className="text-emerald-brand font-extrabold">Clinical Precision</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest tracking-tight leading-[1.12]">
              Every Paw Deserves <br />
              <span className="bg-gradient-to-r from-forest via-emerald-brand to-emerald-dark bg-clip-text text-transparent">
                Smarter Care.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-charcoal-muted max-w-2xl font-normal leading-relaxed">
              Transforming how pet parents and veterinary specialists monitor health. From instant AI symptom triage and automated vaccine forecasting to direct consultations with board-certified practitioners.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="px-7 py-4 rounded-2xl bg-forest text-white font-bold text-base hover:bg-forest-800 transition-all btn-primary-glow flex items-center gap-3 group"
              >
                <span>Launch PetCare Dashboard</span>
                <ArrowRight className="w-5 h-5 text-emerald-light group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onTryChat}
                className="px-6 py-4 rounded-2xl bg-white border border-sage-border text-forest font-bold text-base hover:bg-sage/40 transition-all shadow-soft flex items-center gap-2.5"
              >
                <Sparkles className="w-5 h-5 text-coral" />
                <span>Ask PawPal AI</span>
              </button>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-sage-border grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-2xl font-extrabold text-forest">99.4%</p>
                <p className="text-xs text-charcoal-muted font-medium mt-0.5">Triage Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-forest">14,200+</p>
                <p className="text-xs text-charcoal-muted font-medium mt-0.5">Companions Monitored</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-forest">24/7</p>
                <p className="text-xs text-charcoal-muted font-medium mt-0.5">Veterinary AI Shield</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Pet Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-premium border-4 border-white bg-sage aspect-[4/5] sm:aspect-[4/4.5] group">
                <img
                  src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1000&q=85"
                  alt="Luna the Golden Retriever healthy and happy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />

                {/* Bottom Card Inside Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-dark text-white border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base">Luna Vance</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-md bg-emerald-brand text-white">
                          Verified Health 96%
                        </span>
                      </div>
                      <p className="text-xs text-white/80 mt-0.5">
                        Golden Retriever • 3 yrs • Optimal conditioning
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                      <Heart className="w-5 h-5 text-coral fill-coral" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Top-Left Widget: Live Vitals */}
              <div className="absolute -top-4 -left-6 sm:-left-8 p-3.5 rounded-2xl glass-card shadow-premium border border-white max-w-[210px] animate-float">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 flex items-center justify-center text-forest">
                    <Activity className="w-5 h-5 text-emerald-brand" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-charcoal-muted">Biometric Vitals</p>
                    <p className="text-sm font-extrabold text-forest">78 bpm <span className="text-xs font-normal text-emerald-brand font-bold">• Normal</span></p>
                  </div>
                </div>
              </div>

              {/* Floating Bottom-Right Widget: PawPal AI Triage badge */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 p-4 rounded-2xl bg-white shadow-premium border border-sage-border max-w-[240px] animate-slide-up">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-coral-soft flex items-center justify-center text-coral-dark shrink-0">
                    <Sparkles className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-forest">PawPal AI Active</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-brand" />
                    </div>
                    <p className="text-[11px] text-charcoal-muted mt-1 leading-snug">
                      "DHPP booster scheduled for Nov 28 with Dr. Vance."
                    </p>
                  </div>
                </div>
              </div>

              {/* Cat Companion Bubble Avatar */}
              <div className="absolute top-1/2 -right-5 sm:-right-8 p-1.5 bg-white rounded-2xl shadow-medium border border-sage-border flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80"
                  alt="Milo the Cat"
                  className="w-11 h-11 rounded-xl object-cover"
                />
                <div className="pr-2">
                  <p className="text-xs font-bold text-forest">Milo</p>
                  <p className="text-[10px] font-semibold text-emerald-brand">100% Up-to-date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
