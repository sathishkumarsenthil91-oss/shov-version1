import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  Lock, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Crown,
  Building2,
  Landmark,
  KeyRound,
  GraduationCap,
  Info
} from 'lucide-react';
import { UserRole, DepartmentCode } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOnboarding?: () => void;
  onOpenStaffCreate?: () => void;
  onOpenEmailTemplates?: () => void;
  initialMode?: 'otp' | 'login' | 'signup' | 'council';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  initialMode
}) => {
  const { 
    switchRole, 
    addNotification,
    loginWithSupabaseEmail 
  } = useAuth();
  
  // 5 Role Login Tabs
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>('STUDENT');

  // Input states
  const [identifier, setIdentifier] = useState('23CS001');
  const [password, setPassword] = useState('student@2026');
  const [selectedDept, setSelectedDept] = useState<DepartmentCode>('CSE');

  if (!isOpen) return null;

  const handleRoleTabChange = (role: UserRole) => {
    setSelectedRoleTab(role);
    if (role === 'STUDENT') {
      setIdentifier('23CS001');
      setPassword('student@2026');
    } else if (role === 'STAFF') {
      setIdentifier('staff.security@avsct.edu.in');
      setPassword('staff@2026');
    } else if (role === 'HOD') {
      setIdentifier('hod.cse@avsct.edu.in');
      setPassword('hod@2026');
    } else if (role === 'VICE_PRINCIPAL') {
      setIdentifier('vp.academic@avsct.edu.in');
      setPassword('vp@2026');
    } else if (role === 'PRINCIPAL') {
      setIdentifier('principal.office@avsct.edu.in');
      setPassword('principal@2026');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole(selectedRoleTab);
    addNotification('Access Granted', `Authenticated as ${selectedRoleTab.replace(/_/g, ' ')} (${identifier})`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col"
      >
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white relative flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-sky-300 border border-blue-500/30 text-[10px] font-black uppercase tracking-wider font-mono">
              <Sparkles className="w-3 h-3" />
              <span>AVS COLLEGE OF TECHNOLOGY • ROLE PORTAL</span>
            </div>
            <h2 className="text-xl font-black tracking-tight text-white mt-1">
              Institutional Access & Authentication
            </h2>
            <p className="text-xs text-slate-400">
              Select your institutional designation to access role-tailored workspaces.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Distinct Role Tabs */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-5 gap-1.5">
            
            {/* 1. Student Tab */}
            <button
              onClick={() => handleRoleTabChange('STUDENT')}
              className={`p-2.5 rounded-2xl text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                selectedRoleTab === 'STUDENT'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-tight">Student</span>
            </button>

            {/* 2. Staff Tab */}
            <button
              onClick={() => handleRoleTabChange('STAFF')}
              className={`p-2.5 rounded-2xl text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                selectedRoleTab === 'STAFF'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-tight">Staff</span>
            </button>

            {/* 3. HOD Tab */}
            <button
              onClick={() => handleRoleTabChange('HOD')}
              className={`p-2.5 rounded-2xl text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                selectedRoleTab === 'HOD'
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-tight">HOD</span>
            </button>

            {/* 4. VP Tab */}
            <button
              onClick={() => handleRoleTabChange('VICE_PRINCIPAL')}
              className={`p-2.5 rounded-2xl text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                selectedRoleTab === 'VICE_PRINCIPAL'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-tight">VP</span>
            </button>

            {/* 5. Principal Tab */}
            <button
              onClick={() => handleRoleTabChange('PRINCIPAL')}
              className={`p-2.5 rounded-2xl text-center transition flex flex-col items-center gap-1 cursor-pointer ${
                selectedRoleTab === 'PRINCIPAL'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800'
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span className="text-[10px] font-bold tracking-tight">Principal</span>
            </button>

          </div>
        </div>

        {/* Login Form Body */}
        <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
          
          {/* Role Info Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold text-slate-900 dark:text-white">
                {selectedRoleTab === 'STUDENT' && 'Student Access Area'}
                {selectedRoleTab === 'STAFF' && 'Security & Faculty Proctor Desk'}
                {selectedRoleTab === 'HOD' && 'Head of Department Administrative Desk'}
                {selectedRoleTab === 'VICE_PRINCIPAL' && 'Vice Principal Governance Suite'}
                {selectedRoleTab === 'PRINCIPAL' && 'Executive Office of the Principal'}
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                {selectedRoleTab === 'STUDENT' && 'Access Digital ID Card, academic timetable, dues, and inquiries.'}
                {selectedRoleTab === 'STAFF' && 'Access turnstile QR scanner, biometric matcher, and communicate with HOD.'}
                {selectedRoleTab === 'HOD' && 'Manage department student IDs, broadcast circulars, and reply to staff incident logs.'}
                {selectedRoleTab === 'VICE_PRINCIPAL' && 'Review inter-dept directives, grant fine waivers, and oversee discipline.'}
                {selectedRoleTab === 'PRINCIPAL' && 'Institutional analytics, faculty register, NAAC/AICTE accreditation, and executive orders.'}
              </p>
            </div>
          </div>

          {/* Department Selection for HOD */}
          {selectedRoleTab === 'HOD' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Department</label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value as DepartmentCode)}
                className="w-full p-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="IT">Information Technology (IT)</option>
                <option value="AIDS">Artificial Intelligence & Data Science (AIDS)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EEE">Electrical & Electronics (EEE)</option>
                <option value="MECH">Mechanical Engineering (MECH)</option>
              </select>
            </div>
          )}

          {/* Identifier Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {selectedRoleTab === 'STUDENT' ? 'Student Register Number / Email' : 'Official Email ID / Username'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full p-3 pl-10 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Password / PIN Input */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {selectedRoleTab === 'STUDENT' ? 'Date of Birth (PIN) / Password' : 'Institutional Password'}
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 pl-10 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black text-xs transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Log In as {selectedRoleTab.replace(/_/g, ' ')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </motion.div>
    </div>
  );
};
