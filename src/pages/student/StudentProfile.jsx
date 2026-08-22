import React from 'react';
import {
  User, Cake, Droplet, IdCard, Users, Phone,
  MapPin, ShieldAlert, ShieldCheck, GraduationCap,
} from 'lucide-react';
import StudentDashboardLayout from '../../layouts/StudentDashboardLayout.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

/* ----------------------------------------------------------------------
   Presentation-only redesign. All data still comes from useAuth().profile
   exactly as before — no fields, hooks, or logic were changed.

   Theme now reads from the existing global ThemeContext (same one that
   drives the Student Portal header toggle) instead of local state, so
   there is a single source of truth and no duplicate toggle on this page.
   If your app exposes the theme value/hook under a different name or
   path, swap the import/hook call below to match — everything else is
   unaffected.
---------------------------------------------------------------------- */

const THEMES = {
  // Refined SaaS-style light theme
  light: {
    bg: '#F6F7F9', surface: '#FFFFFF', surfaceAlt: '#F8FAFC',
    ink: '#0F172A', inkMuted: '#64748B', line: '#E2E8F0',
    accent: '#A67C2E', accentSoft: '#FBF8F1', gold: '#A67C2E',
  },
  // Existing dark theme — unchanged
  dark: {
    bg: '#171512', surface: '#201D18', surfaceAlt: '#26221C',
    ink: '#EDE6D6', inkMuted: '#9C9284', line: '#35302A',
    accent: '#D98865', accentSoft: '#3A2A22', gold: '#C9A24B',
  },
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <div
    className="rounded-lg border p-4"
    style={{ background: 'var(--surface-alt)', borderColor: 'var(--line)' }}
  >
    <div className="flex items-center gap-1.5 mb-1.5">
      <Icon size={13} style={{ color: 'var(--gold)' }} />
      <span
        className="text-[10.5px] uppercase tracking-[0.06em] font-medium"
        style={{ color: 'var(--ink-muted)' }}
      >
        {label}
      </span>
    </div>
    <p className="text-sm leading-snug break-words" style={{ color: 'var(--ink)' }}>
      {value || '—'}
    </p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h2
      className="text-base font-semibold tracking-wide mb-3 flex items-center gap-2"
      style={{ color: 'var(--ink)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
      {title}
    </h2>
    <div className="grid sm:grid-cols-2 gap-3">{children}</div>
  </div>
);

const StudentProfile = () => {
  const { profile } = useAuth();
  const { theme } = useTheme(); // 'light' | 'dark', driven by the portal header toggle
  const T = THEMES[theme === 'light' ? 'light' : 'dark'];

  const registeredPrograms = (profile?.program_names?.length
    ? profile.program_names
    : (profile?.student_programs || [])
        .filter((enrollment) => enrollment.status === 'active' || !enrollment.status)
        .map((enrollment) => enrollment.programs?.name)
        .filter(Boolean));

  const initials = (profile?.full_name || '')
    .split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  const vars = {
    '--bg': T.bg, '--surface': T.surface, '--surface-alt': T.surfaceAlt,
    '--ink': T.ink, '--ink-muted': T.inkMuted, '--line': T.line,
    '--accent': T.accent, '--accent-soft': T.accentSoft, '--gold': T.gold,
  };

  return (
    <StudentDashboardLayout>
      <div style={vars} className="transition-colors duration-300">

        {/* Page header */}
        <div className="mb-5">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.14em] mb-1"
            style={{ color: 'var(--gold)' }}
          >
            Student Account
          </p>
          <h1
            className="text-xl sm:text-2xl lg:text-[28px] font-semibold"
            style={{ color: 'var(--ink)' }}
          >
            My Profile
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-muted)' }}>
            A profile photo is not required to use your dashboard.
          </p>
        </div>

        {/* Student overview card */}
        <div
          className="rounded-xl border p-4 sm:p-5 mb-5 transition-shadow"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--line)',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          }}
        >
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-base font-semibold"
                style={{
                  background: 'var(--accent-soft)', color: 'var(--accent)',
                  border: '1.5px solid var(--gold)',
                }}
              >
                {initials || <User size={20} />}
              </div>
              <div
                className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2"
                style={{ background: 'var(--gold)', borderColor: 'var(--surface)' }}
                title="Active enrollment"
              >
                <GraduationCap size={10} color="#fff" />
              </div>
            </div>

            <div className="min-w-0">
              <p className="text-base font-bold truncate" style={{ color: 'var(--ink)' }}>
                {profile?.full_name || '—'}
              </p>
              <p className="text-xs font-semibold mt-0.5 truncate" style={{ color: 'var(--ink-muted)' }}>
                {profile?.student_code || '—'}
              </p>
              {profile?.joining_date && (
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--ink-muted)' }}>
                  Joined {profile.joining_date}
                </p>
              )}
            </div>
          </div>

          <div
            className="mt-3.5 pt-3 border-t flex items-center gap-1.5"
            style={{ borderColor: 'var(--line)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            <span
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: 'var(--accent)' }}
            >
              Active Student
            </span>
          </div>
        </div>

        {/* Information sections */}
        <div
          className="rounded-xl border p-4 sm:p-6 grid sm:grid-cols-2 gap-x-8 gap-y-5 sm:gap-y-7"
          style={{
            background: 'var(--surface)',
            borderColor: 'var(--line)',
            boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          }}
        >
          <Section title="Personal Information">
            <InfoItem icon={User} label="Full Name" value={profile?.full_name} />
            <InfoItem icon={Cake} label="Date of Birth" value={profile?.date_of_birth} />
            <InfoItem icon={Droplet} label="Blood Group" value={profile?.blood_group} />
            <InfoItem icon={IdCard} label="Student ID" value={profile?.student_code} />
          </Section>

          <Section title="Parent / Guardian">
            <InfoItem icon={Users} label="Parent Name" value={profile?.parent_name} />
            <InfoItem icon={Phone} label="Parent Contact" value={profile?.parent_contact} />
          </Section>

          <Section title="Contact Information">
            <InfoItem icon={Phone} label="Contact Number" value={profile?.contact_number} />
            <InfoItem icon={MapPin} label="Address" value={profile?.address} />
          </Section>

          <Section title="Emergency Information">
            <InfoItem icon={ShieldAlert} label="Emergency Contact" value={profile?.emergency_contact} />
            <InfoItem
              icon={ShieldCheck}
              label="Safety Status"
              value={profile?.emergency_contact ? 'Contact on file' : 'Not provided'}
            />
          </Section>

          {/* Registered programs */}
          <div className="sm:col-span-2 pt-4 sm:pt-1 border-t" style={{ borderColor: 'var(--line)' }}>
            <h2
              className="text-base font-semibold tracking-wide mt-2 sm:mt-5 mb-3 flex items-center gap-2"
              style={{ color: 'var(--ink)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
              Registered Programs
            </h2>
            {registeredPrograms.length ? (
              <div className="flex flex-wrap gap-2">
                {registeredPrograms.map((name, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: 'var(--line)', color: 'var(--ink)',
                      background: 'var(--surface-alt)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--gold)' }} />
                    {name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--ink-muted)' }}>
                No active programs on record.
              </p>
            )}
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentProfile;