import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { UserProfile } from '../../types';
import { loginWithCredentials, registerAccount } from '../../services/authService';
import {
  X,
  Mail,
  Lock,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Stethoscope,
  Heart,
  KeyRound,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onAuthSuccess: (user: UserProfile) => void;
  requiredNotice?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onAuthSuccess,
  requiredNotice,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Pet Parent' | 'Veterinary Staff'>('Pet Parent');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  if (!isOpen) return null;

  // Calculate password strength
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: '', color: 'bg-gray-200', width: 'w-0' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/4' };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500', width: 'w-2/4' };
    if (score === 3) return { label: 'Good', color: 'bg-emerald-brand', width: 'w-3/4' };
    return { label: 'Strong', color: 'bg-emerald-600', width: 'w-full' };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // SIGN IN
    if (mode === 'login') {
      if (!email.trim() || !password) {
        setErrorMessage('Please enter both your email address and password.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const result = loginWithCredentials(email, password);
        setIsLoading(false);

        if (result.success && result.user) {
          onAuthSuccess(result.user);
          onClose();
        } else {
          setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
        }
      }, 500);
      return;
    }

    // SIGN UP / CREATE ACCOUNT
    if (mode === 'signup') {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (!email.trim()) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
      if (password.length < 8) {
        setErrorMessage('Security requirement: Password must be at least 8 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please retype carefully.');
        return;
      }
      if (!agreedTerms) {
        setErrorMessage('Please accept the Veterinary Records & Privacy Agreement.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const result = registerAccount(name, email, password, role);
        setIsLoading(false);

        if (result.success && result.user) {
          onAuthSuccess(result.user);
          onClose();
        } else {
          setErrorMessage(result.error || 'Could not register account.');
        }
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-forest-950/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-premium border border-sage-border max-w-md w-full animate-slide-up z-10">
        {/* Header with Brand Logo */}
        <div className="p-6 pb-4 bg-ivory/60 border-b border-sage flex items-start justify-between">
          <div>
            <BrandLogo size="md" showTagline={true} />
            <h3 className="text-xl font-black text-forest mt-3">
              {mode === 'login' ? 'Sign In to PetCare AI' : 'Create Clinical Account'}
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              {mode === 'login'
                ? 'Enter your registered credentials to access your companion portal'
                : 'Register a secure account to track vitals and manage care'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-charcoal-light hover:text-forest hover:bg-sage transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notice banner if user was prompted to login */}
        {requiredNotice && (
          <div className="px-6 py-2.5 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{requiredNotice}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex border-b border-sage px-6 pt-2 bg-white">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`pb-3 text-xs font-bold transition-all relative mr-6 ${
              mode === 'login'
                ? 'text-forest'
                : 'text-charcoal-light hover:text-charcoal'
            }`}
          >
            <span>Sign In</span>
            {mode === 'login' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-brand rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setErrorMessage(null);
            }}
            className={`pb-3 text-xs font-bold transition-all relative ${
              mode === 'signup'
                ? 'text-forest'
                : 'text-charcoal-light hover:text-charcoal'
            }`}
          >
            <span>Create Account</span>
            {mode === 'signup' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-brand rounded-full" />
            )}
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {/* Security Alert / Error banner */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-slide-up">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Full Legal Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-charcoal-light absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-sage-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-forest mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-light absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-sage-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-forest">
                  Password *
                </label>
                {mode === 'signup' && strength.label && (
                  <span className="text-[10px] font-bold text-charcoal-light">
                    Strength: <strong className="text-forest">{strength.label}</strong>
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-light absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder={mode === 'signup' ? 'Min. 8 characters' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-sage-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-charcoal-light hover:text-charcoal p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength bar on signup */}
              {mode === 'signup' && password && (
                <div className="w-full h-1 bg-sage rounded-full overflow-hidden mt-1.5">
                  <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
                </div>
              )}
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-forest mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-charcoal-light absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-sage-border text-xs focus:outline-none focus:ring-2 focus:ring-emerald-brand/30 bg-white"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-forest mb-1.5">
                  Account Purpose *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('Pet Parent')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      role === 'Pet Parent'
                        ? 'bg-forest-50 border-forest text-forest shadow-xs'
                        : 'bg-white border-sage-border text-charcoal hover:border-sage'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5 text-coral" />
                    <span>Pet Parent</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Veterinary Staff')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                      role === 'Veterinary Staff'
                        ? 'bg-forest-50 border-forest text-forest shadow-xs'
                        : 'bg-white border-sage-border text-charcoal hover:border-sage'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-brand" />
                    <span>Veterinarian</span>
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="rounded text-emerald-brand focus:ring-emerald-brand mt-0.5"
                />
                <label htmlFor="terms" className="text-[11px] text-charcoal-muted leading-tight select-none cursor-pointer">
                  I agree to the <span className="text-emerald-brand font-semibold">Terms of Clinical Service</span> and HIPAA/Veterinary Health Records Privacy policy.
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-forest hover:bg-forest-800 disabled:opacity-60 text-white font-bold text-xs transition-all btn-primary-glow flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Validating Credentials...</span>
              ) : (
                <>
                  <span>{mode === 'login' ? 'Secure Sign In' : 'Create Protected Account'}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-light" />
                </>
              )}
            </button>
          </form>

          {/* Secure hint box for testing */}
          <div className="p-3 rounded-2xl bg-ivory border border-sage-border text-[11px] text-charcoal-muted space-y-1">
            <span className="font-bold text-forest block">Registered Credentials (Clinical Demo):</span>
            <div className="flex items-center justify-between text-[10px]">
              <span>Email: <code className="font-bold text-forest">eleanor@petcare-ai.com</code></span>
              <span>Pass: <code className="font-bold text-forest">Password123!</code></span>
            </div>
            <p className="text-[10px] text-charcoal-light">Or register any new account with your own email and a password of at least 8 characters.</p>
          </div>

          <p className="text-[11px] text-center text-charcoal-muted pt-1">
            {mode === 'login' ? "Need a new companion account?" : 'Already registered?'}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setErrorMessage(null);
              }}
              className="text-emerald-brand font-bold ml-1 hover:underline"
            >
              {mode === 'login' ? 'Create an account' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
