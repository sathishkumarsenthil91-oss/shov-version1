import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_ELECTION_MEMBERS } from '../../data/mockData';
import { 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  Phone,
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Crown,
  Building2,
  Cpu,
  Database,
  UserPlus,
  LogIn,
  KeyRound,
  AlertCircle,
  RefreshCw,
  Info,
  Smartphone,
  Check,
  Copy,
  Users,
  Award,
  ChevronRight,
  Send
} from 'lucide-react';
import { UserRole, DepartmentCode, ElectionCouncilRole } from '../../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenOnboarding?: () => void;
  onOpenStaffCreate?: () => void;
  initialMode?: 'otp' | 'login' | 'signup' | 'council' | 'quick';
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'otp'
}) => {
  const { 
    loginWithSupabaseEmail, 
    signUpWithSupabaseEmail, 
    sendPasswordReset, 
    loginWithPhoneOrEmail,
    verifyOtp,
    loginWithGoogle, 
    switchRole, 
    switchCouncilMember,
    isLoading 
  } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'otp' | 'login' | 'signup' | 'council' | 'quick'>(initialMode);
  
  // ==========================
  // OTP AUTH STATE
  // ==========================
  const [otpTargetType, setOtpTargetType] = useState<'phone' | 'email'>('phone');
  const [otpIdentifier, setOtpIdentifier] = useState('');
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');
  const [otpCode, setOtpCode] = useState('');
  const [otpRole, setOtpRole] = useState<UserRole>('STUDENT');
  const [otpDept, setOtpDept] = useState<DepartmentCode>('CSE');
  const [countdown, setCountdown] = useState(0);
  const [suggestedOtp, setSuggestedOtp] = useState<string | null>(null);

  // ==========================
  // COUNCIL MEMBER LOGIN STATE
  // ==========================
  const [selectedCouncilMemberId, setSelectedCouncilMemberId] = useState<string>('em-1');
  const [councilPasscode, setCouncilPasscode] = useState('');
  const [councilEmailInput, setCouncilEmailInput] = useState('chairperson.council@student.shov.college.edu');

  // ==========================
  // LOGIN FORM STATE
  // ==========================
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState<string | null>(null);

  // ==========================
  // SIGNUP FORM STATE
  // ==========================
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupRole, setSignupRole] = useState<UserRole>('STUDENT');
  const [signupDept, setSignupDept] = useState<DepartmentCode>('CSE');
  const [signupStudentId, setSignupStudentId] = useState('');
  const [signupPhone, setSignupPhone] = useState('');

  // ==========================
  // FEEDBACK STATE
  // ==========================
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  if (!isOpen) return null;

  // 1. HANDLE REQUEST OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanInput = otpIdentifier.trim();
    if (!cleanInput) {
      setErrorMessage(otpTargetType === 'phone' ? 'Please enter a mobile phone number.' : 'Please enter your email address.');
      return;
    }

    if (otpTargetType === 'phone' && cleanInput.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (otpTargetType === 'email' && !cleanInput.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const res = await loginWithPhoneOrEmail(cleanInput);
    setIsSubmitting(false);

    if (res.success) {
      setOtpStep('verify');
      setCountdown(45);
      setSuggestedOtp(res.testOtp || '123456');
      setSuccessMessage(`OTP passcode sent to ${cleanInput}! Enter the 6-digit code below.`);
    } else {
      setErrorMessage('Failed to send OTP. Please check the number/email and retry.');
    }
  };

  // 2. HANDLE VERIFY OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!otpCode.trim() || otpCode.trim().length < 4) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    setIsSubmitting(true);
    const success = await verifyOtp(otpIdentifier.trim(), otpCode.trim(), otpRole, otpDept);
    setIsSubmitting(false);

    if (success) {
      setSuccessMessage('OTP verified successfully! Welcome to SHOV.');
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMessage('Invalid OTP code. Please use 123456 or request a fresh code.');
    }
  };

  // 3. HANDLE SUPABASE PASSWORD LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setIsSubmitting(true);
    const res = await loginWithSupabaseEmail(loginEmail.trim(), loginPassword);
    setIsSubmitting(false);

    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error || 'Failed to sign in. Please verify your credentials.');
    }
  };

  // 4. HANDLE SUPABASE SIGN UP
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signupName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const res = await signUpWithSupabaseEmail({
      email: signupEmail.trim(),
      password: signupPassword,
      name: signupName.trim(),
      role: signupRole,
      departmentCode: signupDept,
      studentId: signupStudentId.trim() || undefined,
      phone: signupPhone.trim() || undefined
    });
    setIsSubmitting(false);

    if (res.success) {
      setSuccessMessage(res.message || 'Account successfully created!');
      setTimeout(() => {
        onClose();
      }, 1000);
    } else {
      setErrorMessage(res.error || 'Failed to register account with Supabase.');
    }
  };

  // 5. HANDLE FORGOT PASSWORD
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) {
      setForgotPasswordStatus('Please enter your registered email.');
      return;
    }
    setIsSubmitting(true);
    const res = await sendPasswordReset(forgotPasswordEmail.trim());
    setIsSubmitting(false);
    if (res.success) {
      setForgotPasswordStatus('✅ Password recovery email sent! Check your inbox.');
    } else {
      setForgotPasswordStatus(`⚠️ ${res.error || 'Could not send reset email.'}`);
    }
  };

  // 6. HANDLE GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    const success = await loginWithGoogle(otpRole);
    setIsSubmitting(false);
    if (success) {
      onClose();
    }
  };

  // 7. HANDLE DIRECT COUNCIL MEMBER SELECT
  const handleCouncilMemberClick = (memberId: string) => {
    switchCouncilMember(memberId);
    onClose();
  };

  // 8. HANDLE COUNCIL CREDENTIALS SUBMIT
  const handleCouncilCredentialsLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const inputClean = councilEmailInput.toLowerCase().trim();
    const matched = INITIAL_ELECTION_MEMBERS.find(m => 
      m.email.toLowerCase() === inputClean || 
      m.id === selectedCouncilMemberId ||
      m.name.toLowerCase().includes(inputClean) ||
      m.role.toLowerCase() === inputClean
    );

    if (matched) {
      switchCouncilMember(matched.id);
      setIsSubmitting(false);
      onClose();
    } else {
      switchCouncilMember(selectedCouncilMemberId || 'em-1');
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6"
      >
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5 font-mono">
              <Database className="w-3 h-3 text-emerald-300" />
              <span>SUPABASE AUTH (BACKEND-SHOV)</span>
            </span>
            <span className="text-[10px] text-blue-200 font-bold">
              IT • CSE • AIDS
            </span>
          </div>

          <h2 className="text-xl font-black tracking-tight">
            {activeTab === 'otp' && 'Instant OTP Authentication'}
            {activeTab === 'login' && 'Sign In with Password'}
            {activeTab === 'council' && 'Student Election Council Member Login'}
            {activeTab === 'signup' && 'Create Your SHOV Account'}
            {activeTab === 'quick' && '1-Click Demo Evaluation'}
          </h2>
          <p className="text-xs text-blue-100 mt-0.5">
            Cloud-synced identity, digital ID badge, and AI engineering research lab.
          </p>

          {/* MAIN TABS */}
          <div className="grid grid-cols-5 gap-1 mt-5 p-1 bg-black/25 rounded-2xl backdrop-blur-md">
            <button
              onClick={() => {
                setActiveTab('otp');
                setErrorMessage(null);
                setSuccessMessage(null);
                setIsForgotPasswordOpen(false);
              }}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                activeTab === 'otp' ? 'bg-white text-blue-700 shadow-md font-black' : 'text-blue-100 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>OTP</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('login');
                setErrorMessage(null);
                setSuccessMessage(null);
                setIsForgotPasswordOpen(false);
              }}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                activeTab === 'login' ? 'bg-white text-blue-700 shadow-md font-black' : 'text-blue-100 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('council');
                setErrorMessage(null);
                setSuccessMessage(null);
                setIsForgotPasswordOpen(false);
              }}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                activeTab === 'council' ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow-md font-black' : 'text-amber-200 hover:text-white'
              }`}
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Council</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('signup');
                setErrorMessage(null);
                setSuccessMessage(null);
                setIsForgotPasswordOpen(false);
              }}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                activeTab === 'signup' ? 'bg-white text-blue-700 shadow-md font-black' : 'text-blue-100 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('quick');
                setErrorMessage(null);
                setSuccessMessage(null);
                setIsForgotPasswordOpen(false);
              }}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all flex items-center justify-center gap-1 ${
                activeTab === 'quick' ? 'bg-white text-blue-700 shadow-md font-black' : 'text-blue-100 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo</span>
            </button>
          </div>
        </div>

        {/* ERROR / SUCCESS ALERTS */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* MODAL BODY */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            
            {/* ========================================================= */}
            {/* 1. OTP AUTHENTICATION TAB                                 */}
            {/* ========================================================= */}
            {activeTab === 'otp' && (
              <motion.div
                key="tab-otp"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                {otpStep === 'request' ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    {/* Method Switch: Phone or Email */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        OTP Delivery Channel
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpTargetType('phone');
                            setErrorMessage(null);
                          }}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                            otpTargetType === 'phone'
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Mobile Number</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setOtpTargetType('email');
                            setErrorMessage(null);
                          }}
                          className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                            otpTargetType === 'email'
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email Address</span>
                        </button>
                      </div>
                    </div>

                    {/* Identifier Input */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        {otpTargetType === 'phone' ? 'Mobile Phone Number' : 'Institutional / Personal Email'}
                      </label>
                      <div className="relative">
                        {otpTargetType === 'phone' ? (
                          <>
                            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                              type="tel"
                              value={otpIdentifier}
                              onChange={(e) => setOtpIdentifier(e.target.value)}
                              placeholder="+91 98765 43210 or 10-digit number"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              required
                            />
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                            <input
                              type="email"
                              value={otpIdentifier}
                              onChange={(e) => setOtpIdentifier(e.target.value)}
                              placeholder="student@shov.college.edu"
                              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              required
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Quick Demo Pre-fills */}
                    <div className="p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/60 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5">
                      <div className="flex items-center justify-between font-bold text-blue-700 dark:text-blue-400">
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          Quick Autofill
                        </span>
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-800/60 px-1.5 py-0.5 rounded font-mono">
                          OTP = 123456
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setOtpTargetType('phone');
                            setOtpIdentifier('+91 98765 43210');
                          }}
                          className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-[10px] font-bold text-slate-700 dark:text-slate-300"
                        >
                          📱 +91 98765 43210
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpTargetType('email');
                            setOtpIdentifier('aarav.23cs001@student.shov.college.edu');
                          }}
                          className="px-2 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-[10px] font-bold text-slate-700 dark:text-slate-300"
                        >
                          ✉️ student.shov.college.edu
                        </button>
                      </div>
                    </div>

                    {/* Send OTP Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Smartphone className="w-4 h-4" />}
                      <span>{isSubmitting ? 'Dispatching OTP Code...' : 'Send 6-Digit OTP Code'}</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <KeyRound className="w-4 h-4 text-blue-600" />
                        <span>Enter 6-Digit Verification Code</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpStep('request');
                          setOtpCode('');
                          setErrorMessage(null);
                        }}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Change Destination
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Code sent to <span className="font-bold text-slate-800 dark:text-slate-200">{otpIdentifier}</span>
                    </div>

                    {/* 6-Digit Passcode Box */}
                    <div className="space-y-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                        placeholder="1 2 3 4 5 6"
                        autoFocus
                        className="w-full text-center tracking-[0.6em] text-2xl font-black font-mono py-3 rounded-2xl border-2 border-blue-500/40 focus:border-blue-600 bg-blue-50/40 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:outline-none"
                        required
                      />

                      {/* Demo OTP Helper Banner */}
                      {suggestedOtp && (
                        <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-[11px]">
                          <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                            Demo Passcode: <strong className="font-mono">{suggestedOtp}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => setOtpCode(suggestedOtp)}
                            className="px-2 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Autofill</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Role & Department Selection for Persona Mapping */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Sign In As Persona:
                        </span>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                          {otpRole} • {otpDept}
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-1">
                        {[
                          { r: 'STUDENT', label: 'Student' },
                          { r: 'STAFF', label: 'Staff' },
                          { r: 'HOD', label: 'HOD' },
                          { r: 'VICE_PRINCIPAL', label: 'VP' },
                          { r: 'ELECTION_COUNCIL', label: 'Council' }
                        ].map((item) => (
                          <button
                            type="button"
                            key={item.r}
                            onClick={() => setOtpRole(item.r as UserRole)}
                            className={`py-1 rounded-lg text-[10px] font-bold border transition-all ${
                              otpRole === item.r
                                ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-1 pt-1">
                        {(['CSE', 'AIDS', 'IT'] as DepartmentCode[]).map((dept) => (
                          <button
                            type="button"
                            key={dept}
                            onClick={() => setOtpDept(dept)}
                            className={`py-1 rounded-lg text-[10px] font-bold border transition-all ${
                              otpDept === dept
                                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400'
                                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700'
                            }`}
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Resend OTP button & timer */}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500">Didn't receive code?</span>
                      {countdown > 0 ? (
                        <span className="text-slate-400 font-mono font-bold text-[11px]">
                          Resend in {countdown}s
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSendOtp()}
                          className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Resend OTP Code
                        </button>
                      )}
                    </div>

                    {/* Submit OTP Verification */}
                    <button
                      type="submit"
                      disabled={isSubmitting || isLoading}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      <span>{isSubmitting ? 'Verifying OTP Code...' : 'Verify & Enter SHOV'}</span>
                    </button>
                  </form>
                )}
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* 2. PASSWORD LOGIN TAB                                     */}
            {/* ========================================================= */}
            {activeTab === 'login' && !isForgotPasswordOpen && (
              <motion.div
                key="tab-login"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="yourname@student.shov.college.edu"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPasswordOpen(true)}
                        className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showLoginPassword ? 'text' : 'password'}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                    <span>{isSubmitting ? 'Authenticating with Supabase...' : 'Sign In with Password'}</span>
                  </button>
                </form>

                <div className="relative flex items-center justify-center pt-2">
                  <div className="border-t border-slate-200 dark:border-slate-800 w-full" />
                  <span className="bg-white dark:bg-slate-900 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider absolute">
                    or social auth
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting || isLoading}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all flex items-center justify-center gap-2.5"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* FORGOT PASSWORD SUB-VIEW                                  */}
            {/* ========================================================= */}
            {isForgotPasswordOpen && (
              <motion.div
                key="tab-forgot"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <span className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                    <KeyRound className="w-4 h-4" />
                    Supabase Password Recovery
                  </span>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Enter your email to receive a secure Supabase password reset link.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Your Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        placeholder="yourname@student.shov.college.edu"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {forgotPasswordStatus && (
                    <div className="text-xs p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-medium">
                      {forgotPasswordStatus}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordOpen(false)}
                      className="py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow transition flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                      <span>Send Recovery Link</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* 3. ELECTION COUNCIL MEMBER LOGIN TAB                     */}
            {/* ========================================================= */}
            {activeTab === 'council' && (
              <motion.div
                key="tab-council"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-2.5">
                  <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-amber-900 dark:text-amber-200">
                      Student Election Council Executive Suite
                    </p>
                    <p className="text-amber-700 dark:text-amber-400 mt-0.5 leading-relaxed">
                      Select your elected portfolio to access the Senate resolution dashboard, respond to student inquiries with live camera evidence, and manage campus affairs.
                    </p>
                  </div>
                </div>

                {/* 6 Elected Council Portfolios */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-amber-500" />
                      <span>Elected Senate Office Bearers (6 Portfolios)</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">Click to Authenticate</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                    {INITIAL_ELECTION_MEMBERS.map((member) => (
                      <button
                        type="button"
                        key={member.id}
                        onClick={() => handleCouncilMemberClick(member.id)}
                        className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-3 group ${
                          selectedCouncilMemberId === member.id
                            ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm ring-2 ring-amber-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <img
                          src={member.photoUrl}
                          alt={member.name}
                          className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-400/40 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-mono">
                              #{member.roleNumber}
                            </span>
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {member.name}
                            </p>
                          </div>
                          <p className="text-[10px] font-medium text-amber-600 dark:text-amber-400 truncate">
                            {member.designationTitle.replace(/^\d+\s*-\s*/, '')}
                          </p>
                          <p className="text-[9px] text-slate-500 dark:text-slate-400">
                            {member.department} • Year {member.year}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Council Credentials Form */}
                <form onSubmit={handleCouncilCredentialsLogin} className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Official Council Email or Portfolio Name
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={councilEmailInput}
                        onChange={(e) => setCouncilEmailInput(e.target.value)}
                        placeholder="chairperson.council@student.shov.college.edu"
                        className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                      <span>Senate Security Passkey</span>
                      <span className="text-[10px] text-amber-600 font-normal">Auto-verified for elected members</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="password"
                        value={councilPasscode}
                        onChange={(e) => setCouncilPasscode(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
                    <span>Sign In to Election Council Suite</span>
                  </button>
                </form>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* 4. SUPABASE SIGN UP TAB                                   */}
            {/* ========================================================= */}
            {activeTab === 'signup' && (
              <motion.div
                key="tab-signup"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                <form onSubmit={handleSignUp} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      placeholder="e.g. S. Sathish / Aarav Sharma"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Institutional Role
                    </label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[
                        { r: 'STUDENT', label: 'Student' },
                        { r: 'STAFF', label: 'Staff' },
                        { r: 'HOD', label: 'HOD' },
                        { r: 'VICE_PRINCIPAL', label: 'VP' },
                        { r: 'ELECTION_COUNCIL', label: 'Council' }
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.r}
                          onClick={() => setSignupRole(item.r as UserRole)}
                          className={`py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            signupRole === item.r
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Department
                      </label>
                      <select
                        value={signupDept}
                        onChange={(e) => setSignupDept(e.target.value as DepartmentCode)}
                        className="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="CSE">CSE (Computer Science)</option>
                        <option value="AIDS">AIDS (AI & Data Science)</option>
                        <option value="IT">IT (Information Tech)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        {signupRole === 'STUDENT' ? 'Roll / Reg No' : 'Staff ID Code'}
                      </label>
                      <input
                        type="text"
                        value={signupStudentId}
                        onChange={(e) => setSignupStudentId(e.target.value)}
                        placeholder={signupRole === 'STUDENT' ? 'e.g. 26CS042' : 'e.g. FAC-091'}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                      <input
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="yourname@student.shov.college.edu"
                        className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Password (≥6 chars)
                      </label>
                      <input
                        type={showSignupPassword ? 'text' : 'password'}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                        Confirm Password
                      </label>
                      <input
                        type={showSignupPassword ? 'text' : 'password'}
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showSignupPassword}
                        onChange={(e) => setShowSignupPassword(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span>Show passwords</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-black shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                    <span>{isSubmitting ? 'Registering with Supabase...' : 'Create Supabase Account'}</span>
                  </button>
                </form>
              </motion.div>
            )}

            {/* ========================================================= */}
            {/* 4. DEMO SWITCHER TAB                                      */}
            {/* ========================================================= */}
            {activeTab === 'quick' && (
              <motion.div
                key="tab-quick"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-3"
              >
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <Info className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>Instant 1-click evaluation access without entering credentials:</span>
                </div>

                {/* Campus Administration & Student Roles */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Campus Administration & Students</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        switchRole('STUDENT', 'CSE');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-left transition-all flex items-center gap-2.5"
                    >
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Student (CSE)</p>
                        <p className="text-[10px] text-slate-500">Aarav Sharma • 23CS001</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('STUDENT', 'AIDS');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-left transition-all flex items-center gap-2.5"
                    >
                      <Database className="w-4 h-4 text-indigo-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Student (AIDS)</p>
                        <p className="text-[10px] text-slate-500">Kavya Reddy • 24AD007</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('HOD', 'CSE');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-left transition-all flex items-center gap-2.5"
                    >
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">HOD (CSE Dept)</p>
                        <p className="text-[10px] text-slate-500">Dr. Aris Thorne</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('VICE_PRINCIPAL');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-left transition-all flex items-center gap-2.5"
                    >
                      <Crown className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Vice Principal (VP)</p>
                        <p className="text-[10px] text-slate-500">Dr. Elizabeth Montgomery</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        switchRole('STAFF');
                        onClose();
                      }}
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-left transition-all flex items-center gap-2.5 col-span-1 sm:col-span-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Gatehouse Security Staff</p>
                        <p className="text-[10px] text-slate-500">Officer Marcus Vance • Live QR & Scanner</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Student Election Council Portfolios */}
                <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      <span>Student Election Council (6 Portfolios)</span>
                    </span>
                    <span className="text-[9px] text-slate-400">Senate Portfolios</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INITIAL_ELECTION_MEMBERS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          switchCouncilMember(m.id);
                          onClose();
                        }}
                        className="p-2 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-500 hover:bg-amber-100/60 dark:hover:bg-amber-900/30 text-left transition-all flex items-center gap-2"
                      >
                        <img src={m.photoUrl} alt={m.name} className="w-7 h-7 rounded-lg object-cover ring-1 ring-amber-400" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{m.name}</p>
                          <p className="text-[10px] text-amber-600 dark:text-amber-400 truncate font-medium">{m.designationTitle}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
