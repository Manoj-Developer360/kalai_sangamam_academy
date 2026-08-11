import React, { useEffect, useState } from 'react';
import { FiUsers, FiUserCheck, FiCalendar, FiCreditCard, FiImage, FiBell } from 'react-icons/fi';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import { adminService } from '../../services/adminService';
import { ErrorState } from '../../components/common/StateViews.jsx';

const CARDS = [
  { key: 'totalStudents', label: 'Total Students', icon: FiUsers },
  { key: 'activeStudents', label: 'Active Students', icon: FiUserCheck },
  { key: 'totalMasters', label: 'Total Masters', icon: FiUserCheck },
  { key: 'upcomingEvents', label: 'Upcoming Events', icon: FiCalendar },
  { key: 'pendingFees', label: 'Pending Fees', icon: FiCreditCard },
  { key: 'galleryItems', label: 'Gallery Items', icon: FiImage },
  { key: 'announcements', label: 'Announcements', icon: FiBell },
];

const AdminDashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    adminService.getOverview().then(({ data }) => setStats(data.data)).catch(() => setError(true));
  }, []);

  return (
    <AdminDashboardLayout>
      <h1 className="section-heading !text-2xl lg:!text-3xl mb-1">Dashboard Overview</h1>
      <p className="text-slate-500 text-sm mb-8">A snapshot of the academy right now.</p>

      {error && <ErrorState message="Couldn't load dashboard statistics right now." />}

      {stats && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CARDS.map((c) => (
            <div key={c.key} className="card p-6">
              <c.icon className="text-brass-500 text-2xl mb-3" />
              <p className="text-2xl font-mono text-parchment-100">{stats[c.key]}</p>
              <p className="text-slate-400 text-xs mt-1">{c.label}</p>
            </div>
          ))}
        </div>
      )}
    </AdminDashboardLayout>
  );
};

export default AdminDashboardHome;
