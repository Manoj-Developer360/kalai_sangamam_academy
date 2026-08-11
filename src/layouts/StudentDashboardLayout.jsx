import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiCheckSquare, FiCreditCard, FiAward, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

const LINKS = [
  { to: '/student/dashboard', label: 'Dashboard', icon: FiHome, end: true },
  { to: '/student/profile', label: 'Profile', icon: FiUser },
  { to: '/student/attendance', label: 'Attendance', icon: FiCheckSquare },
  { to: '/student/fees', label: 'Fees', icon: FiCreditCard },
  { to: '/student/programs', label: 'Programs / Belt', icon: FiAward },
  { to: '/student/testimonials', label: 'Testimonials', icon: FiMessageSquare },
  { to: '/student/settings', label: 'Settings', icon: FiSettings },
];

const StudentDashboardLayout = ({ children }) => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/student/login');
  };

  const SidebarContent = () => (
    <>
      <div className="mb-8">
        <p className="font-display text-lg text-parchment-100">Kalai <span className="text-brass-500">Sangamam</span></p>
        <p className="text-xs text-slate-500 mt-1">{profile?.student_code || 'Student Portal'}</p>
      </div>
      <nav className="flex-1 space-y-1">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                isActive ? 'bg-brass-500/10 text-brass-400' : 'text-slate-400 hover:text-parchment-100'
              }`
            }
          >
            <l.icon /> {l.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-sm text-maroon-400 hover:text-maroon-300">
        <FiLogOut /> Logout
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-ink-950 lg:flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-ink-900 border-r border-parchment-100/5 p-6">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-parchment-100/5">
        <p className="font-display text-parchment-100">Student Portal</p>
        <button onClick={() => setOpen(true)} className="text-parchment-100 text-xl"><FiMenu /></button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/70" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-ink-900 p-6 flex flex-col">
            <button onClick={() => setOpen(false)} className="self-end text-parchment-100 text-xl mb-4"><FiX /></button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <main className="flex-1 p-5 lg:p-10">{children}</main>
    </div>
  );
};

export default StudentDashboardLayout;
