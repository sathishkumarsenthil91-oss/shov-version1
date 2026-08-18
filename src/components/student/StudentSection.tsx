import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DigitalIDCard } from './DigitalIDCard';
import { FinePaymentModal } from './FinePaymentModal';
import { InquiriesHub } from './InquiriesHub';
import { Student, Fine, Payment } from '../../types';
import { INITIAL_STUDENTS, INITIAL_FINES, INITIAL_PAYMENTS } from '../../data/mockData';
import { fetchFinesApi } from '../../services/api';
import { 
  GraduationCap, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  Download, 
  Share2, 
  ShieldAlert, 
  Sparkles,
  PhoneCall,
  MapPin,
  Mail,
  Receipt,
  FileText,
  AlertTriangle,
  QrCode,
  ShieldCheck,
  Building2,
  Calendar,
  MessageSquare,
  RefreshCw,
  Award
} from 'lucide-react';

export const StudentSection: React.FC = () => {
  const { user, addNotification } = useAuth();

  // Active sub-tab inside Student Section
  const [studentTab, setStudentTab] = useState<'id-card' | 'academic' | 'fines' | 'inquiries'>('id-card');

  // Selected student (defaults to Rohit Kumar or matched logged-in student)
  const [student, setStudent] = useState<Student>(() => {
    return INITIAL_STUDENTS.find(s => s.registerNumber.toLowerCase() === user?.username?.toLowerCase() || s.id === user?.studentId) || INITIAL_STUDENTS[0];
  });

  const [fines, setFines] = useState<Fine[]>([]);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);
  const [selectedFineToPay, setSelectedFineToPay] = useState<Fine | null>(null);
  const [showReportLostModal, setShowReportLostModal] = useState(false);
  const [lostReason, setLostReason] = useState('');

  useEffect(() => {
    loadStudentFines();
  }, [student.id]);

  const loadStudentFines = async () => {
    const data = await fetchFinesApi(student.id);
    if (data.length > 0) {
      setFines(data);
    } else {
      setFines(INITIAL_FINES.filter(f => f.studentId === student.id));
    }
  };

  const pendingFines = fines.filter(f => f.status === 'PENDING');
  const totalPendingAmount = pendingFines.reduce((sum, f) => sum + f.amount, 0);

  const handlePaymentSuccess = (paymentRecord: Payment) => {
    setPayments(prev => [paymentRecord, ...prev]);
    setFines(prev => prev.map(f => f.id === paymentRecord.fineId ? { ...f, status: 'PAID' } : f));
    addNotification('Fine Settled', `Payment of ₹${paymentRecord.amount} processed successfully.`, 'success');
  };

  const handleReportLostSubmit = () => {
    if (!lostReason) return;
    setStudent(prev => ({ ...prev, status: 'SUSPENDED' }));
    setShowReportLostModal(false);
    addNotification('Lost ID Reported', 'Your digital card status has been set to SUSPENDED. Admin & Security notified.', 'warning');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. STUDENT HEADER HERO */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border border-blue-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-sky-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider font-mono">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>STUDENT PORTAL • AVS COLLEGE OF TECHNOLOGY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>{student.name}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono font-bold">
                {student.status}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Reg No: <strong className="text-white font-mono">{student.registerNumber}</strong> • Dept: <strong className="text-white">{student.department}</strong> • Batch: <strong className="text-white">{student.validityYear}</strong>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-300 uppercase font-bold block">Attendance</span>
              <span className="text-lg font-black text-emerald-400">94.2%</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center min-w-[100px]">
              <span className="text-[10px] text-slate-300 uppercase font-bold block">Pending Fines</span>
              <span className={`text-lg font-black ${totalPendingAmount > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                ₹{totalPendingAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setStudentTab('id-card')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            studentTab === 'id-card'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>Official 3D Digital ID Card</span>
        </button>

        <button
          onClick={() => setStudentTab('academic')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            studentTab === 'academic'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Academic & Student Profile</span>
        </button>

        <button
          onClick={() => setStudentTab('fines')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            studentTab === 'fines'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Fines & Fee Clearance {pendingFines.length > 0 && `(${pendingFines.length})`}</span>
        </button>

        <button
          onClick={() => setStudentTab('inquiries')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            studentTab === 'inquiries'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Grievances & Inquiries</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      {studentTab === 'id-card' && (
        <div className="space-y-6">
          <DigitalIDCard student={student} onReportLost={() => setShowReportLostModal(true)} />
        </div>
      )}

      {studentTab === 'academic' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Profile Overview */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              <span>Student Academic Record</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Full Name</span>
                <span className="font-bold text-slate-900 dark:text-white">{student.name}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Register Number</span>
                <span className="font-bold font-mono text-blue-600 dark:text-blue-400">{student.registerNumber}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Department</span>
                <span className="font-bold text-slate-900 dark:text-white">{student.department}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Current Year / Semester</span>
                <span className="font-bold text-slate-900 dark:text-white">{student.year} Year / Sem VI</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Date of Birth</span>
                <span className="font-bold text-slate-900 dark:text-white">{student.dateOfBirth || '14-08-2004'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 block mb-1">Blood Group</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">{student.bloodGroup}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Institution: <strong>AVS College of Technology</strong></span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ID Active
              </span>
            </div>
          </div>

          {/* Gate Access & Security Pass */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Campus Gate Access Pass</span>
            </h2>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-900 dark:text-emerald-200">GATE PASS CLEARANCE: GRANTED</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black">VALID</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                Authorized for entry through Main Gate Turnstiles, Library RFID checkpoint, and Department Labs.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-500">Curfew Time:</span>
                <span className="font-bold text-slate-900 dark:text-white">09:00 PM</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-500">Emergency Phone:</span>
                <span className="font-bold font-mono text-blue-600 dark:text-blue-400">{student.emergencyContact}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-500">Student Email:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{student.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {studentTab === 'fines' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span>Disciplinary & Library Fines</span>
            </h2>
            <span className="text-xs text-slate-500 font-medium">Auto-synced with Accounts Department</span>
          </div>

          {fines.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
              <p className="text-sm font-bold text-slate-900 dark:text-white">No Pending Fines</p>
              <p className="text-xs text-slate-500">Your disciplinary and library fee record is 100% clear.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {fines.map((f) => (
                <div key={f.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{f.reason}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        f.status === 'PAID' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                      }`}>
                        {f.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Issued on {f.issuedAt} by {f.issuedBy}</p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-base font-black text-slate-900 dark:text-white">₹{f.amount}</span>
                    {f.status === 'PENDING' && (
                      <button
                        onClick={() => setSelectedFineToPay(f)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                      >
                        Pay Online
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {studentTab === 'inquiries' && (
        <div className="space-y-4">
          <InquiriesHub />
        </div>
      )}

      {/* MODAL: Pay Fine */}
      {selectedFineToPay && (
        <FinePaymentModal
          isOpen={!!selectedFineToPay}
          fine={selectedFineToPay}
          onClose={() => setSelectedFineToPay(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* MODAL: Report Lost ID */}
      {showReportLostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Report Lost Physical ID Card</h3>
                <p className="text-xs text-slate-500">This will temporarily suspend your physical card RFID</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-slate-700 dark:text-slate-300">Incident Details & Place of Loss</label>
              <textarea
                value={lostReason}
                onChange={(e) => setLostReason(e.target.value)}
                placeholder="Describe where and when the card was misplaced..."
                rows={3}
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowReportLostModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleReportLostSubmit}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Submit Report & Suspend Card
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
