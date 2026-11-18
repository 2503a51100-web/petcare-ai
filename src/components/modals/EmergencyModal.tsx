import React from 'react';
import { Modal } from '../common/Modal';
import { PhoneCall, AlertTriangle, ShieldAlert, Heart, ExternalLink, MapPin } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onOpenChat,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Veterinary Emergency & Poison Support"
      subtitle="Immediate 24/7 emergency hotlines, toxicology center & clinical triage"
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Red Alert Banner */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-start gap-3.5">
          <ShieldAlert className="w-6 h-6 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <h4 className="text-sm font-bold text-rose-900">
              Immediate Critical Warning
            </h4>
            <p className="text-xs text-rose-700 mt-1 leading-relaxed">
              If your pet is unconscious, suffering continuous seizures, struggling to breathe, experiencing non-productive retching/bloat, or bleeding profusely, proceed directly to your nearest emergency veterinary hospital immediately.
            </p>
          </div>
        </div>

        {/* Hotlines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-xl border border-rose-200 bg-white hover:border-rose-400 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase text-rose-600">
                Poison Control (ASPCA)
              </span>
              <PhoneCall className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-lg font-extrabold text-charcoal">(888) 426-4435</p>
            <p className="text-xs text-charcoal-muted mt-1">
              Available 365 days / 24 hours nationwide.
            </p>
            <a
              href="tel:8884264435"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800"
            >
              <span>Call Helpline Directly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-white hover:border-rose-400 transition-all shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold uppercase text-rose-600">
                Pet Poison Helpline
              </span>
              <PhoneCall className="w-4 h-4 text-rose-600" />
            </div>
            <p className="text-lg font-extrabold text-charcoal">(855) 764-7661</p>
            <p className="text-xs text-charcoal-muted mt-1">
              Board-certified toxicologists & veterinary specialists.
            </p>
            <a
              href="tel:8557647661"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800"
            >
              <span>Call Hotline Directly</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Nearest Hospital Card */}
        <div className="p-4 rounded-xl border border-sage-border bg-ivory/60 flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-forest-50 text-forest shrink-0">
              <MapPin className="w-5 h-5 text-emerald-brand" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase text-emerald-brand">
                Nearest 24/7 Trauma Center
              </p>
              <h5 className="text-sm font-bold text-forest mt-0.5">
                Metropolitan Emergency & Specialty Vet Hospital
              </h5>
              <p className="text-xs text-charcoal-muted mt-0.5">
                742 Evergreen Medical Blvd (1.8 miles away) • Open 24 Hours
              </p>
            </div>
          </div>
          <a
            href="tel:4155550199"
            className="px-3 py-1.5 rounded-lg bg-forest text-white text-xs font-bold hover:bg-forest-800 transition-colors shrink-0"
          >
            Call Desk
          </a>
        </div>

        {/* AI Triage Quick Launcher */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenChat();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl border border-forest-200 bg-forest-50 text-forest text-xs font-bold hover:bg-forest-100 transition-colors flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 text-coral" />
            Open PawPal AI Triage Assistant
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl bg-sage text-charcoal text-xs font-semibold hover:bg-sage-border transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </Modal>
  );
};
