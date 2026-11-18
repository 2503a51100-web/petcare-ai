import React, { useState } from 'react';
import {
  Pet,
  Appointment,
  ActivityLog,
  UserProfile,
} from '../../types';
import { Badge } from '../common/Badge';
import {
  Heart,
  Activity,
  Calendar,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Plus,
  Scale,
  Clock,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Stethoscope,
  CheckCircle2,
  BellRing,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardOverviewProps {
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (petId: string) => void;
  appointments: Appointment[];
  activities: ActivityLog[];
  user: UserProfile;
  onNavigate: (view: string) => void;
  onOpenAddPet: () => void;
  onOpenLogWeight: () => void;
  onOpenChat: () => void;
}

// 7-day telemetric data for interactive chart
const vitalsChartData = [
  { day: 'Mon', activity: 84, heartRate: 76, temperature: 101.2 },
  { day: 'Tue', activity: 88, heartRate: 78, temperature: 101.4 },
  { day: 'Wed', activity: 92, heartRate: 80, temperature: 101.3 },
  { day: 'Thu', activity: 80, heartRate: 75, temperature: 101.1 },
  { day: 'Fri', activity: 95, heartRate: 82, temperature: 101.5 },
  { day: 'Sat', activity: 96, heartRate: 84, temperature: 101.4 },
  { day: 'Sun', activity: 92, heartRate: 78, temperature: 101.4 },
];

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  pets,
  selectedPetId,
  onSelectPet,
  appointments,
  activities,
  user,
  onNavigate,
  onOpenAddPet,
  onOpenLogWeight,
  onOpenChat,
}) => {
  const [metricTab, setMetricTab] = useState<'activity' | 'heartRate'>('activity');

  const activePet = pets.find((p) => p.id === selectedPetId) || pets[0];

  // Find next upcoming appointment
  const upcomingAppointment = appointments.find(
    (a) => a.status === 'Confirmed' || a.status === 'Pending'
  );

  // Find due vaccinations
  const dueVaccinations = activePet.vaccinations.filter(
    (v) => v.status === 'due-soon' || v.status === 'overdue'
  );

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Top Welcome Header & Quick Action Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-sage-border shadow-soft">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-brand shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-brand border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-forest">
                Good day, {user.name.split(' ')[0]}
              </h1>
              <span className="text-xl">👋</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
              Observing <strong className="text-forest">{activePet.name}</strong> • Status:{' '}
              <span className="text-emerald-brand font-semibold">{activePet.status}</span> ({activePet.healthScore}% Vitality Index)
            </p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenChat}
            className="px-4 py-2.5 rounded-xl bg-coral-soft hover:bg-coral-light/30 text-coral-dark text-xs font-bold transition-all flex items-center gap-2 border border-coral-light/40"
          >
            <Sparkles className="w-4 h-4 text-coral" />
            <span>Ask PawPal AI</span>
          </button>

          <button
            onClick={() => onNavigate('appointments')}
            className="px-4 py-2.5 rounded-xl bg-forest hover:bg-forest-800 text-white text-xs font-bold transition-all btn-primary-glow flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-emerald-light" />
            <span>Book Veterinarian</span>
          </button>

          <button
            onClick={onOpenLogWeight}
            className="px-3.5 py-2.5 rounded-xl bg-sage hover:bg-sage-border text-forest text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Log Pet Weight"
          >
            <Scale className="w-4 h-4 text-emerald-brand" />
            <span className="hidden sm:inline">Log Weight</span>
          </button>

          <button
            onClick={onOpenAddPet}
            className="p-2.5 rounded-xl bg-sage hover:bg-sage-border text-forest text-xs font-bold transition-colors"
            title="Add New Pet"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pet Switcher Horizontal Reel */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        <span className="text-xs font-bold uppercase tracking-wider text-charcoal-light shrink-0">
          Your Companions:
        </span>
        {pets.map((p) => {
          const isSelected = p.id === selectedPetId;
          return (
            <button
              key={p.id}
              onClick={() => onSelectPet(p.id)}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl border transition-all shrink-0 ${
                isSelected
                  ? 'bg-forest text-white border-forest shadow-soft'
                  : 'bg-white text-charcoal border-sage-border hover:bg-sage/40'
              }`}
            >
              <img
                src={p.photoUrl}
                alt={p.name}
                className="w-8 h-8 rounded-xl object-cover"
              />
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">{p.name}</p>
                <p
                  className={`text-[10px] ${
                    isSelected ? 'text-emerald-light' : 'text-charcoal-light'
                  }`}
                >
                  {p.breed.split(' ')[0]} • {p.weight} lbs
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Health Score */}
        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-light">
              Health Vitality Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-brand">
              <Heart className="w-5 h-5 fill-emerald-brand/20" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-forest">{activePet.healthScore}%</span>
              <Badge variant="success" size="sm" dot={true}>
                Optimal
              </Badge>
            </div>
            <p className="text-xs text-charcoal-muted mt-1.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-brand" />
              <span>+4% improvement this month</span>
            </p>
          </div>
        </div>

        {/* Card 2: Biometric Heart Rate */}
        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-light">
              Resting Pulse Rate
            </span>
            <div className="w-9 h-9 rounded-xl bg-forest-50 flex items-center justify-center text-forest">
              <Activity className="w-5 h-5 text-emerald-brand" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-forest">
                {activePet.vitals.heartRate}{' '}
                <span className="text-sm font-semibold text-charcoal-light">bpm</span>
              </span>
              <Badge variant="primary" size="sm">
                Stable
              </Badge>
            </div>
            <p className="text-xs text-charcoal-muted mt-1.5">
              Temp: {activePet.vitals.temperature}°F (Normal)
            </p>
          </div>
        </div>

        {/* Card 3: Weight Status */}
        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-light">
              Weight Conditioning
            </span>
            <div className="w-9 h-9 rounded-xl bg-coral-soft flex items-center justify-center text-coral-dark">
              <Scale className="w-5 h-5 text-coral" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-forest">{activePet.weight}</span>
              <span className="text-xs font-bold text-charcoal-light">{activePet.weightUnit}</span>
              <Badge variant="coral" size="sm">
                Target: {activePet.targetWeight}
              </Badge>
            </div>
            <p className="text-xs text-charcoal-muted mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-brand" />
              <span>Down 0.3 lbs to goal</span>
            </p>
          </div>
        </div>

        {/* Card 4: Next Immunization */}
        <div className="p-5 rounded-3xl bg-white border border-sage-border shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-light">
              Immunization Status
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <BellRing className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-forest truncate">
                {dueVaccinations.length > 0 ? dueVaccinations[0].name.split(' ')[0] : 'All Current'}
              </span>
              {dueVaccinations.length > 0 && (
                <Badge variant="warning" size="sm" dot={true}>
                  Due Soon
                </Badge>
              )}
            </div>
            <p className="text-xs text-charcoal-muted mt-1.5">
              {dueVaccinations.length > 0
                ? `Due: ${dueVaccinations[0].nextDueDate}`
                : '100% Up to Date'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Biometrics Chart (Left) + Upcoming Appointment & Reminders (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Biometric Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-forest">
                Weekly Biometric Telemetry & Activity
              </h2>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Continuous activity metrics for {activePet.name} mapped against Golden Retriever healthy cohort.
              </p>
            </div>

            {/* Toggle metric */}
            <div className="flex items-center p-1 rounded-xl bg-sage/60 border border-sage-border text-xs font-bold">
              <button
                onClick={() => setMetricTab('activity')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  metricTab === 'activity'
                    ? 'bg-forest text-white shadow-xs'
                    : 'text-charcoal-muted hover:text-forest'
                }`}
              >
                Activity Score
              </button>
              <button
                onClick={() => setMetricTab('heartRate')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  metricTab === 'heartRate'
                    ? 'bg-forest text-white shadow-xs'
                    : 'text-charcoal-muted hover:text-forest'
                }`}
              >
                Pulse (bpm)
              </button>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vitalsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metricTab === 'activity' ? '#19A58C' : '#FF9478'} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={metricTab === 'activity' ? '#19A58C' : '#FF9478'} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8F1EC" vertical={false} />
                <XAxis dataKey="day" stroke="#7A918A" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#7A918A" fontSize={11} tickLine={false} axisLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
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
                <Area
                  type="monotone"
                  dataKey={metricTab}
                  stroke={metricTab === 'activity' ? '#19A58C' : '#FF9478'}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#metricGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Vitals Footer Summary */}
          <div className="grid grid-cols-3 gap-3 pt-3 border-t border-sage">
            <div className="p-3 rounded-2xl bg-ivory text-center">
              <span className="text-[10px] font-bold text-charcoal-light uppercase block">Avg. Activity</span>
              <span className="text-base font-extrabold text-forest">89 / 100</span>
            </div>
            <div className="p-3 rounded-2xl bg-ivory text-center">
              <span className="text-[10px] font-bold text-charcoal-light uppercase block">Resting HR</span>
              <span className="text-base font-extrabold text-emerald-brand">78 bpm</span>
            </div>
            <div className="p-3 rounded-2xl bg-ivory text-center">
              <span className="text-[10px] font-bold text-charcoal-light uppercase block">Avg. Temp</span>
              <span className="text-base font-extrabold text-forest">101.3°F</span>
            </div>
          </div>
        </div>

        {/* Right Column: Next Appointment & Vaccination Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Upcoming Appointment Card */}
          <div className="bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-forest">Next Scheduled Visit</h2>
              <Badge variant="primary" size="sm">
                Confirmed
              </Badge>
            </div>

            {upcomingAppointment ? (
              <div className="p-4 rounded-2xl bg-ivory/80 border border-sage-border space-y-3.5">
                <div className="flex items-start gap-3">
                  <img
                    src={upcomingAppointment.vetAvatarUrl}
                    alt={upcomingAppointment.vetName}
                    className="w-12 h-12 rounded-xl object-cover border border-sage-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-forest leading-snug truncate">
                      {upcomingAppointment.vetName}
                    </h3>
                    <p className="text-[11px] text-charcoal-muted truncate">
                      {upcomingAppointment.vetTitle}
                    </p>
                    <p className="text-[10px] text-emerald-brand font-semibold mt-0.5 truncate">
                      {upcomingAppointment.clinic}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-sage">
                  <div className="flex items-center gap-1.5 text-forest font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-emerald-brand" />
                    <span>{upcomingAppointment.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-forest font-semibold">
                    <Clock className="w-3.5 h-3.5 text-coral" />
                    <span>{upcomingAppointment.time}</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-sage-border text-xs text-charcoal-muted">
                  <span className="font-bold text-forest block mb-0.5">Reason:</span>
                  {upcomingAppointment.reason}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => onNavigate('appointments')}
                    className="flex-1 py-2 px-3 rounded-xl bg-forest text-white text-xs font-bold hover:bg-forest-800 transition-colors text-center"
                  >
                    Manage Visit
                  </button>
                  <button
                    onClick={onOpenChat}
                    className="py-2 px-3 rounded-xl bg-sage hover:bg-sage-border text-forest text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-coral" />
                    Prep Notes
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 p-4 rounded-2xl bg-ivory/60 border border-sage-border">
                <Calendar className="w-8 h-8 text-charcoal-light mx-auto mb-2" />
                <p className="text-xs text-charcoal-muted">No appointments currently booked.</p>
                <button
                  onClick={() => onNavigate('appointments')}
                  className="mt-3 px-4 py-2 rounded-xl bg-emerald-brand text-white font-bold text-xs"
                >
                  Book with a Veterinarian
                </button>
              </div>
            )}
          </div>

          {/* Vaccination Alert Widget */}
          <div className="bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-forest">Immunization Watchlist</h2>
              <button
                onClick={() => onNavigate('records')}
                className="text-xs font-bold text-emerald-brand hover:text-emerald-dark"
              >
                View Vault
              </button>
            </div>

            <div className="space-y-2.5">
              {activePet.vaccinations.map((vac) => (
                <div
                  key={vac.id}
                  className="p-3 rounded-2xl bg-ivory/60 border border-sage-border flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                        vac.status === 'up-to-date'
                          ? 'bg-emerald-brand'
                          : vac.status === 'due-soon'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    />
                    <div className="truncate">
                      <p className="font-bold text-forest truncate">{vac.name}</p>
                      <p className="text-[10px] text-charcoal-light">Due: {vac.nextDueDate}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                      vac.status === 'up-to-date'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    {vac.status === 'up-to-date' ? 'Valid' : 'Due Soon'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activities Timeline */}
      <div className="bg-white p-6 rounded-3xl border border-sage-border shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-forest">Recent Clinical & Telemetry Activity</h2>
            <p className="text-xs text-charcoal-muted mt-0.5">
              Real-time audit log of vitals entries, automated triage, and veterinary interactions.
            </p>
          </div>
          <span className="text-xs font-bold text-charcoal-light">Live Sync Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {activities.map((act) => (
            <div
              key={act.id}
              className="p-4 rounded-2xl bg-ivory/60 border border-sage-border space-y-2 hover:bg-white transition-colors"
            >
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-brand">{act.petName}</span>
                <span className="text-charcoal-light">{act.timestamp}</span>
              </div>
              <h3 className="text-xs font-bold text-forest leading-snug">{act.title}</h3>
              <p className="text-[11px] text-charcoal-muted line-clamp-2 leading-relaxed">
                {act.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
