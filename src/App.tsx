import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { LoginModal } from './components/auth/LoginModal';
import { StudentOnboardingModal } from './components/auth/StudentOnboardingModal';
import { StaffAccountModal } from './components/auth/StaffAccountModal';
import { StudentSection } from './components/student/StudentSection';
import { StaffSection } from './components/staff/StaffSection';
import { HodDedicatedSection } from './components/staff/HodDedicatedSection';
import { VpDedicatedSection } from './components/staff/VpDedicatedSection';
import { PrincipalDedicatedSection } from './components/principal/PrincipalDedicatedSection';
import { DepartmentPromptModal } from './components/common/DepartmentPromptModal';
import { Department, UserRole } from './types';
import { 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  Crown, 
  Landmark,
  GraduationCap,
  Sparkles,
  Lock,
  ArrowRight,
  LogIn
} from 'lucide-react';

function AppContent() {
  const { user, role, switchRole, completeStudentOnboarding, createNewStaffAccount, addNotification } = useAuth();
  
  const [loginModalMode, setLoginModalMode] = useState<'otp' | 'login' | 'signup' | 'council' | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showStaffCreateModal, setShowStaffCreateModal] = useState(false);
  const [showDepartmentPrompt, setShowDepartmentPrompt] = useState(false);

  // App Navigation Tab
  const [activeTab, setActiveTab] = useState<string>('student-id');

  const handleDepartmentSelected = (dept: Department) => {
    setShowDepartmentPrompt(false);
    addNotification('Department Configured', `Active department updated to ${dept.name} (${dept.code}).`, 'success');
  };

  const handleQuickRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    if (newRole === 'STUDENT') setActiveTab('student-id');
    else if (newRole === 'STAFF') setActiveTab('staff-scanner');
    else if (newRole === 'HOD') setActiveTab('hod-roster');
    else if (newRole === 'VICE_PRINCIPAL') setActiveTab('vp-governance');
    else if (newRole === 'PRINCIPAL') setActiveTab('principal-executive');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Dynamic Top Navbar - Restricted strictly to active role */}
      <Header
        onOpenLoginModal={(mode) => setLoginModalMode(mode || 'otp')}
        onOpenOnboardingModal={() => setShowOnboardingModal(true)}
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t)}
      />

      {/* Role Navigation Bar & Persona Switcher */}
      <div className="bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-md sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between overflow-x-auto gap-4">
          
          {/* Active Role Indicator */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Active Portal:
            </span>

            {/* 1. Student */}
            <button
              onClick={() => handleQuickRoleSwitch('STUDENT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                role === 'STUDENT'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            {/* 2. Staff */}
            <button
              onClick={() => handleQuickRoleSwitch('STAFF')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                role === 'STAFF'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff</span>
            </button>

            {/* 3. HOD */}
            <button
              onClick={() => handleQuickRoleSwitch('HOD')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                role === 'HOD'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>HOD</span>
            </button>

            {/* 4. Vice Principal */}
            <button
              onClick={() => handleQuickRoleSwitch('VICE_PRINCIPAL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                role === 'VICE_PRINCIPAL'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Vice Principal</span>
            </button>

            {/* 5. Principal */}
            <button
              onClick={() => handleQuickRoleSwitch('PRINCIPAL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                role === 'PRINCIPAL'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>Principal</span>
            </button>
          </div>

          {/* Right Action: Role Login Portal Trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLoginModalMode('login')}
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-500" />
              <span>Role Login Sections</span>
            </button>

            <button
              onClick={() => setShowDepartmentPrompt(true)}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 cursor-pointer"
            >
              <Building2 className="w-3 h-3" />
              <span className="hidden sm:inline">Select Dept</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Content Area - Strictly Rendered based on Logged-in Persona */}
      <main className="flex-1 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          
          {/* 1. Student Section */}
          {role === 'STUDENT' && (
            <StudentSection />
          )}

          {/* 2. Staff Section */}
          {role === 'STAFF' && (
            <StaffSection />
          )}

          {/* 3. HOD Section */}
          {role === 'HOD' && (
            <HodDedicatedSection />
          )}

          {/* 4. Vice Principal Section */}
          {role === 'VICE_PRINCIPAL' && (
            <VpDedicatedSection />
          )}

          {/* 5. Principal Section */}
          {role === 'PRINCIPAL' && (
            <PrincipalDedicatedSection />
          )}

          {/* Admin Fallback */}
          {role === 'ADMIN' && (
            <PrincipalDedicatedSection />
          )}

        </div>
      </main>

      {/* Login / Sign Up Modal Popup */}
      <LoginModal
        isOpen={!!loginModalMode}
        initialMode={loginModalMode || 'login'}
        onClose={() => setLoginModalMode(null)}
        onOpenOnboarding={() => {
          setShowOnboardingModal(true);
          setShowDepartmentPrompt(true);
        }}
        onOpenStaffCreate={() => setShowStaffCreateModal(true)}
        onOpenEmailTemplates={() => {
          switchRole('PRINCIPAL');
          setActiveTab('principal-executive');
        }}
      />

      {/* Student Onboarding Modal */}
      <StudentOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        onComplete={(st) => {
          completeStudentOnboarding(st);
          setShowDepartmentPrompt(true);
        }}
      />

      {/* Staff Account Modal */}
      <StaffAccountModal
        isOpen={showStaffCreateModal}
        onClose={() => setShowStaffCreateModal(false)}
        onCreateAccount={createNewStaffAccount}
      />

      {/* Department Prompt Modal */}
      <DepartmentPromptModal
        isOpen={showDepartmentPrompt}
        onClose={() => setShowDepartmentPrompt(false)}
        onSelectDepartment={handleDepartmentSelected}
        studentIdOrName={user?.name || user?.username}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AVS College of Technology • Role-Based Educational Institutional System</p>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 flex-wrap justify-center">
            <span>STUDENT</span>
            <span>•</span>
            <span>STAFF</span>
            <span>•</span>
            <span>HOD</span>
            <span>•</span>
            <span>VICE PRINCIPAL</span>
            <span>•</span>
            <span>PRINCIPAL</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
