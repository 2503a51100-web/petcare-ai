import React, { useState } from 'react';
import { Veterinarian, Appointment, Pet } from '../../types';
import { veterinarians } from '../../data/mockData';
import { Badge } from '../common/Badge';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Star,
  CheckCircle2,
  AlertCircle,
  Plus,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  X,
  FileCheck,
} from 'lucide-react';

interface AppointmentBookingViewProps {
  pets: Pet[];
  selectedPetId: string;
  appointments: Appointment[];
  onBookAppointment: (appointment: Appointment) => void;
  onCancelAppointment: (id: string) => void;
}

export const AppointmentBookingView: React.FC<AppointmentBookingViewProps> = ({
  pets,
  selectedPetId,
  appointments,
  onBookAppointment,
  onCancelAppointment,
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'my-appointments'>('book');
  const [selectedVet, setSelectedVet] = useState<Veterinarian | null>(veterinarians[0]);
  const [selectedPet, setSelectedPet] = useState<string>(selectedPetId || pets[0]?.id);
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-28');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM');
  const [visitType, setVisitType] = useState<'In-Person Clinic Visit' | 'Virtual Tele-Triage'>('In-Person Clinic Visit');
  const [reason, setReason] = useState<string>('Annual Wellness Exam & Vaccinations');
  const [notes, setNotes] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [confirmedDetails, setConfirmedDetails] = useState<Appointment | null>(null);

  // Available upcoming dates
  const availableDates = [
    { label: 'Wed, Nov 25', value: '2026-11-25' },
    { label: 'Thu, Nov 26', value: '2026-11-26' },
    { label: 'Fri, Nov 27', value: '2026-11-27' },
    { label: 'Sat, Nov 28', value: '2026-11-28' },
    { label: 'Mon, Nov 30', value: '2026-11-30' },
    { label: 'Tue, Dec 01', value: '2026-12-01' },
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVet) return;

    const chosenPet = pets.find((p) => p.id === selectedPet) || pets[0];

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      petId: chosenPet.id,
      petName: chosenPet.name,
      petPhotoUrl: chosenPet.photoUrl,
      vetId: selectedVet.id,
      vetName: selectedVet.name,
      vetTitle: selectedVet.title,
      vetAvatarUrl: selectedVet.avatarUrl,
      clinic: selectedVet.clinic,
      clinicAddress: selectedVet.clinicAddress,
      date: selectedDate,
      time: selectedSlot,
      type: visitType,
      status: 'Confirmed',
      reason: reason || 'Comprehensive Consultation',
      notes: notes.trim(),
      fee: selectedVet.consultationFee,
    };

    onBookAppointment(newAppointment);
    setConfirmedDetails(newAppointment);
    setShowConfirmation(true);

    // Fire joyful confetti animation
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#19A58C', '#FF9478', '#164E43'],
      });
    } catch {
      // confetti fallback
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fade-in max-w-6xl mx-auto">
      {/* Top Header & View Tabs */}
      <div className="bg-white p-5 rounded-3xl border border-sage-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-forest">
            Veterinary Appointments & Tele-Triage
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            Connect directly with verified board-certified veterinarians and clinical specialists.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center p-1 rounded-2xl bg-sage/60 border border-sage-border text-xs font-bold">
          <button
            onClick={() => setActiveTab('book')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'book'
                ? 'bg-forest text-white shadow-soft'
                : 'text-charcoal-muted hover:text-forest'
            }`}
          >
            Book Appointment
          </button>
          <button
            onClick={() => setActiveTab('my-appointments')}
            className={`px-4 py-2 rounded-xl transition-all relative ${
              activeTab === 'my-appointments'
                ? 'bg-forest text-white shadow-soft'
                : 'text-charcoal-muted hover:text-forest'
            }`}
          >
            My Appointments ({appointments.length})
          </button>
        </div>
      </div>

      {/* VIEW 1: BOOKING FLOW */}
      {activeTab === 'book' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Veterinarian Directory */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-forest">
                Select Licensed Specialist
              </h2>
              <span className="text-xs text-charcoal-light">
                {veterinarians.length} Board-Certified Doctors
              </span>
            </div>

            <div className="space-y-3.5">
              {veterinarians.map((vet) => {
                const isSelected = selectedVet?.id === vet.id;
                return (
                  <div
                    key={vet.id}
                    onClick={() => setSelectedVet(vet)}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-emerald-brand ring-2 ring-emerald-brand/20 shadow-medium'
                        : 'bg-white/80 border-sage-border hover:bg-white hover:border-sage'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      {/* Avatar */}
                      <div className="relative aspect-square w-20 sm:w-24 rounded-2xl overflow-hidden bg-sage shrink-0 border border-sage-border">
                        <img
                          src={vet.avatarUrl}
                          alt={vet.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-white/90 text-[10px] font-bold text-forest flex items-center gap-0.5 shadow-xs">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>{vet.rating}</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-sm sm:text-base text-forest leading-snug">
                              {vet.name}
                            </h3>
                            <p className="text-xs text-charcoal-muted">
                              {vet.title}
                            </p>
                          </div>
                          <span className="text-base font-black text-forest">
                            ${vet.consultationFee}
                          </span>
                        </div>

                        {/* Specialization Badges */}
                        <div className="flex flex-wrap gap-1.5">
                          {vet.specializations.map((spec, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sage text-forest"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>

                        <p className="text-xs text-charcoal-muted line-clamp-2 leading-relaxed">
                          {vet.bio}
                        </p>

                        <div className="pt-2 border-t border-sage text-xs text-charcoal-light flex items-center justify-between">
                          <span className="truncate">{vet.clinic}</span>
                          {vet.acceptsVirtual && (
                            <span className="text-emerald-brand font-semibold flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Tele-Health Available
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Calendar, Time Slots & Booking Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-sage-border shadow-soft space-y-5 sticky top-24">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-emerald-brand uppercase tracking-wider">
                  Scheduling Details
                </span>
                <span className="text-xs font-bold text-forest">Step 2 of 2</span>
              </div>
              <h3 className="text-lg font-bold text-forest">
                {selectedVet ? `Appointment with ${selectedVet.name.split(',')[0]}` : 'Configure Visit'}
              </h3>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              {/* Pet Selection */}
              <div>
                <label className="block text-xs font-bold text-forest mb-1.5">
                  Select Companion *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {pets.map((pet) => {
                    const isPicked = selectedPet === pet.id;
                    return (
                      <button
                        key={pet.id}
                        type="button"
                        onClick={() => setSelectedPet(pet.id)}
                        className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                          isPicked
                            ? 'bg-forest-50 border-forest text-forest shadow-xs'
                            : 'bg-ivory border-sage-border text-charcoal hover:border-sage'
                        }`}
                      >
                        <img
                          src={pet.photoUrl}
                          alt={pet.name}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <span className="text-xs font-bold truncate max-w-[80px]">
                          {pet.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Visit Type Toggle */}
              <div>
                <label className="block text-xs font-bold text-forest mb-1.5">
                  Consultation Format *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVisitType('In-Person Clinic Visit')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      visitType === 'In-Person Clinic Visit'
                        ? 'bg-forest text-white border-forest shadow-xs'
                        : 'bg-ivory border-sage-border text-charcoal hover:bg-sage/40'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-emerald-light" />
                    <span>In-Person Clinic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisitType('Virtual Tele-Triage')}
                    className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      visitType === 'Virtual Tele-Triage'
                        ? 'bg-forest text-white border-forest shadow-xs'
                        : 'bg-ivory border-sage-border text-charcoal hover:bg-sage/40'
                    }`}
                  >
                    <Video className="w-4 h-4 text-coral" />
                    <span>Tele-Health Video</span>
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-xs font-bold text-forest mb-1.5">
                  Select Available Date *
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {availableDates.map((d) => {
                    const isDateActive = selectedDate === d.value;
                    return (
                      <button
                        key={d.value}
                        type="button"
                        onClick={() => setSelectedDate(d.value)}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                          isDateActive
                            ? 'bg-emerald-brand text-white border-emerald-brand font-bold shadow-xs'
                            : 'bg-ivory border-sage-border text-charcoal text-xs hover:border-sage'
                        }`}
                      >
                        <span className="block text-[11px] leading-tight">{d.label.split(',')[0]}</span>
                        <span className="block text-[10px] opacity-80">{d.label.split(',')[1]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold text-forest mb-1.5">
                  Available Consultation Slots *
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {selectedVet?.availableSlots.map((slot) => {
                    const isSlotPicked = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-2 rounded-xl border text-xs text-center transition-all ${
                          isSlotPicked
                            ? 'bg-forest text-white border-forest font-bold shadow-xs'
                            : 'bg-ivory border-sage-border text-charcoal hover:bg-sage/40'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Reason for Visit *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-sage-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30"
                >
                  <option value="Annual Wellness Exam & Vaccinations">Annual Wellness Exam & Vaccinations</option>
                  <option value="Symptom Evaluation / Limping / Mobility">Symptom Evaluation / Limping / Mobility</option>
                  <option value="Dermatology & Skin Allergy Flare">Dermatology & Skin Allergy Flare</option>
                  <option value="Dietary & Weight Review">Dietary & Weight Review</option>
                  <option value="Surgical / Dental Consultation">Surgical / Dental Consultation</option>
                </select>
              </div>

              {/* Clinical Notes */}
              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Specific Observations / PawPal Triage Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Luna has had mild morning stiffness; please review right front leg."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-sage-border text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-forest hover:bg-forest-800 text-white font-bold text-sm transition-all btn-primary-glow flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-light" />
                <span>Confirm Appointment (${selectedVet?.consultationFee})</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* VIEW 2: MY APPOINTMENTS */}
      {activeTab === 'my-appointments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-forest">
              Scheduled Veterinary Consultations
            </h2>
            <button
              onClick={() => setActiveTab('book')}
              className="px-4 py-2 rounded-xl bg-forest text-white text-xs font-bold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-light" />
              <span>Book Another</span>
            </button>
          </div>

          {appointments.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-sage-border p-8">
              <CalendarIcon className="w-12 h-12 text-charcoal-light mx-auto mb-3" />
              <h3 className="text-base font-bold text-forest">No Scheduled Appointments</h3>
              <p className="text-xs text-charcoal-muted mt-1 max-w-sm mx-auto">
                You currently have no upcoming visits. Select a specialist from our accredited veterinary network.
              </p>
              <button
                onClick={() => setActiveTab('book')}
                className="mt-4 px-5 py-2.5 rounded-xl bg-forest text-white text-xs font-bold"
              >
                Browse Available Doctors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={apt.vetAvatarUrl}
                          alt={apt.vetName}
                          className="w-12 h-12 rounded-2xl object-cover border border-sage-border"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-forest leading-snug">
                            {apt.vetName}
                          </h3>
                          <p className="text-xs text-charcoal-muted">{apt.vetTitle}</p>
                        </div>
                      </div>

                      <Badge
                        variant={apt.status === 'Confirmed' ? 'success' : 'warning'}
                        size="sm"
                        dot={true}
                      >
                        {apt.status}
                      </Badge>
                    </div>

                    <div className="p-3 rounded-2xl bg-ivory/80 border border-sage-border space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-light font-semibold">Patient:</span>
                        <span className="font-bold text-forest">{apt.petName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-light font-semibold">Format:</span>
                        <span className="font-semibold text-emerald-brand">{apt.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-charcoal-light font-semibold">Scheduled:</span>
                        <span className="font-bold text-forest">{apt.date} at {apt.time}</span>
                      </div>
                      <div className="pt-1 border-t border-sage">
                        <span className="text-charcoal-light font-semibold block mb-0.5">Reason:</span>
                        <p className="text-charcoal">{apt.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-sage flex items-center justify-between gap-2">
                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="px-3.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                    >
                      Cancel Visit
                    </button>
                    <span className="text-xs font-bold text-forest">
                      Consultation: ${apt.fee}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && confirmedDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-sage-border shadow-premium space-y-5 animate-slide-up text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-brand flex items-center justify-center mx-auto shadow-emerald-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-brand">
                Booking Confirmed
              </span>
              <h3 className="text-xl font-black text-forest mt-1">
                You're Scheduled!
              </h3>
              <p className="text-xs text-charcoal-muted mt-1">
                A confirmation summary and pre-consultation triage form have been synchronized to your PetCare AI portal.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory text-left space-y-2 text-xs border border-sage-border">
              <div className="flex justify-between">
                <span className="text-charcoal-light">Doctor:</span>
                <span className="font-bold text-forest">{confirmedDetails.vetName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-light">Companion:</span>
                <span className="font-bold text-forest">{confirmedDetails.petName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-light">Date & Time:</span>
                <span className="font-bold text-forest">{confirmedDetails.date} at {confirmedDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal-light">Location:</span>
                <span className="font-bold text-forest">{confirmedDetails.clinic}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setActiveTab('my-appointments');
                }}
                className="w-full py-3 rounded-2xl bg-forest hover:bg-forest-800 text-white font-bold text-xs transition-colors"
              >
                View in My Appointments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
