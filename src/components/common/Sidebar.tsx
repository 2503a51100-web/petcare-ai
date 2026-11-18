import React from 'react';
import { BrandLogo } from './BrandLogo';
import { Pet, UserProfile } from '../../types';
import {
  LayoutDashboard,
  HeartPulse,
  Sparkles,
  Calendar,
  FileText,
  Settings,
  ChevronRight,
  ShieldCheck,
  Plus,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  pets: Pet[];
  selectedPetId: string;
  onSelectPet: (id: string) => void;
  onOpenAddPet: () => void;
  user: UserProfile;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  pets,
  selectedPetId,
  onSelectPet,
  onOpenAddPet,
  user,
  onLogout,
}) => {
  const currentPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'pets', label: 'Pet Profiles', icon: HeartPulse },
    { id: 'chat', label: 'PawPal AI', icon: Sparkles, badge: 'AI' },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'Health Vault', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white border-r border-sage-border flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-sage">
        <BrandLogo
          size="md"
          showTagline={true}
          onClick={() => onNavigate('dashboard')}
        />
      </div>

      {/* Pet Quick Switcher Widget */}
      <div className="p-4 border-b border-sage/60 bg-ivory/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
            Active Companion
          </span>
          <button
            onClick={onOpenAddPet}
            className="text-[11px] font-semibold text-emerald-brand hover:text-emerald-dark flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Pet
          </button>
        </div>

        {/* Selected Pet Pill */}
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-sage-border shadow-xs">
          <img
            src={currentPet.photoUrl}
            alt={currentPet.name}
            className="w-10 h-10 rounded-lg object-cover border border-sage-border"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-forest truncate">
                {currentPet.name}
              </span>
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  currentPet.status === 'Healthy'
                    ? 'bg-emerald-brand'
                    : 'bg-amber-500'
                }`}
              />
            </div>
            <p className="text-xs text-charcoal-muted truncate">
              {currentPet.breed}
            </p>
          </div>
        </div>

        {/* Other Pets Mini-Avatars */}
        {pets.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {pets.map((p) => {
              const isSelected = p.id === selectedPetId;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPet(p.id)}
                  title={`Switch to ${p.name}`}
                  className={`relative rounded-lg p-0.5 transition-all ${
                    isSelected
                      ? 'ring-2 ring-emerald-brand ring-offset-1'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={p.photoUrl}
                    alt={p.name}
                    className="w-7 h-7 rounded-md object-cover"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${
                      p.status === 'Healthy' ? 'bg-emerald-brand' : 'bg-amber-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal-muted">
          Platform Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-forest text-white shadow-soft'
                  : 'text-charcoal-muted hover:text-forest hover:bg-sage/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? item.badge === 'AI'
                        ? 'text-coral'
                        : 'text-emerald-light'
                      : 'text-charcoal-light'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge ? (
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? 'bg-coral text-white'
                      : 'bg-coral-soft text-coral-dark'
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                isActive && <ChevronRight className="w-3.5 h-3.5 text-white/60" />
              )}
            </button>
          );
        })}

        <div className="pt-4 mt-4 border-t border-sage px-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-forest-50 to-emerald-50/60 border border-emerald-200/50">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-brand" />
              <span className="text-xs font-bold text-forest">PawPal AI Active</span>
            </div>
            <p className="text-[11px] text-charcoal-muted leading-relaxed">
              24/7 clinical AI monitor observing vitals and vaccination schedules.
            </p>
          </div>
        </div>
      </nav>

      {/* User Footer Chip */}
      <div className="p-3.5 border-t border-sage bg-ivory/40">
        <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-sage/40 transition-colors">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover border border-sage-border"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-forest truncate">{user.name}</p>
            <p className="text-[11px] text-charcoal-muted truncate">{user.role}</p>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out"
              className="text-charcoal-light hover:text-rose-600 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
