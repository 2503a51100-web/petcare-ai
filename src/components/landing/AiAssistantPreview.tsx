import React, { useState } from 'react';
import { Sparkles, Send, ShieldAlert, ArrowRight, Bot, User, CheckCircle } from 'lucide-react';
import { sampleChatPresets } from '../../data/mockData';

interface AiAssistantPreviewProps {
  onOpenFullChat: () => void;
}

export const AiAssistantPreview: React.FC<AiAssistantPreviewProps> = ({ onOpenFullChat }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);

  const activePreset = sampleChatPresets[selectedPresetIndex];

  return (
    <section className="py-20 bg-forest text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-light/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-light text-xs font-bold border border-white/10">
              <Sparkles className="w-4 h-4 text-coral" />
              <span>Meet PawPal AI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              A Pediatric-Level AI Companion for Every Pet Parent.
            </h2>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Trained on extensive veterinary clinical guidelines, pharmacology tables, and breed specific pathology. PawPal AI analyzes symptoms, explains lab work, and flags acute emergencies with zero delay.
            </p>

            {/* Quick Prompt Selectors */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-light mb-3">
                Try a real clinical question:
              </p>
              <div className="space-y-2">
                {sampleChatPresets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPresetIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      selectedPresetIndex === idx
                        ? 'bg-white/15 border-emerald-light text-white shadow-soft'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="line-clamp-1">{preset.prompt}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ml-2 shrink-0 ${
                        preset.severity === 'Urgent'
                          ? 'bg-rose-500/80 text-white'
                          : preset.severity === 'Monitor'
                          ? 'bg-amber-500/80 text-white'
                          : 'bg-emerald-500/80 text-white'
                      }`}
                    >
                      {preset.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenFullChat}
                className="px-6 py-3.5 rounded-2xl bg-emerald-brand hover:bg-emerald-light text-forest font-bold text-sm transition-all shadow-emerald-glow flex items-center gap-2 group"
              >
                <span>Open Full Interactive PawPal Chat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Chat Interface Preview */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-forest-900 border border-white/15 shadow-premium overflow-hidden">
              {/* Chat Window Header */}
              <div className="p-4 bg-forest-950/80 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-brand to-emerald-light flex items-center justify-center text-forest shadow-sm">
                      <Sparkles className="w-5 h-5 text-forest" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-forest-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">PawPal AI</h4>
                      <span className="text-[10px] font-bold bg-coral/20 text-coral px-1.5 py-0.5 rounded">
                        Veterinary AI Model v2.4
                      </span>
                    </div>
                    <p className="text-[11px] text-white/60">
                      Context: Luna (Golden Retriever, 3y, 64 lbs)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Active Session
                  </span>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="p-6 space-y-4 max-h-[420px] overflow-y-auto bg-forest-900/90 text-sm">
                {/* User Message */}
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-md p-3.5 rounded-2xl rounded-tr-none bg-emerald-brand text-white font-medium text-xs leading-relaxed shadow-sm">
                    {activePreset.prompt}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Assistant Message */}
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-forest-50 flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-4 h-4 text-emerald-brand" />
                  </div>
                  <div className="max-w-xl p-4 rounded-2xl rounded-tl-none bg-white/10 border border-white/10 text-white space-y-3 shadow-sm">
                    {/* Urgency Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                          activePreset.severity === 'Urgent'
                            ? 'bg-rose-500 text-white'
                            : activePreset.severity === 'Monitor'
                            ? 'bg-amber-500 text-white'
                            : 'bg-emerald-500 text-white'
                        }`}
                      >
                        Triage: {activePreset.severity}
                      </span>
                      <span className="text-[11px] text-white/60 font-medium">
                        Instant Clinical Evaluation
                      </span>
                    </div>

                    {/* Formatted Reply Body */}
                    <div className="text-xs text-white/90 whitespace-pre-line leading-relaxed">
                      {activePreset.reply}
                    </div>

                    {/* Recommendations Pill List */}
                    {activePreset.recommendations && (
                      <div className="pt-2 border-t border-white/10 space-y-1.5">
                        <p className="text-[11px] font-bold text-emerald-light uppercase tracking-wider">
                          Recommended Clinical Steps:
                        </p>
                        {activePreset.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-center gap-2 text-[11px] text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-light shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Chat Input Bar Preview */}
              <div className="p-3 bg-forest-950/80 border-t border-white/10 flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value="Type any symptom, allergy query, or dietary question..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white/40 cursor-pointer"
                  onClick={onOpenFullChat}
                />
                <button
                  onClick={onOpenFullChat}
                  className="p-2.5 rounded-xl bg-emerald-brand text-forest hover:bg-emerald-light transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
