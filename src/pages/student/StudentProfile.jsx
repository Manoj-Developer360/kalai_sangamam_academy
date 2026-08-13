import React from 'react';
import StudentDashboardLayout from '../../layouts/StudentDashboardLayout.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const FIELDS = [
  ['student_code', 'Student ID'],
  ['full_name', 'Name'],
  ['date_of_birth', 'Date of Birth'],
  ['parent_name', 'Parent Name'],
  ['parent_contact', 'Parent Contact'],
  ['contact_number', 'Contact Number'],
  ['address', 'Address'],
  ['blood_group', 'Blood Group'],
  ['emergency_contact', 'Emergency Contact'],
  ['joining_date', 'Joining Date'],
];

const StudentProfile = () => {
  const { profile } = useAuth();
  const registeredPrograms = (profile?.program_names?.length ? profile.program_names : (profile?.student_programs || [])
    .filter((enrollment) => enrollment.status === 'active' || !enrollment.status)
    .map((enrollment) => enrollment.programs?.name)
    .filter(Boolean));

  return (
    <StudentDashboardLayout>
      <h1 className="section-heading !text-2xl lg:!text-3xl mb-1">My Profile</h1>
      <p className="text-slate-500 text-sm mb-8">A profile photo is not required to use your dashboard.</p>

      <div className="card p-6 lg:p-8 grid sm:grid-cols-2 gap-6">
        {FIELDS.map(([key, label]) => (
          <div key={key}>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{label}</p>
            <p className="text-parchment-100 text-sm">{profile?.[key] || '—'}</p>
          </div>
        ))}

        <div className="sm:col-span-2 pt-4 border-t border-parchment-100/10">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Registered Programs</p>
          <p className="text-parchment-100 text-sm">{registeredPrograms.length ? registeredPrograms.join(', ') : '—'}</p>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentProfile;
