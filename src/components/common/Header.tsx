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
  Landmark, 
  LogIn, 
  UserPlus,
  QrCode,
  GraduationCap,
  CreditCard,
  MessageSquare,
  Scan,
  History,
  Send,
  Award,
  Layers
} from 'lucide-react';

interface HeaderProps {
  onOpenLoginModal?: (mode?: 'otp' | 'login' | 'signup' | 'council') => void;
  onOpenOnboardingModal?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenLoginModal, 
  onOpenOnboardingModal,
  activeTab = 'student', 
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
  const [showRoleSwitcherDropdown, setShowRoleSwitcherDropdown] = useState(false);

  const roleConfigs: Record<UserRole, { label: string; badgeColor: string; icon: React.ReactNode }> = {
    STUDENT: { 
      label: 'Student Portal', 
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30', 
      icon: <GraduationCap className="w-3.5 h-3.5" /> 
    },
    STAFF: { 
      label: 'Staff & Security', 
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30', 
      icon: <ShieldCheck className="w-3.5 h-3.5" /> 
    },
    HOD: { 
      label: 'Head of Department', 
      badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30', 
      icon: <Building2 className="w-3.5 h-3.5" /> 
    },
    VICE_PRINCIPAL: { 
      label: 'Vice Principal Suite', 
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30', 
      icon: <Crown className="w-3.5 h-3.5" /> 
    },
    PRINCIPAL: { 
      label: 'Principal Executive', 
      badgeColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30', 
      icon: <Landmark className="w-3.5 h-3.5" /> 
    },
    ADMIN: { 
      label: 'Administrator', 
      badgeColor: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30', 
      icon: <ShieldAlert className="w-3.5 h-3.5" /> 
    },
    ELECTION_COUNCIL: { 
      label: 'Election Council', 
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30', 
      icon: <Crown className="w-3.5 h-3.5" /> 
    },
  };

