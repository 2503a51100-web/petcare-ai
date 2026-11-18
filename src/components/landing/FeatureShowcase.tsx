import React from 'react';
import {
  Sparkles,
  HeartPulse,
  Scale,
  CalendarCheck,
  ShieldCheck,
  FileCheck2,
  Stethoscope,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface FeatureShowcaseProps {
  onExploreFeature: (featureId: string) => void;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onExploreFeature }) => {
  const features = [
    {
      id: 'triage',
      title: 'PawPal Clinical AI Triage',
      description:
        'Proprietary veterinary AI trained on over 2.4 million clinical cases to assess symptoms, evaluate urgency, and flag emergencies instantly.',
      icon: Sparkles,
      iconColor: 'text-coral',
      bgColor: 'bg-coral-soft/50',
      tag: 'Trained on 2.4M+ Cases',
      actionView: 'chat',
    },
    {
      id: 'vitals',
      title: 'Real-Time Biometric Tracking',
      description:
        'Continuous telemetry for resting heart rate, respiratory cadence, activity scores, and body condition scoring mapped against breed baselines.',
      icon: HeartPulse,
      iconColor: 'text-emerald-brand',
      bgColor: 'bg-emerald-50',
      tag: 'Breed-Specific Curves',
      actionView: 'pets',
    },
    {
      id: 'weight',
      title: 'Precision Weight Trajectory',
      description:
        'Prevent canine and feline obesity with algorithmic target weight curves, weekly progress milestones, and tailored dietary recalculations.',
      icon: Scale,
      iconColor: 'text-forest',
      bgColor: 'bg-forest-50',
      tag: 'Milestone Tracking',
      actionView: 'pets',
    },
    {
      id: 'appointments',
      title: 'Verified Tele-Vet & Clinic Booking',
      description:
        'Direct calendar integration with board-certified small animal internists, feline surgeons, and dermatologists without tedious phone tag.',
      icon: CalendarCheck,
      iconColor: 'text-emerald-brand',
      bgColor: 'bg-emerald-50',
      tag: 'Instant Confirmation',
      actionView: 'appointments',
    },
    {
      id: 'vault',
      title: 'Centralized Clinical Health Vault',
      description:
        'Encrypted storage for blood panels, ultrasound reports, rabies certificates, microchip registry, and pharmaceutical history.',
      icon: FileCheck2,
      iconColor: 'text-forest',
      bgColor: 'bg-forest-50',
      tag: 'Encrypted & Portable',
      actionView: 'records',
    },
    {
      id: 'allergy',
      title: 'Nutritional & Toxic Allergy Guard',
      description:
        'Instant ingredient analysis against dangerous toxic foods (theobromine, xylitol, grapes) and custom allergy alerts for sensitive pets.',
      icon: ShieldCheck,
      iconColor: 'text-coral',
      bgColor: 'bg-coral-soft/50',
      tag: '24/7 Poison Shield',
      actionView: 'chat',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white relative border-y border-sage-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage text-forest text-xs font-bold uppercase tracking-wider">
            Veterinary SaaS Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight">
            Engineered for Clinical Depth. <br />
            Designed for Modern Pet Parents.
          </h2>
          <p className="text-base text-charcoal-muted leading-relaxed">
            Eliminate health guesswork with intelligent diagnostics, proactive immunization tracking, and synchronized medical continuity.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                onClick={() => onExploreFeature(feature.actionView)}
                className="group relative p-8 rounded-3xl bg-ivory/50 border border-sage-border hover:border-emerald-200 hover:bg-white transition-all duration-300 card-hover-lift cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <span className="text-[11px] font-bold text-forest bg-sage/80 px-2.5 py-1 rounded-full border border-sage-border">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-forest group-hover:text-emerald-brand transition-colors mb-2.5">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-charcoal-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-sage-border flex items-center gap-2 text-xs font-bold text-forest group-hover:text-emerald-brand transition-colors">
                  <span>Explore in Dashboard</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
