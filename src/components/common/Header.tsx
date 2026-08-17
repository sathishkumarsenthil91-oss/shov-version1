import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShovLogo } from './ShovLogo';
import { UserRole } from '../../types';
import { 
  Sun, 
  Moon, 
  Bell, 
  ShieldCheck, 
  UserCheck, 
  ShieldAlert, 
  LogOut, 
  Sparkles,
  ChevronDown,
  CheckCircle2,
  X,
  Crown,
  Building2,
  BrainCircuit,
  QrCode,
  CreditCard,
  History,
  Image as ImageIcon,
  LogIn,
  UserPlus,
  Database
} from 'lucide-react';

interface HeaderProps {
  onOpenLoginModal?: (mode?: 'otp' | 'login' | 'signup' | 'quick') => void;
  onOpenOnboardingModal?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenLoginModal, 
  onOpenOnboardingModal,
  activeTab = 'dashboard', 
  setActiveTab 
}) => {
  const { 
    user, 
    role, 
    isAuthenticated, 
    darkMode, 
    toggleDarkMode, 
    switchRole, 
    logout, 
    notifications,
    removeNotification 
  } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const roleBadges: Record<UserRole, { label: string; color: string; icon: React.ReactNode }> = {
    STUDENT: { label: 'STUDENT', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30', icon: <UserCheck className="w-3.5 h-3.5" /> },
    STAFF: { label: 'STAFF / SECURITY', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    HOD: { label: 'HEAD OF DEPT (HOD)', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30', icon: <Building2 className="w-3.5 h-3.5" /> },
    VICE_PRINCIPAL: { label: 'VICE PRINCIPAL', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30', icon: <Crown className="w-3.5 h-3.5" /> },
    ADMIN: { label: 'ADMINISTRATOR', color: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Branding Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center cursor-pointer" onClick={() => setActiveTab?.('dashboard')}>
            <ShovLogo size="sm" showTagline={false} lightText={darkMode} />
          </div>
          <span className="hidden md:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-blue-600/10 text-blue-700 dark:text-blue-400 border border-blue-600/20 font-mono">
            IT • CSE • AIDS
          </span>
        </div>

        {/* Center: Main Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          <button
            onClick={() => setActiveTab?.('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Dashboard
          </button>

          {role === 'STUDENT' && (
            <button
              onClick={() => setActiveTab?.('id-card')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'id-card'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Digital ID</span>
            </button>
          )}

          {/* Housing & Properties Link */}
          <button
            onClick={() => setActiveTab?.('properties')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'properties'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-blue-500" />
            <span>Properties & Housing</span>
          </button>

          {/* Dedicated SHOV AI Chatbot Section Link */}
          <button
            onClick={() => setActiveTab?.('ai-mentor')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'ai-mentor'
                ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>SHOV AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </button>

          {(role === 'STAFF' || role === 'ADMIN' || role === 'VICE_PRINCIPAL' || role === 'HOD') && (
            <button
              onClick={() => setActiveTab?.('scanner')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'scanner'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-500" />
              <span>Live Scanner</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab?.('hod-vp')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'hod-vp'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/60 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-sky-500" />
            <span>Photo Feed & HODs</span>
          </button>
        </nav>

        {/* Right Action Icons: Dark Mode Toggle, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Clean White Mode" : "Switch to Late-Night Study Dark Mode"}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-800 relative group"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-800 relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Campus Notifications</h3>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-medium">
                    {notifications.length} New
                  </span>
                </div>

                <div className="mt-3 max-h-64 overflow-y-auto space-y-2 pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-center text-slate-500 py-6">No new notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{n.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                        </div>
                        <button
                          onClick={() => removeNotification(n.id)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile or Sign-In Trigger */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border border-slate-200/60 dark:border-slate-800"
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200'}
                  alt={user.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-500/30"
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-none">{user.name}</p>
                  <p className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5 flex items-center gap-1">
                    <span>{role}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-68 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                        {role}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-emerald-600 bg-emerald-500/10 border border-emerald-500/20">
                        Supabase Synced
                      </span>
                    </div>
                  </div>

                  {/* Profile & Saved Properties Direct Link */}
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 space-y-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setActiveTab?.('profile');
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-black text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-blue-500" />
                      <span>My Profile & Saved Properties</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        setActiveTab?.('properties');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Explore Properties</span>
                    </button>
                  </div>

                  {/* Switch to Supabase Login / Signup */}
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 space-y-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenLoginModal?.('login');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LogIn className="w-3.5 h-3.5 text-blue-500" />
                      <span>Switch Supabase Account</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenLoginModal?.('signup');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Register New User (Supabase)</span>
                    </button>
                  </div>

                  {/* Switch Demo Roles Sub-menu */}
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">Switch Role Demo:</span>
                    {(['STUDENT', 'STAFF', 'HOD', 'VICE_PRINCIPAL'] as UserRole[]).map((r) => (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setShowProfileMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between ${
                          role === r ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{r}</span>
                        {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenLoginModal?.('signup')}
                className="hidden sm:flex px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-blue-600 text-slate-800 dark:text-slate-200 hover:text-blue-600 text-xs font-bold transition-all items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
              <button
                onClick={() => onOpenLoginModal?.('login')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
