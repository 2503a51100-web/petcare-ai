import React, { useState } from 'react';
import { Pet, Appointment } from '../../types';
import { Badge } from '../common/Badge';
import {
  Heart,
  Scale,
  Activity,
  Thermometer,
  Wind,
  ShieldCheck,
  Calendar,
  Clock,
  Plus,
  AlertTriangle,
  FileText,
  Filter,
  CheckCircle2,
  Syringe,
  Sparkles,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface PetProfilesViewProps {
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (id: string) => void;
  appointments: Appointment[];
  onOpenAddPet: () => void;
  onOpenLogWeight: () => void;
  onBookAppointment: () => void;
  onOpenChat: () => void;
}

export const PetProfilesView: React.FC<PetProfilesViewProps> = ({
  pets,
  selectedPetId,
  onSelectPet,
  appointments,
  onOpenAddPet,
  onOpenLogWeight,
  onBookAppointment,
  onOpenChat,
}) => {
  const [medicalCategoryFilter, setMedicalCategoryFilter] = useState<string>('All');

  const activePet = pets.find((p) => p.id === selectedPetId) || pets[0];

  // Filter medical history
  const filteredRecords =
    medicalCategoryFilter === 'All'
      ? activePet.medicalRecords
      : activePet.medicalRecords.filter((r) => r.category === medicalCategoryFilter);

  // Relevant appointments for this pet
  const petAppointments = appointments.filter((a) => a.petId === activePet.id);

  // Calculate vaccination progress
  const totalVaccines = activePet.vaccinations.length;
  const upToDateVaccines = activePet.vaccinations.filter((v) => v.status === 'up-to-date').length;
  const vaccineProgressPercent = totalVaccines > 0 ? Math.round((upToDateVaccines / totalVaccines) * 100) : 100;

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Pet Selector Tabs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-sage-border shadow-soft">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {pets.map((pet) => {
            const isSelected = pet.id === selectedPetId;
            return (
              <button
                key={pet.id}
                onClick={() => onSelectPet(pet.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all shrink-0 ${
                  isSelected
                    ? 'bg-forest text-white border-forest shadow-soft'
                    : 'bg-ivory/60 text-charcoal border-sage-border hover:bg-white'
                }`}
              >
                <img
                  src={pet.photoUrl}
                  alt={pet.name}
                  className="w-8 h-8 rounded-xl object-cover border border-white/20"
                />
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">{pet.name}</p>
                  <p
                    className={`text-[10px] ${
                      isSelected ? 'text-emerald-light' : 'text-charcoal-light'
                    }`}
                  >
                    {pet.species} • {pet.breed.split(' ')[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={onOpenAddPet}
          className="px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-800 text-white text-xs font-bold transition-all btn-primary-glow flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-light" />
          <span>Add Companion</span>
        </button>
      </div>

      {/* Hero Pet Profile Card: Large Photograph + Information Breakdown */}
      <div className="bg-white rounded-3xl border border-sage-border shadow-soft overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Large Pet Profile Image Column */}
          <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto min-h-[320px] bg-sage">
            <img
              src={activePet.photoUrl}
              alt={activePet.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent lg:hidden" />

            {/* Health Score Pill inside image */}
            <div className="absolute top-4 left-4 p-2.5 rounded-2xl glass-dark text-white border border-white/20 flex items-center gap-2">
              <Heart className="w-4 h-4 text-coral fill-coral" />
              <span className="text-xs font-bold">{activePet.healthScore}% Vitality Score</span>
            </div>

            {/* Species & Status on mobile overlay */}
            <div className="absolute bottom-4 left-4 lg:hidden text-white">
              <h2 className="text-2xl font-black">{activePet.name}</h2>
              <p className="text-xs text-white/80">{activePet.breed} • {activePet.age}</p>
            </div>
          </div>

          {/* Pet Clinical Profile Details */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div className="hidden lg:block">
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-black text-forest tracking-tight">
                      {activePet.name}
                    </h1>
                    <Badge
                      variant={activePet.status === 'Healthy' ? 'success' : 'warning'}
                      size="md"
                      dot={true}
                    >
                      {activePet.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-charcoal-muted mt-1">
                    {activePet.breed} • {activePet.age} ({activePet.gender}, {activePet.neutered ? 'Spayed/Neutered' : 'Intact'})
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenChat}
                    className="px-3.5 py-2 rounded-xl bg-coral-soft hover:bg-coral-light/40 text-coral-dark text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-coral" />
                    <span>Triage {activePet.name}</span>
                  </button>
                  <button
                    onClick={onBookAppointment}
                    className="px-3.5 py-2 rounded-xl bg-forest hover:bg-forest-800 text-white text-xs font-bold transition-all btn-primary-glow flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-emerald-light" />
                    <span>Book Vet</span>
                  </button>
                </div>
              </div>

              {/* Attributes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-sage-border my-4">
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] font-bold uppercase text-charcoal-light block">Current Weight</span>
                  <span className="text-lg font-extrabold text-forest">{activePet.weight} {activePet.weightUnit}</span>
                  <span className="text-[10px] text-emerald-brand block">Target: {activePet.targetWeight}</span>
                </div>
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] font-bold uppercase text-charcoal-light block">Microchip ID</span>
                  <span className="text-xs font-bold text-forest truncate block mt-1" title={activePet.microchipId}>
                    {activePet.microchipId}
                  </span>
                  <span className="text-[10px] text-charcoal-muted block">AVID/ISO Verified</span>
                </div>
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] font-bold uppercase text-charcoal-light block">Birth Date</span>
                  <span className="text-sm font-bold text-forest block mt-1">{activePet.birthDate}</span>
                  <span className="text-[10px] text-charcoal-muted block">{activePet.age}</span>
                </div>
                <div className="p-3 rounded-2xl bg-ivory">
                  <span className="text-[10px] font-bold uppercase text-charcoal-light block">Insurance</span>
                  <span className="text-xs font-bold text-forest truncate block mt-1" title={activePet.insuranceProvider}>
                    {activePet.insuranceProvider ? activePet.insuranceProvider.split(' ')[0] : 'None'}
                  </span>
                  <span className="text-[10px] text-emerald-brand block">Active Policy</span>
                </div>
              </div>

              {/* Diet & Allergy Warnings */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl bg-coral-soft/50 border border-coral-light/50 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-coral-dark shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-coral-dark block font-bold">Allergy & Dietary Sensitivity:</strong>
                    <span className="text-charcoal-muted">
                      {activePet.allergies.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-ivory border border-sage-border text-xs text-charcoal-muted">
                  <strong className="text-forest block font-bold mb-0.5">Clinical Nutrition Regimen:</strong>
                  {activePet.diet}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Health Status & Telemetry Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center text-forest shrink-0">
            <Heart className="w-6 h-6 text-emerald-brand" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-charcoal-light">Heart Pulse</span>
            <p className="text-2xl font-black text-forest">
              {activePet.vitals.heartRate} <span className="text-xs font-normal text-charcoal-light">bpm</span>
            </p>
            <span className="text-[10px] font-semibold text-emerald-brand">Normal Canine Range (60-100)</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-coral-soft flex items-center justify-center text-coral-dark shrink-0">
            <Thermometer className="w-6 h-6 text-coral" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-charcoal-light">Body Temp</span>
            <p className="text-2xl font-black text-forest">
              {activePet.vitals.temperature} <span className="text-xs font-normal text-charcoal-light">°F</span>
            </p>
            <span className="text-[10px] font-semibold text-emerald-brand">Normal (100.5°F - 102.5°F)</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center text-forest shrink-0">
            <Wind className="w-6 h-6 text-emerald-brand" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-charcoal-light">Respiratory Rate</span>
            <p className="text-2xl font-black text-forest">
              {activePet.vitals.respiratoryRate} <span className="text-xs font-normal text-charcoal-light">br/min</span>
            </p>
            <span className="text-[10px] font-semibold text-emerald-brand">Eupneic / Relaxed</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-brand shrink-0">
            <Activity className="w-6 h-6 text-emerald-brand" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase text-charcoal-light">Vitality Index</span>
            <p className="text-2xl font-black text-forest">
              {activePet.vitals.activityScore} <span className="text-xs font-normal text-charcoal-light">/ 100</span>
            </p>
            <span className="text-[10px] font-semibold text-emerald-brand">High Stamina & Conditioning</span>
          </div>
        </div>
      </div>

      {/* Interactive Weight Tracking Chart + Vaccination Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Weight Tracking Chart Column */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-forest">
                Weight Trajectory & Goal Curve
              </h2>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Current: <strong className="text-forest">{activePet.weight} lbs</strong> • Target:{' '}
                <strong className="text-emerald-brand">{activePet.targetWeight} lbs</strong>
              </p>
            </div>

            <button
              onClick={onOpenLogWeight}
              className="px-3.5 py-1.5 rounded-xl bg-forest hover:bg-forest-800 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-emerald-light" />
              <span>Log New Weight</span>
            </button>
          </div>

          {/* Recharts LineChart */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activePet.weightHistory} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F1EC" vertical={false} />
                <XAxis dataKey="date" stroke="#7A918A" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7A918A" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#164E43',
                    borderColor: '#164E43',
                    borderRadius: '12px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    boxShadow: '0 8px 20px rgba(22, 78, 67, 0.2)',
                  }}
                  itemStyle={{ color: '#FFFFFF', fontWeight: 'bold' }}
                />
                <ReferenceLine
                  y={activePet.targetWeight}
                  label={{ value: 'Target Goal', fill: '#19A58C', fontSize: 10, position: 'insideTopRight' }}
                  stroke="#19A58C"
                  strokeDasharray="4 4"
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#FF9478"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#164E43', stroke: '#FF9478', strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Historical Log entries list */}
          <div className="pt-2 border-t border-sage">
            <span className="text-[11px] font-bold text-charcoal-light uppercase block mb-2">
              Recent Weigh-in Log
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {activePet.weightHistory.slice(-3).map((w) => (
                <div key={w.id} className="p-2.5 rounded-xl bg-ivory text-xs">
                  <div className="flex justify-between font-bold text-forest">
                    <span>{w.date}</span>
                    <span className="text-coral-dark">{w.weight} lbs</span>
                  </div>
                  {w.note && <p className="text-[10px] text-charcoal-muted truncate mt-0.5">{w.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vaccination Progress & Schedule Column */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-forest">Immunization Schedule</h2>
              <span className="text-xs font-bold text-emerald-brand">{vaccineProgressPercent}% Complete</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-sage overflow-hidden">
              <div
                className="h-full bg-emerald-brand rounded-full transition-all duration-500"
                style={{ width: `${vaccineProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {activePet.vaccinations.map((vac) => (
              <div
                key={vac.id}
                className="p-3.5 rounded-2xl bg-ivory/70 border border-sage-border flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Syringe className="w-4 h-4 text-emerald-brand" />
                    <h3 className="text-xs font-bold text-forest">{vac.name}</h3>
                  </div>
                  <Badge
                    variant={vac.status === 'up-to-date' ? 'success' : 'warning'}
                    size="sm"
                    dot={true}
                  >
                    {vac.status === 'up-to-date' ? 'Current' : 'Due Soon'}
                  </Badge>
                </div>

                <div className="text-[11px] text-charcoal-muted grid grid-cols-2 gap-1 pt-1 border-t border-sage">
                  <div>
                    <span className="text-charcoal-light">Administered:</span> {vac.dateAdministered}
                  </div>
                  <div>
                    <span className="text-charcoal-light">Next Due:</span>{' '}
                    <strong className={vac.status === 'due-soon' ? 'text-amber-700' : 'text-forest'}>
                      {vac.nextDueDate}
                    </strong>
                  </div>
                </div>

                <div className="text-[10px] text-charcoal-light">
                  Batch: {vac.batchNumber} • {vac.clinic}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onBookAppointment}
            className="w-full py-2.5 px-4 rounded-xl border border-emerald-brand text-emerald-brand hover:bg-emerald-50 text-xs font-bold transition-colors text-center"
          >
            Schedule Booster at Hospital
          </button>
        </div>
      </div>

      {/* Medical History Timeline with Category Filter */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-sage-border shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-forest">
              Clinical Medical History Timeline
            </h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Verified clinical exams, cytology notes, prescriptions, and surgical procedures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Checkup', 'Prescription', 'Vaccination'].map((cat) => (
              <button
                key={cat}
                onClick={() => setMedicalCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                  medicalCategoryFilter === cat
                    ? 'bg-forest text-white'
                    : 'bg-sage/60 text-charcoal-muted hover:bg-sage'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Entries */}
        <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-sage-border">
          {filteredRecords.map((rec) => (
            <div key={rec.id} className="relative group">
              {/* Dot */}
              <div className="absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white bg-emerald-brand ring-2 ring-emerald-brand/30 group-hover:scale-125 transition-transform" />

              <div className="p-4 sm:p-5 rounded-2xl bg-ivory/60 border border-sage-border space-y-2 hover:bg-white hover:border-emerald-200 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-forest">{rec.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-sage text-forest">
                      {rec.category}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-charcoal-light">{rec.date}</span>
                </div>

                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {rec.description}
                </p>

                {rec.medications && rec.medications.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-forest">Prescriptions:</span>
                    {rec.medications.map((med, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-coral-soft text-coral-dark"
                      >
                        {med}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 text-[10px] text-charcoal-light flex items-center justify-between border-t border-sage">
                  <span>Provider: {rec.veterinarian}</span>
                  <span>{rec.clinic}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
