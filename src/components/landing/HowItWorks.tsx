import React, { useState } from 'react';
import { UserPlus, Sparkles, Stethoscope, Award, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartNow: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartNow }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Initialize Smart Companion Profile',
      tagline: 'Breed-specific baseline & genetics',
      desc: 'Input your pet’s species, breed, age, target weight, allergies, and prior clinical records. PetCare AI automatically maps standard biometric thresholds for that exact breed.',
      icon: UserPlus,
      highlight: 'Tailored for 300+ Dog & Cat Breeds',
      previewDetails: {
        name: 'Luna Vance',
        breed: 'Golden Retriever (Female, 3y)',
        target: '63.0 lbs',
        vitals: 'Resting Heart Rate: 78 bpm',
      },
    },
    {
      num: '02',
      title: 'Real-Time PawPal AI Triage',
      tagline: '24/7 symptom analysis & urgency triage',
      desc: 'Notice unusual limping, coughing, or lethargy? Describe symptoms to PawPal AI. The clinical model evaluates severity across Routine, Monitor, Urgent, or Emergency tiers.',
      icon: Sparkles,
      highlight: 'Under 3-Second Triage Assessment',
      previewDetails: {
        query: 'Luna is limping on her right front paw after fetch.',
        triageResult: 'Severity: Monitor (Mild strain or paw pad foreign object)',
        actions: 'Enforce 48h rest, inspect pad webbing, cold compress.',
      },
    },
    {
      num: '03',
      title: 'Connect with Certified Specialists',
      tagline: 'Zero-friction booking & record sharing',
      desc: 'Book verified veterinarians with full access to your pet’s pre-analyzed AI triage report and medical vault. Choose between in-person clinic visits and instant tele-health calls.',
      icon: Stethoscope,
      highlight: 'Top 5% Licensed Doctors of Vet Medicine',
      previewDetails: {
        doctor: 'Dr. Marcus Vance, DVM, DACVIM',
        clinic: 'Metropolitan Veterinary Hospital',
        status: 'Appointment Confirmed (DHPP Booster)',
      },
    },
    {
      num: '04',
      title: 'Proactive Longevity & Prevention',
      tagline: 'Automated reminders & health optimization',
      desc: 'Never miss a booster, tick preventative, or dental cleaning. Get smart weight trends, nutrition guidance, and clinical summaries exported directly for travel or insurance claims.',
      icon: Award,
      highlight: 'Zero Lapsed Immunizations',
      previewDetails: {
        schedule: 'DHPP Booster Due Nov 28',
        weightTrend: '-0.3 lbs this month (On target)',
        status: 'Optimal Condition Score 5/9',
      },
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-50 text-forest text-xs font-bold uppercase tracking-wider">
            Clinical Continuity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight">
            How PetCare AI Safeguards Your Companion
          </h2>
          <p className="text-base text-charcoal-muted leading-relaxed">
            A continuous loop of biometric awareness, instant veterinary triage, and board-certified interventions.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Step Selector */}
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-emerald-brand shadow-medium scale-[1.02]'
                      : 'bg-white/60 border-sage-border hover:bg-white/90 hover:border-sage'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`text-lg font-black shrink-0 ${
                        isSelected ? 'text-emerald-brand' : 'text-charcoal-light'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-forest">
                          {step.title}
                        </h3>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-brand bg-emerald-50 px-2 py-0.5 rounded-full">
                            Active Stage
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-charcoal-light mt-0.5">
                        {step.tagline}
                      </p>
                      <p className="text-xs text-charcoal-muted mt-2 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Stage Interactive Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 border border-sage-border shadow-premium relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-sage-border pb-5 mb-6">
                <div>
                  <span className="text-xs font-bold text-emerald-brand uppercase tracking-wider">
                    Stage {steps[activeStep].num} Simulation
                  </span>
                  <h4 className="text-xl font-bold text-forest mt-1">
                    {steps[activeStep].title}
                  </h4>
                </div>
                <div className="p-3 rounded-2xl bg-forest-50 text-forest">
                  {React.createElement(steps[activeStep].icon, { className: 'w-6 h-6 text-emerald-brand' })}
                </div>
              </div>

              {/* Dynamic Content Preview Box */}
              <div className="p-5 rounded-2xl bg-ivory/80 border border-sage-border space-y-4 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-forest">Simulated Clinical Output</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {steps[activeStep].highlight}
                  </span>
                </div>

                {activeStep === 0 && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-sage">
                      <span className="text-charcoal-muted">Patient Profile:</span>
                      <span className="font-bold text-forest">{steps[0].previewDetails.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sage">
                      <span className="text-charcoal-muted">Breed Specification:</span>
                      <span className="font-bold text-forest">{steps[0].previewDetails.breed}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sage">
                      <span className="text-charcoal-muted">Baseline Vitals:</span>
                      <span className="font-bold text-emerald-brand font-semibold">{steps[0].previewDetails.vitals}</span>
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-sage-border text-charcoal">
                      <p className="font-semibold text-forest mb-1">User Symptom Query:</p>
                      <p className="text-charcoal-muted">"{steps[1].previewDetails.query}"</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                      <p className="font-bold mb-1">{steps[1].previewDetails.triageResult}</p>
                      <p className="text-[11px] text-amber-800">{steps[1].previewDetails.actions}</p>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-sage">
                      <span className="text-charcoal-muted">Matched Specialist:</span>
                      <span className="font-bold text-forest">{steps[2].previewDetails.doctor}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sage">
                      <span className="text-charcoal-muted">Center:</span>
                      <span className="font-bold text-forest">{steps[2].previewDetails.clinic}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-center">
                      {steps[2].previewDetails.status}
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-sage">
                      <span className="text-charcoal-muted">Automated Calendar Event:</span>
                      <span className="font-bold text-forest">{steps[3].previewDetails.schedule}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-sage">
                      <span className="text-charcoal-muted">Target Weight Health:</span>
                      <span className="font-bold text-emerald-brand">{steps[3].previewDetails.weightTrend}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-charcoal-muted">Longevity Score:</span>
                      <span className="font-bold text-forest">{steps[3].previewDetails.status}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom CTA */}
              <button
                onClick={onStartNow}
                className="w-full py-3.5 px-6 rounded-2xl bg-forest text-white font-bold text-sm hover:bg-forest-800 transition-all btn-primary-glow flex items-center justify-center gap-2"
              >
                <span>Experience PetCare AI Now</span>
                <ArrowRight className="w-4 h-4 text-emerald-light" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
