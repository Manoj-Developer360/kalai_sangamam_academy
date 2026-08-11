import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../../layouts/AdminDashboardLayout.jsx';
import AdminPageHeader from '../../components/dashboard/admin/AdminPageHeader.jsx';
import { EmptyState, ErrorState } from '../../components/common/StateViews.jsx';
import { adminService } from '../../services/adminService';
import { useToast } from '../../context/ToastContext.jsx';

const STATUSES = ['present', 'absent', 'leave'];

const AdminAttendance = () => {
  const { showToast } = useToast();
  const [students, setStudents] = useState(null);
  const [error, setError] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState('present');
  const [history, setHistory] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    adminService.getStudents({ status: 'active' }).then(({ data }) => setStudents(data.data)).catch(() => setError(true));
  }, []);

  const loadHistory = (studentId) => {
    if (!studentId) return setHistory(null);
    adminService.getStudentAttendance(studentId).then(({ data }) => setHistory(data.data)).catch(() => setHistory(null));
  };

  useEffect(() => { loadHistory(selectedId); /* eslint-disable-next-line */ }, [selectedId]);

  const handleMark = async (e) => {
    e.preventDefault();
    if (!selectedId) { showToast('Select a student first.', 'error'); return; }
    setSaving(true);
    try {
      await adminService.markAttendance({ student_id: selectedId, date, status });
      showToast('Attendance recorded.');
      loadHistory(selectedId);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to record attendance.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminDashboardLayout>
      <AdminPageHeader title="Attendance" subtitle="Select a student to mark or review attendance." />

      {error && <ErrorState message="Couldn't load students right now." />}

      {students && (
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
          <form onSubmit={handleMark} className="card p-6 space-y-4 h-fit">
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Student</label>
              <select required value={selectedId} onChange={(e) => setSelectedId(e.target.value)} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none">
                <option value="">Select a student</option>
                {students.map((s) => <option key={s.id} value={s.id}>{s.full_name} ({s.student_code})</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-ink-950 border border-parchment-100/10 rounded-sm px-4 py-2.5 text-sm text-parchment-100 focus:border-brass-500 outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1.5 block">Status</label>
              <div className="flex gap-2">
                {STATUSES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex-1 capitalize text-xs py-2.5 rounded-sm border transition-colors ${
                      status === s ? 'bg-brass-500 text-ink-950 border-brass-500 font-semibold' : 'border-parchment-100/15 text-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60">{saving ? 'Saving…' : 'Mark Attendance'}</button>
          </form>

          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">History</p>
            {!selectedId && <EmptyState message="Select a student to view their attendance history." />}
            {selectedId && history && history.records.length === 0 && <EmptyState message="No attendance recorded yet for this student." />}
            {selectedId && history && history.records.length > 0 && (
              <div className="card overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500 text-xs uppercase border-b border-parchment-100/5">
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.records.map((r) => (
                      <tr key={r.id} className="border-b border-parchment-100/5 last:border-0">
                        <td className="p-4 text-parchment-200">{new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                        <td className="p-4 capitalize text-slate-300">{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminDashboardLayout>
  );
};

export default AdminAttendance;
