import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { UserProfile } from '../../types';
import { PhoneCall, Sparkles, LayoutDashboard, Calendar, HeartPulse, Menu, X, ShieldAlert, LogIn, LogOut, User } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onEmergencyClick: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  user?: UserProfile;
  onLogout?: () => void;
  hasAppointments?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onEmergencyClick,
  onOpenAuth,
  user,
  onLogout,
  hasAppointments = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLanding = currentView === 'landing';

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Tagline (or Breadcrumb when in dashboard mode on large screens) */}
          <div className="flex items-center gap-6">
            <div className={!isLanding ? "lg:hidden" : ""}>
              <BrandLogo
                size="md"
                showTagline={isLanding}
                onClick={() => onNavigate('landing')}
              />
            </div>

            {/* Desktop Breadcrumb in Dashboard Mode */}
            {!isLanding && (
              <div className="hidden lg:flex items-center gap-2 text-xs">
                <span
                  onClick={() => onNavigate('dashboard')}
                  className="font-bold text-forest hover:text-emerald-brand cursor-pointer transition-colors"
                >
                  PetCare AI
                </span>
                <span className="text-charcoal-light">/</span>
                <span className="font-semibold text-emerald-brand capitalize">
                  {currentView === 'chat'
                    ? 'PawPal AI Assistant'
                    : currentView === 'pets'
                    ? 'Pet Biometrics & Profiles'
                    : currentView === 'appointments'
                    ? 'Veterinary Booking'
                    : currentView === 'records'
                    ? 'Health Vault'
                    : 'Overview'}
                </span>
              </div>
            )}

            {/* Desktop Navigation Links (when on landing page) */}
            {isLanding && (
              <nav className="hidden md:flex items-center gap-1.5 ml-4">
                <a
                  href="#features"
                  className="px-3.5 py-2 text-sm font-medium text-charcoal-muted hover:text-forest transition-colors rounded-lg hover:bg-sage/40"
                >
                  Platform Features
                </a>
                <a
                  href="#how-it-works"
                  className="px-3.5 py-2 text-sm font-medium text-charcoal-muted hover:text-forest transition-colors rounded-lg hover:bg-sage/40"
                >
                  How It Works
                </a>
                <a
                  href="#services"
                  className="px-3.5 py-2 text-sm font-medium text-charcoal-muted hover:text-forest transition-colors rounded-lg hover:bg-sage/40"
                >
                  Veterinary Services
                </a>
                <a
                  href="#testimonials"
                  className="px-3.5 py-2 text-sm font-medium text-charcoal-muted hover:text-forest transition-colors rounded-lg hover:bg-sage/40"
                >
                  Clinical Reviews
                </a>
              </nav>
            )}

            {/* Tablet navigation in Dashboard mode */}
            {!isLanding && (
              <nav className="hidden md:flex lg:hidden items-center gap-1.5">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    currentView === 'dashboard' ? 'bg-forest text-white' : 'text-charcoal-muted hover:bg-sage'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onNavigate('pets')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    currentView === 'pets' ? 'bg-forest text-white' : 'text-charcoal-muted hover:bg-sage'
                  }`}
                >
                  Pets
                </button>
                <button
                  onClick={() => onNavigate('chat')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    currentView === 'chat' ? 'bg-forest text-white' : 'text-charcoal-muted hover:bg-sage'
                  }`}
                >
                  PawPal
                </button>
                <button
                  onClick={() => onNavigate('appointments')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    currentView === 'appointments' ? 'bg-forest text-white' : 'text-charcoal-muted hover:bg-sage'
                  }`}
                >
                  Appointments
                </button>
              </nav>
            )}
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-3">
            {/* 24/7 Emergency Triage Trigger */}
            <button
              onClick={onEmergencyClick}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-200 bg-rose-50/80 hover:bg-rose-100/90 text-rose-700 text-xs font-semibold transition-all shadow-xs"
              title="24/7 Veterinary Emergency & Poison Control"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>24/7 Pet Emergency</span>
            </button>

            {isLanding ? (
              <div className="flex items-center gap-2">
                {onOpenAuth && (
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="px-3.5 py-2 text-xs font-bold text-forest hover:bg-sage/60 rounded-xl transition-colors border border-sage-border flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5 text-emerald-brand" />
                    <span>Sign In</span>
                  </button>
                )}
                {onOpenAuth && (
                  <button
                    onClick={() => onOpenAuth('signup')}
                    className="hidden sm:inline-flex px-4 py-2 text-xs font-bold text-forest hover:bg-sage/60 rounded-xl transition-colors border border-sage-border"
                  >
                    Sign Up Free
                  </button>
                )}
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-forest hover:bg-forest-800 rounded-xl btn-primary-glow"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-light" />
                  <span>Launch Platform</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('landing')}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-charcoal-muted hover:text-forest hover:bg-sage/50 rounded-lg transition-colors border border-sage-border"
                >
                  Landing Page
                </button>
                <button
                  onClick={() => onNavigate('appointments')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-brand hover:bg-emerald-dark rounded-xl shadow-emerald-glow transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Book Vet</span>
                </button>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="hidden sm:inline-flex items-center gap-1 p-2 rounded-xl text-charcoal-light hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-charcoal rounded-lg hover:bg-sage/50"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-sage-border bg-white px-4 pt-3 pb-6 space-y-3 animate-slide-up shadow-medium">
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => {
                onNavigate('landing');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-sage text-charcoal"
            >
              Home / Overview
            </button>
            <button
              onClick={() => {
                onNavigate('dashboard');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-sage text-charcoal flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-brand" />
              SaaS Dashboard
            </button>
            <button
              onClick={() => {
                onNavigate('pets');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-sage text-charcoal flex items-center gap-2"
            >
              <HeartPulse className="w-4 h-4 text-emerald-brand" />
              Pet Profiles & Vitals
            </button>
            <button
              onClick={() => {
                onNavigate('chat');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-sage text-charcoal flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-coral" />
              PawPal AI Assistant
            </button>
            <button
              onClick={() => {
                onNavigate('appointments');
                setMobileMenuOpen(false);
              }}
              className="text-left px-3 py-2 text-sm font-medium rounded-lg hover:bg-sage text-charcoal flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-brand" />
              Book & Manage Appointments
            </button>
          </div>

          <div className="pt-2 border-t border-sage flex flex-col gap-2">
            {onOpenAuth && (
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-forest text-white font-bold text-xs shadow-xs"
              >
                <LogIn className="w-4 h-4" />
                Sign In / Create Account
              </button>
            )}
            <button
              onClick={() => {
                onEmergencyClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-50 text-rose-700 font-semibold text-sm border border-rose-200"
            >
              <PhoneCall className="w-4 h-4" />
              24/7 Emergency Veterinary Line
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
