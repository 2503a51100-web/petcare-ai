import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Pet, Species } from '../../types';
import { Dog, Cat, Sparkles, Upload, Check } from 'lucide-react';

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPet: (newPet: Pet) => void;
}

const PRESET_PET_PHOTOS = [
  {
    label: 'Golden Retriever',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Scottish Fold Cat',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'French Bulldog',
    url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Beagle Pup',
    url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Siberian Husky',
    url: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Calico Cat',
    url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80',
  },
];

export const AddPetModal: React.FC<AddPetModalProps> = ({
  isOpen,
  onClose,
  onAddPet,
}) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<Species>('Dog');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Female');
  const [neutered, setNeutered] = useState(true);
  const [birthDate, setBirthDate] = useState('2024-01-15');
  const [weight, setWeight] = useState('24.5');
  const [targetWeight, setTargetWeight] = useState('24.0');
  const [selectedPhoto, setSelectedPhoto] = useState(PRESET_PET_PHOTOS[0].url);
  const [microchip, setMicrochip] = useState('985-0041-8899-231');
  const [diet, setDiet] = useState('Royal Canin Adult Digestive Care');
  const [allergies, setAllergies] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim()) return;

    const parsedWeight = parseFloat(weight) || 20;
    const parsedTarget = parseFloat(targetWeight) || parsedWeight;

    const newPet: Pet = {
      id: `pet-${Date.now()}`,
      name: name.trim(),
      species,
      breed: breed.trim(),
      age: '1 yr 2 mos',
      birthDate,
      gender,
      neutered,
      weight: parsedWeight,
      targetWeight: parsedTarget,
      weightUnit: 'lbs',
      microchipId: microchip || 'Pending Verification',
      photoUrl: selectedPhoto,
      status: 'Healthy',
      healthScore: 95,
      allergies: allergies.trim() ? allergies.split(',').map((s) => s.trim()) : ['None recorded'],
      diet: diet || 'Standard Veterinarian Recommended Plan',
      vitals: {
        heartRate: species === 'Cat' ? 140 : 80,
        temperature: 101.2,
        respiratoryRate: species === 'Cat' ? 24 : 20,
        activityScore: 90,
        lastUpdated: 'Just now',
      },
      weightHistory: [
        { id: `w-${Date.now()}`, date: 'Current', weight: parsedWeight, note: 'Initial registration baseline' },
      ],
      vaccinations: [
        {
          id: `v-${Date.now()}`,
          name: species === 'Cat' ? 'FVRCP Initial' : 'DHPP Initial',
          dateAdministered: '2026-05-10',
          nextDueDate: '2027-05-10',
          status: 'up-to-date',
          veterinarian: 'Dr. Marcus Vance, DVM',
          clinic: 'Metropolitan Veterinary Hospital',
          batchNumber: 'INI-8812',
        },
      ],
      medicalRecords: [
        {
          id: `rec-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          category: 'Checkup',
          title: 'New Patient Intake & Baseline Evaluation',
          description: `Comprehensive health profile initialized on PetCare AI. General status excellent. Target weight set to ${parsedTarget} lbs.`,
          veterinarian: 'Dr. Marcus Vance, DVM',
          clinic: 'Metropolitan Veterinary Hospital',
          status: 'Completed',
        },
      ],
    };

    onAddPet(newPet);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Pet Companion"
      subtitle="Create a verified clinical profile with smart AI monitoring"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Photo Selection */}
        <div>
          <label className="block text-xs font-bold text-forest mb-2">
            Select Companion Photograph
          </label>
          <div className="grid grid-cols-6 gap-2">
            {PRESET_PET_PHOTOS.map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPhoto(photo.url)}
                className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                  selectedPhoto === photo.url
                    ? 'border-emerald-brand ring-2 ring-emerald-brand/30 scale-105 shadow-sm'
                    : 'border-sage-border hover:border-emerald-200 opacity-80'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                />
                {selectedPhoto === photo.url && (
                  <div className="absolute inset-0 bg-emerald-brand/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Name & Species */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Companion Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jasper, Bailey, Coco"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-sage-border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 focus:border-emerald-brand bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Species *
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setSpecies('Dog')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  species === 'Dog'
                    ? 'bg-forest-50 border-forest text-forest'
                    : 'bg-white border-sage-border text-charcoal-muted hover:border-sage'
                }`}
              >
                <Dog className="w-4 h-4 text-emerald-brand" />
                Dog
              </button>
              <button
                type="button"
                onClick={() => setSpecies('Cat')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                  species === 'Cat'
                    ? 'bg-forest-50 border-forest text-forest'
                    : 'bg-white border-sage-border text-charcoal-muted hover:border-sage'
                }`}
              >
                <Cat className="w-4 h-4 text-coral" />
                Cat
              </button>
            </div>
          </div>
        </div>

        {/* Breed & Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Breed / Mix *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Australian Shepherd, Ragdoll"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-sage-border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 focus:border-emerald-brand bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
                className="w-full px-3 py-2 rounded-xl border border-sage-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Spayed / Neutered
              </label>
              <select
                value={neutered ? 'Yes' : 'No'}
                onChange={(e) => setNeutered(e.target.value === 'Yes')}
                className="w-full px-3 py-2 rounded-xl border border-sage-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Weights & Microchip */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Weight (lbs)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sage-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Target Weight (lbs)
            </label>
            <input
              type="number"
              step="0.1"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sage-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Microchip ID
            </label>
            <input
              type="text"
              placeholder="e.g. 985-xxx"
              value={microchip}
              onChange={(e) => setMicrochip(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sage-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
            />
          </div>
        </div>

        {/* Dietary and Allergies */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Known Allergies (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Chicken meal, Flea saliva"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sage-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-1">
              Current Diet Protocol
            </label>
            <input
              type="text"
              placeholder="e.g. Purina Pro Plan Sensitive Skin"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-sage-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3 border-t border-sage flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-sage-border text-xs font-semibold text-charcoal-muted hover:bg-sage/40 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-800 transition-all btn-primary-glow flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-light" />
            Initialize Pet Profile
          </button>
        </div>
      </form>
    </Modal>
  );
};
