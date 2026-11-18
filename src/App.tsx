import React, { useState } from 'react';
import { Pet, Appointment, ActivityLog, UserProfile } from './types';
import { initialPets, initialAppointments, initialActivities, currentUser } from './data/mockData';
import { getActiveSession, setActiveSession } from './services/authService';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { EmergencyModal } from './components/modals/EmergencyModal';
import { AddPetModal } from './components/modals/AddPetModal';
import { LogWeightModal } from './components/modals/LogWeightModal';
import { AuthModal } from './components/modals/AuthModal';

// Landing Page Sections
import { HeroSection } from './components/landing/HeroSection';
import { FeatureShowcase } from './components/landing/FeatureShowcase';
import { HowItWorks } from './components/landing/HowItWorks';
import { AiAssistantPreview } from './components/landing/AiAssistantPreview';
import { VetServicesSection } from './components/landing/VetServicesSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { LandingFooter } from './components/landing/LandingFooter';

// Dashboard & App Sections
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { PetProfilesView } from './components/pets/PetProfilesView';
import { PawPalChat } from './components/chat/PawPalChat';
import { AppointmentBookingView } from './components/appointments/AppointmentBookingView';
import { HealthRecordsView } from './components/records/HealthRecordsView';

export function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  // Real authentication check: Start with saved session or null (guest)
  const [user, setUser] = useState<UserProfile | null>(() => getActiveSession());
  const [pets, setPets] = useState<Pet[]>(initialPets);
  const [selectedPetId, setSelectedPetId] = useState<string>(initialPets[0].id);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activities, setActivities] = useState<ActivityLog[]>(initialActivities);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isAddPetOpen, setIsAddPetOpen] = useState(false);
  const [isLogWeightOpen, setIsLogWeightOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authNotice, setAuthNotice] = useState<string | undefined>(undefined);

  const showToast = (title: string, message?: string, type: 'success' | 'warning' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Protected navigation handler: requires real typed login before accessing medical records
  const handleNavigate = (targetView: string) => {
    if (targetView === 'landing') {
      setCurrentView('landing');
      return;
    }

    if (!user) {
      setAuthNotice('Security Verification: Please enter your email and password to access clinical companion records.');
      setAuthMode('login');
      setIsAuthOpen(true);
      return;
    }

    setCurrentView(targetView);
  };

  const handleAuthSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    showToast(`Welcome, ${authenticatedUser.name.split(' ')[0]}!`, `Authenticated securely as ${authenticatedUser.role}.`);
    setCurrentView('dashboard');
    setAuthNotice(undefined);
  };

  const handleLogout = () => {
    setActiveSession(null);
    setUser(null);
    showToast('Signed Out', 'You have securely signed out of your account.', 'info');
    setCurrentView('landing');
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddPet = (newPet: Pet) => {
    setPets((prev) => [newPet, ...prev]);
    setSelectedPetId(newPet.id);
    showToast('New Companion Registered', `${newPet.name}'s clinical profile has been initialized.`);
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'ai-triage',
        title: 'New Pet Profile Registered',
        description: `${newPet.name} (${newPet.breed}) added with baseline vitals.`,
        timestamp: 'Just now',
        petName: newPet.name,
      },
      ...prev,
    ]);
  };

  const handleLogWeight = (petId: string, weight: number, note: string) => {
    setPets((prev) =>
      prev.map((pet) => {
        if (pet.id === petId) {
          const newEntry = {
            id: `w-${Date.now()}`,
            date: 'Today',
            weight,
            note,
          };
          return {
            ...pet,
            weight,
            weightHistory: [...pet.weightHistory, newEntry],
          };
        }
        return pet;
      })
    );
    showToast('Weight Recorded', `Updated weight to ${weight} lbs.`);
  };

  const handleBookAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
    showToast('Appointment Confirmed', `Scheduled with ${newApt.vetName} for ${newApt.date}.`);
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'appointment',
        title: 'Appointment Scheduled',
        description: `${newApt.reason} booked with ${newApt.vetName}.`,
        timestamp: 'Just now',
        petName: newApt.petName,
      },
      ...prev,
    ]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    showToast('Appointment Cancelled', 'Your scheduled appointment has been removed.', 'info');
  };

  const currentPet = pets.find((p) => p.id === selectedPetId) || pets[0];

  const isLanding = currentView === 'landing';

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col font-sans selection:bg-emerald-brand selection:text-white">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Modals */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onOpenChat={() => {
          setIsEmergencyOpen(false);
          setCurrentView('chat');
        }}
      />

      <AddPetModal
        isOpen={isAddPetOpen}
        onClose={() => setIsAddPetOpen(false)}
        onAddPet={handleAddPet}
      />

      <LogWeightModal
        isOpen={isLogWeightOpen}
        onClose={() => setIsLogWeightOpen(false)}
        pet={currentPet}
        onLogWeight={handleLogWeight}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthNotice(undefined);
        }}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
        requiredNotice={authNotice}
      />

      {/* Main Content Layout */}
      {isLanding ? (
        // LANDING PAGE MODE
        <div className="flex flex-col min-h-screen">
          <Navbar
            currentView={currentView}
            onNavigate={handleNavigate}
            onEmergencyClick={() => setIsEmergencyOpen(true)}
            onOpenAuth={(mode) => {
              setAuthMode(mode);
              setAuthNotice(undefined);
              setIsAuthOpen(true);
            }}
            user={user || undefined}
            onLogout={handleLogout}
            hasAppointments={appointments.length}
          />

          <main className="flex-1">
            <HeroSection
              onGetStarted={() => handleNavigate('dashboard')}
              onTryChat={() => handleNavigate('chat')}
              onBookVet={() => handleNavigate('appointments')}
            />
            <FeatureShowcase onExploreFeature={(view) => handleNavigate(view)} />
            <HowItWorks onStartNow={() => handleNavigate('dashboard')} />
            <AiAssistantPreview onOpenFullChat={() => handleNavigate('chat')} />
            <VetServicesSection onBookVet={() => handleNavigate('appointments')} />
            <TestimonialsSection />
          </main>

          <LandingFooter
            onNavigate={handleNavigate}
            onEmergencyClick={() => setIsEmergencyOpen(true)}
          />
        </div>
      ) : (
        // APPLICATION DASHBOARD MODE WITH SIDEBAR (Protected)
        <div className="flex h-screen overflow-hidden bg-ivory">
          {/* Desktop SaaS Sidebar */}
          <div className="hidden lg:block shrink-0">
            <Sidebar
              currentView={currentView}
              onNavigate={handleNavigate}
              pets={pets}
              selectedPetId={selectedPetId}
              onSelectPet={(id) => setSelectedPetId(id)}
              onOpenAddPet={() => setIsAddPetOpen(true)}
              user={user || currentUser}
              onLogout={handleLogout}
            />
          </div>

          {/* Right Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
            {/* Top Navbar */}
            <Navbar
              currentView={currentView}
              onNavigate={handleNavigate}
              onEmergencyClick={() => setIsEmergencyOpen(true)}
              onOpenAuth={(mode) => {
                setAuthMode(mode);
                setAuthNotice(undefined);
                setIsAuthOpen(true);
              }}
              user={user || undefined}
              onLogout={handleLogout}
              hasAppointments={appointments.length}
            />

            {/* Scrollable View Container */}
            <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pt-6">
              {currentView === 'dashboard' && (
                <DashboardOverview
                  pets={pets}
                  selectedPetId={selectedPetId}
                  onSelectPet={(id) => setSelectedPetId(id)}
                  appointments={appointments}
                  activities={activities}
                  user={user || currentUser}
                  onNavigate={handleNavigate}
                  onOpenAddPet={() => setIsAddPetOpen(true)}
                  onOpenLogWeight={() => setIsLogWeightOpen(true)}
                  onOpenChat={() => handleNavigate('chat')}
                />
              )}

              {currentView === 'pets' && (
                <PetProfilesView
                  pets={pets}
                  selectedPetId={selectedPetId}
                  onSelectPet={(id) => setSelectedPetId(id)}
                  appointments={appointments}
                  onOpenAddPet={() => setIsAddPetOpen(true)}
                  onOpenLogWeight={() => setIsLogWeightOpen(true)}
                  onBookAppointment={() => handleNavigate('appointments')}
                  onOpenChat={() => handleNavigate('chat')}
                />
              )}

              {currentView === 'chat' && (
                <PawPalChat
                  pets={pets}
                  selectedPetId={selectedPetId}
                  onSelectPet={(id) => setSelectedPetId(id)}
                  onEmergencyClick={() => setIsEmergencyOpen(true)}
                  onBookAppointment={() => handleNavigate('appointments')}
                />
              )}

              {currentView === 'appointments' && (
                <AppointmentBookingView
                  pets={pets}
                  selectedPetId={selectedPetId}
                  appointments={appointments}
                  onBookAppointment={handleBookAppointment}
                  onCancelAppointment={handleCancelAppointment}
                />
              )}

              {currentView === 'records' && (
                <HealthRecordsView
                  pets={pets}
                  selectedPetId={selectedPetId}
                  onSelectPet={(id) => setSelectedPetId(id)}
                  onShowToast={showToast}
                />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
