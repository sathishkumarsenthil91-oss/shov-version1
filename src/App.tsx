import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Header } from './components/common/Header';
import { SplashScreen } from './components/common/SplashScreen';
import { LoginModal } from './components/auth/LoginModal';
import { StudentOnboardingModal } from './components/auth/StudentOnboardingModal';
import { StaffAccountModal } from './components/auth/StaffAccountModal';
import { StudentDashboard } from './components/student/StudentDashboard';
import { DigitalIDCard } from './components/student/DigitalIDCard';
import { AiAcademicSection } from './components/student/AiAcademicSection';
import { StaffScanner } from './components/staff/StaffScanner';
import { StaffHistory } from './components/staff/StaffHistory';
import { HodVpSection } from './components/staff/HodVpSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { InquiriesHub } from './components/student/InquiriesHub';
import { ElectionCouncilSection } from './components/student/ElectionCouncilSection';
import { PropertiesSection } from './components/properties/PropertiesSection';
import { UserProfilePage } from './components/profile/UserProfilePage';
import { INITIAL_STUDENTS } from './data/mockData';
import { 
  ShieldCheck, 
  QrCode, 
  Clock, 
  UserCheck, 
  Sparkles, 
  Building2, 
  CreditCard,
  Camera,
  Terminal,
  RotateCcw,
  BrainCircuit,
  Crown,
  UserPlus,
  MessageSquare,
  Users,
  Award,
  Home,
  Heart
} from 'lucide-react';

