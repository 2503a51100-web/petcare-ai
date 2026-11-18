import { UserProfile } from '../types';

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Plain/Base64 simulated hash for client-side storage
  role: 'Pet Parent' | 'Veterinary Staff';
  phone: string;
  avatarUrl: string;
  memberSince: string;
  preferredClinic: string;
}

const USERS_STORAGE_KEY = 'petcare_ai_registered_users';
const SESSION_STORAGE_KEY = 'petcare_ai_active_session';

// Initial pre-registered users with secure passwords
const DEFAULT_SEEDED_USERS: StoredUser[] = [
  {
    id: 'user-eleanor',
    name: 'Eleanor Vance',
    email: 'eleanor@petcare-ai.com',
    passwordHash: 'Password123!', // Sample clinical test password
    role: 'Pet Parent',
    phone: '+1 (415) 890-4421',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    memberSince: 'September 2024',
    preferredClinic: 'Metropolitan Veterinary Hospital & AI Center',
  },
  {
    id: 'user-drmarcus',
    name: 'Dr. Marcus Vance, DVM',
    email: 'marcus.vance@petcare-ai.com',
    passwordHash: 'DoctorSecure2026!',
    role: 'Veterinary Staff',
    phone: '+1 (415) 555-0199',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    memberSince: 'January 2024',
    preferredClinic: 'Metropolitan Veterinary Hospital & AI Center',
  },
];

export const getRegisteredUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_SEEDED_USERS));
      return DEFAULT_SEEDED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SEEDED_USERS;
  }
};

export const getActiveSession = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setActiveSession = (user: UserProfile | null) => {
  if (user) {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};

export const loginWithCredentials = (
  email: string,
  pass: string
): { success: boolean; user?: UserProfile; error?: string } => {
  const cleanEmail = email.trim().toLowerCase();
  const users = getRegisteredUsers();

  const found = users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (!found) {
    return {
      success: false,
      error: 'No account registered with this email address. Please create an account.',
    };
  }

  if (found.passwordHash !== pass) {
    return {
      success: false,
      error: 'Incorrect password entered. Please verify your credentials.',
    };
  }

  const sessionUser: UserProfile = {
    name: found.name,
    email: found.email,
    phone: found.phone,
    role: found.role,
    avatarUrl: found.avatarUrl,
    memberSince: found.memberSince,
    preferredClinic: found.preferredClinic,
  };

  setActiveSession(sessionUser);
  return { success: true, user: sessionUser };
};

export const registerAccount = (
  name: string,
  email: string,
  pass: string,
  role: 'Pet Parent' | 'Veterinary Staff'
): { success: boolean; user?: UserProfile; error?: string } => {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  if (!cleanName || cleanName.length < 2) {
    return { success: false, error: 'Please enter your full legal name.' };
  }

  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (pass.length < 8) {
    return {
      success: false,
      error: 'Password must be at least 8 characters long for clinical account security.',
    };
  }

  const users = getRegisteredUsers();
  if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
    return {
      success: false,
      error: 'An account with this email already exists. Please sign in instead.',
    };
  }

  const newUser: StoredUser = {
    id: `usr-${Date.now()}`,
    name: cleanName,
    email: cleanEmail,
    passwordHash: pass,
    role,
    phone: '+1 (555) 431-8902',
    avatarUrl:
      role === 'Veterinary Staff'
        ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    preferredClinic: 'Metropolitan Veterinary Hospital & AI Center',
  };

  const updated = [...users, newUser];
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updated));

  const sessionUser: UserProfile = {
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
    role: newUser.role,
    avatarUrl: newUser.avatarUrl,
    memberSince: newUser.memberSince,
    preferredClinic: newUser.preferredClinic,
  };

  setActiveSession(sessionUser);
  return { success: true, user: sessionUser };
};