  // Render role-scoped navigation links strictly filtered by logged-in role
  const renderRoleNavigationLinks = () => {
    switch (role) {
      case 'STUDENT':
        return (
          <>
            <button
              onClick={() => setActiveTab?.('student-id')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'student-id' || activeTab === 'student'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Digital ID Card</span>
            </button>
            <button
              onClick={() => setActiveTab?.('student-academic')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'student-academic'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Academic Record</span>
            </button>
            <button
              onClick={() => setActiveTab?.('student-fines')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'student-fines'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Fines & Fee Clearance</span>
            </button>
            <button
              onClick={() => setActiveTab?.('student-inquiries')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'student-inquiries'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Grievances Hub</span>
            </button>
          </>
        );

      case 'STAFF':
        return (
          <>
            <button
              onClick={() => setActiveTab?.('staff-scanner')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'staff-scanner' || activeTab === 'staff'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Gate Biometrics Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab?.('staff-logs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'staff-logs'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Turnstile Access Logs</span>
            </button>
            <button
              onClick={() => setActiveTab?.('staff-hod-comm')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'staff-hod-comm'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Communicate with HOD</span>
            </button>
          </>
        );

      case 'HOD':
        return (
          <>
            <button
              onClick={() => setActiveTab?.('hod-roster')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'hod-roster' || activeTab === 'hod'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Department Student Roster</span>
            </button>
            <button
              onClick={() => setActiveTab?.('hod-circulars')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'hod-circulars'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Department Circulars</span>
            </button>
            <button
              onClick={() => setActiveTab?.('hod-inquiries')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'hod-inquiries'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Staff Incident Requests</span>
            </button>
          </>
        );

      case 'VICE_PRINCIPAL':
        return (
          <>
            <button
              onClick={() => setActiveTab?.('vp-governance')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'vp-governance' || activeTab === 'vice_principal'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Academic Governance</span>
            </button>
            <button
              onClick={() => setActiveTab?.('vp-fines')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'vp-fines'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Fines Review & Waivers</span>
            </button>
            <button
              onClick={() => setActiveTab?.('vp-circulars')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'vp-circulars'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Inter-Dept Circulars</span>
            </button>
          </>
        );

      case 'PRINCIPAL':
      default:
        return (
          <>
            <button
              onClick={() => setActiveTab?.('principal-executive')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'principal-executive' || activeTab === 'principal'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Executive Campus Command</span>
            </button>
            <button
              onClick={() => setActiveTab?.('principal-circulars')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'principal-circulars'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Executive Orders</span>
            </button>
            <button
              onClick={() => setActiveTab?.('principal-departments')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'principal-departments'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Departments Oversight</span>
            </button>
            <button
              onClick={() => setActiveTab?.('principal-accreditation')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'principal-accreditation'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Accreditation Center</span>
            </button>
          </>
        );
    }
  };

  const handleSwitchPersona = (newRole: UserRole) => {
    switchRole(newRole);
    setShowRoleSwitcherDropdown(false);
    if (newRole === 'STUDENT') setActiveTab?.('student-id');
    else if (newRole === 'STAFF') setActiveTab?.('staff-scanner');
    else if (newRole === 'HOD') setActiveTab?.('hod-roster');
    else if (newRole === 'VICE_PRINCIPAL') setActiveTab?.('vp-governance');
    else if (newRole === 'PRINCIPAL') setActiveTab?.('principal-executive');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Branding Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center cursor-pointer" onClick={() => handleSwitchPersona(role)}>
            <ShovLogo size="sm" showTagline={false} lightText={darkMode} />
          </div>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-blue-600/10 text-blue-700 dark:text-blue-400 border border-blue-600/20 font-mono whitespace-nowrap">
            AVS COLLEGE OF TECHNOLOGY
          </span>
        </div>

        {/* Zone 2: Dynamic Role Navigation Links - strictly limited to logged-in persona */}
        <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60">
          {renderRoleNavigationLinks()}
        </nav>

        {/* Zone 3: Actions - Role Switcher, Dark Mode, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleSwitcherDropdown(!showRoleSwitcherDropdown)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-black text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer shadow-xs"
              title="Switch Active Persona"
            >
              {roleConfigs[role]?.icon}
              <span className="hidden md:inline">{roleConfigs[role]?.label || role}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showRoleSwitcherDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in">
                <div className="px-2.5 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  Switch Active Persona
                </div>

                <div className="p-1 space-y-1">
                  <button
                    onClick={() => handleSwitchPersona('STUDENT')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      role === 'STUDENT' ? 'bg-blue-50 dark:bg-blue-950 text-blue-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                    <span>Student Portal</span>
                  </button>

                  <button
                    onClick={() => handleSwitchPersona('STAFF')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      role === 'STAFF' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Staff & Security</span>
                  </button>

                  <button
                    onClick={() => handleSwitchPersona('HOD')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      role === 'HOD' ? 'bg-sky-50 dark:bg-sky-950 text-sky-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-sky-500" />
                    <span>Head of Dept (HOD)</span>
                  </button>

                  <button
                    onClick={() => handleSwitchPersona('VICE_PRINCIPAL')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      role === 'VICE_PRINCIPAL' ? 'bg-purple-50 dark:bg-purple-950 text-purple-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5 text-purple-500" />
                    <span>Vice Principal</span>
                  </button>

                  <button
                    onClick={() => handleSwitchPersona('PRINCIPAL')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      role === 'PRINCIPAL' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Landmark className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Principal</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode Switcher */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Clean White Mode" : "Switch to Dark Mode"}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-800 relative group cursor-pointer"
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
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200/60 dark:border-slate-800 relative cursor-pointer"
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
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
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
                className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-all border border-slate-200/60 dark:border-slate-800 cursor-pointer"
              >
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
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
                        AVS College
                      </span>
                    </div>
                  </div>

                  {/* Switch Role Direct Buttons */}
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Switch Active View</p>
                    <button
                      onClick={() => handleSwitchPersona('STUDENT')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                      <span>Student View</span>
                    </button>
                    <button
                      onClick={() => handleSwitchPersona('STAFF')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Staff & Security</span>
                    </button>
                    <button
                      onClick={() => handleSwitchPersona('HOD')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Building2 className="w-3.5 h-3.5 text-sky-500" />
                      <span>HOD Portal</span>
                    </button>
                    <button
                      onClick={() => handleSwitchPersona('VICE_PRINCIPAL')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Crown className="w-3.5 h-3.5 text-purple-500" />
                      <span>Vice Principal</span>
                    </button>
                    <button
                      onClick={() => handleSwitchPersona('PRINCIPAL')}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Landmark className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Principal Desk</span>
                    </button>
                  </div>

                  {/* Switch to Dedicated Multi-Role Login Modal */}
                  <div className="p-2 border-b border-slate-100 dark:border-slate-800 space-y-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onOpenLoginModal?.('login');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-3.5 h-3.5 text-blue-500" />
                      <span>Open Role Login Portal</span>
                    </button>
                  </div>

                  <div className="pt-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer"
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
                onClick={() => onOpenLoginModal?.('login')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Role Login</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
};
