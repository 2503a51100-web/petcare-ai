import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Pet } from '../../types';
import { Scale, Check } from 'lucide-react';

interface LogWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: Pet;
  onLogWeight: (petId: string, weight: number, note: string) => void;
}

export const LogWeightModal: React.FC<LogWeightModalProps> = ({
  isOpen,
  onClose,
  pet,
  onLogWeight,
}) => {
  const [weightValue, setWeightValue] = useState(pet.weight.toString());
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(weightValue);
    if (!parsed || parsed <= 0) return;

    onLogWeight(pet.id, parsed, note.trim() || 'Routine weigh-in');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Log Weight for ${pet.name}`}
      subtitle={`Current record: ${pet.weight} lbs (Target: ${pet.targetWeight} lbs)`}
      maxWidth="sm"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">
            Measured Weight ({pet.weightUnit}) *
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              required
              value={weightValue}
              onChange={(e) => setWeightValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sage-border text-base font-bold text-forest focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white"
            />
            <Scale className="w-5 h-5 text-charcoal-light absolute left-3 top-3" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal mb-1">
            Condition Notes / Activity context
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Post morning walk, pre-breakfast weigh-in"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-sage-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white resize-none"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-sage-border text-xs font-semibold text-charcoal-muted hover:bg-sage/40"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-800 transition-all btn-primary-glow flex items-center gap-1.5"
          >
            <Check className="w-4 h-4 text-emerald-light" />
            Update Weight Log
          </button>
        </div>
      </form>
    </Modal>
  );
};