function AppContent() {
  const { user, role, completeStudentOnboarding, createNewStaffAccount } = useAuth();
  
  const [showSplash, setShowSplash] = useState(true);
  const [loginModalMode, setLoginModalMode] = useState<'otp' | 'login' | 'signup' | 'quick' | null>(null);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showStaffCreateModal, setShowStaffCreateModal] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'id-card' | 'ai-mentor' | 'scanner' | 'history' | 'hod-vp' | 'admin' | 'inquiries' | 'council' | 'properties' | 'profile'
  >('dashboard');

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Header
        onOpenLoginModal={(mode) => setLoginModalMode(mode || 'otp')}
        onOpenOnboardingModal={() => setShowOnboardingModal(true)}
        activeTab={activeTab}
        setActiveTab={(t) => setActiveTab(t as any)}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        
        {/* Role Context Bar & Sub-Navigation */}
        <div className="bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-slate-800 backdrop-blur-md sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between overflow-x-auto gap-2">
            
            <div className="flex items-center gap-1.5 shrink-0">
              
              {/* STUDENT ROLE TABS */}
              {role === 'STUDENT' && (
                <>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'dashboard'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>My Dashboard & Fines</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'inquiries'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                    <span>Inquiries to HOD & VP</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('council')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'council'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md'
                        : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>Election Member Council</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('id-card')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'id-card'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Digital ID & QR</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ai-mentor')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'ai-mentor'
                        ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md'
                        : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span>SHOV AI</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('properties')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'properties'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5 text-blue-500" />
                    <span>Campus Housing</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'profile'
                        ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-md'
                        : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                    }`}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>My Profile & Saved</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('hod-vp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'hod-vp'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>HOD & VP Circulars</span>
                  </button>
                </>
              )}

              {/* STAFF ROLE TABS */}
              {role === 'STAFF' && (
                <>
                  <button
                    onClick={() => setActiveTab('scanner')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'scanner'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Gatehouse Live Scanner</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'inquiries'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                    <span>Student Inquiries</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'history'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Scan Audit Logs</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('hod-vp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'hod-vp'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Faculty Photo Feed</span>
                  </button>
                </>
              )}

              {/* HOD ROLE TABS */}
              {role === 'HOD' && (
                <>
                  <button
                    onClick={() => setActiveTab('hod-vp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'hod-vp'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>HOD Department Hub</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'inquiries'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                    <span>Student Inquiries & Appeals</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('council')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'council'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-amber-600 dark:text-amber-400 hover:text-amber-700'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Council Affairs</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ai-mentor')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'ai-mentor'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>SHOV AI</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'history'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Gate Logs</span>
                  </button>
                </>
              )}

              {/* VICE PRINCIPAL ROLE TABS */}
              {role === 'VICE_PRINCIPAL' && (
                <>
                  <button
                    onClick={() => setActiveTab('hod-vp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'hod-vp'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    <span>VP Executive Suite</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'inquiries'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                    <span>Student Appeals & Inquiries</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('council')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'council'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-amber-600 dark:text-amber-400 hover:text-amber-700'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Student Council Ledger</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'admin'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Administration</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'history'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Gatehouse Audit</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('ai-mentor')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'ai-mentor'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>SHOV AI</span>
                  </button>
                </>
              )}

              {/* ADMIN ROLE TABS */}
              {role === 'ADMIN' && (
                <>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'admin'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Admin Master Console</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('scanner')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'scanner'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Live Gate Scanner</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('history')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'history'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Audit Logs</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'inquiries'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquiries & Appeals</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('council')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'council'
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                        : 'text-amber-600 dark:text-amber-400 hover:text-amber-700'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Election Council</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('hod-vp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeTab === 'hod-vp'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Photo Gallery</span>
                  </button>
                </>
              )}

            </div>

            {/* Re-play splash animation button */}
            <button
              onClick={() => setShowSplash(true)}
              className="text-[11px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Replay Intro</span>
            </button>

          </div>
        </div>

        {/* View Content Rendering */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeTab === 'dashboard' && (
            role === 'STUDENT' ? <StudentDashboard /> :
            role === 'STAFF' ? <StaffScanner /> :
            role === 'ADMIN' ? <AdminDashboard /> :
            <HodVpSection />
          )}

          {activeTab === 'inquiries' && (
            <div className="py-2">
              <InquiriesHub />
            </div>
          )}

          {activeTab === 'council' && (
            <div className="py-2">
              <ElectionCouncilSection />
            </div>
          )}

          {activeTab === 'id-card' && (
            <div className="max-w-md mx-auto py-6">
              <DigitalIDCard student={INITIAL_STUDENTS[0]} />
            </div>
          )}

          {activeTab === 'ai-mentor' && (
            <div className="py-2">
              <AiAcademicSection />
            </div>
          )}

          {activeTab === 'scanner' && (
            <div className="py-2">
              <StaffScanner />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="py-2">
              <StaffHistory />
            </div>
          )}

          {activeTab === 'hod-vp' && (
            <div className="py-2">
              <HodVpSection />
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="py-2">
              <PropertiesSection
                onRequireLogin={(reason) => setLoginModalMode('login')}
                onNavigateToProfile={() => setActiveTab('profile')}
              />
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="py-2">
              <UserProfilePage
                onOpenLoginModal={(mode) => setLoginModalMode(mode || 'login')}
                onNavigateToProperties={() => setActiveTab('properties')}
                onNavigateToInquiries={() => setActiveTab('inquiries')}
              />
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="py-2">
              <AdminDashboard />
            </div>
          )}
        </div>

      </main>

      {/* Login / Sign Up Modal Popup */}
      <LoginModal
        isOpen={!!loginModalMode}
        initialMode={loginModalMode || 'otp'}
        onClose={() => setLoginModalMode(null)}
        onOpenOnboarding={() => setShowOnboardingModal(true)}
        onOpenStaffCreate={() => setShowStaffCreateModal(true)}
      />

      {/* Student Onboarding Modal */}
      <StudentOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => setShowOnboardingModal(false)}
        onComplete={completeStudentOnboarding}
      />

      {/* Staff Account Modal */}
      <StaffAccountModal
        isOpen={showStaffCreateModal}
        onClose={() => setShowStaffCreateModal(false)}
        onCreateAccount={createNewStaffAccount}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 SHOV College Digital Identity System • IT, CSE, AIDS Departments</p>
          <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400">
            <span>VERIFIED IDENTITY</span>
            <span>•</span>
            <span>AI ACADEMIC TUTOR</span>
            <span>•</span>
            <span>HOD & VP PROTOCOL</span>
            <span>•</span>
            <span>GATE AUDIT</span>
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
